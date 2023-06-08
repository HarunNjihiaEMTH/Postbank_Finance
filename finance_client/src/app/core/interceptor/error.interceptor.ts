import { AuthService } from "../service/auth.service";
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { TokenCookieService } from "../service/token-storage-cookies.service";
import { Router } from "@angular/router";
import { NotificationService } from "src/app/admin/data/services/notification.service";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notificationAPI: NotificationService,
    private router: Router, private tokenCookieService: TokenCookieService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.tokenCookieService.signOut().subscribe(res => {
            console.log("res: ", res);
            if (res) {
              
              this.router.navigate(["/authentication/signin"]);
              this.notificationAPI.alertWarning('No Permissions to access this resource!');
            }
          }, err => {
            console.log(err)
            this.notificationAPI.alertWarning('Failed to logout user!');
          })
          //location.reload();
        }

        const error = err;
        return throwError(error);
      })
    );
  }
}

//.error.message || err.statusText
