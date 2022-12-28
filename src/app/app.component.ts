import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Budget Manager';

  constructor(public authService: AuthService) { }

  ngOnInit() {
    if (new JwtHelperService().isTokenExpired(this.authService.getToken() || '{}')) {
      this.logout();
    }
  }

  logout() {
    this.authService.logout();
  }
}
