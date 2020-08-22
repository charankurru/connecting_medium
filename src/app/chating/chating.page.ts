import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { PostService } from '../shared/post.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import io from 'socket.io-client';
import { MenuController } from '@ionic/angular';
import _ from 'lodash';
import { MessageService } from '../shared/message.service';

@Component({
  selector: 'app-chating',
  templateUrl: './chating.page.html',
  styleUrls: ['./chating.page.scss'],
})
export class ChatingPage implements OnInit {
  socket: any;
  usersArray: any[];
  loggedInUser: any;
  userdetarr: any[];
  Nfollowings: number[];
  Nfollowers: number[];
  msgnumber = 0;
  onlinemembers: any;

  constructor(
    private userservice: UserService,
    private postservice: PostService,
    private router: Router,
    private msgservice: MessageService
  ) {
    this.socket = io('http://localhost:3000/');
  }

  ngOnInit() {
    this.userservice.getUserPayload().then((result) => {
      this.loggedInUser = result;

      this.getsingleUser(this.loggedInUser);
    });

    this.socket.on('refreshcomponent', (data: any) => {
      this.userservice.getUserPayload().then((result) => {
        this.loggedInUser = result;
        this.getsingleUser(this.loggedInUser);
      });
    });
  }
  ngAfterViewInit() {
    this.socket.on('receivedata', (data) => {
      this.onlinemembers = data.data.data;
    });
  }

  getsingleUser(loggedInUser: any) {
    this.postservice.GetUser(loggedInUser._id).subscribe(
      (data: any) => {
        console.log(data);
        this.userdetarr = data.done.ChatList;
        console.log(this.userdetarr);
        this.CheckIfread(this.userdetarr);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  MessageDate(Date) {
    return moment(Date).calendar(null, {
      sameDay: '[Today]',
      lastDay: '[yesterday]',
      lastWeek: 'DD/MM/YYYY',
      sameElse: 'DD/MM/YYYY',
    });
  }

  CheckIfread(arr: any) {
    const checkArr = [];
    for (let i = 0; i < arr.length; i++) {
      const receiver = arr[i].msgId.message[arr[i].msgId.message.length - 1];
      if (this.router.url !== `/chat/${receiver.sendername}`) {
        if (
          receiver.isRead === false &&
          receiver.receivername === this.loggedInUser.fullName
        ) {
          checkArr.push(1);
          this.msgnumber = _.sum(checkArr);
          console.log(this.msgnumber);
        }
      }
    }
  }

  gotochatpage(name: any) {
    this.router.navigate(['messagebox', name]);
    this.userservice.getUserPayload().then((result) => {
      this.loggedInUser = result;
      this.msgservice.Markmessages(this.loggedInUser.fullName, name).subscribe(
        (data) => {
          this.socket.emit('refreshchatlist', {});
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  markallmsgs() {
    this.msgservice.marksallmessages().subscribe(
      (data) => {
        console.log(data);
        this.socket.emit('refreshchatlist', {});
        this.socket.emit('refreshmsgcount', {});
      },
      (err) => {
        console.log(err);
      }
    );
  }

  checkIfonline(name: any) {
    const result = _.indexOf(this.onlinemembers, name);
    if (result > -1) {
      return true;
    } else {
      return false;
    }
  }
}
