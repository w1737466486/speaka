import { Component, Input, OnInit, NgZone } from '@angular/core';
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
  num = 0;
  isFinish = 0;
  isGet = 0;

  constructor(private http: HttpClient, private zone: NgZone) {
    this.type = this.item["type"];
    this.num = this.item["num"];
    this.isFinish = this.item["isFinish"];
    this.isGet = this.item["isGet"];
    this.isDone = true;
    this.canGet = false;
    console.log(this);
    console.log(this.type);
    this.updateTaskState();
  }

  ngOnInit() {
  }

  updateTaskState() {
    this.zone.run(() => {
      console.log(this.isGet);
      console.log(this.isFinish);
      console.log(this.num);
      if (this.isGet != 0) {
        this.text = "已领取";
      } else if (this.isFinish >= this.num) {
        this.text = "领取";
        this.canGet = true;
      } else {
        this.text = "去完成";
        this.isDone = false;
      }
    });
  }

  doTask() {
    window[this.getTokenCallbackSignature] = this.receiveToken;
    this.getTokenHook("receiveToken");
  }

  receiveToken = (token: String) => {
    console.log(this);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { type: this.type };
    if (this.canGet) {
      this.http.put("http://api.speaka.live/api/task/getGem", body, {headers})
      .subscribe(data => {
        const code = data["code"];
        if (code == 200) {
          this.isGet = 1;
          this.updateTaskState();
        }
      });
    } else {
      console.log(body);
      this.http.put("http://api.speaka.live/api/task/finishUserTask", body, {headers})
      .subscribe(data => {
        console.log(data);
        const code = data["code"];
        if (code == 200) {
          this.isFinish += 1;
          this.updateTaskState();
        }
      });
    }
  };

}
