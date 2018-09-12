import { Validators } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ActionSheetController, AlertController } from 'ionic-angular';

import { DataServiceProvider } from './../../../providers/data-service/data-service';

@Component({
  selector: 'page-typeshop',
  templateUrl: 'typeshop.html',
})
export class TypeshopPage {

  typeshop: any;

  errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataServiceProvider: DataServiceProvider,
    private actionSheetCtrl: ActionSheetController, private platform: Platform, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TypeshopPage');
    this.getTypeShop();
  }

  getTypeShop() {
    this.dataServiceProvider.getTypeShop()
      .subscribe(
        res =>{
           this.typeshop = res;
          },
        error =>  this.errorMessage = <any>error);
  }

  editTypeShop(n,t) {
    let data = { name: n, id_type_shop: t.id_type_shop };
    this.dataServiceProvider.editTypeShop(data)
      .subscribe(
        res =>{
            this.getTypeShop();
          },
        error => this.errorMessage = <any>error);
  }

  activeTypeShop(t) {
    let data;
    if(t.status==1){
      data = { status: 2, id_type_shop: t.id_type_shop };
    }else{
      data = { status: 1, id_type_shop: t.id_type_shop };
    }
    this.dataServiceProvider.activeTypeShop(data)
      .subscribe(
        res =>{
            this.getTypeShop();
          },
        error => this.errorMessage = <any>error);
  }

  action(t) {
    let status: string;
    if(t.status==1){
      status = 'inactive';
    }else{
      status = 'active';
    }

    let actionSheet = this.actionSheetCtrl.create({
      title: t.name,
      buttons: [
        {
          text: status,
          icon: !this.platform.is('ios') ? 'switch' : null,
          handler: () => {
            this.activeTypeShop(t);
          }
        },
        {
          text: 'แก้ไข',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            this.showEdit(t);
          }
        },
        {
          text: 'ยกเลิก',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();
  }

  showEdit(t) {
    let confirm = this.alertCtrl.create({
      
      title: t.name,
      cssClass: 'alertChoice2Css',
      inputs: [
        {
          name: 'name',
          placeholder: 'แก้ไขข้อความ'
        },
      ],
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'แก้ไข',
          handler: data => {
            this.editTypeShop(data.name,t); 
          }
        }
      ]
    });
    confirm.present();
  }

  showAdd() {
    let confirm = this.alertCtrl.create({
      
      title: 'เพิ่มประเภทร้านค้า',
      cssClass: 'alertChoice2Css',
      inputs: [
        {
          name: 'name',
          placeholder: 'กรอกชื่อประเภทร้านค้า'
        },
      ],
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'สร้าง',
          handler: data => {
            this.add(data.name); 
          }
        }
      ]
    });
    confirm.present();
  }

  add(n) {
    let data = { name: n };
    this.dataServiceProvider.addTypeShop(data)
      .subscribe(
        res =>{
            this.getTypeShop();
          },
        error => this.errorMessage = <any>error);
  }
}
