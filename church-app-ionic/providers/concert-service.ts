import { Injectable } from '@angular/core';
import concerts from './config-service';

@Injectable()
export class concertsService {
  favoriteCounter: number = 0;
  favorites: Array<any> = [];

  findAll() {
    return Promise.resolve(concerts);
  }

  findById(id) {
    return Promise.resolve(concerts[id - 1]);
  }

  findByName(searchKey: string) {
    let key: string = searchKey.toUpperCase();
    return Promise.resolve(concerts.filter((concert: any) =>
      (concert.name + ' ' + concert.artistName + ' ' + concert.artistImage + ' ' + concert.color).toUpperCase().indexOf(key) > -1));
  }

  getFavorites() {
    // console.log("Promise.resolve(this.favorites): ", Promise.resolve(this.favorites))
    return Promise.resolve(this.favorites);
  }

  favorite(concerts) {
    this.favoriteCounter = this.favoriteCounter + 1;
    this.favorites.push({ id: this.favoriteCounter, concert: concerts });
    console.log("concert: ", concerts)
    return Promise.resolve();
  }

  unfavorite(favorite) {
    let index = this.favorites.indexOf(favorite);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
    return Promise.resolve();
  }
}