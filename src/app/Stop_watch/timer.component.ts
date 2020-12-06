// tslint:disable: typedef member-ordering

import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, interval, Subscription } from 'rxjs';
import { buffer, filter, map } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent {
  timer: any;
  seconds = 0;
  btnWait: Subscription;
  isEnable = false;
  display = 0;

  @ViewChild('waitBtn', { static: true }) waitBtn: ElementRef;

  AfterViewInit(): void {
    this.btnWait = fromEvent(this.waitBtn.nativeElement, 'click')
      .pipe(
        buffer(interval(300)),
        filter((clicks) => clicks.length === 2)
      )
      .subscribe(() => {
        this.timer.unsubscribe();
        this.isEnable = false;
      });
  }

  OnDestroy(): void {
    this.btnWait.unsubscribe();
    this.timer.unsubscribe();
  }

  handleStart(): void {
    this.isEnable = true;
    this.timer = interval(1000)
      .pipe(
        map(() => {
          this.seconds++;
        })
      )
      .subscribe(() => (this.display = this.seconds));
  }

  handleStop(): void {
    if (this.timer) {
      this.timer.unsubscribe();
      this.resetCounter();
      this.isEnable = false;
    }
  }

  resetCounter(): void {
    this.seconds = 0;
  }

  handleReset(): void {
    this.timer.unsubscribe();
    this.resetCounter();
    this.handleStart();
  }

  timeFormat(value: number): string {
    return moment().startOf('day').seconds(value).format('HH:mm:ss');
  }
}
