import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-add-cashier',
  templateUrl: 'add-cashier.html',
})
export class AddCashierPage {

  shopDetails: object;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.shopDetails = this.navParams.get('shopDetails');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCashierPage');
  }

}
