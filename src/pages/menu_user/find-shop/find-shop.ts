import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ShopDetailPage } from './../shop-detail/shop-detail';
import { FindShopmapPage } from './../find-shopmap/find-shopmap';
import { ModalNoticePage } from './../../modal/modal-notice/modal-notice';

import { FindshopServiceProvider } from './../../../providers/findshop-service/findshop-service';

@Component({
  selector: 'page-find-shop',
  templateUrl: 'find-shop.html',
})
export class FindShopPage {

  userDetails: object;

  items: any;
  dataItems: any;
  itemDetail: any;
  showList: boolean;

  unread: any;

  shop: any;
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private findshopService: FindshopServiceProvider,
    private storage: Storage, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindShopPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter FindShopPage');
    this.storage.get('userData').then((val) => {
      this.userDetails = val;
      this.getShopAll();
      this.searchShop();
      this.getUnread();
    });
  }

  getUnread() {
    this.findshopService.getUnread(this.userDetails[0].id_user,1)
      .subscribe(
        res => {
          this.unread = res[0].unread;
        },
        error =>  this.errorMessage = <any>error);
  }

  notice() {
    let profileModal = this.modalCtrl.create(ModalNoticePage);
    this.storage.set('status_bar', 1).then( shop => {
      profileModal.present();
    });
  }

  getShopAll() {
    this.findshopService.getShopAll(this.userDetails[0].id_user)
      .subscribe(
        res => {
          this.shop = res;
        },
        error =>  this.errorMessage = <any>error);
  }

  searchShop(){
    this.findshopService.searchShop(this.userDetails[0].id_user)
    .subscribe(
      res => {
        this.dataItems = res;
      },
      error =>  this.errorMessage = <any>error);
    return this.items;
  }

  initializeItems() {
    this.items = this.dataItems;
  }

  onInput(ev: any){
    this.initializeItems();

    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.showList = true;
    } else {
      this.showList = false;
    }
  }

  showItem(item){
    this.showList = null;
    this.findshopService.getShopById(item.id_shop)
      .subscribe(
        res => {
          this.itemDetail = res;
        },
        error =>  this.errorMessage = <any>error);
  }

  showDetail(s){
    this.navCtrl.push(ShopDetailPage, { shop: s, userDetails: this.userDetails });
  }

  map(){
    this.navCtrl.push(FindShopmapPage, { userDetails: this.userDetails });
  }

}
