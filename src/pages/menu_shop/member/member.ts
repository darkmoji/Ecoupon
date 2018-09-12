import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Member2Page } from './../member2/member2';

import { ManageAccountServiceProvider } from './../../../providers/manage-account-service/manage-account-service';

@Component({
  selector: 'page-member',
  templateUrl: 'member.html',
})
export class MemberPage {

  member: any;

  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private manageAccountService: ManageAccountServiceProvider) {
    this.member = this.navParams.get('member');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberPage');
  }

  member_info(m) {
    this.manageAccountService.getMem(m.id_user)
      .subscribe(
        res =>{
            this.navCtrl.push(Member2Page,{ member: res });
          },
        error =>  this.errorMessage = <any>error);
  }
}
