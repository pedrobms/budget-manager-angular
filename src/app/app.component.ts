import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { StorageService } from './_services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private role: string = '';
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string = '';

  constructor(private storageService: StorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.role = user.role;
      this.showAdminBoard = this.role === 'ROLE_ADMIN';
      this.showModeratorBoard = this.role === 'ROLE_MODERATOR';
      this.username = user.name;
      console.log(user);
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: data => {
        console.log(data);
        this.storageService.signOut();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
