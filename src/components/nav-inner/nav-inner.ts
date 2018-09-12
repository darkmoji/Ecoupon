import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'nav-inner',
  templateUrl: 'nav-inner.html'
})
export class NavInnerComponent {

  @Input('title') title: string;

  constructor(private navCtrl: NavController) {
    console.log('Hello NavInnerComponent Component');

  }

}
