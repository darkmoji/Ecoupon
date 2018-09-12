import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { BranchInfoPage } from './../branch-info/branch-info';

import { ManageAccountServiceProvider } from './../../../providers/manage-account-service/manage-account-service';

@Component({
  selector: 'page-branch',
  templateUrl: 'branch.html',
})
export class BranchPage {

  shopDetails: object;
  
  page: any;

  branches: any;
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private manageAccountServiceProvider: ManageAccountServiceProvider) {
    this.shopDetails = this.navParams.get('shopDetails');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BranchPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter BranchPage');
    this.getBranchesByShop(this.shopDetails[0].id_shop);
  }

  getBranchesByShop(id) {
    this.manageAccountServiceProvider.getBranchesByShop(id)
      .subscribe(
        res =>{
           this.branches = res
          },
        error =>  this.errorMessage = <any>error);
  }
  branch_info(b){
    this.navCtrl.push(BranchInfoPage,{ id: b.id_branch, shopDetails: this.shopDetails });
  }
}
