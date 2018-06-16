import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class TimelinePage {
  item:any;
  items = [
    {
      title: 'Sports – Kid’s Beginner Karate/Monday',
      content: `Strengthen your body, mind and spirit. Learn focus, discipline, confidence and self-defense.
                Children's BEGINNERS class, ages 4 to 8 years old 4:45-5:30 pm (parents may participate with their children).`,
      icon: 'calendar',
      time: { subtitle: '6/25/2018', title: '16:45' }
    },
    {
      title: 'Daniel Plan "Food" - Part 1',
      content: `In this last segment of The Daniel Plan, we will learn how to make good choices to boost our energy, maximize our metabolism and revitalize our health.
                We will begin to experience the healing that good nutrition provides. If you are eating unhealthily, we will help you learn how to detoxify from those foods. 
                Cravings are hard to deal with and we will learn good strategies to overcome them!`,
      icon: 'calendar',
      time: { subtitle: 'January', title: '29' }
    },
    {
      title: 'Autism Disorder Support Group',
      content: `To support and encourage parents who have children with autism spectrum disorder.
                We assist parents with children living with autism spectrum disorder with practical and spiritual support.`,
      icon: 'calendar',
      time: { title: 'May 2018' }
    }
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimelinePage');
  }

}
