import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ActivityServiceProvider } from './../../../providers/activity-service/activity-service';

@Component({
  selector: 'page-transaction-user',
  templateUrl: 'transaction-user.html',
})
export class TransactionUserPage {

  type: any;
  userDetails: object;

  trans_use: any;
  trans_get: any;

  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private activityService: ActivityServiceProvider) {
    this.userDetails = this.navParams.get('userDetails');
    this.getTranGet();
    this.getTransUse();
    this.type = '1';
  }
  
  getTranGet() {
    this.activityService.getTransGet(this.userDetails[0].id_user,1)
      .subscribe(
        res => {
          this.trans_get = res;
        },
        error =>  this.errorMessage = <any>error);
  }

  getTransUse() {
    this.activityService.getTransUse(this.userDetails[0].id_user)
      .subscribe(
        res => {
          this.trans_use = res;
        },
        error =>  this.errorMessage = <any>error);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionUserPage');
  }

}
