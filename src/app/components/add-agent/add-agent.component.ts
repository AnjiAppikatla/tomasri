import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-agent',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterModule
  ],
  templateUrl: './add-agent.component.html',
  styleUrl: './add-agent.component.scss'
})
export class AddAgentComponent {

  newAgent = {
    name: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    branch: ''
  };



  constructor(private router: Router) {}

  onSubmit(form: any): void {
    if (form.valid) {
      // Here you would typically call a service to save the agent
      console.log('New Agent:', this.newAgent);
      this.router.navigate(['/agents']);
    }
  }
}
