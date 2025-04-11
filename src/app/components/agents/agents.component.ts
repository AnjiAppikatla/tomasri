import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {  ViewChild, TemplateRef } from '@angular/core';

export interface Agent {
  id: number;
  name: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  branch: string;
  joinDate: Date;
}

@Component({
  selector: 'app-agents',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
    templateUrl: './agents.component.html',
  styleUrl: './agents.component.scss'
})
export class AgentsComponent {

  @ViewChild('agentDialog') agentDialog!: TemplateRef<any>;
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'phone', 'branch', 'joinDate', 'actions'];
  
  newAgent = {
    name: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    branch: ''
  };

  agents: Agent[] = [
    {
      id: 1,
      name: 'Ravi Kumar',
      username: 'ravi.k',
      password: 'pass1234',
      email: 'ravi.kumar@example.com',
      phone: '9876543210',
      branch: 'Hyderabad',
      joinDate: new Date('2022-01-15')
    },
    {
      id: 2,
      name: 'Anjali Sharma',
      username: 'anjali.s',
      password: 'securepass',
      email: 'anjali.sharma@example.com',
      phone: '9123456780',
      branch: 'Bangalore',
      joinDate: new Date('2021-07-10')
    },
    {
      id: 3,
      name: 'Suresh Reddy',
      username: 'suresh.r',
      password: 'suresh987',
      email: 'suresh.reddy@example.com',
      phone: '9988776655',
      branch: 'Chennai',
      joinDate: new Date('2023-03-20')
    },
    {
      id: 4,
      name: 'Meena Patel',
      username: 'meena.p',
      password: 'meena@123',
      email: 'meena.patel@example.com',
      phone: '9090909090',
      branch: 'Pune',
      joinDate: new Date('2020-11-05')
    }
  ];

  constructor(private dialog: MatDialog) {}

  isEditing = false;
  selectedAgentId: number | null = null;

  openNewAgentDialog(agent?: Agent): void {
    this.isEditing = !!agent;
    if (agent) {
      this.selectedAgentId = agent.id;
      this.newAgent = {
        name: agent.name,
        username: agent.username,
        password: '',
        email: agent.email,
        phone: agent.phone,
        branch: agent.branch
      };
    } else {
      this.resetNewAgent();
    }
    
    this.dialog.open(this.agentDialog, {
      width: '600px'
    });
  }

  addOrUpdateAgent(form: any): void {
    if (form.valid) {
      if (this.isEditing && this.selectedAgentId) {
        // Update existing agent
        const updatedAgent: Agent = {
          id: this.selectedAgentId,
          name: this.newAgent.name,
          username: this.newAgent.username,
          password: this.newAgent.password,
          email: this.newAgent.email,
          phone: this.newAgent.phone,
          branch: this.newAgent.branch,
          joinDate: this.agents.find(a => a.id === this.selectedAgentId)?.joinDate || new Date()
        };
        
        const index = this.agents.findIndex(a => a.id === this.selectedAgentId);
        if (index !== -1) {
          this.agents[index] = updatedAgent;
        }
      } else {
        // Add new agent
        const agent: Agent = {
          id: this.agents.length + 1,
          name: this.newAgent.name,
          username: this.newAgent.username,
          password: this.newAgent.password,
          email: this.newAgent.email,
          phone: this.newAgent.phone,
          branch: this.newAgent.branch,
          joinDate: new Date()
        };
        this.agents = [agent, ...this.agents];
      }
      this.closeDialog();
    }
  }

  closeDialog(): void {
    this.dialog.closeAll();
    this.isEditing = false;
    this.selectedAgentId = null;
    this.resetNewAgent();
  }

  private resetNewAgent(): void {
    this.newAgent = {
      name: '',
      username: '',
      password: '',
      email: '',
      phone: '',
      branch: ''
    };
  }
}
