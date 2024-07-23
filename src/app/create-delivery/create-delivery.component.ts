import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpserviceService } from '../appservices/httpservice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-delivery',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-delivery.component.html',
  styleUrl: './create-delivery.component.css'
})
export class CreateDeliveryComponent {
  package_id: string | undefined;
  packageList: any[] = [];
  public getItemSub: Subscription | undefined;
  errorMessage: any;
  showErrorMessage = false;

  constructor(private _router: Router, private ApiService: HttpserviceService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getPackageList();
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

  create() {
    this.errorMessage = '';
    this.showErrorMessage = false;
    if (this.package_id === null || this.package_id === undefined || this.package_id === '') {
      this.errorMessage = 'Select a package';
      this.showErrorMessage = true;
      return;
    }
    else {
      this.spinner.show();
      this.getItemSub = this.ApiService.postItem(this.ApiService.baseUrl + `${this.ApiService.delivery}${this.package_id?.trim()}`, {}, this.ApiService.httpHeader).subscribe(result => {
        if (result.status === true) {
          this.spinner.hide();
          this._router.navigate(['admin']).then(() => { window.location.reload() });
        } else {
          this.spinner.hide();
          this.errorMessage = result.message;
          this.showErrorMessage = true;
        }
      });
    }

  }
}
