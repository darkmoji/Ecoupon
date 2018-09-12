import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DataServiceProvider } from './../../../providers/data-service/data-service';

@Component({
  selector: 'page-customer2',
  templateUrl: 'customer2.html',
})
export class Customer2Page {

  user: any;
  userDetails: any;

  gender: any;
  mode: any;

  errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataServiceProvider: DataServiceProvider) {
    this.user = this.navParams.get('user');
    if(this.user.gender==1){
      this.gender = 'หญิง';
    } else {
      this.gender = 'ชาย';
    }
    this.getUserById();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Customer2Page');
  }

  getUserById() {
    if(this.user.shop){
      this.mode = 2;
    } else {
      this.mode = 1;
    }
    this.dataServiceProvider.getUserById(this.user.id_user, this.mode)
      .subscribe(
        res =>{
            this.userDetails = res;
          },
        error =>  this.errorMessage = <any>error);
  }

}
