import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TagVideoListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tag-video-list',
  templateUrl: 'tag-video-list.html',
})
export class TagVideoListPage {

  title: String;
  categorys: Object;
  videos: Object;
  categoryId: Number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone) {
  }

  ngAfterViewInit() {
    window["receiveData"] = this.receiveData;
    if (window["webkit"]) {
      window["webkit"]["messageHandlers"]["getData"]["postMessage"]("receiveData");
    } else {
      window["androidCorsonVideo"]["CorsonVideo"]("receiveData");
    }
  }

  receiveData = (params) => {
    this.zone.run(() => {
      this.title = params.title;
      this.categorys = params.categorys;
      this.categoryId = params.categoryId;
      this.videos = params.videos;
    });
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad TagVideoListPage');
  }

  tagClick(category) {
    this.categoryId = category.id;
    this.videos = category.video;
  }
}
