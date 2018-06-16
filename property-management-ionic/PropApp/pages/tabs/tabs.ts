import { Component } from '@angular/core';
import { MessagesPage } from '../messages/messages';
import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';
import { NavParams } from "ionic-angular";
import { Parse } from "parse"

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MessagesPage;
  tab3Root = SettingsPage;
  // address:string;

  constructor(public navParams: NavParams) {
    // this.address = navParams.get("address")
    // console.log("address11111: ", navParams.get("address"))
  }
}