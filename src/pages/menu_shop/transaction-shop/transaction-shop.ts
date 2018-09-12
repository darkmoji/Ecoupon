import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ManageAccountServiceProvider } from './../../../providers/manage-account-service/manage-account-service';

@Component({
  selector: 'page-transaction-shop',
  templateUrl: 'transaction-shop.html',
})
export class TransactionShopPage {

  type: any;
  userDetails: object;
  shopDetails: object;

  trans_use: any;
  trans_give: any;

  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private manageAccountService: ManageAccountServiceProvider) {
    this.userDetails = this.navParams.get('userDetails');
    this.shopDetails = this.navParams.get('shopDetails');
    this.getTranUse();
    this.getTranGive();
    this.type = '1';
  }

  getTranUse() {
    this.manageAccountService.getTranUse(this.userDetails[0].id_user,2)
      .subscribe(
        res => {
          this.trans_use = res;
        },
        error =>  this.errorMessage = <any>error);
  }

  getTranGive() {
    this.manageAccountService.getTranGive(this.shopDetails[0].id_shop)
      .subscribe(
        res => {
          this.trans_give = res;
        },
        error =>  this.errorMessage = <any>error);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionShopPage');
  }

}
