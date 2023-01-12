import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  error: string = '';

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
        email: [''],
        password: [''],
        name: ['']
      });
    }
  }

  register() {
    this.authService.register(this.registerForm.value).subscribe({
      next: (res: any) => {
        this.toastService.show('Cadastro realizado com sucesso!', { classname: 'bg-success text-light', delay: 5000 });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = err.error;
        this.toastService.show(this.error, { classname: 'bg-danger text-light', delay: 5000 });
      }
    });
  }
}
