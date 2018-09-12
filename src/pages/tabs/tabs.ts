import { Component } from '@angular/core';

import { PromotionPage } from './../menu_user/promotion/promotion';
import { FindShopPage } from './../menu_user/find-shop/find-shop';
import { MyCardPage } from './../menu_user/my-card/my-card';
import { SettingsPage } from './../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PromotionPage;
  tab2Root = FindShopPage;
  tab3Root = MyCardPage;
  tab4Root = SettingsPage;
  
  constructor() {

  }
}
