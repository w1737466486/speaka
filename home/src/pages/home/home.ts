import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  dayWord: Object;
  recommondedCards = [];
  categoryCards = [];
  cardInputHidden = true;
  displayDayTask = false;
  taskItems = [];

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, private http: HttpClient, public zone: NgZone) {
    this.http.get('http://api.speaka.live/api/index/index')
    // this.http.get('assets/home.json')
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
    this.cardInputHidden = true;

    window["taskToken"] = this.taskToken;
    window["profileToken"] = this.profileToken;
    window["this"].bind(this);
  }

  ngAfterViewInit() {
    this.content.ionScroll.subscribe((data) => {
      if (data.scrollTop > 111) {
        if (this.cardInputHidden) {
          this.zone.run(() => {
            this.cardInputHidden = false;
          });
        }
      } else {
        if (!this.cardInputHidden) {
          this.zone.run(() => {
            this.cardInputHidden = true;
          });
        }
      }
    });
  }

  taskToken(token: string) {
    const thx = window["this"];
    thx.displayDayTask = true;
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    thx.http.get('http://api.speaka.live/api/task/getUserList', {headers})
    .subscribe(data=> {
      thx.taskItems = [];
      let arr = data["data"];
      for (const item of arr) {
        thx.taskItems.push(item);
      };
    });
  }

  profileToken(token: string) {

  }

  dictionaryClick() {
    this.cardInputHidden = !this.cardInputHidden;
  }

  dayTask() {
    window["webkit"]["messageHandlers"]["getToken"]["postMessage"]("taskToken");
  }

  hideDayTask() {
    this.displayDayTask = false;
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
