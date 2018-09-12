import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Report2Page } from './../report2/report2';

import { ReportServiceProvider } from './../../../providers/report-service/report-service';
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  // Pie
  public pieChartLabels:string[] = ['คูปอง', 'บัตรสะสมแต้ม', 'บัตรสมาชิก'];
  public pieChartData:number[] = [0, 0, 0];
  public pieChartType:string = 'pie';

  myDate: any;

  ct_1: any = 0;
  ct_2: any = 0;
  ct_3: any = 0;
  ct_a: any = 0;
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private reportService: ReportServiceProvider) {
    this.myDate = new Date().toISOString().substring(0, 7);
    this.getReport();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  getReport(){
    this.reportService.getReport(this.myDate)
      .subscribe(
        res =>{
            this.ct_1 = res[0].ct_1;
            this.ct_2 = res[0].ct_2;
            this.ct_3 = res[0].ct_3;
            this.ct_a = res[0].ct_a;

            this.pieChartData = [this.ct_1, this.ct_2, this.ct_3];
          },
        error =>{ 
            this.errorMessage = <any>error;
          });
  }

  next(type){
    this.reportService.getShop(type, this.myDate)
    .subscribe(
      res =>{
          this.navCtrl.push(Report2Page,{ type: type, date: this.myDate, shop: res });
        },
      error =>{ 
          this.errorMessage = <any>error;
          this.navCtrl.push(Report2Page,{ type: type, date: this.myDate, shop: null });
        });
  }
}
