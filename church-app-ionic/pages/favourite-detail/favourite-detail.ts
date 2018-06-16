import {Component} from '@angular/core';
import {ActionSheetController, ActionSheet, NavController, NavParams, ToastController} from 'ionic-angular';
import { concertsService } from '../../providers/concert-service';

@Component({
  selector: 'page-favourite-detail',
  templateUrl: 'favourite-detail.html',
})
export class FavouriteDetailPage {

    concert: any;

    constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, public concertservice: concertsService, public toastCtrl: ToastController) {
        this.concert = this.navParams.data;
        concertservice.findById(this.concert.id).then(
          concert => this.concert = concert
        );
        console.log("concert: ", this.concert)
    }

    openBrokerDetail(broker) {
        // this.navCtrl.push(BrokerDetailPage, broker);
    }

    favorite(concert) {
        this.concertservice.favorite(concert)
            .then(property => {
                let toast = this.toastCtrl.create({
                    message: 'Event added to your favorites',
                    cssClass: 'mytoast',
                    duration: 1000
                });
                toast.present(toast);
            });
    }

    share(concert) {
        let actionSheet: ActionSheet = this.actionSheetCtrl.create({
            title: 'Share via',
            buttons: [
                {
                    text: 'Twitter',
                    handler: () => console.log('share via twitter')
                },
                {
                    text: 'Facebook',
                    handler: () => console.log('share via facebook')
                },
                {
                    text: 'Email',
                    handler: () => console.log('share via email')
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => console.log('cancel share')
                }
            ]
        });

        actionSheet.present();
    }

}
