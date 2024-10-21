import { Component } from '@angular/core';
import { interval,map } from 'rxjs' //third party library , angular uses.
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
// export class AppComponent implements OnInit {

//   constructor() {
//     // effect(() => {
//     //   console.log("" )//effect fn reexecutes whenever any signal value used here changes.
//     // })
//     toObservable() // to convert signals to observable
//   }
//   private destroyRef = inject(DestroyRef);
//   //convert observables to signal
//   interval$ = interval(1000); // observables have no initial value.signal otherwise do have some initial value.
//   intervalSignal = toSignal(this.interval$,{initialValue: 0}) // when converting like this, angular initialize it with undefined. so u can set your own initial value.

//   ngOnInit():void {
//     const subscription = interval(1000).pipe(
//       map((val)=> val * 2)  //map operator modifies the emitted value
//     ).subscribe({
        
//       next: (val) => console.log(val),
//       // complete: () => {} // will be called when this observables won't emit any more.
//       // error:() => {} will be called when any error occurs.
//     })
//     this.destroyRef.onDestroy(() => {
//       subscription.unsubscribe();
//     })
//     //pipe() allows you to add some rxjs operator to this pipeline
//     //next() will be triggered for every new value that is emitted.
//     //unlike behaviourSubject , this automatically emits values.
//     //every 1000ms a value will be produced.
//     //Inorder to listen and use the emitted values, you need to subscribe to it.
//   }

// }


export class AppComponent implements OnInit{
//this class imported from rxjs
  customInterval$ = new Observable((subscriber) => {
    let timesExecuted = 0;
    const interval = setInterval(() => {
      if (timesExecuted > 3) {
        clearInterval(interval);
        subscriber.complete(); // will emit an event that will automatically cleanup the subscriptiion
        return;
      }
      // this will emit value every 2sec
      console.log("Emitting a new value from custom observables")
      subscriber.next({ message: 'New value' }); 
      timesExecuted++;
     },2000)
  }); 

  ngOnInit() {
    this.customInterval$.subscribe({
      next: (val) => {
        console.log(`Clicked button ${this.clickCount()} times`)
      },
      complete: () => console.log("Completed!")
  })
}
}
