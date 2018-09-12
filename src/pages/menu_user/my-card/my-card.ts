import { NavEcComponent } from './../../../components/nav-ec/nav-ec';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { PromoDetailPage } from './../../promo-detail/promo-detail';
import { PromoDetail2Page } from './../../promo-detail2/promo-detail2';
import { ModalNoticePage } from './../../modal/modal-notice/modal-notice';

import { CustomerCardPage } from './../customer-card/customer-card';

import { MycardServiceProvider } from './../../../providers/mycard-service/mycard-service';

@Component({
  selector: 'page-my-card',
  templateUrl: 'my-card.html',
})
export class MyCardPage {

  userDetails: object;
  type: string;

  member: any;
  typepromo: any;
  mypromo: object[] = [];
  mypromoAll: any;
  errorMessage: string;

  unread: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mycardServiceProvider: MycardServiceProvider,
    private storage: Storage, private modalCtrl: ModalController) {
      this.type = '1';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCardPage');
    this.getTypePromo(); 
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter MyCardPage');  
    this.storage.get('userData').then((val) => {
      this.userDetails = val;
      this.mypromoAll = [];
      this.getMypromo(); 
      this.getMemberAll();
      this.getUnread();
    });
  }

  getTypePromo() {
    this.mycardServiceProvider.getTypePromo()
      .subscribe(
        res => {
          this.typepromo = res;
        },
        error =>  this.errorMessage = <any>error);
  }

  getMemberAll() {
    this.mycardServiceProvider.getMemberAll(this.userDetails[0].id_user)
      .subscribe(
        res => {
          this.member = res;
        },
        error =>  this.errorMessage = <any>error);
  }
  
  getMypromo(){

    // for (let t of this.typepromo){
    //   this.mycardServiceProvider.getMypromoByType(this.userDetails[0].id_user, t.id_type_promo)
    //   .subscribe(
    //     res => {
    //       this.mypromo[t.id_type_promo] = res;
    //     },
    //     error =>  this.errorMessage = <any>error);
    // }

    this.mycardServiceProvider.getMypromoAll(this.userDetails[0].id_user)
      .subscribe(
        res => {
          this.mypromoAll = res;
          
          let slot1 = [];
          let slot2 = [];
          let slot3 = [];

          for (let m of this.mypromoAll){
            if(m.id_type_promo == 1){
              slot1.push(m);
              this.mypromo[m.id_type_promo] = slot1;
            }else if(m.id_type_promo == 2){
              slot2.push(m);
              this.mypromo[m.id_type_promo] = slot2;
            }else if(m.id_type_promo == 3){
              slot3.push(m);
              this.mypromo[m.id_type_promo] = slot3;
            }
          }
        },
        error =>  this.errorMessage = <any>error);
  }


  getUnread() {
    this.mycardServiceProvider.getUnread(this.userDetails[0].id_user,1)
      .subscribe(
        res => {
          this.unread = res[0].unread;
        },
        error =>  this.errorMessage = <any>error);
  }

  notice() {
    let profileModal = this.modalCtrl.create(ModalNoticePage);
    this.storage.set('status_bar', 1).then( shop => {
      profileModal.present();
    });
  }
  
  showDetail(p){
    if(p.id_type_promo==2){
      this.navCtrl.push(PromoDetail2Page, { id: p.id_promo, type: p.id_type_promo, page: 'MyCardPage', userDetails: this.userDetails });
    }else if(p.id_type_promo==1){
      this.navCtrl.push(PromoDetailPage, { id: p.id_promo, type: p.id_type_promo, page: 'MyCardPage', userDetails: this.userDetails });
    }
  }

  showCard(){
    this.navCtrl.push(CustomerCardPage, { userDetails: this.userDetails });
  }

}
