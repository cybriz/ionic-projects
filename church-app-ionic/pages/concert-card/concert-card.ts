import { Component } from '@angular/core';
import { NavController, AlertController, Events, ToastController } from 'ionic-angular';
import { concertsService } from '../../providers/concert-service';
// import { FavoriteListPage } from '../favorite-list/favorite-list'

@Component({
  selector: 'page-concert-card',
  templateUrl: 'concert-card.html',
})
export class ConcertCardPage {
  favorites: Array<any>;
  // concerts:any = {}

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public events: Events,
    public service: concertsService, public toastCtrl: ToastController) {
      this.findAll();
      
    // this.concerts = [
    //   {
    //     name: 'yeezy world tour 2017',
    //     artistName: 'Kanye West',
    //     artistImage: 'assets/icon/kanye_west.png',
    //     color: '#f73e53'
    //   },
    //   {
    //     name: 'max 2018',
    //     artistName: 'Kanye West',
    //     artistImage: 'assets/icon/kanye_west.png',
    //     color: '#0be3ff'
    //   },
    //   {
    //     name: 'pika world tour 2019',
    //     artistName: 'Kanye West',
    //     artistImage: 'assets/icon/kanye_west.png',
    //     color: '#fdd427'
    //   },
    // ];
  }
  findAll() {
    this.service.findAll()
        .then(data => this.favorites = data)
        .catch(error => alert(error));
}

  
  addFavorite(favorites) {
    this.service.favorite(favorites)
        .then(favorites => {
            let toast = this.toastCtrl.create({
                message: 'Concert added to your favorites',
                cssClass: 'mytoast',
                duration: 1000
            });
            toast.present(toast);
        });
}

  // hasFavorite(concertName: string): boolean {
  //   return (this.favorites.indexOf(concertName) > -1);
  // };

  // addFavorite(concertName: string): void {
  //   this.favorites.push(concertName);
  // };

  // addingFavorite(concert) {
  //   if (this.hasFavorite(concert)) {
  //     // woops, they already favorited it! What shall we do!?
  //     // prompt them to remove it
  //     this.removeFavorite(concert, 'Favorite already added');
  //   } else {
  //     // remember this session as a user favorite
  //     this.addFavorite(concert);

  //     // create an alert instance
  //     let alert = this.alertCtrl.create({
  //       title: 'Favorite Added',
  //       buttons: [{
  //         text: 'OK',
  //         handler: () => {
  //           console.log("add clicked")
  //         }
  //       }]
  //     });
  //     // now present the alert on top of all other content
  //     alert.present();
  //   }
  // }

  // removingFavorite(concertName: string): void {
  //   let index = this.favorites.indexOf(concertName);
  //   if (index > -1) {
  //     this.favorites.splice(index, 1);
  //   }
  // };

  // removeFavorite(concert, title: string) {
  //   let alert = this.alertCtrl.create({
  //     title: title,
  //     message: 'Would you like to remove this session from your favorites?',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: () => {
  //           // they clicked the cancel button, do not remove the session
  //           // close the sliding item and hide the option buttons
  //           console.log("add canceled")
  //         }
  //       },
  //       {
  //         text: 'Remove',
  //         handler: () => {
  //           // they want to remove this session from their favorites
  //           this.removingFavorite(concert);
  //           // this.updateSchedule();

  //           // close the sliding item and hide the option buttons
  //           console.log("add removed")
  //         }
  //       }
  //     ]
  //   });
  //   // now present the alert on top of all other content
  //   alert.present();
  // }
}