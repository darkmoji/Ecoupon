import { NavEcComponent } from './../../components/nav-ec/nav-ec';
import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App, private storage: Storage,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  logout(){
    this.storage.clear();
    const root = this.app.getRootNav();
    root.popToRoot();
  }

}
