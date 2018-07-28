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
  hard = [];

  constructor() {
    console.log('Hello TagCardComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit() {
    this.hard = new Array(this.model["hard"]);
  }

  videoItemClick(vid) {
    if (window["webkit"]) {
      window["webkit"]["messageHandlers"]["videoClick"]["postMessage"]({vid: vid});
     } else {
       window["androidCorsonVideo"]["CorsonVideo"]({vid: vid});
     }
  }

}
