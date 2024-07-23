import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpserviceService } from '../appservices/httpservice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-create-package',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-package.component.html',
  styleUrl: './create-package.component.css'
})
export class CreatePackageComponent {
  description: string | undefined;
  sender_name: string | undefined;
  sender_address: string | undefined;
  receiver_name: string | undefined;
  receiver_address: string | undefined;
  weight: number | undefined;
  width: number | undefined;
  height: number | undefined;
  depth: number | undefined;
  public getItemSub: Subscription | undefined;
  errorMessage: any;
  showErrorMessage = false;

  constructor(private _router: Router, private ApiService: HttpserviceService, private spinner: NgxSpinnerService) { }

  create() {
    this.errorMessage = '';
    this.showErrorMessage = false;
    if (this.description === null || this.description === undefined || this.description === '') {
      this.errorMessage = 'Enter package description';
      this.showErrorMessage = true;
      return;
    }
    else if (this.sender_name === null || this.sender_name === undefined || this.sender_name === '') {
      this.errorMessage = 'Enter sender name';
      this.showErrorMessage = true
      return;
    }
    else if (this.sender_address === null || this.sender_address === undefined || this.sender_address === '') {
      this.errorMessage = 'Enter sender address';
      this.showErrorMessage = true
      return;
    }
    else if (this.receiver_name === null || this.receiver_name === undefined || this.receiver_name === '') {
      this.errorMessage = 'Enter receiver name';
      this.showErrorMessage = true
      return;
    }
    else if (this.receiver_address === null || this.receiver_address === undefined || this.receiver_address === '') {
      this.errorMessage = 'Enter receiver address';
      this.showErrorMessage = true
      return;
    }
    else {
      let bodyObj = {
        description: this.description?.trim(),
        sender_name: this.sender_name?.trim(),
        sender_address: this.sender_address?.trim(),
        receiver_address: this.receiver_address?.trim(),
        receiver_name: this.receiver_name?.trim(),
        weight: this.weight || 0,
        width: this.width || 0,
        height: this.height || 0,
        depth: this.depth || 0,
      }
      this.spinner.show();
      this.getItemSub = this.ApiService.postItem(this.ApiService.baseUrl + this.ApiService.addPackageUrl, bodyObj, this.ApiService.httpHeader).subscribe(result => {
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