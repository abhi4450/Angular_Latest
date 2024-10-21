import {
  Component,
  Input,
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  standalone: true,
  imports: [],
  templateUrl: './lifecycle.component.html',
  styleUrl: './lifecycle.component.css',
})
export class LifecycleComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input() text?: string;

  constructor() {
    console.log('CONSTRUCTOR');
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges');
    console.log(changes);
  }

  ngDoCheck() { //invoked by angular when UI needs to be changed in any components
    console.log('ngDoCheck');
  }

  ngAfterContentInit() {  // any content that might be projected into view with ng-content, can access those projected content here
    console.log('ngAfterContentInit');
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked');
  }

  ngAfterViewInit() { // all the template element part of the this method
    console.log('ngAfterViewInit');
  }

  ngAfterViewChecked() { //runs whenever angular detects some changes in template(view)
    console.log('ngAfterViewChecked');
  }

  ngOnDestroy() {
    // will execute right before the component instance about to be destroyed,for cleanup process
    console.log('ngOnDestroy');
  }
}
