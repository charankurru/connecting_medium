import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  SendMessage(senderId: any, receiverId: any, receivername: any, message: any) {
    return this.http.post(
      environment.apiBaseUrl +
        '/chat-messages' +
        `/${senderId}` +
        `/${receiverId}`,
      {
        receiverId,
        receivername,
        message,
      }
    );
  }

  getmsgs(senderId: any, receiverId: any) {
    return this.http.get(
      environment.apiBaseUrl +
        '/chat-messages' +
        `/${senderId}` +
        `/${receiverId}`
    );
  }

  Markmessages(sender: any, receiver: any) {
    console.log(sender + receiver);
    return this.http.get(
      environment.apiBaseUrl + '/markmessage' + `/${sender}` + `/${receiver}`
    );
  }
  marksallmessages() {
    return this.http.get(environment.apiBaseUrl + '/markallmsgs');
  }
}
