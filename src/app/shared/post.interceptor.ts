import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { PostService } from '../shared/post.service';
import { UserService } from '../shared/user.service';

@Injectable()
export class PostInterceptor implements HttpInterceptor {
  token: any;
  constructor(
    private postService: PostService,
    private router: Router,
    private userservice: UserService
  ) {
    this.userservice.getToken().then((result) => {
      console.log('from interceptr');
      console.log(result);
      this.token = result;
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.headers.get('noauth')) return next.handle(req.clone());
    else {
      const clonedreq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.token),
      });
      return next.handle(clonedreq).pipe(
        tap(
          (event) => {},
          (err) => {
            if (err.error.auth == false) {
              this.router.navigateByUrl('/login');
            }
          }
        )
      );
    }
  }
}
