import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DataServiceProvider } from './../../../providers/data-service/data-service';
@Component({
  selector: 'page-shop3',
  templateUrl: 'shop3.html',
})
export class Shop3Page {

  id_shop: any;

  shop: any;  
  branchs: any;

  errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataServiceProvider: DataServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Shop3Page');
    this.id_shop = this.navParams.get('id_shop');
    this.getBrachAll();
    this.getShopById();
  }

  getBrachAll() {
    this.dataServiceProvider.getBrachAll(this.id_shop)
      .subscribe(
        res => {
          this.branchs = res;
        },
        error =>  this.errorMessage = <any>error);
  }

  getShopById() {
    this.dataServiceProvider.getShopById(this.id_shop)
      .subscribe(
        res => {
          this.shop = res;
        },
        error =>  this.errorMessage = <any>error);
  }

}
