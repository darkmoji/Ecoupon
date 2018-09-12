import { NavInnerComponent } from './../components/nav-inner/nav-inner';
import { ComponentsModule } from './../components/components.module';
import { NavEcComponent } from './../components/nav-ec/nav-ec';

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { ChartsModule } from 'ng2-charts';

import { TabsPage } from '../pages/tabs/tabs';
import { TabShopPage } from './../pages/tab-shop/tab-shop';
import { TabAdminPage } from './../pages/tab-admin/tab-admin';


import { RegisterPage } from './../pages/register/register';
import { LoginPage } from '../pages/login/login';

import { PromotionPage } from './../pages/menu_user/promotion/promotion';
import { ModalNoticePage } from './../pages/modal/modal-notice/modal-notice';
import { PromoDetailPage } from './../pages/promo-detail/promo-detail';
import { PromoDetail2Page } from './../pages/promo-detail2/promo-detail2';
import { FindShopPage } from './../pages/menu_user/find-shop/find-shop';
import { FindShopmapPage } from './../pages/menu_user/find-shopmap/find-shopmap';
import { ShopDetailPage } from './../pages/menu_user/shop-detail/shop-detail';
import { ProfilePage } from './../pages/menu_user/profile/profile';
import { MyCardPage } from './../pages/menu_user/my-card/my-card';
import { CustomerCardPage } from './../pages/menu_user/customer-card/customer-card';
import { SettingsPage } from './../pages/settings/settings';
import { LogUsepointPage } from './../pages/log-usepoint/log-usepoint';
import { AddShopPage } from './../pages/add-shop/add-shop';
import { TransactionUserPage } from '../pages/menu_user/transaction-user/transaction-user';

import { GivePointPage } from './../pages/menu_shop/give-point/give-point';
import { GivePromoPage } from './../pages/menu_shop/give-promo/give-promo';
import { PointPage } from './../pages/menu_shop/point/point';
import { ManagePromoPage } from './../pages/menu_shop/manage-promo/manage-promo';
import { AddPromoPage } from './../pages/menu_shop/add-promo/add-promo';
import { PromoDetailShopPage } from './../pages/promo-detail-shop/promo-detail-shop';
import { AccountPage } from './../pages/menu_shop/account/account';
import { ShopInfoPage } from './../pages/menu_shop/shop-info/shop-info';
import { MemberPage } from './../pages/menu_shop/member/member';
import { Member2Page } from './../pages/menu_shop/member2/member2';
import { AddBranchPage } from './../pages/menu_shop/add-branch/add-branch';
import { BranchPage } from './../pages/menu_shop/branch/branch';
import { BranchInfoPage } from './../pages/menu_shop/branch-info/branch-info';
import { AddCashierPage } from './../pages/menu_shop/add-cashier/add-cashier';
import { TransactionShopPage } from '../pages/menu_shop/transaction-shop/transaction-shop';

