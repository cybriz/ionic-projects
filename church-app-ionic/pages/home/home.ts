import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform } from 'ionic-angular';
// import { FcmProvider } from '../../providers/fcm';
// import { tap } from 'rxjs/operators';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public toastCtrl: ToastController, 
  // public fcm: FcmProvider, 
  public platform: Platform){
    // platform.ready().then(() => {

    //   // Get a FCM token
    //   fcm.getToken()

    //   // Listen to incoming messages
    //   fcm.listenToNotifications().pipe(
    //     tap(msg => {
    //       // show a toast
    //       const toast = toastCtrl.create({
    //         message: 'message received sir!',
    //         duration: 3000
    //       });
    //       toast.present();
    //     })
    //   )
    //   .subscribe()
    // })
    };
  }

