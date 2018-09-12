import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Transaction2Page } from './../transaction2/transaction2';

import { TransactionServiceProvider } from './../../../providers/transaction-service/transaction-service';

@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html',
})

export class TransactionPage {

  myDate: any;
  search_sel: any;

  check_empty: boolean;
  trans: any;
  errorMessage: string;

  trans_use: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private transactionService: TransactionServiceProvider) {
    this.check_empty = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionPage');
  }

  // getLogAll(){
  //   this.transactionService.getLogAll()
  //     .subscribe(
  //       res => {
  //         this.data = res;
  //       },
  //       error =>  this.errorMessage = <any>error);
  // }
  onChange(){
    this.myDate = null;
    this.trans = null;
    this.check_empty = false;
  }

  onDay(){
    this.trans = null;
    this.check_empty = false;
    this.transactionService.getDay(this.myDate)
      .subscribe(
        res =>{
            this.trans = res;
          },
        error =>{ 
            this.errorMessage = <any>error;
            this.check_empty = true;
          });
  }

  next(t){
    this.transactionService.getUse(this.myDate,t.id_shop)
    .subscribe(
      res =>{
          this.trans_use = res;
          this.navCtrl.push(Transaction2Page,{ myDate: this.myDate, id_shop: t.id_shop, name_shop: t.name_shop, trans_use: this.trans_use });
        },
        error =>{ 
          this.errorMessage = <any>error;
          this.navCtrl.push(Transaction2Page,{ myDate: this.myDate, id_shop: t.id_shop, name_shop: t.name_shop, trans_use: this.trans_use });
        });
  }


}
