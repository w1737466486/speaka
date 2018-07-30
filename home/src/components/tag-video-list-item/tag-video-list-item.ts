import { Component, Input } from '@angular/core';

/**
 * Generated class for the TagVideoListItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tag-video-list-item',
  templateUrl: 'tag-video-list-item.html'
})
export class TagVideoListItemComponent {

  @Input() item:Object;
  text: string;
  hard = [];

  constructor() {
    console.log('Hello TagVideoListItemComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit() {
    this.hard = new Array(this.item["hard"]);
  }

  videoItemClick(vid) {
    if (window["webkit"]) {
      window["webkit"]["messageHandlers"]["videoClick"]["postMessage"]({vid: vid});
     } else {
       window["androidCorsonVideo"]["CorsonVideo"]({vid: vid});
     }
  }

}
