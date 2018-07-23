import { Component, Input, OnInit } from '@angular/core';

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
export class TaskItemComponent implements OnInit {

  @Input() item: Object;

  text: string;
  isDone = false;


  constructor() {
  }

  ngOnInit() {
    const type = this.item["type"];
    const num = this.item["num"];
    const isFinish = this.item["isFinish"];
    const isGet = this.item["isGet"];
    this.isDone = true;
    if (isGet != 0) {
      this.text = "已领取";
    } else if (isFinish >= num) {
      this.text = "已完成";
    } else {
      this.text = "去完成";
      this.isDone = false;
    }
  }

  doTask() {
    console.log("dotask");
  }

}
