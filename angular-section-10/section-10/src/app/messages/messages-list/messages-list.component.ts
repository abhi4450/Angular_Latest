import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { MessagesService } from '../messages.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  // imports: [AsyncPipe],
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent {
  private messagesService = inject(MessagesService);
  messages = this.messagesService.allMessages;
  // messages$ = this.messagesService.messages$
  // private cdRef = inject(ChangeDetectorRef); // triggers change detection manually
  // private destroyRef = inject(DestroyRef);
  // messages: string[] = [];
  // ngOnInit() {
  //   const subscription = this.messagesService.messages$.subscribe(
  //     (messages) => {
  //       this.messages = messages;
  //       this.cdRef.markForCheck();
  //     }
  //   );
  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   });
  // }
  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}