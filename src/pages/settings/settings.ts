import { Component } from '@angular/core';
import { NavController, NavParams, App, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { NavEcComponent } from './../../components/nav-ec/nav-ec';

import { AddShopPage } from './../add-shop/add-shop';
import { TransactionUserPage } from '../menu_user/transaction-user/transaction-user';
import { ModalNoticePage } from './../modal/modal-notice/modal-notice';

import { TabsPage } from '../tabs/tabs';
import { TabShopPage } from './../tab-shop/tab-shop';

import { ActivityServiceProvider } from './../../providers/activity-service/activity-service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  menu: string;
  userDetails: any;
  id_user: number;
  unread: any;

  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App, private storage: Storage,
    public activityServiceProvider: ActivityServiceProvider, public alertCtrl: AlertController, private modalCtrl: ModalController) {
    storage.get('menuSelected').then((val) => {
      this.menu = val;
      storage.get('userData').then((val) => {
        this.userDetails = val;
        this.id_user = this.userDetails[0].id_user;
        this.getUnread();
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  getUnread() {
    if (this.menu == 'TabsPage') {
      this.activityServiceProvider.getUnread(this.userDetails[0].id_user,1)
      .subscribe(
        res => {
          this.unread = res[0].unread;
        },
        error =>  this.errorMessage = <any>error);
    }else if (this.menu == 'TabShopPage') {
      this.activityServiceProvider.getUnread(this.userDetails[0].id_user,2)
      .subscribe(
        res => {
          this.unread = res[0].unread;
        },
        error =>  this.errorMessage = <any>error);
    } 
  }

  notice() {
    if (this.menu == 'TabsPage') {
      let profileModal = this.modalCtrl.create(ModalNoticePage);
      this.storage.set('status_bar', 1).then( shop => {
        profileModal.present();
      });
    }else if (this.menu == 'TabShopPage') {
      let profileModal = this.modalCtrl.create(ModalNoticePage);
      this.storage.set('status_bar', 2).then( shop => {
        profileModal.present();
      });
    } 
  }

  getShopById() {
    const nav = this.app.getRootNav();

    this.activityServiceProvider.getShopById(this.id_user)
      .subscribe(
        res => {
          let shop = res;
          this.storage.set('shopData', shop).then( shop => {
            nav.push(TabShopPage);
          });
        },
        error => {
          this.showConfirm();
        });
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Would like to Create shop?',
      //message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Okay',
          handler: () => {
            this.navCtrl.push(AddShopPage);
          }
        }
      ]
    });
    confirm.present();
  }

  switch(){
    const nav = this.app.getRootNav();
    if (this.menu == 'TabsPage') {
      this.getShopById();
    }else if (this.menu == 'TabShopPage') {
      nav.push(TabsPage);
    } 
  }

  logout(){
    this.storage.clear();
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  transUser(){
    this.navCtrl.push(TransactionUserPage, { userDetails: this.userDetails });
  }
}
