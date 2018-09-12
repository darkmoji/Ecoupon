import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DataServiceProvider } from './../../../providers/data-service/data-service';

@Component({
  selector: 'page-shop4',
  templateUrl: 'shop4.html',
})
export class Shop4Page {

  pro: any;
  promo: any;

  con: any;
  bl: any;
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataServiceProvider: DataServiceProvider) {
    this.pro = this.navParams.get('promo');
    this.getPromoById();
    this.getDeCon();
    this.getbranchLimited();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Shop4Page');
  }

  getDeCon(){
    this.dataServiceProvider.getDeCon(this.pro[0].id_promo)
      .subscribe(
        res => this.con = res,
        error =>  this.errorMessage = <any>error);
  }

  getbranchLimited(){
    this.dataServiceProvider.getbranchLimited(this.pro[0].id_promo)
      .subscribe(
        res => this.bl = res,
        error =>  this.errorMessage = <any>error);
  }

  getPromoById(){
    this.dataServiceProvider.getPromoById(this.pro[0].id_promo)
      .subscribe(
        res => this.promo = res,
        error =>  this.errorMessage = <any>error);
  }

}
