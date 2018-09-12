import { NavInnerComponent } from './../../../components/nav-inner/nav-inner';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { PromoDetailPage } from './../../promo-detail/promo-detail';
import { ProfilePage } from './../profile/profile';

import { FindshopServiceProvider } from './../../../providers/findshop-service/findshop-service';

@Component({
  selector: 'page-shop-detail',
  templateUrl: 'shop-detail.html',
})
export class ShopDetailPage {

  userDetails: object;
  shop: any;

  logo: string;
  name: string;
  id_shop: number;
  type: string;

  checkMem: number;

  typepromo: any;
  promo: object[] = [];
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private findshopService: FindshopServiceProvider, 
    private alertCtrl: AlertController) {
    this.userDetails = this.navParams.get('userDetails');
    this.shop = this.navParams.get('shop');
    this.logo = this.shop.logo;
    this.name = this.shop.name;
    this.id_shop = this.shop.id_shop;
    
    this.type = '1';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopDetailPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter ShopDetailPage');
    this.promo = [];
    this.getTypePromo();
    this.checkMember();
  }

  getTypePromo() {
    this.findshopService.getTypePromo()
      .subscribe(
        res => {
          this.typepromo = res;
          this.getPromo();
        },
        error =>  this.errorMessage = <any>error);
  }

  getPromo(){
    for (let t of this.typepromo){
      this.findshopService.getPromo(this.id_shop, t.id_type_promo, this.userDetails[0].id_user)
      .subscribe(
        res => {
          this.promo[t.id_type_promo] = res;
        },
        error =>  this.errorMessage = <any>error);
    }
  }

  showDetail(p){
    this.navCtrl.push(PromoDetailPage,{ id: p.id_promo, type: p.id_type_promo, page: 'ShopDetailPage', userDetails: this.userDetails});
  }

  checkMember(){
    this.checkMem = 1;
    this.findshopService.checkMember(this.shop.id_shop, this.userDetails[0].id_user)
      .subscribe(
        res => {
          this.checkMem = 2;
        }, error => this.errorMessage = <any>error);
  }

  member(){
    let data = { id_shop: this.id_shop, id_user: this.userDetails[0].id_user };
    this.findshopService.postMember(data)
      .subscribe(
        res => {
          this.getPromo();
          this.checkMem = 2;
        }, error => this.errorMessage = <any>error);
  }

  // deleteMember(){
  //   this.findshopService.deleteMember(this.shop.id_shop, this.userDetails[0].id_user)
  //     .subscribe(
  //       res => {
  //         this.checkMem = 1;
  //       }, error => this.errorMessage = <any>error);
  // }

  profile(){
    this.navCtrl.push(ProfilePage,{ shop: this.shop });
  }

  conMember() {
    let alert = this.alertCtrl.create({
      subTitle: 'ยืนยันการสมัครสมาชิก',
      cssClass: 'alertChoiceCss',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            console.log('Agree clicked');
            this.member();
          }
        }]
    });
    alert.present();
  }

  userPoint(p) {
    this.findshopService.usePoint(p.id_shop, this.userDetails[0].id_user, p.max_point)
      .subscribe(
        res => {
          this.getPromo();
          this.confirmPoint(p);
        },
        error =>  this.errorMessage = <any>error);
  }

  confirmPoint(p) {
    let alert = this.alertCtrl.create({
      subTitle: 'คะแนนสะสมของร้าน '+p.name_shop+' คงเหลือ '+(p.point-p.max_point)+' แต้ม',
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

  conUsePoint(p) {
    let alert = this.alertCtrl.create({
      subTitle: 'ยืนยันการแลกของรางวัลชิ้นนี้',
      cssClass: 'alertChoiceCss',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            console.log('Agree clicked');
            this.userPoint(p);
          }
        }]
    });
    alert.present();
  }
}
