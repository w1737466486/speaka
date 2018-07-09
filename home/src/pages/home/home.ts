import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  dayWord: Object;
  recommondedCards = [];
  categoryCards = [];

  constructor(public navCtrl: NavController, private http: HttpClient) {
    this.http.get('http://api.speaka.live/api/index/index')
    .subscribe(data => {
      this.dayWord = data["data"].topCard;
      this.recommondedCards = data["data"].middleCourse;
      let videos = data["data"].tagVideo;
      for (const item in videos) {
        this.categoryCards.push(videos[item]);
      }
      // console.log(Object.prototype.toString.call(this.categoryCards));
    }, error => {
      console.log(error);
    });
  }

  getVideo(tagVideo) {
    let array = [];
    let videos = tagVideo.video;
      for (const item in videos) {
        array.push(videos[item]);
      }
      return array;
  }

  onSearch(value) {
    // this.http.get('https://api.speaka.live/api/word/search?keyword=' + value)
    // .subscribe(data => {
    //   let info = data["info"];
    //   if (info.length > 0) {
    //     let first = info[0];
    //     let isCard = first["isCard"];
    //     if (isCard) {
          
    //     } else {
          
    //     }
    //   } else {
    //     alert("查无此词，请重新输入");
    //   }
    // }, error => {
    // });
  }
}
