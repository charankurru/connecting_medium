import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string;
  password: string;
  FirstName: string;

  constructor(
    public router: Router,
    private userService: UserService,
    public alertController: AlertController
  ) {}

  ngOnInit() {}

  signup() {
    console.log(this.FirstName);
    var body = {
      fullName: this.FirstName,
      password: this.password,
      email: this.email,
    };
    this.userService.signupUser(body).subscribe(
      (res) => {
        // this.userService.setToken(res["token"]);
        // this.router.navigateByUrl("/userdashboard");
        console.log('woww');
        return this.router.navigateByUrl('/login');
      },
      (err) => {
        console.log(err.error[0]);
        this.presentAlert(err.error[0]);
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
}
