import { TimelineComponentModule } from './timeline/timeline.module';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';


export const components = [

];

@NgModule({
  declarations: [components],
  imports: [IonicModule],
  exports: [components, TimelineComponentModule]
})
export class ComponentsModule {}
