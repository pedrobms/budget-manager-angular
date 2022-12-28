import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  error: string = '';

  constructor(public formBuilder: FormBuilder, public authService: AuthService, public router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: [''],
      password: [''],
      name: ['']
    });
  }

  register() {
    this.authService.register(this.registerForm.value).subscribe({
      next: (res: any) => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = err.error;
      }
    });
  }
}
