import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpserviceService } from '../appservices/httpservice.service';


@Injectable({
  providedIn: 'root'
})
export class HttpinterceptorService implements HttpInterceptor {
  constructor(
    public ApiService: HttpserviceService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
      return throwError(err);
    })
  );

}
}
