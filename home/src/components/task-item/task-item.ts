import { Component, Input } from '@angular/core';

/**
 * Generated class for the TaskItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'task-item',
  templateUrl: 'task-item.html'
})
export class TaskItemComponent {

  @Input() item: Object;

  text: string;

  constructor() {
    console.log('Hello TaskItemComponent Component');
    this.text = 'Hello World';
  }

}
