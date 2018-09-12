import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-report3',
  templateUrl: 'report3.html',
})
export class Report3Page {

  promo: any;
  name_shop: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.promo = this.navParams.get('promo');
    this.name_shop = this.navParams.get('name_shop');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Report3Page');
  }

}
