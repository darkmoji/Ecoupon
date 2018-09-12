import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Shop4Page } from './../shop4/shop4';

import { DataServiceProvider } from './../../../providers/data-service/data-service';

@Component({
  selector: 'page-shop2',
  templateUrl: 'shop2.html',
})
export class Shop2Page {

  promo: any;  

  errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataServiceProvider: DataServiceProvider) {
    this.promo = this.navParams.get('promo');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Shop2Page');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter Shop2Page');
  }

  showDetail(p){
    this.navCtrl.push(Shop4Page,{ promo: [p] });
  }
}
