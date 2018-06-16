import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-popup-fab-modal',
  templateUrl: 'popup-fab-modal.html',
})
export class PopupFabModalPage {


  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) { 
    let bobo = this.navParams.get("information")
    console.log("bobo", bobo)
    console.log("panel: ", bobo['panel'])
    console.log("document.getElementById('static-panel')", document.getElementById('static-panel'))
    // document.getElementById('static-panel').innerHTML = 'hello world '+ bobo['panel'] + '.'
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
