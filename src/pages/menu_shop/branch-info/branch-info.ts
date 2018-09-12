import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar, Platform } from 'ionic-angular';

import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker, LatLng } from '@ionic-native/google-maps';
import { BranchPage } from './../branch/branch';
import { AddBranchPage } from './../add-branch/add-branch';

import { ManageAccountServiceProvider } from './../../../providers/manage-account-service/manage-account-service';

@Component({
  selector: 'page-branch-info',
  templateUrl: 'branch-info.html',
})
export class BranchInfoPage {

  locat_lat: number;
  locat_lon: number;
  position: LatLng;
  map: GoogleMap;

  id_branch: number;
  shopDetails: any;

  branch: any;
  errorMessage: string;
  
  @ViewChild(Navbar) navBar: Navbar;

  constructor(public navCtrl: NavController, public navParams: NavParams, private manageAccountServiceProvider: ManageAccountServiceProvider, private platform: Platform) {
    this.id_branch = this.navParams.get('id');
    this.shopDetails = this.navParams.get('shopDetails');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BranchInfoPage');
    this.navBar.backButtonClick = () => {
      this.navCtrl.popToRoot();
    }
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter BranchInfoPage');
    this.platform.ready().then(() =>{
      this.getBranchById(this.navParams.get('id'));
    });
  }

  getBranchById(id){
    this.manageAccountServiceProvider.getBranchById(id)
      .subscribe(
        res => { 
          this.branch = res;
          this.locat_lat = this.branch[0].latitude;
          this.locat_lon = this.branch[0].longitude;
          this.platform.ready().then(() =>{
            this.loadMap();
          });
        },
        error =>  this.errorMessage = <any>error);
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

  // editBanch(){
  //   this.navCtrl.push(AddBranchPage, { shopDetails: this.shopDetails, mode:"edit"});
  // }
}
