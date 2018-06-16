import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
// import { ListPage } from '../pages/list/list';
import { TestimonialsPage } from '../pages/testimonials/testimonials'
// import { SideMenuPage } from '../pages/side-menu/side-menu'
import { MasonryCardPage } from '../pages/masonry-card/masonry-card'
// import { PropertyLocationSelectionPage } from '../pages/property-location-selection/property-location-selection'
// import { GoogleMapPage } from '../pages/google-map/google-map'
import { ConcertCardPage } from '../pages/concert-card/concert-card'
import { MapPage } from '../pages/map/map'
import { Subject } from 'rxjs/Subject';
import { FavoriteListPage } from '../pages/favorite-list/favorite-list'
// import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  activePage = new Subject();
  placeholder = 'assets/icon/girl-avatar.png';
  chosenPicture: any;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any, active: boolean }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    //  private push: Push
    ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, active: true },
      { title: 'Testimonials', component: TestimonialsPage, active: false },
      // { title: 'SideMenu', component: SideMenuPage, active: false },
      { title: 'InstaPic', component: MasonryCardPage, active: false },
      { title: 'TimeLine', component: 'TimelinePage', active: false },
      { title: 'Upcoming Events', component: ConcertCardPage, active: false },
      // { title: 'GPS', component: PropertyLocationSelectionPage, active: false},
      // { title: 'Google Map', component: GoogleMapPage, active: false},
      { title: 'Favorite List', component: FavoriteListPage, active: false },
      { title: 'Map', component: MapPage, active: false },
    ];
    this.activePage.subscribe((selectedPage: any) => {
      this.pages.map(page => {
        page.active = page.title === selectedPage.title;
      });
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.pushMsg();  //this is using ionic native push notification
      
    // Using OneSignal for push notification
    var notificationOpenedCallback = function(jsonData) {
      alert('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    window["plugins"].OneSignal
      .startInit("a0a9a921-aaab-435c-834e-39d07695f2bf", "894300595996")
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();
    });
  }

  // pushMsg() {
  //   const options: PushOptions = {
  //     android: {
  //       senderID: '894300595996',
  //     },
  //     ios: {
  //       alert: 'true',
  //       badge: true,
  //       sound: 'false'
  //     },
  //     windows: {},
  //     browser: {
  //       pushServiceURL: 'http://push.api.phonegap.com/v1/push'
  //     }
  //   };

  //   const pushObject: PushObject = this.push.init(options);


  //   pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

  //   pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

  //   pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  // }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage.next(page);
  }
}
