import {
  Component,
  HostBinding,
  inject,
  input,
  ViewEncapsulation,
  ElementRef,
  ContentChild,
  contentChild,
  AfterContentInit,
  afterRender,
  afterNextRender,
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()',
  },
})
export class ControlComponent implements AfterContentInit {
  // @HostBinding('class') className = 'control';
  //@HostListener onClick() {console.log('Clicked')} allows you to bind a method to the event you want listen for
  label = input.required<string>();
  private el = inject(ElementRef); // allow angular to give you access to the host element
  // @ContentChild('input') private control?: ElementRef<
  //   HTMLInputElement | HTMLTextAreaElement
  // >;
  private control =
    contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');
  
    constructor() {
      afterRender(() => { //triggered after and after whenever any changes in any component occurs
        console.log('afterRender')
      });
      afterNextRender(() => { //will only be triggered for next change, anywhere in the app
        console.log('afterNextRender')
      });
    }
   
  
  ngAfterContentInit() {
    console.log(this.control());
  }
  

  onClick() {
    console.log('Clicked!');
    console.log(this.el);
    console.log(this.control());
  }
}
