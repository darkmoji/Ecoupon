import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { TabsPage } from './../tabs/tabs';

import { AuthServiceProvider } from './../../providers/auth-service/auth-service';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  regisForm : FormGroup;
  errorMessage: string;
  res: any;

  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, private formBuilder: FormBuilder) {
    this.regisForm = this.formBuilder.group({
      username: [''],
      password: [''],
      // username: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z]*')])],
      // password: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      citizen_id: ['', Validators.required],
      tel: ['', Validators.required],
      bod: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  signup(){
    this.authService.postUser(this.regisForm.value)
      .subscribe(
        res =>{ 
          this.res = res;
          this.navCtrl.popToRoot(); 
        },
        error =>  this.errorMessage = <any>error);
  }
}
