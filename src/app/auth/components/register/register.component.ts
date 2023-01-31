import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { AuthService } from '../../auth.service';
import { FormError } from '../../form-error';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
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
      this.router.navigate(['/home']);
    } else {
      this.registerForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        name: ['', Validators.required]
      });
    }
  }

  register() {
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.toastService.show('Cadastro realizado com sucesso!', { classname: 'bg-success text-light', delay: 5000 });
        this.router.navigate(['/login']);
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
    });
  }
}
