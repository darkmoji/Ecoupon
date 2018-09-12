import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';

import { RegisterPage } from './../register/register';
import { TabsPage } from './../tabs/tabs';
import { TabAdminPage } from './../tab-admin/tab-admin';

import { AuthServiceProvider } from './../../providers/auth-service/auth-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup
  errorMessage: string;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider,
    private formBuilder: FormBuilder, public alertCtrl: AlertController, private storage: Storage, public loadingCtrl: LoadingController) {
    this.loginForm = this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  // presentLoadingCustom() {
  //   let loading = this.loadingCtrl.create({
  //     spinner: 'bubbles',
  //     content: `Loading Please Wait...`,
  //     duration: 5000
  //   });
  
  //   loading.onDidDismiss(() => {
  //     console.log('Dismissed loading');
  //   });
  
  //   loading.present();
  // }

  signin(){
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: `Loading Please Wait...`,
      duration: 5000
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
  
    loading.present();

    this.authService.loginUser(this.loginForm.value)
      .subscribe(
        res => {
          this.user = res;
          //localStorage.setItem('userData', JSON.stringify(this.user));   localStorage
          this.storage.set('userData', this.user).then( user => {
            loading.dismiss();
            if (this.user[0].status == 1) {
              this.navCtrl.push(TabAdminPage);
            } else {
              this.navCtrl.push(TabsPage);
            }
          });
        },
        error => {
          loading.dismiss();
          this.errSignin();
          this.errorMessage = <any>error
        });
  }

  signup(){
    this.navCtrl.push(RegisterPage);
  }

  errSignin() {
    let alert = this.alertCtrl.create({
      title: 'Error Signing In',
      subTitle: 'The username or password is incorrect.',
      buttons: ['OK']
    });
    alert.present();
  }
}
