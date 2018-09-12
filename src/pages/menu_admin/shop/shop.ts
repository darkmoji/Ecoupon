import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, Platform, LoadingController, AlertController } from 'ionic-angular';

import { Shop2Page } from './../shop2/shop2';
import { Shop3Page } from './../shop3/shop3';
import { DataServiceProvider } from './../../../providers/data-service/data-service';

@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {

  shop: any;

  errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataServiceProvider: DataServiceProvider,
    private actionSheetCtrl: ActionSheetController, private platform: Platform, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AccountPage');
    this.getShop();
  }

  getShop() {
    this.dataServiceProvider.getShop()
      .subscribe(
        res =>{
           this.shop = res;
          },
        error =>  this.errorMessage = <any>error);
  }

  action(s) {
    let actionSheet = this.actionSheetCtrl.create({
      title: s.name,
      buttons: [
        {
          text: 'ข้อมูลโปรโมชั่น',
          icon: !this.platform.is('ios') ? 'megaphone' : null,
          handler: () => {
            this.loading(s);
          }
        },
        {
          text: 'ข้อมูลร้านค้า',
          icon: !this.platform.is('ios') ? 'home' : null,
          handler: () => {
            this.navCtrl.push(Shop3Page, { id_shop: s.id_shop });
          }
        },
        {
          text: 'ยกเลิก',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();
  }

  loading(s){
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: `Loading Please Wait...`,
      duration: 5000
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
  
    loading.present();

    this.dataServiceProvider.getPromoByshop(s.id_shop)
      .subscribe(
        res => {
          loading.dismiss();
          this.navCtrl.push(Shop2Page, { promo: res });
        },
        error => {
          loading.dismiss();
          this.showErr();
          this.errorMessage = <any>error
        });
  }

  showErr() {
    let alert = this.alertCtrl.create({
      subTitle: 'ไม่มีข้อมูลโปรโมชั่น',
      cssClass: 'alertPointCss',
      buttons: [
        {
          text: 'ปิด',
          handler: () => {
          }
        }]
    });
    alert.present();
  }
}
