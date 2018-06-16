import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { concertsService } from '../../providers/concert-service';
import { FavouriteDetailPage } from '../favourite-detail/favourite-detail';

@Component({
  selector: 'page-favorite-list',
  templateUrl: 'favorite-list.html',
})
export class FavoriteListPage {

  favorites: Array<any>;

  constructor(public navCtrl: NavController, public service: concertsService) {
      this.getFavorites();
  }

  itemTapped(favorite) {
      console.log("favorite: ",favorite)
      this.navCtrl.push(FavouriteDetailPage, favorite.concert);
  }

  deleteItem(favorite) {
      this.service.unfavorite(favorite)
          .then(() => {
              this.getFavorites();
          })
          .catch(error => alert(JSON.stringify(error)));
  }

  getFavorites() {
      this.service.getFavorites()
          .then(data => this.favorites = data);
  }

}
