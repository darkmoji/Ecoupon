import { ComponentsModule } from './../../../components/components.module';
import { NavEcComponent } from './../../../components/nav-ec/nav-ec';

import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { PromoDetailShopPage } from './../../promo-detail-shop/promo-detail-shop';
import { AddPromoPage } from './../add-promo/add-promo';
import { ModalNoticePage } from './../../modal/modal-notice/modal-notice';

import { ManagePromoServiceProvider } from './../../../providers/manage-promo-service/manage-promo-service';

@Component({
  selector: 'page-manage-promo',
  templateUrl: 'manage-promo.html',
})
export class ManagePromoPage {

  unread: any;

  userDetails: object;
  shopDetails: object;
  type: string;

  typepromo: any;
  promo: object[] = [];
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
    private managePromoServiceProvider: ManagePromoServiceProvider, private modalCtrl: ModalController) {
      this.storage.get('shopData').then((val) => {
        this.shopDetails = val;
      });
      storage.get('userData').then((val) => {
        this.userDetails = val;
        this.getUnread();
      });
      this.type = '1';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagePromoPage');
  }
  
  ionViewWillEnter() {
    console.log('ionViewWillEnter ManagePromoPage');
    this.getTypePromo();
  }

  getTypePromo() {
    this.managePromoServiceProvider.getTypePromo()
      .subscribe(
        res => {
          this.typepromo = res;
          this.getPromoByShop();
        },
        error =>  this.errorMessage = <any>error);
  }
  
  getPromoByShop(){
    for (let t of this.typepromo){
      this.managePromoServiceProvider.getPromoByShop(this.shopDetails[0].id_shop, t.id_type_promo)
      .subscribe(
        res => {
          this.promo[t.id_type_promo] = res;
        },
        error =>  this.errorMessage = <any>error);
    }
  }

  showDetail(p,t){
    this.navCtrl.push(PromoDetailShopPage, { id: p.id_promo, type: t, page: 'ManagePromoPage' });
  }

  createPromo(){
    this.navCtrl.push(AddPromoPage, { shopDetails: this.shopDetails });
  }

  notice() {
    let profileModal = this.modalCtrl.create(ModalNoticePage);
    this.storage.set('status_bar', 2).then( shop => {
      profileModal.present();
    });
  }

  getUnread() {
    this.managePromoServiceProvider.getUnread(this.userDetails[0].id_user,2)
      .subscribe(
        res => {
          this.unread = res[0].unread;
        },
        error =>  this.errorMessage = <any>error);
  }
}
