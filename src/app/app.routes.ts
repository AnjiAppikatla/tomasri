import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { AgentsComponent } from './components/agents/agents.component';
import { AddAgentComponent } from './components/add-agent/add-agent.component';
import { ServicesComponent } from './components/services/services.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { CommissionsComponent } from './components/commissions/commissions.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'Payments', component: TransactionsComponent},
    {path: 'agents', component: AgentsComponent},
    {path: 'add-agent', component: AddAgentComponent},
    {path: 'services', component: ServicesComponent},
    {path: 'collections', component: CollectionsComponent},
    {path: 'commissions', component: CommissionsComponent},
];
