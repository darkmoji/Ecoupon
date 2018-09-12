import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar } from 'ionic-angular';

import { ActivityServiceProvider } from './../../providers/activity-service/activity-service';

@Component({
  selector: 'page-promo-detail-shop',
  templateUrl: 'promo-detail-shop.html',
})
export class PromoDetailShopPage {
    
  @ViewChild(Navbar) navBar: Navbar;

  page: string;
  id_promo: number;
  type: number;

  promo: any;
  con: any;
  bl: any;
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private activityService: ActivityServiceProvider) {
    this.page = this.navParams.get('page');
    this.id_promo = this.navParams.get('id');
    this.type = this.navParams.get('type');

    this.getPromoById();
    this.getDeCon();
    this.getbranchLimited();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromoDetailShopPage');
    if(this.page != 'ShopDetailPage'){
      this.navBar.backButtonClick = () => {
        this.navCtrl.popToRoot();
      }
    }
  }

  getDeCon(){
    this.activityService.getDeCon(this.id_promo)
      .subscribe(
        res => this.con = res,
        error =>  this.errorMessage = <any>error);
  }

  getbranchLimited(){
    this.activityService.getbranchLimited(this.id_promo)
      .subscribe(
        res => this.bl = res,
        error =>  this.errorMessage = <any>error);
  }

  getPromoById(){
    this.activityService.getPromoById(this.id_promo)
      .subscribe(
        res => this.promo = res,
        error =>  this.errorMessage = <any>error);
  }

}
