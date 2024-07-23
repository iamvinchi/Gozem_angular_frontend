import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpserviceService } from '../appservices/httpservice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MapComponent } from '../map/map.component';


@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, MapComponent],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent {
  package_id: string | undefined;
  package: any
  public getItemSub: Subscription | undefined;
  errorMessage: any;
  showErrorMessage = false;

  constructor(private ApiService: HttpserviceService, private spinner: NgxSpinnerService) { }

  getPackage() {
    this.spinner.show();
    this.getItemSub = this.ApiService.getItemById(this.ApiService.baseUrl + `${this.ApiService.package}${this.package_id}`, this.ApiService.httpHeader).subscribe(result => {
      if (result.status === true) {
        this.package = result.data;
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    });
  }
}
