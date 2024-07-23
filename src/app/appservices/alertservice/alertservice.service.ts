import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertserviceService {

  constructor() { }

  alertForErrorAndSuccess(title: any, message: any, type: any) {
    Swal.fire({
      title: title,
      icon: type,
      text: message,
      showDenyButton: false,
      showCancelButton: false,
      showConfirmButton: false,
      confirmButtonText: 'Save',
      position: 'top-end',
      showCloseButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      width: 400,
    });
  }
  alertForErrorAndSuccessWithReload(title: any, message: any, type: any) {
    Swal
      .fire({
        title: title,
        text: message,
        icon: type,
        showCancelButton: false,
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#4caf50',
        cancelButtonColor: '#f44336',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        position: 'top-end',
      })
      .then((results: any) => {
        if (results.value) {
          window.location.reload();
        }
      });
  }
}
