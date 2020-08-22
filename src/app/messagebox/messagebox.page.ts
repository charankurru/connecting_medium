import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../shared/user.service';
import { PostService } from '../shared/post.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';
import { MessageService } from '../shared/message.service';
import { ActivatedRoute } from '@angular/router';
import { async } from '@angular/core/testing';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { IonContent } from '@ionic/angular';

var payload: any;

@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.page.html',
  styleUrls: ['./messagebox.page.scss'],
})
export class MessageboxPage implements OnInit {
  @ViewChild(IonContent) Content: IonContent;
  receivername: string;
  userpayload: any;
  Msg: any;
  receiverdata: any;
  color: any;
  messagesarray: any;
  socket: any;
  typingmessage;
  typing: boolean;
  wtf: any;

  constructor(
    private userservice: UserService,
    private postservice: PostService,
    private router: Router,
    private msgservice: MessageService,
    private route: ActivatedRoute
  ) {
    this.socket = io('http://localhost:3000/');
    this.gotobottom();
  }

  ngOnInit() {
    this.typing = false;

    this.userservice.getUserPayload().then((result) => {
      this.userpayload = result;
      payload = result;
    });

    this.route.params.subscribe((params) => {
      this.receivername = params.name;

      this.GetUserByname(this.receivername);
      this.socket.on('refreshPage', (data: any) => {
        this.GetUserByname(this.receivername);
      });
    });

    this.socket.on('is_typing', (data: any) => {
      console.log(data);
      if (data.sender == this.receivername) {
        this.typing = true;
      } else {
        console.log('nottyping');
      }
    });

    this.socket.on('has_stopped_typing', (data: any) => {
      if (data.sender == this.receivername) {
        this.typing = false;
      }
    });
  }

  async getone() {
    return this.userservice.getUserPayload().then((result) => {
      if (result) {
        return result;
      } else return null;
    });
  }

  ngAfterViewInit() {
    this.userservice.getUserPayload().then((result) => {
      this.userpayload = result;
      const params = {
        room1: this.userpayload.fullName,
        room2: this.receivername,
      };
      this.socket.emit('join chat', params);
    });
  }

  async GetUserByname(name) {
    var gone = await this.getone();

    this.postservice.getUserbyUSername(name).subscribe(
      (data: any) => {
        this.receiverdata = data.record;
        this.getmsgs(gone._id, data.record._id);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  SendMessage() {
    if (this.Msg) {
      this.color = false;
      this.msgservice
        .SendMessage(
          this.userpayload._id,
          this.receiverdata._id,
          this.receiverdata.fullName,
          this.Msg
        )
        .subscribe(
          (data) => {
            this.socket.emit('refresh', {});
            this.socket.emit('refreshchatlist', {});
            this.socket.emit('refreshmsgcount', {});
            this.Msg = '';
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      this.color = true;
    }
  }

  getmsgs(senderId: any, receiverId: any) {
    this.msgservice.getmsgs(senderId, receiverId).subscribe(
      (data: any) => {
        console.log(data);
        this.messagesarray = data.msg.message;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async Istyping() {
    var gone = await this.getone();
    this.socket.emit('start_typing', {
      sender: gone.fullName,
      receiver: this.receivername,
    });
    if (this.typingmessage) {
      clearTimeout(this.typingmessage);
    }

    this.typingmessage = setTimeout(() => {
      this.socket.emit('stop_typing', {
        sender: gone.fullName,
        receiver: this.receivername,
      });
    }, 500);
  }

  gotobottom() {
    setTimeout(() => {
      this.Content.scrollToBottom();
    }, 500);
  }
}
