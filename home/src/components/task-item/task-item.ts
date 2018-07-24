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
    console.log(777);
  }

  ngOnInit() {
    this.type = this.item["type"];
    this.num = this.item["num"];
    this.isFinish = this.item["isFinish"];
    this.isGet = this.item["isGet"];
    this.canGet = false;
    console.log(888);
    this.updateTaskState();
  }

  updateTaskState() {
    this.zone.run(() => {
      this.isDone = true;
      if (this.isGet != 0) {
        console.log(444);
        this.text = "已领取";
      } else if (this.isFinish >= this.num) {
        console.log(123);
        this.text = "领取";
        this.canGet = true;
      } else {
        console.log(666);
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
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { type: this.type };
    if (this.canGet) {
      this.http.put("http://api.speaka.live/api/task/getGem", body, {headers})
      .subscribe(data => {
        const code = data["code"];
        if (code == 200) {
          this.isGet = 1;
          console.log(999);
          this.updateTaskState();
        }
      });
    } else {
      this.http.put("http://api.speaka.live/api/task/finishUserTask", body, {headers})
      .subscribe(data => {
        const code = data["code"];
        if (code == 200) {
          this.isFinish += 1;
          console.log(101010);
          this.updateTaskState();
        }
      });
    }
  };

}
