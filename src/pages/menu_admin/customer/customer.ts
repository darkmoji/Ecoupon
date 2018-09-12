import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Customer2Page } from './../customer2/customer2';

import { DataServiceProvider } from './../../../providers/data-service/data-service';

@Component({
  selector: 'page-customer',
  templateUrl: 'customer.html',
})
export class CustomerPage {

  user: any;

  errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataServiceProvider: DataServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AccountPage');
    this.getUser();
  }

  getUser() {
    this.dataServiceProvider.getUser()
      .subscribe(
        res =>{
            this.user = res;
          },
        error =>  this.errorMessage = <any>error);
  }

  next(u) {
    this.navCtrl.push(Customer2Page, { user: u });
  }
}
