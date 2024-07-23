import { Component, Input, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule, MapDirectionsRenderer } from "@angular/google-maps";
import { WebsocketService } from '../appservices/websocketService/websocket.service';
import { LocationserviceService } from '../appservices/locationservice/locationservice.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [FormsModule, CommonModule, GoogleMapsModule, MapDirectionsRenderer],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnDestroy {
  @Input() result: any;
  package: any
  mapCenter: google.maps.LatLngLiteral | any;
  zoom = 16;
  directionsResult: google.maps.DirectionsResult | undefined;
  markers: { position: google.maps.LatLngLiteral, options?: google.maps.MarkerOptions }[] = [];
  markerOptions: google.maps.marker.AdvancedMarkerElement | any = {};
  map: google.maps.Map | any;
  locationUpdateSubscription: any;


  constructor(private websocketService: WebsocketService, private locationService: LocationserviceService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.initiateMap();
  }

  ngOnDestroy() {
    if (this.locationUpdateSubscription) {
      this.locationUpdateSubscription.unsubscribe();
    }
  }

  initiateMap() {
    if (this.result?.delivery?.location) {
      this.mapCenter = {
        lat: parseFloat(this.result.delivery.location.lat),
        lng: parseFloat(this.result.delivery.location.lng)
      };
      this.calculateRoute();
      this.addMarkers();
      this.subscribeToDeliveryUpdates();
      this.updateDeliveryLocation()
    }
  }

  calculateRoute() {
    const originLat = parseFloat(this.result?.delivery?.location?.lat);
    const originLng = parseFloat(this.result?.delivery?.location?.lng);
    const destinationLat = parseFloat(this.result?.package?.to_location?.lat);
    const destinationLng = parseFloat(this.result?.package?.to_location?.lng);

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(this.map);
    directionsService.route(
      {
        origin: { lat: originLat, lng: originLng },
        destination: { lat: destinationLat, lng: destinationLng },
        travelMode: google.maps.TravelMode.DRIVING
      },
      (response: any, status: any) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.directionsResult = response;
          directionsRenderer.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  }

  addMarkers() {
    this.markers = [
      { position: { lat: parseFloat(this.result.delivery.location.lat), lng: parseFloat(this.result.delivery.location.lng) }, options: { title: 'Driver' } },
      { position: { lat: parseFloat(this.result.package.to_location.lat), lng: parseFloat(this.result.package.to_location.lng) }, options: { title: 'Destination' } }
    ];
  }

  updateDeliveryLocation() {
    this.locationService.getLocation(this.result.delivery.delivery_id)
  }

  subscribeToDeliveryUpdates() {
    this.locationUpdateSubscription = this.websocketService.onEvent('location_updated').subscribe((data: any) => {

      this.mapCenter = { lat: parseFloat(data.data.location.lat), lng: parseFloat(data.data.location.lng) };

    });
  }

}