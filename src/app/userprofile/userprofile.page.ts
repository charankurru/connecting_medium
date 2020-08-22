import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { PostService } from '../shared/post.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import io from 'socket.io-client';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})
export class UserprofilePage implements OnInit {
  first: any;
  posts: any;
  newsfeed: any;
  socket: any;
  fullName: any;
  userpayload: any;
  username: any;
  userdata: any;
  postscount: number;
  followerscount: number;
  followingCount: number;
  userposts: any[];
  followingarr: any;
  formparam: any;
  followersarr: any;
  paramsname: any;
  val: any;
  display: any;
  constructor(
    private userservice: UserService,
    private postservice: PostService,
    private router: Router,
    private activatedroute: ActivatedRoute
  ) {
    this.socket = io('http://localhost:3000/');
  }

  async ngOnInit() {
    this.display = true;
    this.first = 'posts';
    this.userpayload = await this.gettingpayload();
    console.log(this.userpayload.fullName);
    this.val = this.activatedroute.snapshot.paramMap.get('name');

    if (this.val) {
      this.display = false;
      this.paramsname = this.val;
      this.GetUserByname(this.paramsname);
      console.log(this.paramsname);
    } else {
      this.GetUserByname(this.userpayload.fullName);
    }

    // this.activatedroute.params.subscribe((params) => {
    //   this.username = params.name;
    //   if (this.username) {
    //     console.log(this.username);
    //     this.GetUserByname(this.username);
    //   return this.username;
    //   }
    // });

    this.socket.on('refreshPage', (data: any) => {
      this.GetUserByname(this.userpayload.fullName);
    });
  }

  async gettingpayload() {
    return this.userservice.getUserPayload().then((res) => {
      return res;
    });
  }

  GetUserByname(name: any) {
    this.postservice.getUserbyUSername(name).subscribe(
      (data: any) => {
        this.userdata = data.record;
        this.followingarr = data.record.followings;
        this.followersarr = data.record.followers;
        this.followerscount = this.userdata.followers.length;
        this.followingCount = this.userdata.followings.length;
        this.postscount = this.userdata.posts.length;
        this.userposts = data.record.posts;
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  TimeFromNow(time: any) {
    return moment(time).fromNow();
  }

  unfollowuser(users_id: any) {
    this.postservice.unfollowUser(users_id).subscribe(
      (data: any) => {
        console.log(data);
        this.socket.emit('refresh', {});
      },
      (err) => console.log(err)
    );
  }
}
