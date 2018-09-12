import { Component , ViewChild ,ElementRef } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation'; 
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { LoadingController } from 'ionic-angular';

import { FindshopServiceProvider } from './../../../providers/findshop-service/findshop-service';

@Component({
  selector: 'page-find-shopmap',
  templateUrl: 'find-shopmap.html',
})
export class FindShopmapPage {

  data: any;

  map: GoogleMap;

  locat_lat: number;
  locat_lon: number;

  locations: any;

  shop: any;
  userDetails: object;

  errorMessage: string;

  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, 
    private platform: Platform, private findshopService: FindshopServiceProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindShopmapPage');

    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: `Loading Please Wait...`,
      duration: 5000
    });

    this.loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
  
    this.loading.present();

    this.userDetails = this.navParams.get('userDetails');
    this.platform.ready().then(() => {
      this.getShopAllMap();
    })
  }

  getShopAllMap() {

    this.findshopService.getShopAllMap(this.userDetails[0].id_user)
    .subscribe(
      res => {
        this.shop = res;
        this.loadMap();
      },
      error =>  this.errorMessage = <any>error);
  }

  loadMap() {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.locat_lat = resp.coords.latitude;
      this.locat_lon = resp.coords.longitude;

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
          myLocationButton: true,
        },
      };

      this.map = GoogleMaps.create('map_canvas', mapOptions);

      this.locations = this.shop;

      this.data = this.applyHaversine(this.locations);
  
      this.data.sort((locationA, locationB) => {
        return locationA.distance - locationB.distance;
      });
      
      this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.

        this.map.on(GoogleMapsEvent.MY_LOCATION_BUTTON_CLICK).subscribe(
          (data) => {
            this.getPosition();
          }
        );

        this.map.addMarker({
          icon: {
            url: 'assets/icon/man.png'
          },
          animation: 'DROP',
          position: {
            lat: this.locat_lat,
            lng: this.locat_lon
          }         
        });

        for(let location of this.locations){
          if(location.distance < 10 ){
            this.map.addMarker({
              icon: 'red',
              animation: 'DROP',
              title: location.name,
              position: {
                lat: location.latitude,
                lng: location.longitude
              }         
            }).then(marker => {
              marker.on(GoogleMapsEvent.MARKER_CLICK)
                marker.showInfoWindow();
            });
          }
        }

        this.loading.dismiss();

      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  applyHaversine(locations){
 
    let usersLocation = {
      lat: this.locat_lat,
      lng: this.locat_lon
    };

    locations.map((location) => {

      let placeLocation = {
        lat: location.latitude,
        lng: location.longitude
      };

      location.distance = this.getDistanceBetweenPoints(
        usersLocation,
        placeLocation,
        'km'
      ).toFixed(2);
    });

    return locations;
  }

  getDistanceBetweenPoints(start, end, units){
 
    let earthRadius = {
      miles: 3958.8,
      km: 6371
    };

    let R = earthRadius[units || 'miles'];
    let lat1 = start.lat;
    let lon1 = start.lng;
    let lat2 = end.lat;
    let lon2 = end.lng;

    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d;
  }

  toRad(x){
      return x * Math.PI / 180;
  }

  getPosition(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.locat_lat = resp.coords.latitude;
      this.locat_lon = resp.coords.longitude;

      this.map.animateCamera({
        target: {
          lat: this.locat_lat,
          lng: this.locat_lon
        },
        zoom: 13,
        tilt: 60
      });

      // this.map.addMarker({
      //   icon: 'red',
      //   animation: 'DROP',
      //   draggable: true,
      //   position: {
      //     lat: this.locat_lat,
      //     lng: this.locat_lon
      //   },
      // });        
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}
