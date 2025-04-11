import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { TransactionsComponent } from "../transactions/transactions.component";
import { AgentsComponent } from "../agents/agents.component";
import { AddAgentComponent } from "../add-agent/add-agent.component";
import { ServicesComponent } from "../services/services.component";
import { CollectionsComponent } from "../collections/collections.component";
import { CommissionsComponent } from "../commissions/commissions.component";
import { SidenavComponent } from '../sidenav/sidenav.component';
import { HeaderComponent } from '../header/header.component';
import { SidenavService } from '../../data-services/sidenav.service';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NgChartsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    TransactionsComponent,
    AgentsComponent,
    AddAgentComponent,
    ServicesComponent,
    CollectionsComponent,
    CommissionsComponent,
    SidenavComponent,
    HeaderComponent,
    MatExpansionModule
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  dashboard: boolean = true;
  transactions: boolean = false;
  agentspage: boolean = false;
  addAgnet: boolean = false;
  services: boolean = false;
  collections: boolean = false;
  commissions: boolean = false;

  showSidenav: boolean = true;

  type: string = 'dashboard';

   // Chart Data
   public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      }
    }
  };

  public transactionChartData = {
    labels: ['Deposits', 'Withdrawals', 'Transfers', 'Bills'],
    datasets: [{
      data: [24500, 7500, 12000, 5000],
      backgroundColor: ['#4CAF50', '#f44336', '#2196F3', '#FFC107']
    }]
  };

  public typeChartData = {
    labels: ['Cash', 'Online', 'Check'],
    datasets: [{
      data: [15000, 25000, 9000],
      backgroundColor: ['#4CAF50', '#2196F3', '#9C27B0']
    }]
  };

  agentSummary = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      transactions: 5,
      balance: 5500,
      status: 'Active',
      lastTransaction: new Date()
    },
    {
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      transactions: 3,
      balance: 12000,
      status: 'Active',
      lastTransaction: new Date()
    },
    {
      name: 'Michael Brown',
      email: 'michael@example.com',
      transactions: 1,
      balance: 6000,
      status: 'Inactive',
      lastTransaction: new Date()
    }
  ];




  constructor(
    private sidenavService: SidenavService,
  ) { }

  ngOnInit() {
    this.sidenavService.myVariable$.subscribe((value) => {
      this.type = value;
      this.onPageChange(value);
    });
  }

 
  onPageChange(type: string) {
    this.dashboard = false;
    this.transactions = false;
    this.agentspage = false;
    this.addAgnet = false;
    this.services = false;
    this.collections = false;
    this.commissions = false;

    if(type == 'dashboard'){
      this.dashboard = true;
    }
    if(type == 'Payments'){
      this.transactions = true;
    }
    if(type == 'agents'){
      this.agentspage = true;
    }
    if(type == 'add-agent'){
      this.addAgnet = true;
    }
    if(type == 'services'){
      this.services = true;
    }
    if(type == 'collections'){
      this.collections = true;
    }
    if(type == 'commissions'){
      this.commissions = true;
    }

    console.log( this.dashboard,
      this.transactions,
      this.agentspage,
      this.addAgnet,
      this.services,
      this.collections,
      this.commissions,)

  }

  toggleSidenav() {
    this.showSidenav = !this.showSidenav;
  }


}