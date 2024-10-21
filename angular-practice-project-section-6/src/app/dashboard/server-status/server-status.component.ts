import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
})
export class ServerStatusComponent implements OnInit {
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');
  private destroyRef = inject(DestroyRef); //alternative to ngOnDestroy
  // private interval?: ReturnType<typeof setInterval>;
  constructor() {
    effect(() => {
      //allows you to run code when signal value changes
      console.log(this.currentStatus());
      // onCleanup(() => {
      //   clearTimeout(timer);  //effect's cleanup fn.
      // });
    });
  }

  ngOnInit() {
    //life cycle method, runs when angular has initialized all the component's input
    console.log('ON INIT');
    const interval = setInterval(() => {
      const rnd = Math.random();
      if (rnd < 0.5) {
        this.currentStatus.set('online');
      } else if (rnd < 0.9) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 5000);
    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
    });
  }
  ngAfterViewInit() {
    console.log('AFTER VIEW INIT');
  }
  // ngOnDestroy() {
  //   clearInterval(this.interval);
  // }
}
