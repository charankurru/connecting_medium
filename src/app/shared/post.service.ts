import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient, public storage: Storage) {}

  getfeed() {
    return this.http.get(environment.apiBaseUrl + '/getfeed');
  }

  addLike(id: any) {
    return this.http.post(environment.apiBaseUrl + '/addlike', id);
  }

  postform(body: any) {
    console.log(body);
    return this.http.post(environment.apiBaseUrl + '/postfeed', body);
  }

  getUsersList() {
    return this.http.get(environment.apiBaseUrl + '/getUsers');
  }
  addcomment(postId: any, com: any) {
    return this.http.post(environment.apiBaseUrl + '/addcomment', {
      postId,
      com,
    });
  }
  getcomm(id: any) {
    return this.http.get(environment.apiBaseUrl + '/getcomment' + `/${id}`);
  }

  followUser(playId: any) {
    console.log(playId);
    return this.http.post(environment.apiBaseUrl + '/friends', { playId });
  }

  GetUser(useId: any) {
    return this.http.get(
      environment.apiBaseUrl + '/getsingleUser' + `/${useId}`
    );
  }

  getUserbyUSername(name) {
    return this.http.get(environment.apiBaseUrl + '/getbyname' + `/${name}`);
  }
  marknotification(user_id: any, deletevalue?: boolean) {
    return this.http.post(environment.apiBaseUrl + '/mark' + `/${user_id}`, {
      user_id,
      deletevalue,
    });
  }
  unfollowUser(user_id: any) {
    return this.http.post(environment.apiBaseUrl + '/unfollow', { user_id });
  }

  removeUser(user_id: any) {
    return this.http.post(environment.apiBaseUrl + '/removeuser', { user_id });
  }
}
