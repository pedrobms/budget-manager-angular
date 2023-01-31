import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { AuthService } from '../../auth.service';
import { FormError } from '../../form-error';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});
  formErrors: FormError[] = [];
  requestError: string = '';

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
        email: ['', Validators.required],
        password: ['', Validators.required]
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
        if (Array.isArray(err.error)) {
          this.formErrors = err.error;
          this.formErrors.forEach((error: FormError) => {
            this.toastService.show(`${error.field}: ${error.error}`, { classname: 'bg-danger text-light', delay: 5000 });
          });
        } else {
          this.requestError = err.error;
          this.toastService.show(`${this.requestError}`, { classname: 'bg-danger text-light', delay: 5000 });
        }
      }
    })
  }
}
