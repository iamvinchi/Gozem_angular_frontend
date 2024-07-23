import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import * as AppConstanst from '../constants/constants'
@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {
  isProductionEnvironment = AppConstanst.isProductionEnvironment;
  isDevEnvironment = AppConstanst.isDevEnvironment;

  //Dev Site
  devApiBaseUrl = 'http://localhost:3000/api/';

  //Live/Production Site
  productionApiBaseUrl = 'https://yara-api-yi3l.onrender.com/api/v1/';


  baseUrl = this.isProductionEnvironment ? this.productionApiBaseUrl : this.isDevEnvironment ? this.devApiBaseUrl : '';

  securedData = 'hguwgtyae4z';
  httpHeader: any;
  addMethod = 'Add';
  deleteMehod = 'Delete?Id=';
  updateMethod = 'Update';
  getAllMethod = 'GetAll';
  getByIdMethod = 'GetById?Id=';
  postAndUpdateQueryString = '?obj=';
  activateDeactivate = 'ActivateDeactivate';
  getAllQueryHeader = 'getall';
  getAuditTrailIdMethod = 'GetById?Id=';

  // Endpoints
  package = 'package/';
  addPackageUrl = this.package.replace('/', '');
  deletePackageUrl = this.package;
  updatePackageUrl = this.package;
  delivery = 'delivery/';
  deleteDeliveryUrl = this.delivery;
  addDeliveryUrl = this.delivery.replace('/', '');
  updateDeliveryUrl = this.delivery;
  constructor(private http: HttpClient) {
  }


  getAllItems(url: any, header: any): Observable<any> {
    return this.http.get(url, header).pipe(retry(50));
  }
  getItemById(urlWithId: any, header: any): Observable<any> {
    return this.http.get(urlWithId, header).pipe(retry(50));
  }
  postItem(url: any, body: any, headers: any): Observable<any> {
    return this.http.post(url, body, headers).pipe(retry(50));
  }
  patchtItem(url: any, body: any, headers: any): Observable<any> {
    return this.http.patch(url, body, headers).pipe(retry(50));
  }
  deleteItemById(urlWithId: any, header: any): Observable<any> {
    return this.http.delete(urlWithId, header).pipe(retry(50));
  }
  updateItem(url: any, body: any, header: any): Observable<any> {
    return this.http.put(url, body, header);
  }
}
