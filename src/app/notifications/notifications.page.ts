import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { PostService } from '../shared/post.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import io from 'socket.io-client';
import { MenuController } from '@ionic/angular';
import _ from 'lodash';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  loggedInUser: any;
  userdetarr: any;
  NotidicationsCount: number;
  socket: any;
  constructor(
    private modalCtrl: ModalController,
    private userservice: UserService,
    private postservice: PostService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getsingleUser();
  }

  async getpayload() {
    return this.userservice.getUserPayload().then((res) => {
      return res;
    });
  }

  dimissmodal() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  async getsingleUser() {
    var loggedInUser = await this.getpayload();
    this.postservice.GetUser(loggedInUser._id).subscribe(
      (data: any) => {
        console.log(data.done);
        this.userdetarr = data.done.notifications.reverse();
        this.NotidicationsCount = this.userdetarr.length;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  TimefromNow(time: any) {
    return moment(time).fromNow();
  }

  checkedNoti(data: any) {
    this.postservice.marknotification(data._id).subscribe(
      (data: any) => {
        console.log(data);
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteNoti(data: any) {
    this.postservice.marknotification(data._id, true).subscribe(
      (data: any) => {
        console.log(data);
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
