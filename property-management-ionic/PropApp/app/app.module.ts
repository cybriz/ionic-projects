import { ListOfLocationPage } from '../pages/list-of-location/list-of-location';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireAuthModule } from "angularfire2/auth";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Parse } from 'parse';
import { MessagesPage } from '../pages/messages/messages';
import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import { Geolocation } from '@ionic-native/geolocation';
// import { AgmCoreModule } from '@agm/core';
import { NewRegisterPage } from './../pages/newregister/newregister';
import { RegisterPage } from './../pages/register/register';
import { CountrylistPage } from './../pages/countrylist/countrylist';
import { CreateManagementOrDevPage } from '../pages/create-mgmt-dev/create-mgmt-dev';
import { StatelistPage } from './../pages/statelist/statelist';
import { SummaryPage } from './../pages/summary/summary'
import { MyPropertiesPage } from './../pages/myproperties/myproperties';
import { PropertyLocationSelectionPage } from "../pages/property-location-selection/property-location-selection";
import { ResetPasswordPage } from "../pages/reset-password/reset-password";
// import { AgmCoreModule } from '@agm/core';
import { PropertyTypePage } from "../pages/property-type/property-type";
import { PropertyPage } from "../pages/property/property";
import { PropertySummaryPage } from "../pages/property-summary/property-summary";
// import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
// import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { SearchorCreateManagementDevPage } from '../pages/searchorcreate-management-dev/searchorcreate-management-dev';
import { ReverseGeocodePage } from '../pages/reverseGeocode/reverseGeocode'
// const loadGoogleMapsApi = require('load-google-maps-api')
import { PropertyManagementPage } from "../pages/property-management/property-management"
import { PropertyDeveloperPage } from "../pages/property-developer/property-developer"
import { MockProvider } from '../providers/mock/mock';
import { PropertyTypeOwnPage } from '../pages/property-type-own/property-type-own'
import { PropertyTypeRentPage } from '../pages/property-type-rent/property-type-rent'

export const firebaseConfig = {
  
  apiKey:  "AIzaSyAakL66pSbJOEXY7dWBstaoKY63yS9eL1w",
  authDomain: "propertymanagement-77159.firebaseapp.com",
  databaseURL: "https://propertymanagement-77159.firebaseio.com",
  projectId: "propertymanagement-77159",
  storageBucket: "propertymanagement-77159.appspot.com",
  messagingSenderId: "667773470325"
};

Parse.initialize("myAppId");
Parse.serverURL = 'http://localhost:1337/parse';
Parse.masterKey = "secret";
// var parsePush = Parse.push = {
//   android: {
//     senderId: '894300595996',
//     apiKey: 'AIzaSyDV8WQ6g7yvFpHD40E7er99ZtsdRKi-e1k'
//   },
// }
Parse.cloud =  './cloud/main.js';
// Parse.JavaScriptKey = "fi6LWURzRGmTg7neZfI79MJaB2QHjWhiZ4nVFvKP";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    MessagesPage,
    SettingsPage,
    HomePage,
    LoginPage,
    PropertyLocationSelectionPage,
    ResetPasswordPage,
    ListOfLocationPage,
    PropertyTypePage,
    PropertyPage,
    PropertySummaryPage,
    CreateManagementOrDevPage,
    RegisterPage,
    NewRegisterPage,
    CountrylistPage,
    StatelistPage,
    SummaryPage,
    MyPropertiesPage,
    SearchorCreateManagementDevPage,
    PropertyLocationSelectionPage,
    ResetPasswordPage,
    ListOfLocationPage,
    PropertyTypePage,
    PropertyPage,
    PropertySummaryPage,
    ReverseGeocodePage,
    PropertyManagementPage,
    PropertyDeveloperPage,
    PropertyTypeOwnPage,
    PropertyTypeRentPage
  ],
  
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    // AngularFireModule.initializeApp(firebaseConfig),
    // AngularFirestoreModule,
    // AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    // AgmCoreModule.forRoot({
    //   apiKey: "AIzaSyDyQkyHagOParnJYq7lfaI5ORV2iPxrGc0",
    //   libraries: ["places"]
    // }),
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    MessagesPage,
    SettingsPage,
    HomePage,
    LoginPage,
    PropertyLocationSelectionPage,
    ResetPasswordPage,
    ListOfLocationPage,
    PropertyTypePage,
    PropertyPage,
    PropertySummaryPage,
    CreateManagementOrDevPage,
    RegisterPage,
    NewRegisterPage,
    CountrylistPage,  
    StatelistPage,
    SummaryPage,
    MyPropertiesPage,
    SearchorCreateManagementDevPage,
    ReverseGeocodePage,
    PropertyManagementPage,
    PropertyDeveloperPage,
    PropertyTypeOwnPage,
    PropertyTypeRentPage
  ],
  providers: [
    StatusBar,
    SplashScreen, 
    Geolocation,
    // BackgroundGeolocation,
    // NativeGeocoder,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MockProvider,
  ]
})
export class AppModule {}
