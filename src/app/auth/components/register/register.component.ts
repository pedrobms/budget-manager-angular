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
        this.toastService.showSuccess('Cadastrado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.toastService.showError(err.error);
      }
    });
  }
}
