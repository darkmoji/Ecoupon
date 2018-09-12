import { PointPage } from './../point/point';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GivepointServiceProvider } from './../../../providers/givepoint-service/givepoint-service';

@Component({
  selector: 'page-give-promo',
  templateUrl: 'give-promo.html',
})
export class GivePromoPage {

  id_user: number;
  shopDetails: object;
  userDetails: object;

  promoShop: any;
  errorMessage: string;
  user: any;
  member: any;

  s_member: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private givepointService: GivepointServiceProvider) {
    this.id_user = this.navParams.get('id_user');
    this.shopDetails = this.navParams.get('shopDetails');
    this.userDetails = this.navParams.get('userDetails');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GivePromoPage');
    this.getMypromoShop();
    this.getUser();
    this.getMember();
  }

  getMypromoShop(){
    this.givepointService.getMypromoShop(this.shopDetails[0].id_shop, this.id_user)
    .subscribe(
      res => {
        this.promoShop = res;
      },
      error =>  this.errorMessage = <any>error);
  }

  getUser(){
    this.givepointService.getUser(this.id_user)
    .subscribe(
      res => {
        this.user = res;
      },
      error =>  this.errorMessage = <any>error);
  }

  getMember(){
    this.givepointService.getMember(this.shopDetails[0].id_shop, this.id_user)
    .subscribe(
      res => {
        this.member = res;
        this.s_member = "สมาชิก";
      },
      error =>{
        this.errorMessage = <any>error;
        this.s_member = "ลูกค้าทั่วไป";
      });
  }
  
  givepoint(p){
    this.navCtrl.push(PointPage, { user: this.user, shopDetails: this.shopDetails, userDetails: this.userDetails,
    promoDetails: [p], mode: "promo"});
  }

  giveMempoint(){
    this.navCtrl.push(PointPage, { user: this.user, shopDetails: this.shopDetails, userDetails: this.userDetails,
      member: this.member, mode: "member"});
  }


  // givepoint(p){
  //   this.navCtrl.push(PointPage, { id_user: this.id_user, user_name: this.userDetails[0].name, 
  //     user_surname: this.userDetails[0].surname, id_promo: p.id_promo, promo_name: this.promoShop[0].name,
  //      id_shop: this.id_shop, id_userGp: this.id_userGp });
  // }
}
