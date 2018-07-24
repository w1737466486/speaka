import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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
  @Input() getTokenHook: Function;

  text: string;
  isDone = false;
  type = -1;
  getTokenCallbackSignature = "receiveToken";
  canGet = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    window[this.getTokenCallbackSignature] = this.receiveToken;
    window["this"] = this;

    this.type = this.item["type"];
    const num = this.item["num"];
    const isFinish = this.item["isFinish"];
    const isGet = this.item["isGet"];
    this.isDone = true;
    this.canGet = false;
    if (isGet != 0) {
      this.text = "已领取";
    } else if (isFinish >= num) {
      this.text = "领取";
      this.canGet = true;
    } else {
      this.text = "去完成";
      this.isDone = false;
    }
  }

  doTask() {
    this.getTokenHook("receiveToken");
  }

  receiveToken(token: string) {
    const thx = window["this"];
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(token);
    console.log(thx.type);
    const params = new HttpParams().set('type', `${thx.type}`);
    if (this.canGet) {
      thx.http.put("http://api.speaka.live/api/task/getGem", {headers: headers})
      .subscribe(data => {
        console.log(data);
      });
    } else {
      thx.http.put("http://api.speaka.live/api/task/finishUserTask", {headers: headers})
      .subscribe(data => {
        console.log(data);
      });
    }
  }

}
