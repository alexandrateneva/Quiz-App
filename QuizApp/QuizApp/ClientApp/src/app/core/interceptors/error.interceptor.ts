import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GlobalConstants } from '../../global-constants';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(public router: Router, private toastr: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
      this.router.navigateByUrl("/home", { state: { bypassFormGuard: true } });
      this.toastr.error(err.error, GlobalConstants.ERROR_NOTIFICATION);

      return throwError(err);
    }));
  }
}
