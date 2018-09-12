import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { FindshopServiceProvider } from './../../../providers/findshop-service/findshop-service';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  shop: any;

  branchs: any;
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private findshopService: FindshopServiceProvider) {
    this.shop = this.navParams.get('shop');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.getBrachAll();
  }

  getBrachAll() {
    this.findshopService.getBrachAll(this.shop.id_shop)
      .subscribe(
        res => {
          this.branchs = res;
        },
        error =>  this.errorMessage = <any>error);
  }

}
