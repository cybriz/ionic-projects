import { ListOfLocationPage } from '../pages/list-of-location/list-of-location';
import { PropertyDeveloperPage } from '../pages/property-developer/property-developer';
import { ReverseGeocodePage } from '../pages/reverseGeocode/reverseGeocode';
import { PropertyPage } from '../pages/property/property';
import { LoginPage } from '../pages/login/login';
import { Component} from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { TabsPage } from "../pages/tabs/tabs";
// import { AngularFireAuth } from "angularfire2/auth";
import { Parse } from "parse";
import { Events } from "ionic-angular";
import{ PropertyTypePage } from "../pages/property-type/property-type";
import { PropertyLocationSelectionPage } from "../pages/property-location-selection/property-location-selection"
import { PropertyTypeOwnPage } from '../pages/property-type-own/property-type-own';
import { PropertyTypeRentPage } from '../pages/property-type-rent/property-type-rent';



@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    // private aAuth: AngularFireAuth,
    public events: Events
  ) {
    let self = this;
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      // console.log('platform.width:' + platform.width())
      // console.log('platform.height:' + platform.height())

      self.setupParseStateObserver();
      this.redirectPageOnUserState();
    });
  }

  setupParseStateObserver() {
    let self = this;
    this.events.subscribe("user", hideTab => {
      // console.log("Welcome", hideTab);
      self.redirectPageOnUserState();
    });
  }

  redirectPageOnUserState() {
    var currentUser = Parse.User.current();
    // console.log("aa", currentUser);
    // console.log('this.rootPage:' + this.rootPage)
    if (currentUser) {
      // console.log("oo", currentUser);
      this.rootPage = TabsPage;
    } else {
      // console.log('Set to login page')
      this.rootPage = LoginPage;
      // this.rootPage = PropertyTypePage;
    }
  }
}
