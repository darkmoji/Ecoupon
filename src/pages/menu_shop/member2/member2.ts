import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-member2',
  templateUrl: 'member2.html',
})
export class Member2Page {

  userDetails: any;
  gender: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userDetails = this.navParams.get('member');
    if(this.userDetails[0].gender==1){
      this.gender = 'หญิง';
    } else {
      this.gender = 'ชาย';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Member2Page');
  }

}
