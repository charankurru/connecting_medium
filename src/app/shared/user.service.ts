import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { retry } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  helper = new JwtHelperService();

  constructor(private http: HttpClient, public storage: Storage) {}

  signupUser(user: any) {
    return this.http.post(environment.apiBaseUrl + '/register', user);
  }

  login(authCredentials: any) {
    return this.http.post(
      environment.apiBaseUrl + '/authenticate',
      authCredentials
    );
  }

  //Helper Methods

  setToken(token: string) {
    console.log(token);
    this.storage.set('token', token);
  }

  async getToken() {
    return this.storage.get('token').then((result) => {
      // console.log(result);
      if (result) {
        return result;
      } else return null;
    });
  }

  deleteToken() {
    this.storage.remove('token');
  }

  gettingpayload() {
    this.storage.get('token').then((result) => {
      if (result) {
        var userPayload = atob(result.split('.')[1]);
        return JSON.parse(userPayload);
      } else return null;
    });
  }

  async getUserPayload() {
    var token = await this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else return null;
  }

  async GetToken() {
    return await this.storage.get('token');
  }

  async isLoggedIn() {
    console.log('well');
    const token = await this.getToken();
    return !this.helper.isTokenExpired(token);
  }

  async IsLoggedIn() {
    console.log('ok');
    var userPayload = await this.getUserPayload();
    console.log(userPayload);
    if (userPayload.exp > Date.now() / 1000) {
      return false;
    } else return true;
  }
}
