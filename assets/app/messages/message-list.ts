import { Message } from './message.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-message-list',
    template: `
        <div class="col-md-8 col-md-offset-2">
                <app-message
                    *ngFor="let message of messages"
                    (editClicked)="message.content = $event"
                    [message]="message">
                </app-message>
        </div>
    `
})

export class MessageListComponent implements OnInit {

    messages: Message[] = [
        { content: 'A message', username: 'ritwickdey' },
        { content: 'new message', username: 'akash' }
    ];

    constructor() { }

    ngOnInit() { }

}