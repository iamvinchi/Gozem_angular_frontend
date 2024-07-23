import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpserviceService } from '../appservices/httpservice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MapComponent } from '../map/map.component';
import { LocationserviceService } from '../appservices/locationservice/locationservice.service';
import { WebsocketService } from '../appservices/websocketService/websocket.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-driver-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, MapComponent],
  templateUrl: './driver-dashboard.component.html',
  styleUrl: './driver-dashboard.component.css'
})
export class DriverDashboardComponent {
  package_id: string | undefined;
  package: any
  public getItemSub: Subscription | undefined;
  mapCenter: google.maps.LatLngLiteral | any;
  zoom = 16;
  directionsResult: google.maps.DirectionsResult | undefined;
  markers: { position: google.maps.LatLngLiteral, options?: google.maps.MarkerOptions }[] = [];
  markerOptions: google.maps.marker.AdvancedMarkerElement | any = {};
  map: google.maps.Map | any;

  constructor(private websocketService: WebsocketService, private locationService: LocationserviceService, private ApiService: HttpserviceService, private spinner: NgxSpinnerService) {

  }

  ngOnDestroy() {
    this.websocketService.disconnect();
  }

  getPackage() {
    this.spinner.show();
    this.getItemSub = this.ApiService.getItemById(this.ApiService.baseUrl + `${this.ApiService.package}${this.package_id}`, this.ApiService.httpHeader).subscribe(async (result: any) => {
      if (result.status === true) {
        this.package = result.data;
        this.subscribeToStatusUpdates()
        console.log(this.package)
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    });
  }

  subscribeToStatusUpdates() {
    this.websocketService.onEvent('status_updated').subscribe((data: any) => {

      swal.fire({ text: `Your delivery is in ${data.status.split("-").join(' ')} mode`, timerProgressBar: true, position: "top-end", timer: 30000, showCancelButton: false, showConfirmButton: false })
    });
  }



  async update(status: string) {
    this.spinner.show();
    if (status === "picked-up") {
      const body = {
        pickup_time: Date.now(),
        status
      };
      this.websocketService.emitEvent("status_changed", { event: 'status_changed', delivery_id: this.package.delivery.delivery_id, status });

      await this.updateDelivery(body);

    } else if (status === "in-transit") {
      const position: any = await this.locationService.getLocation(this.package.delivery.delivery_id);
      const body = {
        start_time: status === "in-transit" ? Date.now() : undefined,
        status,
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      };
      this.websocketService.emitEvent("status_changed", { event: 'status_changed', delivery_id: this.package.delivery.delivery_id, status });

      await this.updateDelivery(body);

    } else if (status === 'delivered' || status === 'failed') {
      const position: any = await this.locationService.getLocation(this.package.delivery.delivery_id);
      const body = {
        end_time: (status === 'delivered' || status === 'failed') ? Date.now() : undefined,
        status,
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      };
      this.websocketService.emitEvent("status_changed", { event: 'status_changed', delivery_id: this.package.delivery.delivery_id, status });

      await this.updateDelivery(body);
      const watchId = localStorage.getItem('watchId')
      navigator.geolocation.clearWatch(Number(watchId))
    }
  }

  updateDelivery(bodyObj: any) {

    this.getItemSub = this.ApiService.updateItem(this.ApiService.baseUrl + `${this.ApiService.delivery}${this.package.delivery._id}`, bodyObj, this.ApiService.httpHeader).subscribe(async (result) => {
      if (result.status === true) {
        await this.getPackage();
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    });
  }

}
