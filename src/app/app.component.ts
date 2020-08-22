import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  token: any;
  rootPage: string = 'HomePage';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userservice: UserService,
    private storage: Storage,
    private router: Router
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.token = this.userservice.getToken().then((result) => {
      if (result) {
        this.router.navigateByUrl('/home');
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
