import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { PostService } from '../shared/post.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import io from 'socket.io-client';
import { MenuController } from '@ionic/angular';
import _ from 'lodash';
import { ModalController } from '@ionic/angular';
import { NotificationsPage } from '../notifications/notifications.page';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.page.html',
  styleUrls: ['./streams.page.scss'],
})
export class StreamsPage implements OnInit {
  socketHost: any;
  socket: any;
  payload: any;
  newsfeed: any;
  stream: any;
  token: any;

  constructor(
    private menu: MenuController,
    private userservice: UserService,
    private postservice: PostService,
    private router: Router,
    private modalCtrl: ModalController
  ) {
    this.stream = 'post';
    this.socket = io('http://localhost:3000/');
  }

  async ngOnInit() {
    console.log('form starting');
    if (!this.userservice.IsLoggedIn()) {
      this.router.navigateByUrl('/login');
    }
    if (!this.userservice.isLoggedIn) {
      console.log('what');
      this.userservice.deleteToken();
      this.router.navigateByUrl('/login');
    }

    this.token = this.userservice.getToken().then((result) => {
      console.log(result);
    });

    this.payload = await this.gettingpayload();

    this.ongetfeed();
    this.socket.on('refreshPage', (data: any) => {
      this.ongetfeed();
    });

    this.socket.on('refreshfeed', (data: any) => {
      this.ongetfeed();
    });
  }

  async gettingpayload() {
    return this.userservice.getUserPayload().then((res) => {
      return res;
    });
  }

  ongetfeed() {
    this.postservice.getfeed().subscribe(
      (data: any) => {
        this.newsfeed = data.posts;
        console.log(data);
      },
      (err) => {
        if (err.error.token === null) {
          this.userservice.deleteToken();
          this.router.navigateByUrl('/login');
        }
      }
    );
  }

  TimeFromNow(time: any) {
    return moment(time).fromNow();
  }

  gotopostfeed() {
    this.router.navigateByUrl('/newpost');
  }

  LikePost(dat: any) {
    console.log(dat._id);
    console.log('liked');
    this.postservice.addLike(dat).subscribe(
      (data: any) => {
        this.socket.emit('refresh', {});
      },
      (err) => console.log(err)
    );
  }

  CheckInLikesArray(arr: any, username: any) {
    return _.some(arr, { username: username });
  }

  CheckIncommentsArray(arr: any, username: any) {
    return _.some(arr, { username: username });
  }
  onComment(post: any) {
    this.router.navigateByUrl('/comments', { state: { post } });
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  async notificationModal() {
    const modal = await this.modalCtrl.create({
      component: NotificationsPage,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }
}
