import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MasonryCardPage } from './masonry-card';

@NgModule({
  declarations: [
    MasonryCardPage,
  ],
  imports: [
    IonicPageModule.forChild(MasonryCardPage),
  ],
  exports: [
    MasonryCardPage
  ]
})
export class MasonryCardPageModule {}
