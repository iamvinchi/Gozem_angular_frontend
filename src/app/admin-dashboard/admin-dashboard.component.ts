import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HttpserviceService } from '../appservices/httpservice.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  packageList: any[] = [];
  deliveryList: any[] = []
  public getItemSub: Subscription | undefined;
  errorMessage: any;
  showErrorMessage = false;

  constructor(private _router: Router, private ApiService: HttpserviceService,
    private spinner: NgxSpinnerService,
  ) {

  }
  goToPage(page: string) {
    this._router.navigate([page])
  }

  ngOnInit(): void {
    this.getPackageList();
    this.getDeliveryList();
  }

  getPackageList() {
    this.spinner.show();
    this.getItemSub = this.ApiService.getAllItems(this.ApiService.baseUrl + this.ApiService.package, this.ApiService.httpHeader).subscribe(result => {
      if (result.status === true) {
        this.packageList = result.data;
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    });
  }

  getDeliveryList() {
    this.spinner.show();
    this.getItemSub = this.ApiService.getAllItems(this.ApiService.baseUrl + this.ApiService.delivery, this.ApiService.httpHeader).subscribe(result => {
      if (result.status === true) {
        this.deliveryList = result.data;
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    });
  }
}
