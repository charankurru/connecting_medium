import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { PostService } from '../shared/post.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.page.html',
  styleUrls: ['./newpost.page.scss'],
})
export class NewpostPage implements OnInit {
  socket: any;
  post: any;
  constructor(
    private userservice: UserService,
    private postservice: PostService,
    private router: Router,
    private menu: MenuController
  ) {
    this.socket = io('http://localhost:3000/');
  }

  ngOnInit() {}

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

  onPostfeed() {
    console.log(this.post);
    var body = {
      post: this.post,
    };
    this.postservice.postform(body).subscribe(
      (data) => {
        this.router.navigate(['/home']);
        this.socket.emit('refreshnew', {});
        this.post = '';
        console.log(data);
      },
      (err) => {
        if (err.error.token == null) {
          this.userservice.deleteToken();
          this.router.navigateByUrl('/login');
        }
      }
    );
  }
}
