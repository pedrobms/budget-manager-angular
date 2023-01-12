import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public toastService: ToastService
  ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/main']);
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
        this.authService.currentUser = res;
        this.router.navigate(['/main']);
      },
      error: (err) => {
        this.toastService.show(err.error, { classname: 'bg-danger text-light', delay: 5000 });
      }
    })
  }
}
