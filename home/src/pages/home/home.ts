import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TagVideoListPage } from '../tag-video-list/tag-video-list';

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
    this.http.get('http://api.speaka.live/api/index/index')
    // this.http.get('assets/home.json')
    .subscribe(data => {
      this.dayWord = data["data"].topCard;
      this.recommondedCards = data["data"].middleCourse;
      let videos = data["data"].tagVideo;
      for (const item in videos) {
        this.categoryCards.push(videos[item]);
      }
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
    this.http.get('http://api.speaka.live/api/task/getUserList', {headers})
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
    const params = {
      openStyle: "push",
      module: "weeklyreport",
      title: "我的档案"
    };
    window["webkit"]["messageHandlers"]["openH5Page"]["postMessage"](params);
  };

  dictionaryClick() {
    window["dictionaryToken"] = this.dictionaryToken;
    this.getToken("dictionaryToken");
  }

  dictionaryToken() {
    const params = {
      openStyle: "push",
      module: "dictionary",
      title: "闪卡词典"
    };
    window["webkit"]["messageHandlers"]["openH5Page"]["postMessage"](params);
  }

  lessonClick() {
    const params = {
      openStyle: "push",
      page: "SPELessonListViewController"
    };
    window["webkit"]["messageHandlers"]["openNativePage"]["postMessage"](params);
  }

  dayTask() {
    window["taskToken"] = this.taskToken;
    this.getToken("taskToken");
  }

  myProfile() {
    window["profileToken"] = this.profileToken;
    this.getToken("profileToken");
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

  seeAll(category) {
    const params = {
      openStyle: "push",
      module: "TagVideoList",
      title: category.title,
      categorys: this.categoryCards,
      categoryId: category.id,
      videos: category.video,
    };
    // window["webkit"]["messageHandlers"]["openH5Page"]["postMessage"](params);
    this.navCtrl.push(TagVideoListPage, params);
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
