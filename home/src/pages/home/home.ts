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
  contentNoScroll = false;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, private http: HttpClient, public zone: NgZone) {
    this.http.get('http://dev.speaka.cn/api/index/index')
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

  taskToken = (token: string) => {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(token);
    this.http.get('http://dev.speaka.cn/api/task/getUserList', {headers})
    .subscribe(data=> {
      let arr = data["data"];
      this.zone.run(() => {
        this.taskItems = [];
        for (const item of arr) {
          this.taskItems.push(item);
        };
      });
    });
    this.zone.run(() => {
      this.displayDayTask = true;
      this.contentNoScroll = true;
    });
  };

  profileToken = (token: string) => {
    
  };

  dictionaryClick() {

  }

  dayTask() {
    window["taskToken"] = this.taskToken;
    this.getToken("taskToken");
  }

  myProfile() {
    // window["profileToken"] = this.profileToken;
    // this.getToken("profileToken");
    console.log(113);
    this.navCtrl.push('page-about');
  }

  getToken(callback: string) {
    window["webkit"]["messageHandlers"]["getToken"]["postMessage"](callback);
  }

  hideDayTask() {
    this.contentNoScroll = false;
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
