import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { AuthService } from '../../../../auth/auth.service';
import { User } from '../../user';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  currentUser: User = new User();

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getUserData(this.authService.getUserId()).subscribe((res) => {
      this.currentUser = res;
    });
  }

  edit() {
    this.userService.updateUser(this.currentUser).subscribe({
      next: () => {
        this.toastService.showSuccess('Usuário atualizado com sucesso!');
        this.router.navigate(['/main']);
      },
      error: (err) => {
        this.toastService.showError(err.error);
      }
    });
  }
}
