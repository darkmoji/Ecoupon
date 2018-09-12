import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker, LatLng } from '@ionic-native/google-maps';

import { AddShopPage } from './../../add-shop/add-shop';

@Component({
  selector: 'page-shop-info',
  templateUrl: 'shop-info.html',
})
export class ShopInfoPage {

  shopDetails: object;

  locat_lat: number;
  locat_lon: number;
  position: LatLng;
  map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopInfoPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AccountPage');
    this.storage.get('shopData').then((val) => {
      this.shopDetails = val;
      this.locat_lat = this.shopDetails[0].latitude;
      this.locat_lon = this.shopDetails[0].longitude;
      
      this.platform.ready().then(() =>{
        this.loadMap();
      });
    });
  }

  editshop(){
    this.navCtrl.push(AddShopPage, { shopDetails: this.shopDetails, mode:"edit"});
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
        compass: true
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
          position: {
            lat: this.locat_lat,
            lng: this.locat_lon
          },
        });
      });
  }

}
