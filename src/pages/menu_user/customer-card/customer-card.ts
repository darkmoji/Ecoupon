import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-customer-card',
  templateUrl: 'customer-card.html',
})
export class CustomerCardPage {

  userDetails: any;
  
  gender: string;
  qrData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
    private barcodeScanner: BarcodeScanner) {
      this.userDetails = this.navParams.get('userDetails');
      this.qrData = this.userDetails[0].id_user;
      if(this.userDetails[0].gender==1){
        this.gender = 'หญิง'
      } else {
        this.gender = 'ชาย'
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerCardPage');
  }
 
  // scanCode() {
  //   this.barcodeScanner.scan().then(barcodeData => {
  //     this.scannedCode = barcodeData.text;
  //   }, (err) => {
  //       console.log('Error: ', err);
  //   });
  // }

}
