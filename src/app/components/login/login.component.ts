import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomModule } from '../../custom-module/custom/custom.module';
import { MaterialModule } from '../../custom-module/material/material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CustomModule,
    MaterialModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginComponent {
  email = '';
  password = '';

  users = [
    { email: 'admin@example.com', password: 'admin123' },
    { email: 'user@example.com', password: 'user123' }
  ];

  constructor(private router: Router) {}

  login() {
    const isValid = this.users.some(
      user => user.email === this.email && user.password === this.password
    );

    if (isValid) {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid credentials');
    }
  }
}
