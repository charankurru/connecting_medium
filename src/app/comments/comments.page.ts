import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PostService } from '../shared/post.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {
  product: any;
  socket: any;
  comment: any;
  commentsarray: [];
  constructor(
    private router: Router,
    private location: Location,
    private activatedroute: ActivatedRoute,
    private postservice: PostService
  ) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.product = history.state.post;
    console.log(this.product._id);
    this.socket.on('refreshPage', (data: any) => {
      this.getcomments();
    });
  }

  ngAfterViewInit() {
    this.getcomments();
  }

  commentpost() {
    this.postservice.addcomment(this.product._id, this.comment).subscribe(
      (data) => {
        this.socket.emit('refresh', {});
        this.comment = '';
      },
      (err) => console.log(err)
    );
  }
  getcomments() {
    this.postservice.getcomm(this.product._id).subscribe(
      (data: any) => {
        console.log(data);
        this.commentsarray = data.posts.comments.reverse();
      },
      (err) => console.log(err)
    );
  }
}
