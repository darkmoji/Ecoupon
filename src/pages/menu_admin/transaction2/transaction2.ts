import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TransactionServiceProvider } from './../../../providers/transaction-service/transaction-service';

@Component({
  selector: 'page-transaction2',
  templateUrl: 'transaction2.html',
})
export class Transaction2Page {

  type: any;

  trans_use: any;
  name_shop: any;
  myDate: any;
  id_shop: number;

  trans_give: any;
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private transactionService: TransactionServiceProvider) {
    this.id_shop = this.navParams.get('id_shop');
    this.name_shop = this.navParams.get('name_shop');
    this.myDate = this.navParams.get('myDate');
    this.trans_use = this.navParams.get('trans_use');

    this.getGive();
    this.type = '1';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Transaction2Page');
  }

  getGive(){
    this.transactionService.getGive(this.myDate, this.id_shop)
    .subscribe(
      res =>{
          this.trans_give = res;
        },
        error =>{ 
          this.errorMessage = <any>error;
        });
  }

}
