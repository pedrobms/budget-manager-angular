import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  currentUser: User = new User();

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.userService.getUserData(this.authService.getUserId()).subscribe({
      next: (res) => {
        this.currentUser = res;
      }
    });
  }
}
