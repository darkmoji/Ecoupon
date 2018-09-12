import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { PromoDetailPage } from './../../promo-detail/promo-detail';
import { ModalNoticePage } from './../../modal/modal-notice/modal-notice';
import { ShopDetailPage } from './../shop-detail/shop-detail';

import { PromotionServiceProvider } from './../../../providers/promotion-service/promotion-service';

@Component({
  selector: 'page-promotion',
  templateUrl: 'promotion.html',
})
export class PromotionPage {

  loading: any;

  checkLoad: any;
  userDetails: object;
  type: string;

  typepromo: any;
  promo: object[] = [];
  errorMessage: string;

  dataItems: any;
  items: any;
  showList: boolean;

  unread: any;

  itemDetail: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private promotionService: PromotionServiceProvider, private storage: Storage,
    private modalCtrl: ModalController, private alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromotionPage');
    this.storage.set('menuSelected', 'TabsPage');
    this.storage.get('userData').then((val) => {
      this.userDetails = val;
    });
    this.type = '1';
  }

  ionViewWillEnter() {
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: `Loading Please Wait...`,
    });

    this.loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
  
    this.loading.present();

    console.log('ionViewWillEnter PromotionPage');
    this.promo = [];
    this.getTypePromo();
    this.getUnread();
    this.searchPromo();
    this.checkLoad = 1;
  }

  notice() {
    let profileModal = this.modalCtrl.create(ModalNoticePage);
    this.storage.set('status_bar', 1).then( shop => {
      profileModal.present();
    });
  }
  
  getUnread() {
    this.promotionService.getUnread(this.userDetails[0].id_user,1)
      .subscribe(
        res => {
          this.unread = res[0].unread;
        },
        error =>  this.errorMessage = <any>error);
  }

  getTypePromo() {
    this.promotionService.getTypePromo()
      .subscribe(
        res => {
          this.typepromo = res;
          this.getPromo();
        },
        error => this.errorMessage = <any>error);
  }
  
  getPromo(){
    let count = 1;
    for (let t of this.typepromo){
      this.promotionService.getPromoByType(this.userDetails[0].id_user, t.id_type_promo)
      .subscribe(
        res => {
          if(count == 3){
            this.checkLoad = 2;
            this.loading.dismiss();
          }
          count++;
          this.promo[t.id_type_promo] = res;
        },
        error =>  this.errorMessage = <any>error);
    }
  }

  searchPromo(){
    this.promotionService.searchPromo(this.userDetails[0].id_user)
    .subscribe(
      res => {
        this.dataItems = res;
      },
      error =>  this.errorMessage = <any>error);
  }

  initializeItems() {
    this.items = this.dataItems;
  }

  onInput(ev: any){
    this.initializeItems();

    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.showList = true;
    } else {
      this.showList = false;
    }
  }

  showItem(item){
    this.showList = null;
    this.promotionService.getPromoById(item.id_promo)
      .subscribe(
        res => {
          this.itemDetail = res;
        },
        error =>  this.errorMessage = <any>error);
  }

  showDetail(p){
    this.navCtrl.push(PromoDetailPage, { id: p.id_promo, type: p.id_type_promo, page: 'PromotionPage', userDetails: this.userDetails });
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
            this.usePoint(p);
          }
        }]
    });
    alert.present();
  }

  usePoint(p) {
    this.promotionService.usePoint(p.id_shop, this.userDetails[0].id_user, p.max_point)
      .subscribe(
        res => {
          this.postLog(p);
        },
        error =>  this.errorMessage = <any>error);
  }

  postLog(p){
    let data = { "point": p.max_point, "id_mypromotion": null, "id_member": p.id_member, "id_promo": p.id_promo };
    this.promotionService.postLog(data)
      .subscribe(
        res =>{ 
          this.getPromo();
          this.postNotice(p);
        },
        error => this.errorMessage = <any>error);
  }

  postNotice(p){
    let message = this.userDetails[0].username+" ใช้ "+p.max_point+" แต้ม สำหรับแลกโปรโมชั่นสมาชิก "+p.name_promo;
    let dataPush = null;
    let data = { "message": message, "page": "TransactionShopPage", "data": dataPush, "status_bar": 2, "id_user": p.id_user };
    this.promotionService.postNotice(data)
      .subscribe(
        res =>{
          this.confirmPoint(p);
        },
        error =>{ 
          this.errorMessage = <any>error;
        });
  }

  // getLogUp(id){
  //   this.promotionService.getLogUp(id)
  //     .subscribe(
  //       res =>{ 
  //         this.logup = res;
  //         this.getMypromo2();
  //         this.finish();
  //       },
  //       error => this.errorMessage = <any>error);
  // }

  // finish() {
  //   let alert = this.alertCtrl.create({
  //     title: this.promo[0].name_shop,
  //     subTitle: 'แลกใช้เมื่อ : '+this.logup[0].used_datetime+'\nโปรโมชั่น : '+this.promo[0].name+
  //     '\nรางวัล : '+this.promo[0].name_reward+' '+this.promo[0].quantity_reward+' '+
  //     this.promo[0].unit_reward,
  //     cssClass: 'alertPointCss',
  //     buttons: [
  //       {
  //         text: 'ปิด',
  //         handler: () => {
  //           // this.navCtrl.pop();0
  //         }
  //       }]
  //   });
  //   alert.present();
  // }

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

  member(p){
    this.promotionService.getShop(p.id_shop)
      .subscribe(
        res => {
          this.navCtrl.push(ShopDetailPage, { shop: res[0], userDetails: this.userDetails });
        },
        error =>  this.errorMessage = <any>error);
  }
}