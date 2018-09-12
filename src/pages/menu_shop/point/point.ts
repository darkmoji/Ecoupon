import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { GivePointPage } from './../give-point/give-point';

import { GivepointServiceProvider } from './../../../providers/givepoint-service/givepoint-service';

@Component({
  selector: 'page-point',
  templateUrl: 'point.html',
})
export class PointPage {

  user: object;
  shopDetails: object;
  userDetails: object;
  promoDetails: object;
  member: object;

  point: number;

  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, 
    private givepointService: GivepointServiceProvider) {
    
    if(this.navParams.get('mode')=="member"){
      this.user = this.navParams.get('user');
      this.shopDetails = this.navParams.get('shopDetails');
      this.userDetails = this.navParams.get('userDetails');
      this.member = this.navParams.get('member');
    }else if(this.navParams.get('mode')=="promo"){
      this.user = this.navParams.get('user');
      this.shopDetails = this.navParams.get('shopDetails');
      this.userDetails = this.navParams.get('userDetails');
      this.promoDetails = this.navParams.get('promoDetails');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PointPage');
  }

  givepoint(){
    if(this.promoDetails){
      let data = { "point": this.point, "id_mypromotion": this.promoDetails[0].id_mypromotion, "id_user": this.userDetails[0].id_user };
      this.givepointService.postPoint(data)
      .subscribe(
        res =>{
          this.postNotice(this.point);
        },
        error =>{ 
          this.errorMessage = <any>error;
        });
    }else if(this.member){
      let data = { "point": this.point, "id_member": this.member[0].id_member, "id_user": this.userDetails[0].id_user };
      this.givepointService.postMemPoint(data)
      .subscribe(
        res =>{
          this.postNotice(this.point);
        },
        error =>{ 
          this.errorMessage = <any>error;
        });
    }
  }

  postNotice(p){
    let message: any;
    let dataPush: any;
    let data: any;

    if(this.promoDetails){
      message = "ได้รับ "+p+" แต้ม จาก "+this.shopDetails[0].name;
      dataPush = "{\"id\":\""+this.promoDetails[0].id_promo+"\",\"type\":\""+this.promoDetails[0].id_type_promo+"\"}";
      data = { "message": message, "page": "PromoDetailPage", "data": dataPush, "id_user": this.user[0].id_user };
    }else if(this.member){
      message = "ได้รับคะแนนสมาชิก "+p+" แต้ม จาก "+this.shopDetails[0].name;
      dataPush = null;
      data = { "message": message, "page": "MyCardPage", "data": dataPush, "status_bar": 1, "id_user": this.user[0].id_user };
    }
    this.givepointService.postNotice(data)
      .subscribe(
        res =>{
          this.confirmPoint();
        },
        error =>{ 
          this.errorMessage = <any>error;
        });
  }

  confirmPoint() {
    let alert = this.alertCtrl.create({
      title: 'คะแนนลูกค้า',
      subTitle: 'ให้คะแนนสำเร็จ',
      cssClass: 'alertPointCss',
      buttons: [
        {
          text: 'ปิด',
          handler: () => {
            this.navCtrl.push(GivePointPage);
          }
        }]
    });
    alert.present();
  }

  click_btn(p){
    this.conUsePoint(p);
  }

  conUsePoint(p) {
    let alert = this.alertCtrl.create({
      subTitle: 'ยืนยันการให้ '+p+' คะแนน',
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
            this.click_point(p);
          }
        }]
    });
    alert.present();
  }

  click_point(p){

    if(this.promoDetails){
      let data = { "point": p, "id_mypromotion": this.promoDetails[0].id_mypromotion, "id_user": this.userDetails[0].id_user };
      this.givepointService.postPoint(data)
        .subscribe(
          res =>{
            this.postNotice(p);
          },
          error =>{ 
            this.errorMessage = <any>error;
        });
    }else if(this.member){
      let data = { "point": p, "id_member": this.member[0].id_member, "id_user": this.userDetails[0].id_user };
      this.givepointService.postMemPoint(data)
      .subscribe(
        res =>{
          this.postNotice(p);
        },
        error =>{ 
          this.errorMessage = <any>error;
        });
    }
  }

}
