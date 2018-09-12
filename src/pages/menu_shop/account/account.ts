import { NavEcComponent } from './../../../components/nav-ec/nav-ec';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ModalNoticePage } from './../../modal/modal-notice/modal-notice';

import { ManageAccountServiceProvider } from './../../../providers/manage-account-service/manage-account-service';

import { ShopInfoPage } from './../shop-info/shop-info';
import { MemberPage } from './../member/member';
import { AddBranchPage } from './../add-branch/add-branch';
import { BranchPage } from './../branch/branch';
import { AddCashierPage } from './../add-cashier/add-cashier';
import { TransactionShopPage } from '../transaction-shop/transaction-shop';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  unread: any;

  shopDetails: object;
  userDetails: object;

  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private manageAccountService: ManageAccountServiceProvider,
    private modalCtrl: ModalController) {
    storage.get('userData').then((val) => {
      this.userDetails = val;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }
  
  ionViewWillEnter() {
    console.log('ionViewWillEnter AccountPage');
    this.storage.get('shopData').then((val) => {
      this.shopDetails = val;
    });
    this.getUnread();
  }

  getInfoShop(){
    this.navCtrl.push(ShopInfoPage);
  }

  getInfoMember(){
    this.manageAccountService.getMember(this.shopDetails[0].id_shop)
      .subscribe(
        res =>{
            this.navCtrl.push(MemberPage,({ member: res }));
          },
        error =>{
            this.errorMessage = <any>error;
            this.navCtrl.push(MemberPage,({ member: null }));
          });
  }

  getTrans(){
    this.navCtrl.push(TransactionShopPage, { shopDetails: this.shopDetails, userDetails: this.userDetails });
  }

  addBranch(){
    this.navCtrl.push(AddBranchPage, { shopDetails: this.shopDetails });
  }
  
  showBranch(){
    this.navCtrl.push(BranchPage, { shopDetails: this.shopDetails });
  }

  addCashier(){
    this.navCtrl.push(AddCashierPage, { shopDetails: this.shopDetails });
  }

  notice() {
    let profileModal = this.modalCtrl.create(ModalNoticePage);
    this.storage.set('status_bar', 2).then( shop => {
      profileModal.present();
    });
  }

  getUnread() {
    this.manageAccountService.getUnread(this.userDetails[0].id_user,2)
      .subscribe(
        res => {
          this.unread = res[0].unread;
        },
        error =>  this.errorMessage = <any>error);
  }

}
