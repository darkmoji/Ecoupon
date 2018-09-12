import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';

import { PromoDetailShopPage } from './../../promo-detail-shop/promo-detail-shop';

import { ManagePromoServiceProvider } from './../../../providers/manage-promo-service/manage-promo-service';

@Component({
  selector: 'page-add-promo',
  templateUrl: 'add-promo.html',
})
export class AddPromoPage {

  shopDetails: object;

  createForm: FormGroup;
  selectOptions: any;


  base64Image: any;

  promoType: any;
  typeAp: any;
  branches: any;
  typepromo: any;
  conditions: any;
  ap: any;
  errorMessage: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
    private camera: Camera, private storage: Storage, private loadingCtrl: LoadingController, 
    private managePromoServiceProvider: ManagePromoServiceProvider) {
    this.createForm = this.formBuilder.group({
      name_promo: ['', Validators.required],
      type_promo: ['', Validators.required],
      start_datetime: ['', Validators.required],
      end_datetime: ['', Validators.required],

      type_reward: ['', Validators.required],
      discount: [''],
      name_reward: [''],
      price_reward: [''],
      quantity_reward: [''],
      unit_reward: [''],
      description_reward: [''],
      type_discount: [''],
      max_point: [''],
      image: [''],

      condition: ['', Validators.required],
      other_con: [''],
      branch_limit: [''],

      id_tap: ['', Validators.required],

      id_shop: [''],
    });

    this.shopDetails = this.navParams.get('shopDetails');

    this.selectOptions = {
      title: 'เงื่อนไขโปรโมชั่น',
      subTitle: 'เลือกเงื่อนไขได้มากกว่า 1 ข้อ',
      cssClass: 'alertCustomCss'
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPromoPage');
    this.getBranchesByShop(this.shopDetails[0].id_shop);
    this.getTypePromo();
    this.getConditions();
    this.getTypeAp();
  }

  clickType(){
    if(this.promoType == 3){
      this.ap = 1;
    }else{
      this.ap = [];
    }
  }

  getphoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetHeight: 500,
      targetWidth: 850
    };

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
    });
  }

  getConditions() {
    this.managePromoServiceProvider.getConditions()
      .subscribe(
        res => this.conditions = res,
        error =>  this.errorMessage = <any>error);
  }

  getTypePromo() {
    this.managePromoServiceProvider.getTypePromo()
      .subscribe(
        res => this.typepromo = res,
        error =>  this.errorMessage = <any>error);
  }

  getBranchesByShop(id) {
    this.managePromoServiceProvider.getBranchesByShop(id)
      .subscribe(
        res =>{
           this.branches = res
          },
        error =>  this.errorMessage = <any>error);
  }

  getTypeAp() {
    this.managePromoServiceProvider.getTypeAp()
      .subscribe(
        res => this.typeAp = res,
        error =>  this.errorMessage = <any>error);
  }

  createPromo(){
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: `Loading Please Wait...`,
      duration: 8000
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
  
    loading.present();

    this.createForm.value.id_shop = this.shopDetails[0].id_shop;
    this.createForm.value.image = this.base64Image;
    let data = this.createForm.value;
    this.managePromoServiceProvider.postPromo(data)
      .subscribe(
        res => {
          loading.dismiss();
          this.navCtrl.push(PromoDetailShopPage, { id: res, type: this.createForm.value.type_promo, page: "AddPromoPage"});
        }, error => this.errorMessage = <any>error);
  }

}
