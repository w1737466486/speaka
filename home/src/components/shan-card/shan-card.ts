import { Component, Input } from '@angular/core';

/**
 * Generated class for the ShanCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'shan-card',
  templateUrl: 'shan-card.html'
})
export class ShanCardComponent {

  @Input() model: Object;

  text: string;

  constructor() {
    console.log('Hello ShanCardComponent Component');
    this.text = 'Hello World';
  }

  refresh() {
    alert(123);
  }

  videoItemClick(vid) {
    if (window["webkit"]) {
      window["webkit"]["messageHandlers"]["videoClick"]["postMessage"]({vid: vid});
     } else {
       window["androidCorsonVideo"]["CorsonVideo"]({vid: vid});
     }
  }
}
