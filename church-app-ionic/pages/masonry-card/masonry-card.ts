import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Instafeed } from 'instafeed.js'
// declare var require: any
// const Instagram = require('node-instagram').default;

@IonicPage()
@Component({
  selector: 'page-masonry-card',
  templateUrl: 'masonry-card.html',
})
export class MasonryCardPage {

  posted = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  //   instagram = new Instagram({
  //   clientId: '151ad2a81ba545d9857fd23a963fb61f',
  //   clientSecret: 'ff866fa485854dd7974923c4a78a539e',
  //   accessToken: '4424733550.151ad2a.7187a2cfe61b419995bf111df6b42476',
  // });

  ionViewDidLoad() {
    this.fetchFeed()
    // this.fetchHashTag()
    // this.posted = [
    //   {
    //     description: 'Trying out digital painting',
    //     image: 'https://s-media-cache-ak0.pinimg.com/564x/d5/63/b0/d563b08194f0a92cc7d381f7f8582a08.jpg'
    //   },
    //   {
    //     description: '',
    //     image: 'https://s-media-cache-ak0.pinimg.com/236x/43/f3/3d/43f33de6f96ca8e6f8dc6ff1ad86b586.jpg'
    //   },
    //   {
    //     description: 'Look at this amazing clay humming bird I crafted!',
    //     image: 'https://s-media-cache-ak0.pinimg.com/236x/68/68/a2/6868a2f821e5d15cc8fcd8cfa1694606.jpg'
    //   },
    //   {
    //     description: 'Origami tullip tutorial',
    //     image: 'https://s-media-cache-ak0.pinimg.com/236x/38/6f/8e/386f8ec1725f09883d827094228d0f82.jpg'
    //   },
    //   {
    //     description: '',
    //     image: 'https://s-media-cache-ak0.pinimg.com/564x/f6/61/5c/f6615ca7068da18157588890f9e9e03a.jpg'
    //   },
    //   {
    //     description: '',
    //     image: 'https://s-media-cache-ak0.pinimg.com/564x/0d/29/35/0d2935d14c17aff1baab75360c9e2bd6.jpg'
    //   },
    //   {
    //     description: 'Delicious chocolate bread recipe!',
    //     image: 'https://s-media-cache-ak0.pinimg.com/564x/06/a9/8e/06a98e67111aae83a481a2c1dbb594a4.jpg'
    //   },
    //   {
    //     description: '',
    //     image: 'https://s-media-cache-ak0.pinimg.com/564x/d5/8c/37/d58c3783d6ebf79db0f9c057726800a0.jpg'
    //   },
    //   {
    //     description: '',
    //     image: 'https://s-media-cache-ak0.pinimg.com/564x/f5/35/97/f53597bf16aff91315a0beca27ffdbda.jpg'
    //   },
    //   {
    //     description: '',
    //     image: 'https://s-media-cache-ak0.pinimg.com/564x/cf/fe/6d/cffe6dd7dece1cb0562f65cd3bfba1ac.jpg'
    //   },
    //   {
    //     description: 'Fastest car of all times',
    //     image: 'https://s-media-cache-ak0.pinimg.com/564x/5f/bf/34/5fbf3414f9de301c8f4b868b1c2e2339.jpg'
    //   },
    // ];
  }
  image:any

  access_token = '1500756670.e2bcd8c.d0df144832eb451e9d87af5168238c57'

  async fetchFeed(){
    let response = await fetch(
      'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + this.access_token
    )
    // console.log("response: ", response)
    let posts = await response.json()
    // console.log("posts: ", posts)
    await this.makeCommentList(posts.data)
    this.image = await posts.data[0].images.standard_resolution.url
    // console.log("images: ", posts.data[0].images.standard_resolution.url)
  }

  async makeCommentList(posts){
    // console.log("comments: ", posts)
    let postsArray = posts.map(async (post) => {
      let postId = post.id || ""
      console.log("postId: ", postId)

      if(post.comments.count === 0){
        console.log("No Comment found!")
      } else {
        let response = await fetch (
          'https://api.instagram.com/v1/media/' + post.id +'/comments?access_token=' + this.access_token
        )
        let comments = await response.json()
        // console.log("comments123: ", comments)
        let commentsArray = comments.data

        let commentsList = commentsArray.map(commentInfo => {
          // console.log("commentInfo.from.username: ",commentInfo.from.username)
          // console.log("commentInfo.text: ", commentInfo.text)
        })
        return commentsList
      }
    })
    postsArray = await Promise.all(postsArray)
    return postsArray
  }
//   async fetchHashTag(){
//     let tagName = 'lettinggo'
//     let response = await fetch(
//       // 'https://api.instagram.com/v1/tags/search?q=snowy&access_token=' + this.access_token
//       'https://api.instagram.com/v1/tags/' + tagName + '/media/recent?access_token=' + this.access_token
//     )
//     console.log("response543: ", response)
//     let hashTagPost = await response.json()
//     console.log("hashTagPost: ", hashTagPost)
//   }
}
