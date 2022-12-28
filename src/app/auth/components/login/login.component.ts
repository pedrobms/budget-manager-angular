import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});
  error: string = '';

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public userService: UserService,
    public router: Router,
  ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/home']);
    } else {
      this.loginForm = this.formBuilder.group({
        email: [''],
        password: ['']
      });
    }
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.userService.getUserData(res.id).subscribe((res) => {
          this.authService.currentUser = res;
          this.router.navigate(['/home']);
        });
      },
      error: (err) => {
        this.error = err.error;
      }
    })
  }
}
