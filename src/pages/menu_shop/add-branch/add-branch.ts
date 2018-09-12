import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup , FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation'; 
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker, LatLng } from '@ionic-native/google-maps';

import { BranchInfoPage } from './../branch-info/branch-info';

import { ManageAccountServiceProvider } from './../../../providers/manage-account-service/manage-account-service';

@Component({
  selector: 'page-add-branch',
  templateUrl: 'add-branch.html',
})
export class AddBranchPage {

  locat_lat: number;
  locat_lon: number;
  position: LatLng;
  map: GoogleMap;

  shopDetails: object;

  createForm : FormGroup;

  mode: any;
  
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, 
    private storage: Storage, private manageAccountServiceProvider: ManageAccountServiceProvider, private geolocation: Geolocation, private platform: Platform) {
      this.shopDetails = this.navParams.get('shopDetails');
      
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      tel: ['', Validators.required],
      email: [''],
      address: ['', Validators.required],
      latitude: [''],
      longitude: [''],
      id_shop: [''],
    });

    this.locat_lat = 13.7563;
    this.locat_lon = 100.5018;

    this.mode = 'add';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddBranchPage');

    this.platform.ready().then(() =>{
      this.loadMap();
    });
  }

  createBranch(){
    this.createForm.value.id_shop = this.shopDetails[0].id_shop;
    let data = this.createForm.value;
    this.manageAccountServiceProvider.postBranch(data)
      .subscribe(
        res => { 
          this.navCtrl.push(BranchInfoPage, { id: res });
        }, error =>  this.errorMessage = <any>error);
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
      });
  }
}
