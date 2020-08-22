import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { PostService } from '../shared/post.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';
import { MessageService } from '../shared/message.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  socket: any;
  payload: any;
  usersArray: any;
  userfollowingdata: any;
  loggedInUser: any;
  constructor(
    private msgservice: MessageService,
    private userservice: UserService,
    private postservice: PostService,
    private router: Router
  ) {
    this.socket = io('http://localhost:3000/');
  }

  ngOnInit() {
    this.userservice.getUserPayload().then((result) => {
      this.payload = result;
      this.getUsers(this.payload);
      this.getsingleUser(this.payload);
      console.log(this.payload._id);
    });
    this.socket.on('refreshPage', (data: any) => {
      console.log('from users');
      this.userservice.getUserPayload().then((result) => {
        this.payload = result;
        this.getUsers(this.payload);
      });
    });
  }

  getUsers(payload: any) {
    this.postservice.getUsersList().subscribe(
      (data: any) => {
        console.log(data);
        this.usersArray = data.posts;
        _.remove(data.posts, { fullName: payload.fullName });
      },
      (err) => console.log(err)
    );
  }

  FollowUser(user: any) {
    this.postservice.followUser(user._id).subscribe(
      (data: any) => {
        console.log(data);
        this.socket.emit('refresh', {});
      },
      (err) => console.log(err)
    );
  }

  getsingleUser(payload: any) {
    this.postservice.GetUser(payload._id).subscribe(
      (data: any) => {
        console.log(data);
        this.userfollowingdata = data.done.followings;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  CheckInArr(arr: any, id: any) {
    var result = _.find(arr, ['userfollowing._id', id]);
    if (result) {
      return true;
    }
    if (!result) {
      return false;
    }
  }

  gotochatpage(name: any) {
    this.router.navigate(['messagebox', name]);
    this.userservice.getUserPayload().then((result) => {
      this.loggedInUser = result;
      this.msgservice.Markmessages(this.loggedInUser.fullName, name).subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  gotoUserprofile(name: any) {
    this.router.navigate(['userprofile', name]);
  }
}
