import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { PromoDetail2Page } from './../../promo-detail2/promo-detail2';
import { TransactionShopPage } from '../../menu_shop/transaction-shop/transaction-shop';

import { NoticeServiceProvider } from './../../../providers/notice-service/notice-service';

@Component({
  selector: 'page-modal-notice',
  templateUrl: 'modal-notice.html',
})
export class ModalNoticePage {

  userDetails: object;
  status_bar: any;

  notifications: any;
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private noticeService: NoticeServiceProvider,
    private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalNoticePage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter MyCardPage');  
    this.storage.get('userData').then((val) => {
      this.userDetails = val;
      this.storage.get('status_bar').then((val) => {
        this.status_bar = val;
        this.getNotice();
      });
    });
  }

  getNotice() {
    this.noticeService.getNotice(this.userDetails[0].id_user,this.status_bar)
      .subscribe(
        res => {
          this.notifications = res;
        },
        error =>  this.errorMessage = <any>error);
  }

  page(p) {
    let obj = JSON.parse(p.data);
    let page: any;
    // if(p.page == 'PromoDetailPage'){
    //   page = PromoDetailPage;
    // }

    this.noticeService.updateNotice(p.id_notification)
      .subscribe(
        res => {
          if(this.status_bar==1){
            this.navCtrl.push(PromoDetail2Page, { id: obj.id, type: obj.type, page: 'ModalNoticePage', userDetails: this.userDetails });
          }else{
            this.navCtrl.push(TransactionShopPage, { userDetails: this.userDetails });
          }
        },
        error =>  this.errorMessage = <any>error);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
