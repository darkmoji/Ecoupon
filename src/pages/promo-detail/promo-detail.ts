import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar, AlertController } from 'ionic-angular';

import { MyCardPage } from './../menu_user/my-card/my-card';
import { ActivityServiceProvider } from './../../providers/activity-service/activity-service';
import { ShopDetailPage } from './../menu_user/shop-detail/shop-detail';

@Component({
  selector: 'page-promo-detail',
  templateUrl: 'promo-detail.html',
})
export class PromoDetailPage {

  page: string;
  userDetails: object;
  id_promo: number;
  type: number;

  promo: any;
  con: any;
  bl: any;
  mypromo: any;

  logup: any;

  errorMessage: string;
  
  @ViewChild(Navbar) navBar: Navbar;

  constructor(public navCtrl: NavController, public navParams: NavParams, private activityService: ActivityServiceProvider,
    private alertCtrl: AlertController) {

      this.page = this.navParams.get('page');
      this.id_promo = this.navParams.get('id');
      this.type = this.navParams.get('type');
      this.userDetails = this.navParams.get('userDetails');

      this.getMypromo();
      this.getPromoById();
      this.getDeCon();
      this.getbranchLimited();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromoDetailPage');
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

  getMypromo(){
    this.activityService.getMypromo(this.id_promo, this.userDetails[0].id_user)
      .subscribe(
        res => this.mypromo = res,
        error => this.errorMessage = <any>error);
  }

  getPromoById(){
    this.activityService.getPromoById(this.id_promo)
      .subscribe(
        res => this.promo = res,
        error =>  this.errorMessage = <any>error);
  }

  conMyPromo() {
    let alert = this.alertCtrl.create({
      title: 'การรับโปรโมชัน',
      subTitle: 'ยืนยันการรับโปรโมชัน',
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
            this.postMyPromo();
          }
        }]
    });
    alert.present();
  }

  postMyPromo(){
    let data = { id_promo: this.id_promo, id_user: this.userDetails[0].id_user };
    this.activityService.postMypromo(data)
      .subscribe(
        res => {
          this.finish();
        }, error =>  this.errorMessage = <any>error);
  }

  // postNotice(){
  //   let message = "ได้รับ"+this.promo[0].name_tp+this.promo[0].name+" จาก "+this.promo[0].name_shop;
  //   let dataPush = "{\"id\":\""+this.id_promo+"\",\"type\":\""+this.type+"\"}";
  //   let data = { "message": message, "page": "PromoDetailPage", "data": dataPush, "id_user": this.userDetails[0].id_user };
  //   this.activityService.postNotice(data)
  //     .subscribe(
  //       res =>{
  //         this.finish();
  //       },
  //       error =>{ 
  //         this.errorMessage = <any>error;
  //       });
  // }

  finish() {
    let alert = this.alertCtrl.create({
      title: 'การรับโปรโมชัน',
      subTitle: 'คุณได้รับสิทธิ์เรียบร้อยแล้ว',
      cssClass: 'alertPointCss',
      buttons: [
        {
          text: 'ปิด',
          handler: () => {
            this.navCtrl.pop();
          }
        }]
    });
    alert.present();
  }

  conUsePromo() {
    let alert = this.alertCtrl.create({
      subTitle: 'ยืนยันการใช้สิทธิ์',
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
            this.usePoint();
          }
        }]
    });
    alert.present();
  }

  usePoint(){
    let data = { "point": null, "id_mypromotion": this.mypromo[0].id_mypromotion, "id_member": null };
    this.activityService.usePoint(data)
      .subscribe(
        res =>{ 
          this.postNotice();
          this.getLogUp(res);
        },
        error => this.errorMessage = <any>error);
  }

  postNotice(){
    let message = this.userDetails[0].username+" ใช้สิทธ์สำหรับแลกโปรโมชั่น "+this.promo[0].name;
    let dataPush = null;
    let data = { "message": message, "page": "TransactionShopPage", "data": dataPush, "status_bar": 2, "id_user": this.promo[0].id_user };
    this.activityService.postNotice(data)
      .subscribe(
        res =>{
        },
        error =>{ 
          this.errorMessage = <any>error;
        });
  }

  getLogUp(id){
    this.activityService.getLogUp(id)
      .subscribe(
        res =>{ 
          this.logup = res;
          this.finish2();
        },
        error => this.errorMessage = <any>error);
  }

  finish2() {
    let reward: any;
    if(this.promo[0].discount){
      if(this.promo[0].type_discount==1){

        this.promo[0].type_discount = "%";
      }else{
        this.promo[0].type_discount = " บาท";
      }

      if(this.promo[0].name_reward){
        reward = 'รางวัล : ส่วนลด'+this.promo[0].name_reward+' '+this.promo[0].discount+
        this.promo[0].type_discount;
      }else{
        reward = 'รางวัล : ส่วนลด '+this.promo[0].discount+this.promo[0].type_discount;
      }
    }else{
      reward = 'รางวัล : '+this.promo[0].name_reward+' '+this.promo[0].quantity_reward+' '+
      this.promo[0].unit_reward;
    }

    let alert = this.alertCtrl.create({
      title: this.promo[0].name_shop,
      subTitle: 'แลกใช้เมื่อ : '+this.logup[0].used_datetime+'\nโปรโมชั่น : '+this.promo[0].name+
      '\n'+reward,
      cssClass: 'alertPointCss',
      buttons: [
        {
          text: 'ปิด',
          handler: () => {
            this.navCtrl.setRoot(MyCardPage);
          }
        }]
    });
    alert.present();
  }

  goShop(){
    this.activityService.getShop(this.promo[0].id_shop)
    .subscribe(
      res =>{ 
        this.navCtrl.push(ShopDetailPage, { shop: res[0], userDetails: this.userDetails });
      },
      error => this.errorMessage = <any>error);
  }
}
