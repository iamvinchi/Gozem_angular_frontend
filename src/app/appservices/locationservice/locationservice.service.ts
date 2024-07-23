import { Injectable } from '@angular/core';
import { WebsocketService } from '../websocketService/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class LocationserviceService {

  constructor(private websocketService: WebsocketService) {
  }

  getLocation(deliveryId?: any, status?: any): Promise<GeolocationPosition> {
    const options = {
      enableHighAccuracy: true
    };
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        const watchId = navigator.geolocation.watchPosition(
          (position) => {
            const body = {
              status,
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
            };
            this.websocketService.emitEvent("location_changed", { event: 'location_changed', delivery_id: deliveryId, location: body.location });
            resolve(position);
          },
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                window.alert('User denied the request for Geolocation.');
                break;
              case error.POSITION_UNAVAILABLE:
                window.alert('Location information is unavailable.');
                break;
              case error.TIMEOUT:
                window.alert('The request to get user location timed out.');
                break;
              default:
                window.alert('An unknown error occurred.');
                break;
            }
            reject(error);
          },
          options
        );
        localStorage.setItem("watchId", watchId.toString())
      } else {
        console.log('Geolocation is not supported by this browser.');
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  }
}
