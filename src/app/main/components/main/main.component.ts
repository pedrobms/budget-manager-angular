import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { User } from 'src/app/main/user/user';
import { UserService } from 'src/app/main/user/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  currentUser: User = new User();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.userService.getUserData(this.authService.getUserId()).subscribe({
      next: (res) => {
        this.currentUser = res;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.toastService.showSuccess('Logout realizado com sucesso!');
  }
}
