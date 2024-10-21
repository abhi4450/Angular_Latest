import { Component, input, signal, output } from '@angular/core';
import { Ticket } from './ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  // data = input.required<Ticket>({alias: 'data'});
  // data = input.required<Ticket>({ transform: (value)=>});
  data = input.required<Ticket>();
  // close = output({alias:''});
  // @Output('closeTicket') // directly passing alias
  close = output();
  detailsVisible = signal(false);
  onToggleDetails() {
    // this.detailsVisible.set(!this.detailsVisible());
    this.detailsVisible.update((wasVisible) => !wasVisible);
  }

  onMarkAsCompleted() {
    this.close.emit();
  }
}
