import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TypeshopPage } from './../typeshop/typeshop';
import { CustomerPage } from './../customer/customer';
import { ShopPage } from './../shop/shop';

@Component({
  selector: 'page-data',
  templateUrl: 'data.html',
})
export class DataPage {

  userDetails: any;
  user: any;
  errorMessage: string;

  constructor(public navCtrl: NavController, private storage: Storage) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DataPage');
  }

  typeShop(){
    this.navCtrl.push(TypeshopPage);
  }

  shop(){
    this.navCtrl.push(ShopPage);
  }

  cus(){
    this.navCtrl.push(CustomerPage);
  }
}
