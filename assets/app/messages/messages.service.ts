import { Message } from './message.model';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';


@Injectable()
export class MessageService {
    messageIsEdit = new EventEmitter<Message>();

    private messages: Message[] = [];
    constructor(private http: HttpClient) { }

    addMessage(message: Message) {
        this.messages.push(message);
        return this.http
            .post('/message', message, { observe: 'response' })
            .map((response: HttpResponse<any>) => response.body)
            .catch((err: HttpErrorResponse) => Observable.throw(err));
    }

    getMessage() {
        return this.http.get('/message', { observe: 'response' })
            .map((response: HttpResponse<any>) => {
                this.messages = response.body.obj
                    .map(message =>
                        new Message(message.content, 'fake User', message.id, null)
                    );
                return this.messages;
            })
            .catch((err: HttpErrorResponse) => Observable.throw(err));
    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
    }

    updateMessage(message: Message) {

    }

    editMessage(message: Message) {
        this.messageIsEdit.emit(message);
    }
}