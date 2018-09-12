import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { GivePointPage } from './../menu_shop/give-point/give-point';
import { ManagePromoPage } from './../menu_shop/manage-promo/manage-promo';
import { AccountPage } from './../menu_shop/account/account';
import { SettingsPage } from './../settings/settings';

@Component({
  selector: 'page-tab-shop',
  templateUrl: 'tab-shop.html'
})
export class TabShopPage {

  givepointRoot = GivePointPage;
  managePromoPageRoot = ManagePromoPage;
  accountRoot = AccountPage;
  settingsRoot = SettingsPage;

  constructor(public navCtrl: NavController) {}

}
