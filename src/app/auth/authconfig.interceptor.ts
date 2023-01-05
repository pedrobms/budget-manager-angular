import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthConfigInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getToken();
    if (token) {
      if (new JwtHelperService().isTokenExpired(token)) {
        this.authService.logout();
      } else {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
            ContentType: 'application/json'
          },
        });
        return next.handle(authReq);
      }
    }
    return next.handle(req);
  }
}
