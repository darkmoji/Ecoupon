import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { ActivityServiceProvider } from './../../providers/activity-service/activity-service';

@Component({
  selector: 'page-promo-detail2',
  templateUrl: 'promo-detail2.html',
})
export class PromoDetail2Page {

  page: string;
  userDetails: object;
  id_promo: number;
  type: number;
  page_point: boolean;

  promo: any;
  con: any;
  bl: any;
  mypromo: any;
  check_point: number;

  point: number[] = [];
  row: number[] = [];
  mark_row: number;
  mark_col: number;

  logup: any;

  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private activityService: ActivityServiceProvider,
    private alertCtrl: AlertController) {

      this.page = this.navParams.get('page');
      this.id_promo = this.navParams.get('id');
      this.type = this.navParams.get('type');

      this.userDetails = this.navParams.get('userDetails');

      this.getMypromo();
      this.getDeCon();
      this.getbranchLimited();
      this.getPromoById();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromoDetail2Page');
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

  getMypromo2(){
    this.activityService.getMypromo(this.id_promo, this.userDetails[0].id_user)
      .subscribe(
        res =>{ 
          this.mypromo = res;
          this.calStar();
        },
        error => this.errorMessage = <any>error);
  }

  getPromoById(){
    this.activityService.getPromoById(this.id_promo)
      .subscribe(
        res =>{ 
          this.promo = res; 
          this.calStar();
        },
        error =>  this.errorMessage = <any>error);
  }

  calStar(){
    this.point = [];
    this.row = [];
    let p = this.mypromo[0].point;
    let max = this.promo[0].max_point;

    if(parseInt(p)>=parseInt(max)){
      this.check_point = 1;
    }else{ 
      this.check_point = 2;
    }

    if(this.promo[0].max_point%5==0){
      this.mark_row = p/5;
      this.mark_col = p%5;

      for(let i = 0; i < 5; i++){
        this.point.push(1);
      } 
      for(let x = 0; x < this.promo[0].max_point/5; x++){
        this.row.push(1);
      }
    }

    else if(this.promo[0].max_point%3==0){
      this.mark_row = p/3;
      this.mark_col = p%3;

      for(let i = 0; i < 3; i++){
        this.point.push(1);
      } 
      for(let x = 0; x < this.promo[0].max_point/3; x++){
        this.row.push(1);
      }
    }
  }

  conMyPromo() {
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
    let data = { "point": this.promo[0].max_point, "id_mypromotion": this.mypromo[0].id_mypromotion, "id_member": null };
    this.activityService.usePoint(data)
      .subscribe(
        res =>{ 
          this.postNotice();
          this.getLogUp(res);
        },
        error => this.errorMessage = <any>error);
  }

  postNotice(){
    let message = this.userDetails[0].username+" ใช้ "+this.promo[0].max_point+" แต้ม สำหรับแลกโปรโมชั่น "+this.promo[0].name;
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
          this.getMypromo2();
          this.finish();
        },
        error => this.errorMessage = <any>error);
  }

  finish() {
    let alert = this.alertCtrl.create({
      title: this.promo[0].name_shop,
      subTitle: 'แลกใช้เมื่อ : '+this.logup[0].used_datetime+'\nโปรโมชั่น : '+this.promo[0].name+
      '\nรางวัล : '+this.promo[0].name_reward+' '+this.promo[0].quantity_reward+' '+
      this.promo[0].unit_reward,
      cssClass: 'alertPointCss',
      buttons: [
        {
          text: 'ปิด',
          handler: () => {
            // this.navCtrl.pop();0
          }
        }]
    });
    alert.present();
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

}
