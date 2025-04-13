import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';

export interface Transaction {
  id: number;
  date: Date;
  type: string;
  accountNumber: string;
  amount: number;
  status: string;
  description: string;
  clinetName: string;
  branch: string;
}

export interface DenominationValue {
  value: number;
  count: number;
}

interface AgentTransaction {
  date: Date;
  amount: number;
  paymentType: string;
  clientName: string;
}

interface Agent {
  name: string;
  id: number;
  transactions: AgentTransaction[];
}

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatExpansionModule,
    NgChartsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('transactionDialog') transactionDialog!: TemplateRef<any>;

  clientsData: any = [
    { id: 1, name: 'client 1' },
    { id: 2, name: 'client 2' },
    { id: 3, name: 'client 3' },
    { id: 4, name: 'client 4' },
    { id: 5, name: 'client 5' },
    { id: 6, name: 'client 6' }
  ]

  displayedColumns: string[] = [
    'date',
    'type',
    'accountNumber',
    'clientName',
    'amount',
    'status',
    'description',
    'branch',
    'actions'
  ];
  transactions: Transaction[] = [
    {
      id: 1,
      date: new Date(),
      type: 'Cash Deposit',
      accountNumber: '1234567890',
      amount: 1000,
      status: 'Completed',
      description: 'Salary deposit',
      clinetName: 'John Doe',
      branch: 'Main Branch'
    },
    // Add 9 more sample transactions here with different values
  ];

  showForm = false;

  public barChartData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: Array(12).fill(0),
        label: 'Monthly Transactions',
        backgroundColor: 'rgba(0, 123, 255, 0.6)'
      }
    ]
  };

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount ($)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Month'
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 20,
          padding: 10
        }
      }
    }
  };

  closeForm() {
    this.showForm = false;
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'px-2 py-1 rounded-full bg-green-100 text-green-800';
      case 'pending':
        return 'px-2 py-1 rounded-full bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'px-2 py-1 rounded-full bg-red-100 text-red-800';
      default:
        return '';
    }
  }
  transactionTypes = [
    'Cash Deposit',
    'Cash Withdrawal',
    'Fund Transfer',
    'Bill Payment',
    'Account Opening',
    'Balance Inquiry'
  ];

  selectedType: string = '';
  amount: number = 0;
  accountNumber: string = '';
  description: string = '';

  // Add these properties
  selectedAgent: Agent | null = null;
  customerName: string = '';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  transactionForm!: FormGroup;

  bankNames = ['SBI', 'HDFC', 'ICICI', 'AXIS'];

  denominations = [500, 200, 100, 50, 20, 10];
  selectedDenominations: { [key: number]: number } = {};

  agentsData: any = [
    { id: 1, name: 'Agent 1' },
    { id: 2, name: 'Agent 2' },
    { id: 3, name: 'Agent 3' },
  ]



  // Update the resetForm method
  private resetForm() {
    this.transactionForm.reset();
  }


  // denominations = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
  denominationValues: { [key: number]: number } = {};

  constructor(private dialog: MatDialog, private fb: FormBuilder) {
    this.transactionForm = this.fb.group({
      agent: ['', Validators.required],
      clientName: ['', Validators.required],
      type: ['', Validators.required],
      amount: ['', [Validators.required, Validators.required]],
      bankName: [''],
      denomination500: ['', [Validators.required, Validators.required]],
      denomination200: ['', [Validators.required, Validators.required]],
      denomination100: ['', [Validators.required, Validators.required]],
      denomination50: ['', [Validators.required, Validators.required]],
      denomination20: ['', [Validators.required, Validators.required]],
      denomination10: ['', [Validators.required, Validators.required]],
      denomination5: ['', [Validators.required, Validators.required]],
      denomination2: ['', [Validators.required, Validators.required]],
      denomination1: ['', [Validators.required, Validators.required]]
    });

    // Subscribe to denomination changes
    this.transactionForm.get('denominations')?.valueChanges.subscribe(values => {
      if (values) {
        const total = Object.entries(values).reduce((sum, [denom, count]) => {
          return sum + (Number(denom) * Number(count));
        }, 0);
        this.transactionForm.patchValue({ amount: total }, { emitEvent: false });
      }
    });
  }

  // Add method to calculate total for each denomination
  getDenominationTotal(denomination: number): number {
    const count = this.transactionForm.get(`denominations.${denomination}`)?.value || 0;
    return denomination * count;
  }


  deleteTransaction(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this transaction?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transactions = this.transactions.filter(t => t.id !== id);
      }
    });
  }

  // Add this method to update bar chart data
  private updateChartData() {
    const monthlyTotals = Array(12).fill(0);

    this.agents.forEach((agent:any) => {
      agent.transactions.forEach((transaction:any) => {
        const month = new Date(transaction.date).getMonth();
        monthlyTotals[month] += transaction.amount;
      });
    });

    this.barChartData.datasets[0].data = monthlyTotals;
    if (this.chart) {
      this.chart.update();
    }
  }


  agents: any = [
    // {
    //   name: 'Agent 1',
    //   id: 1,
    //   email: 'EMAIL',
    //   transactions: [
    //     { id: 1, date: new Date(), amount: 1000, paymentType: 'Cash', clientName: 'Client A' },
    //   ]
    // }
   
  ]



  getAgentTotal(transactions: AgentTransaction[]): number {
    return transactions.reduce((sum, trans) => sum + trans.amount, 0);
  }

  getPaymentTypeClass(type: string): string {
    switch (type.toLowerCase()) {
      case 'cash':
        return 'text-green-600';
      case 'online':
        return 'text-blue-600';
      case 'check':
        return 'text-purple-600';
      default:
        return '';
    }
  }

  // Add after existing barChartData
  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)'
      ]
    }]
  };

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      }
    }
  };

  // Add method to update pie chart
  private updatePieChart() {
    // Filter out agents with no transactions
    const activeAgents = this.agents.filter((agent: Agent) => 
      agent.transactions && agent.transactions.length > 0
    );
  
    // Calculate totals for each agent
    const agentTotals = activeAgents.map((agent: Agent) => ({
      name: agent.name,
      total: agent.transactions.reduce((sum, trans) => sum + trans.amount, 0)
    }));
  
    // Update pie chart data
    this.pieChartData = {
      labels: agentTotals.map((a:any) => a.name),
      datasets: [{
        data: agentTotals.map((a:any) => a.total),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)'
        ]
      }]
    };
  
    // Force chart update
    if (this.chart) {
      this.chart.update();
    }
  }


  denominationTotal: number = 0;



  // Update ngOnInit to include pie chart initialization
  ngOnInit() {
    // this.updateChartData();
    this.updatePieChart();
    this.initForm();
    // ... rest of existing ngOnInit code ...
  }

  closeDialog() {
    this.dialog.closeAll();
    this.resetForm();
  }

  initForm() {
    const denominationControls: any = {};
    this.denominations.forEach(denom => {
      denominationControls['denomination' + denom] = ['', Validators.min(0)];
    });

    this.transactionForm = this.fb.group({
      agent: ['', Validators.required],
      clientName: ['', Validators.required],
      type: ['', Validators.required],
      amount: ['', Validators.required],
      bankName: [''],
      ...denominationControls
    });

    // Subscribe to type changes
    this.transactionForm.get('type')?.valueChanges.subscribe(value => {
      if (value === 'cdm') {
        this.calculateTotal();
      }
    });
  }

  calculateTotal() {
    this.denominationTotal = this.denominations.reduce((total, denom) => {
      const count = Number(this.transactionForm.get('denomination' + denom)?.value || 0);
      return total + (denom * count);
    }, 0);

    this.transactionForm.patchValue({
      amount: this.denominationTotal
    }, { emitEvent: false });
  }

 

  saveTransaction() {
    if (this.transactionForm.valid) {
      const formValue = this.transactionForm.value;
      console.log(formValue)

    
      
      // Create new transaction
      const newTransaction: AgentTransaction = {
        date: new Date(),
        paymentType: this.transactionForm.controls['type'].value,
        amount: this.transactionForm.controls['amount'].value,
        clientName: this.transactionForm.controls['clientName'].value,
      };
  
      // Check if agent exists
      const existingAgent = this.agents.find((a: Agent) => a.id === formValue.agent.id);
  
      if (existingAgent) {
        // Add transaction to existing agent
        if (!existingAgent.transactions) {
          existingAgent.transactions = [];
        }
        existingAgent.transactions.push(newTransaction);
      } else {
        // Create new agent with transaction
        const newAgent: Agent = {
          id: this.transactionForm.controls['agent'].value,
          name: this.transactionForm.controls['agent'].value,
          transactions: [newTransaction]
        };
        this.agents.push(newAgent);
      }
  
      // Handle CDM type validation
      if (formValue.type === 'cdm') {
        this.calculateTotal();
        if (this.denominationTotal !== formValue.amount) {
          alert('Denomination total does not match the amount');
          return;
        }
      }
  
      // Update charts
      this.updatePieChart();
      this.updateChartData();
      
      // Close dialog and reset form
      this.closeDialog();
    }

    console.log(this.agents)
  }
 
  showNewTransactionForm() {
    this.resetForm();
    this.dialog.open(this.transactionDialog, {
      width: '800px'
    });
  }

}
