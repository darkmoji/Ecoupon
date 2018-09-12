// import { CustomerCardPage } from './../../pages/customer-card/customer-card';
// import { AddPromoPage } from './../../pages/add-promo/add-promo';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'nav-ec',
  templateUrl: 'nav-ec.html'
})
export class NavEcComponent {

  @Input('title') title: string;
  @Input('btncp') btncp: boolean;
  @Input('btnsc') btnsc: boolean;
  @Output() nextpage = new EventEmitter();

  constructor(private navCtrl: NavController) {
    console.log('Hello NavEcComponent Component');
  }

  showCard(){
    this.nextpage.emit();
  }

  createPromo(){
    this.nextpage.emit();
  }
}
