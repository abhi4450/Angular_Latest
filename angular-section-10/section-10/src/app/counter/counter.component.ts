import {
  ChangeDetectionStrategy,
  Component,
  inject,
  NgZone,
  OnInit,
  signal,
} from '@angular/core';

import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent implements OnInit {
  // private zone = inject(NgZone); //angular give you tool that allow u to opt out change detection /outside zone.js watch mode..
  count = signal(0); //signal leads to change detection for this and its child components

  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }
  ngOnInit() {
    setTimeout(() => {
      this.count.set(0);
    }, 4000);
    // this.zone.runOutsideAngular(() => {
    //   setTimeout(() => {
    //     console.log('Timer expired!'); //even expired timers tells angular to change detection again.
    //   }, 5000);
    // });
  }
  onDecrement() {
    this.count.update((prevCount) => prevCount - 1);
  }

  onIncrement() {
    this.count.update((prevCount) => prevCount + 1);
  }
}
