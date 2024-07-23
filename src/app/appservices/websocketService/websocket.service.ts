import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: Socket | undefined;

  constructor() { }

  initializeWebSocket() {
    this.socket = io('http://localhost:3000'); // Replace with your server URL
  }

  emitEvent(eventName: string, data: any): void {
    if (!this.socket) {
      this.initializeWebSocket();
    }
    this.socket?.emit(eventName, data);
  }

  onEvent(eventName: string): Observable<any> {
    if (!this.socket) {
      this.initializeWebSocket();
    }
    return new Observable<any>(observer => {
      this.socket?.on(eventName, (data: any) => {
        console.log(data, "ffff")
        observer.next(data);
      });
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = undefined;
    }
  }
}
