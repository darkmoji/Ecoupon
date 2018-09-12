import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Report3Page } from './../report3/report3';

import { ReportServiceProvider } from './../../../providers/report-service/report-service';
@Component({
  selector: 'page-report2',
  templateUrl: 'report2.html',
})
export class Report2Page {

  myDate: any;
  type: any;
  shop: any;

  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private reportService: ReportServiceProvider) {
    this.myDate = this.navParams.get('date');
    this.type = this.navParams.get('type');
    this.shop = this.navParams.get('shop');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Report2Page');
  }

  showDetail(s){
    this.reportService.getPromo(this.type, this.myDate, s.id_shop)
    .subscribe(
      res =>{
          this.navCtrl.push(Report3Page,{ name_shop: s.name, promo: res });
        },
      error =>{ 
          this.errorMessage = <any>error;
        });
  }

}
