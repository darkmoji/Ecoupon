import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ReportPage } from './../menu_admin/report/report';
import { TransactionPage } from './../menu_admin/transaction/transaction';
import { DataPage } from './../menu_admin/data/data';
import { SettingPage } from './../setting/setting';

@Component({
  selector: 'page-tab-admin',
  templateUrl: 'tab-admin.html'
})
export class TabAdminPage {

  reportRoot = ReportPage;
  dataRoot = DataPage;
  transactionRoot = TransactionPage;
  settingRoot = SettingPage;

  constructor(public navCtrl: NavController) {}
    
  }
