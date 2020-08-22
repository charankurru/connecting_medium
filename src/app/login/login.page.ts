import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  loading: any;
  payload: any;
  token: any;
  constructor(
    public navctrl: NavController,
    public router: Router,
    private userservice: UserService,
    public alertController: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  registerPage() {
    return this.router.navigateByUrl('/register');
  }

  loginUser() {
    this.presentLoading();
    var body = {
      email: this.email,
      password: this.password,
    };
    this.userservice.login(body).subscribe(
      (res) => {
        this.loading.dismiss();
        this.userservice.setToken(res['token']);
        this.router.navigateByUrl('/home');
      },
      (err) => {
        this.loading.dismiss();
        console.log(err.error.message);
        this.presentAlert(err.error.message);
      }
    );
  }

  async presentAlert(err: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: err,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000,
    });
    this.loading.present();
  }
}
