import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { NewsdetailPageModule } from '../pages/newsdetail/newsdetail.module';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TestimonialsPage } from '../pages/testimonials/testimonials'
import { SideMenuPage } from '../pages/side-menu/side-menu'
import { ConcertCardPage } from '../pages/concert-card/concert-card'
import { MasonryCardPage } from '../pages/masonry-card/masonry-card'
import { PropertyLocationSelectionPage } from '../pages/property-location-selection/property-location-selection'
import { PropertySummaryPage } from '../pages/property-summary/property-summary'
import { GoogleMapPage } from '../pages/google-map/google-map'
import { MapPage } from '../pages/map/map'
import { SharedModule } from './shared.module';
import { concertsService } from '../providers/concert-service';
import { FavoriteListPage } from '../pages/favorite-list/favorite-list'
import { FavouriteDetailPage } from '../pages/favourite-detail/favourite-detail'
import { Push } from '@ionic-native/push';
import { AngularFireModule } from "angularfire2";
// import { AngularFirestore } from 'angularfire2/firestore';
import { Firebase } from '@ionic-native/firebase';
// import { FcmProvider } from '../providers/fcm'
import { HttpClientModule } from '@angular/common/http';
import { IonPullupModule } from 'ionic-pullup';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDV8WQ6g7yvFpHD40E7er99ZtsdRKi-e1k",
    authDomain: "hello-world-9029a.firebaseapp.com",
    databaseURL: "https://hello-world-9029a.firebaseio.com",
    projectId: "hello-world-9029a",
    storageBucket: "hello-world-9029a.appspot.com",
    messagingSenderId: "894300595996"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    TestimonialsPage,
    SideMenuPage,
    MasonryCardPage,
    PropertyLocationSelectionPage,
    PropertySummaryPage,
    GoogleMapPage,
    MapPage,
    ConcertCardPage,
    FavoriteListPage,
    FavouriteDetailPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NewsdetailPageModule,
    SharedModule,
    AngularFireModule.initializeApp(config),
    // AngularFirestore,
    HttpClientModule,
    IonPullupModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    TestimonialsPage,
    SideMenuPage,
    MasonryCardPage,
    PropertyLocationSelectionPage,
    PropertySummaryPage,
    GoogleMapPage,
    MapPage,
    ConcertCardPage,
    FavoriteListPage,
    FavouriteDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    concertsService,
    Push,
    Firebase,
    // FcmProvider
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
