import { NavEcComponent } from './../../../components/nav-ec/nav-ec';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { GivePromoPage } from './../give-promo/give-promo';
import { ModalNoticePage } from './../../modal/modal-notice/modal-notice';

import { GivepointServiceProvider } from './../../../providers/givepoint-service/givepoint-service';

@Component({
  selector: 'page-give-point',
  templateUrl: 'give-point.html',
})
export class GivePointPage {

  unread: any;

  shopDetails: object;
  userDetails: object;

  data: any;
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private givepointService: GivepointServiceProvider,
    private barcodeScanner: BarcodeScanner, private alertCtrl: AlertController, private storage: Storage, private modalCtrl: ModalController) {
      this.storage.set('menuSelected', 'TabShopPage');
      this.storage.get('shopData').then((val) => {
        this.shopDetails = val;
      });
      this.storage.get('userData').then((val) => {
        this.userDetails = val;
        this.getUnread();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GivePointPage');
  }

  scanCode() {
    const options: BarcodeScannerOptions = {
      resultDisplayDuration: 0
    };

    this.barcodeScanner.scan(options).then(barcodeData => {

      //this.scannedCode = barcodeData.text;
      let data = { "data": barcodeData.text, "id_user": this.userDetails[0].id_user };
      this.givepointService.checkScan(data)
        .subscribe(
          res =>{
            this.navCtrl.push(GivePromoPage, { id_user: res[0].id_user, shopDetails: this.shopDetails, userDetails: this.userDetails });
          },
          error =>  this.errorMessage = <any>error);

    }, (err) => {
        console.log('Error: ', err);
    });
  }
  
  checkUser(){
    let data = { "data": this.data, "id_user": this.userDetails[0].id_user };
    this.givepointService.checkUser(data)
      .subscribe(
        res =>{
          this.navCtrl.push(GivePromoPage, { id_user: res[0].id_user, shopDetails: this.shopDetails, userDetails: this.userDetails });
        },
        error =>{ 
          this.errSignin();
          this.errorMessage = <any>error;
        });
  }

  errSignin() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'ไม่พบข้อมูล',
      buttons: ['OK']
    });
    alert.present();
  }

  notice() {
    let profileModal = this.modalCtrl.create(ModalNoticePage);
    this.storage.set('status_bar', 2).then( shop => {
      profileModal.present();
    });
  }

  getUnread() {
    this.givepointService.getUnread(this.userDetails[0].id_user,2)
      .subscribe(
        res => {
          this.unread = res[0].unread;
        },
        error =>  this.errorMessage = <any>error);
  }
}
