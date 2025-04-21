import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomModule } from '../../custom-module/custom/custom.module';
import { MaterialModule } from '../../custom-module/material/material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DatabaseService } from '../../data-services/database.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CustomModule,
    MaterialModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginComponent {


  emailFc = new FormControl('');
  passwordFc = new FormControl('');

  users = [
    { email: 'admin@example.com', password: 'admin123' },
    { email: 'user@example.com', password: 'user123' }
  ];

  constructor
  (
    private router: Router,
    private dabaseService: DatabaseService
  ) {}



login() {
  if (!this.emailFc.value || !this.passwordFc.value) {
    alert('Please enter both email and password');
    return;
  }

  // Remove immediate navigation
  // this.router.navigate(['/dashboard']); - This was causing the issue

  this.dabaseService.getLoggedAgent(this.emailFc.value, this.passwordFc.value).pipe().subscribe(
     (response: any) => {
      if (response && response.length > 0) {
        console.log('Login Success:', response);
        this.router.navigate(['/dashboard']);
      } else {
        alert('Invalid credentials');
      }
    },
    // error: (error) => {
    //   console.error('Login Failed:', error);
    //   alert('Login failed. Please try again.');
    // }
  );
}

  
}
