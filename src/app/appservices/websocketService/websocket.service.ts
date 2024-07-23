import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import * as AppConstanst from '../../constants/constants'


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: Socket | undefined;
  isProductionEnvironment = AppConstanst.isProductionEnvironment;
  isDevEnvironment = AppConstanst.isDevEnvironment;

  constructor() { }
  devSocketUrl = 'http://localhost:3000';

  productionSocketUrl = 'https://gozem-api.onrender.com';
  socketUrl = this.isProductionEnvironment ? this.productionSocketUrl : this.isDevEnvironment ? this.devSocketUrl : '';

  initializeWebSocket() {
    this.socket = io(this.socketUrl); // Replace with your server URL
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