import { DataPage } from './../pages/menu_admin/data/data';
import { CustomerPage } from './../pages/menu_admin/customer/customer';
import { Customer2Page } from './../pages/menu_admin/customer2/customer2';
import { ShopPage } from './../pages/menu_admin/shop/shop';
import { Shop2Page } from './../pages/menu_admin/shop2/shop2';
import { Shop3Page } from './../pages/menu_admin/shop3/shop3';
import { Shop4Page } from './../pages/menu_admin/shop4/shop4';
import { TypeshopPage } from './../pages/menu_admin/typeshop/typeshop';
import { TransactionPage } from '../pages/menu_admin/transaction/transaction';
import { Transaction2Page } from './../pages/menu_admin/transaction2/transaction2';
import { UserPage } from './../pages/menu_admin/user/user';
import { ReportPage } from './../pages/menu_admin/report/report';
import { Report2Page } from './../pages/menu_admin/report2/report2';
import { Report3Page } from './../pages/menu_admin/report3/report3';
import { SettingPage } from './../pages/setting/setting';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ActivityServiceProvider } from '../providers/activity-service/activity-service';
import { PromotionServiceProvider } from '../providers/promotion-service/promotion-service';
import { MypromoServiceProvider } from '../providers/mypromo-service/mypromo-service';
import { GivepointServiceProvider } from '../providers/givepoint-service/givepoint-service';
import { FindshopServiceProvider } from '../providers/findshop-service/findshop-service';
import { ManagePromoServiceProvider } from '../providers/manage-promo-service/manage-promo-service';
import { ManageAccountServiceProvider } from '../providers/manage-account-service/manage-account-service';
import { MycardServiceProvider } from '../providers/mycard-service/mycard-service';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { NoticeServiceProvider } from '../providers/notice-service/notice-service';
import { TransactionServiceProvider } from '../providers/transaction-service/transaction-service';
import { ReportServiceProvider } from '../providers/report-service/report-service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    TabsPage,
    PromotionPage,
    ModalNoticePage,
    PromoDetailPage,
    PromoDetail2Page,
    FindShopPage,
    FindShopmapPage,
    ShopDetailPage,
    ProfilePage,
    MyCardPage,
    CustomerCardPage,
    SettingsPage,
    LogUsepointPage,
    AddShopPage,
    TransactionUserPage,

    TabShopPage,
    GivePointPage,
    GivePromoPage,
    PointPage,
    ManagePromoPage,
    AddPromoPage,
    PromoDetailShopPage,
    AccountPage,
    ShopInfoPage,
    MemberPage,
    Member2Page,
    AddBranchPage,
    BranchPage,
    BranchInfoPage,
    AddCashierPage,
    TransactionShopPage,

    TabAdminPage,
    DataPage,
    CustomerPage,
    Customer2Page,
    ShopPage,
    Shop2Page,
    Shop3Page,
    Shop4Page,
    TypeshopPage,
    TransactionPage,
    Transaction2Page,
    UserPage,
    ReportPage,
    Report2Page,
    Report3Page,
    SettingPage,

    NavEcComponent,
    NavInnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ComponentsModule,
    NgxQRCodeModule,
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
       MyApp,
    LoginPage,
    RegisterPage,
    TabsPage,
    PromotionPage,
    ModalNoticePage,
    PromoDetailPage,
    PromoDetail2Page,
    FindShopPage,
    FindShopmapPage,
    ShopDetailPage,
    ProfilePage,
    MyCardPage,
    CustomerCardPage,
    SettingsPage,
    LogUsepointPage,
    AddShopPage,
    TransactionUserPage,
    
    TabShopPage,
    GivePointPage,
    GivePromoPage,
    PointPage,
    ManagePromoPage,
    AddPromoPage,
    PromoDetailShopPage,
    AccountPage,
    ShopInfoPage,
    MemberPage,
    Member2Page,
    AddBranchPage,
    BranchPage,
    BranchInfoPage,
    AddCashierPage,
    TransactionShopPage,

    TabAdminPage,
    DataPage,
    CustomerPage,
    Customer2Page,
    ShopPage,
    Shop2Page,
    Shop3Page,
    Shop4Page,
    TypeshopPage,
    TransactionPage,
    Transaction2Page,
    UserPage,
    ReportPage,
    Report2Page,
    Report3Page,
    SettingPage,

    NavEcComponent,
    NavInnerComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    BarcodeScanner,
    Geolocation,
    GoogleMaps,
    AuthServiceProvider,
    ActivityServiceProvider,
    PromotionServiceProvider,
    MypromoServiceProvider,
    GivepointServiceProvider,
    FindshopServiceProvider,
    ManagePromoServiceProvider,
    ManageAccountServiceProvider,
    MycardServiceProvider,
    DataServiceProvider,
    NoticeServiceProvider,
    TransactionServiceProvider,
    ReportServiceProvider,
  ]
})
export class AppModule {}
