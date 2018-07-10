import { Component, Input } from '@angular/core';

/**
 * Generated class for the TagCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tag-card',
  templateUrl: 'tag-card.html'
})
export class TagCardComponent {

  @Input() model: Object;

  text: string;

  constructor() {
    console.log('Hello TagCardComponent Component');
    this.text = 'Hello World';
  }

  videoItemClick(vid) {
    // if (window.webkit) {
    //   window.webkit.messageHandlers.videoClick.postMessage({vid: vid});
    //  } else {
    //   androidCorsonVideo.CorsonVideo({vid: vid});
    //  }
  }

}