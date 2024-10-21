import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  viewChild,
  ViewChild,
  ViewChildren,
  output,
} from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent implements OnInit, AfterViewInit {
  // @ViewChild('form') private form?: ElementRef<HTMLFormElement>;
  //viewchild & viewchildren not work for placeholder like ng-content
  private form = viewChild.required<ElementRef<HTMLFormElement>>('form'); //signal related feature
  // @Output() add = new EventEmitter()
  enteredTitle = '';
  enteredText = '';
  add = output<{ title: string; text: string }>();

  ngOnInit() {
    console.log('ONINIT');
    console.log(this.form().nativeElement); // will log it for viewChild function but not for @ViewChild
  }
  ngAfterViewInit() {
    console.log('AFTER VIEW INIT');
    console.log(this.form().nativeElement);
  }
  onSubmit() {
    this.add.emit({ title: this.enteredTitle, text: this.enteredText });
    // this.form().nativeElement.reset();
    this.enteredTitle = '';
    this.enteredText = '';
  }
}
