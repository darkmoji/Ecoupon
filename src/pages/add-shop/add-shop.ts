import { Component } from '@angular/core';
import { NavController, NavParams, App, Platform } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup , FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'; 
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker, LatLng } from '@ionic-native/google-maps';

import { TabShopPage } from './../tab-shop/tab-shop';

import { ActivityServiceProvider } from './../../providers/activity-service/activity-service';

@Component({
  selector: 'page-add-shop',
  templateUrl: 'add-shop.html',
})
export class AddShopPage {

  locat_lat: number;
  locat_lon: number;

  position: LatLng;

  createForm: FormGroup;
  map: GoogleMap;
  id_user: number;
  
  res: any;
  typeshop: any;
  base64Image: any;

  menu: any;
  shopDetails: any;
  mode: any;

  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, 
    private activityServiceProvider: ActivityServiceProvider, private storage: Storage,
    private camera: Camera, public app: App, private loadingCtrl: LoadingController, private geolocation: Geolocation, private platform: Platform){
      storage.get('userData').then((val) => {
      this.id_user = val[0].id_user;
    });

    if(this.navParams.get('shopDetails')){
      this.menu = "แก้ไขร้านค้า";
      this.shopDetails = this.navParams.get('shopDetails');
      this.mode = this.navParams.get('mode');

      this.createForm = this.formBuilder.group({
        name: [this.shopDetails[0].name, Validators.required],
        tel: [this.shopDetails[0].tel, Validators.required],
        email: [this.shopDetails[0].email],
        address: [this.shopDetails[0].address, Validators.required],
        latitude: [this.shopDetails[0].latitude],
        longitude: [this.shopDetails[0].longitude],
        logo: [this.shopDetails[0].logo],
        id_user: [this.shopDetails[0].id_user],
        id_type_shop: [this.shopDetails[0].id_type_shop, Validators.required]
      });

      this.locat_lat = this.shopDetails[0].latitude;
      this.locat_lon = this.shopDetails[0].longitude;

      this.base64Image = this.shopDetails[0].logo;

    }else{
      this.menu = "สร้างร้านค้า";
      this.createForm = this.formBuilder.group({
        name: ['', Validators.required],
        tel: ['', Validators.required],
        email: [''],
        address: ['', Validators.required],
        latitude: [''],
        longitude: [''],
        logo: [''],
        id_user: [''],
        id_type_shop: ['', Validators.required],
        id_shop: ['']
      });
  
      this.locat_lat = 13.7563;
      this.locat_lon = 100.5018;

      this.mode = 'add';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddShopPage');
    this.getTypeshop();

    this.platform.ready().then(() =>{
      this.loadMap();
    });
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
      targetWidth: 500
    };

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
    });
  }

  getTypeshop() {
    this.activityServiceProvider.getTypeshop()
      .subscribe(
        res => this.typeshop = res,
        error =>  this.errorMessage = <any>error);
  }

  createShop(){
    if(this.mode=='add'){
      this.createForm.value.id_user = this.id_user;
      this.createForm.value.logo = this.base64Image;
      this.createForm.value.latitude = this.locat_lat;
      this.createForm.value.longitude = this.locat_lon;
      let data = this.createForm.value;
      this.activityServiceProvider.postShop(data)
        .subscribe(
          res => {
            this.activityServiceProvider.getShopById(this.id_user)
            .subscribe(
              res => {
                let shop = res;
                this.storage.set('shopData', shop).then( shop => {
                  const nav = this.app.getRootNav();
                  nav.push(TabShopPage);
                });
              });
          }, error =>  this.errorMessage = <any>error);
    }else if(this.mode=='edit'){
      this.createForm.value.id_shop = this.shopDetails[0].id_shop;
      this.createForm.value.logo = this.base64Image;
      this.createForm.value.latitude = this.locat_lat;
      this.createForm.value.longitude = this.locat_lon;
      let data = this.createForm.value;
      this.activityServiceProvider.editShop(data)
        .subscribe(
          res => {
            this.activityServiceProvider.getShopById(this.id_user)
            .subscribe(
              res => {
                let shop = res;
                this.storage.set('shopData', shop).then( shop => {
                  this.navCtrl.pop();
                });
              });
          }, error => this.errorMessage = <any>error);
    }
  }

  getPosition(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.locat_lat = resp.coords.latitude;
      this.locat_lon = resp.coords.longitude;

      var data = {
        lat: this.locat_lat,
        lng: this.locat_lon
      };

      this.map.setCameraTarget(data);

      this.map.addMarker({
        icon: 'red',
        animation: 'DROP',
        draggable: true,
        position: {
          lat: this.locat_lat,
          lng: this.locat_lon
        },
      });        
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.locat_lat,
          lng: this.locat_lon
        },
        zoom: 13,
        tilt: 30
      },
      controls: {
        compass: true,
        myLocationButton: true
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.

        this.map.addMarker({
          icon: 'red',
          animation: 'DROP',
          draggable: true,
          position: {
            lat: this.locat_lat,
            lng: this.locat_lon
          },
        });

        this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
          (data) => {

            this.locat_lat = data[0].lat;
            this.locat_lon = data[0].lng;

            this.map.clear();
            this.map.addMarker({
              icon: 'red',
              animation: 'DROP',
              draggable: true,
              position: {
                lat: this.locat_lat,
                lng: this.locat_lon
              },
            });
          }
        );

        this.map.on(GoogleMapsEvent.MY_LOCATION_BUTTON_CLICK).subscribe(
          (data) => {
            this.map.clear().then(() => {
              this.getPosition();
            });
          }
        );

        // this.map.addMarker({
        //   icon: 'red',
        //   animation: 'DROP',
        //   draggable: true,
        //   position: {
        //     lat: this.locat_lat,
        //     lng: this.locat_lon
        //   },
        // })
        // .then(marker => {
        //   marker.showInfoWindow();
        //   marker.on(GoogleMapsEvent.MARKER_CLICK)
        //     .subscribe(() => {
        //       alert('clicked');
        //     });
        // });
      });
  }
}
