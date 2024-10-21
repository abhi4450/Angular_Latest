import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  //   messages$ = new BehaviorSubject<string[]>([]);
  //   private messages: string[] = [];
  private messages = signal<string[]>([]);
  allMessages = this.messages.asReadonly();
  //   get allMessages() {
  //     return [...this.messages];
  //   }
  addMessage(message: string) {
    this.messages.update((oldMessages) => [...oldMessages, message]);
    // this.messages = [...this.messages, message];
    // this.messages$.next([...this.messages]);
  }
}
