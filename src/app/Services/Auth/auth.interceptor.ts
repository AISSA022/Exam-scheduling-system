import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { TokenApiModel } from 'src/app/Models/Token-Api.models';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private toast: NgToastService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const mytoken = this.authService.getToken();
        if (mytoken) {
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${mytoken}` },
            });
        }

        return next.handle(req).pipe(
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        return this.handleUnAuthorizedError(req, next)
                    }
                }
                return throwError(() => new Error("Some Error Occurs"))
            })

        );
    }
    handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler) {
        let tokenApiModel = new TokenApiModel();
        tokenApiModel.accessToken = this.authService.getToken()!;
        tokenApiModel.refreshToken = this.authService.getRefreshToken()!;
        return this.authService.renewToken(tokenApiModel)
            .pipe(
                switchMap((data: TokenApiModel) => {
                    this.authService.storeRefreshToken(data.refreshToken);
                    this.authService.storetoken(data.accessToken);
                    req = req.clone({
                        setHeaders: { Authorization: `Bearer ${data.accessToken}` },
                    });
                    return next.handle(req);
                }),
                catchError((err) => {
                    return throwError(() => {
                        this.toast.warning({ detail: "Warning", summary: "Token Is Expired,Login Again" });
                        this.router.navigate(['login'])
                    })
                })
            )
    }
}