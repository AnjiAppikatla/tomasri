import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormControlName, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Update the Collection interface to include time
interface Collection {

  collectionType: string,
  clientName: string,
  totalAmount: 0,
  cashAmount: 0,
  onlineAmount: 0,
  onlineType: '',
  date: Date;
  time?: string;
  denomination500: string,
  denomination200: string,
  denomination100: string,
  denomination50: string,
  denomination20: string,
  denomination10: string,
  denomination5: string,
  denomination2: string,
  denomination1: string
}

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    NgChartsModule,
    MatExpansionModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss'
})
export class CollectionsComponent implements OnInit {

  @ViewChild('collectionDialog') collectionDialog!: TemplateRef<any>;

  constructor(private dialog: MatDialog, private fb: FormBuilder) { }
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  
  collectionTypes = ['All', 'Cash', 'Online'];

  collectionTypesTotal = [
    { name: 'Cash', value: 0 },
    { name: 'Online', value: 0 }
  ];

  selectedTypeFc = new FormControl('All')

  collectionTotalAmount: number = 0;

  selectedClient: string = 'All';

  employees = [
    { id: 1, name: 'Agent Mike' },
    { id: 2, name: 'Agent Lisa' },
    { id: 3, name: 'Agent John' },
    { id: 4, name: 'Agent Sarah' },
    { id: 5, name: 'Admin' }
  ];

  collectionGrop!: FormGroup;

  cashAmountRow: boolean = false
  onlineAmountRow: boolean = false;
  totalCash: number = 0;
  totalOnlineCash: number = 0;

  public barChartData: ChartData<'bar'> = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56],
        label: 'Collections',
        backgroundColor: 'rgba(0,123,255,0.6)'
      }
    ]
  };

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  collections: Collection[] = [];

  ngOnInit() {
    this.updateChartData();

    this.collectionGrop = new FormGroup({
      collectionType: new FormControl('', Validators.required),
      clientName: new FormControl('', Validators.required),
      totalAmount: new FormControl('', Validators.required),
      cashAmount: new FormControl('', Validators.required),
      onlineAmount: new FormControl('', Validators.required),
      onlineType: new FormControl('', Validators.required),
      accountName: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
      denomination500: new FormControl('', Validators.required),
      denomination200: new FormControl('', Validators.required),
      denomination100: new FormControl('', Validators.required),
      denomination50: new FormControl('', Validators.required),
      denomination20: new FormControl('', Validators.required),
      denomination10: new FormControl('', Validators.required),
      denomination5: new FormControl('', Validators.required),
      denomination2: new FormControl('', Validators.required),
      denomination1: new FormControl('', Validators.required),
    })
  }

  onTypeChange(type: string) {
    this.selectedTypeFc.setValue(type);
    this.updateChartData();
  }

  collectionTypeChange(event: any) {
    this.cashAmountRow = false;
    this.onlineAmountRow = false;
    if (event.value == 'Cash') {
      this.cashAmountRow = true
      this.onlineAmountRow = false
    }
    else if (event.value == 'Online') {
      this.cashAmountRow = false
      this.onlineAmountRow = true
    }
    else if (event.value == 'cash&online') {
      this.cashAmountRow = true
      this.onlineAmountRow = true
    }
  }

  private updateChartData() {
    let filteredData = this.collections;
    
    if (this.selectedTypeFc.value !== 'All') {
      filteredData = this.collections.filter(c => {
        if (this.selectedTypeFc.value === 'Cash') {
          return c.cashAmount > 0;
        } else if (this.selectedTypeFc.value === 'Online') {
          return c.onlineAmount > 0;
        }
        return c.collectionType === this.selectedTypeFc.value;
      });
    }
  
    this.barChartData.datasets[0].data = filteredData.map(c => {
      if (this.selectedTypeFc.value === 'Cash') {
        return c.cashAmount;
      } else if (this.selectedTypeFc.value === 'Online') {
        return c.onlineAmount;
      }
      return c.totalAmount;
    });
    
    this.chart?.update();
  }

  // Add this method to the component class
  getTypeTotal(type: string): number {
    return this.collections
      .filter(c => c.collectionType === type)
      .reduce((sum, item) => sum + item.totalAmount, 0);
  }

  getTotalCollections() {
    // Reset totals before calculating
    this.totalCash = 0;
    this.totalOnlineCash = 0;

    // Calculate totals with number conversion
    this.collections.forEach(x => {
      this.totalCash += Number(x.cashAmount) || 0;
      this.totalOnlineCash += Number(x.onlineAmount) || 0;
    });

    // Update collection types total
    this.collectionTypesTotal.forEach(y => {
      if (y.name === 'Cash') {
        y.value = this.totalCash;
      }
      else if (y.name === 'Online') {
        y.value = this.totalOnlineCash;
      }
    });

    // Calculate total amount
    this.collectionTotalAmount = Number(this.totalCash) + Number(this.totalOnlineCash);

    return this.collectionTotalAmount;
  }

  getCollectionsByType(type: string): any[] {
    return this.collections.filter(c => c.collectionType === type);
  }

  showForm = false;

  clients = [
    { id: 1, name: 'John Smith' },
    { id: 2, name: 'Sarah Johnson' },
    { id: 3, name: 'Michael Brown' },
    { id: 4, name: 'Emily Davis' },
    { id: 5, name: 'David Wilson' }
  ];

  paymentMethods = {
    'Online': ['PhonePe', 'Google Pay', 'PayTM', 'UPI', 'Net Banking'],
    'Cash': ['Cash']
  };

  denominations = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
  selectedDenominations: { [key: string]: number } = {};

  // Update initial newCollection
  newCollection: Collection = {
    collectionType: '',
    clientName: '',
    totalAmount: 0,
    cashAmount: 0,
    onlineAmount: 0,
    onlineType: '',
    date: new Date,
    time: new Date().toLocaleTimeString(),
    denomination500: '',
    denomination200: '',
    denomination100: '',
    denomination50: '',
    denomination20: '',
    denomination10: '',
    denomination5: '',
    denomination2: '',
    denomination1: ''
  };

  showNewCollectionForm() {
    this.resetForm();
    this.dialog.open(this.collectionDialog, {
      width: '800px'
    });
  }

  closeDialog() {
    this.resetForm();
    this.dialog.closeAll();
  }

  saveCollection() { 

    const obj = Object.assign({})
    obj.type = this.collectionGrop.controls['collectionType'].value,


      obj.date = new Date(),
      obj.time = new Date().toLocaleTimeString(),
      obj.clientName = this.collectionGrop.controls['clientName'].value,
      // obj.agentName = this.collectionGrop.controls['agentName'].value,
      obj.denominations = {}


    if (this.collectionGrop.controls['collectionType'].value == 'Cash') {      
        obj.cashAmount = this.collectionGrop.controls['cashAmount'].value,
        obj.totalAmount = this.collectionGrop.controls['cashAmount'].value

      const obj2 = Object.assign({});
      obj2.fiveHundred = this.collectionGrop.controls['denomination500'].value,
        obj2.twoHundred = this.collectionGrop.controls['denomination200'].value,
        obj2.oneHundred = this.collectionGrop.controls['denomination100'].value,
        obj2.fifty = this.collectionGrop.controls['denomination50'].value,
        obj2.twenty = this.collectionGrop.controls['denomination20'].value,
        obj2.ten = this.collectionGrop.controls['denomination10'].value,
        obj2.five = this.collectionGrop.controls['denomination5'].value,
        obj2.two = this.collectionGrop.controls['denomination2'].value
      obj2.one = this.collectionGrop.controls['denomination1'].value

      obj.denominations = obj2
    }

    if(this.collectionGrop.controls['collectionType'].value == 'cash&online'){
      obj.totalAmount = this.collectionGrop.controls['cashAmount'].value + this.collectionGrop.controls['onlineAmount'].value,
      obj.onlineAmount = this.collectionGrop.controls['onlineAmount'].value,
      obj.cashAmount = this.collectionGrop.controls['cashAmount'].value
    }

    if (this.collectionGrop.controls['collectionType'].value == 'Online') {
      obj.totalAmount = this.collectionGrop.controls['onlineAmount'].value,
        obj.onlineAmount = this.collectionGrop.controls['onlineAmount'].value,
        obj.onlineType = this.collectionGrop.controls['onlineType'].value,
        obj.accountName = this.collectionGrop.controls['accountName'].value,
        obj.mobileNumber = this.collectionGrop.controls['mobileNumber'].value
    }

    this.collections.push(obj);

    this.getTotalCollections();

    this.closeDialog();
    this.updateChartData();
  }

  // Remove showForm, closeForm, and onSubmit methods as they're no longer needed
  // Add resetForm method
  // Update resetForm method
  resetForm() {
    this.collectionGrop.reset();
    this.selectedDenominations = {};
    this.cashAmountRow = false;
    this.onlineAmountRow = false;
  }

  getUniqueClients(): string[] {
    return [...new Set(this.collections.map(c => c.clientName))];
  }

  getClientTotal(clientName: string): number {
    return this.collections
      .filter(c => c.clientName === clientName)
      .reduce((sum, item) => sum + item.totalAmount, 0);
  }

  getCollectionsByClient(clientName: string): Collection[] {
    return this.collections.filter(c => c.clientName === clientName);
  }

  // Add to your component class
  updateCashAmount() {
    const denominations = {
      500: this.collectionGrop.get('denomination500')?.value || 0,
      200: this.collectionGrop.get('denomination200')?.value || 0,
      100: this.collectionGrop.get('denomination100')?.value || 0,
      50: this.collectionGrop.get('denomination50')?.value || 0,
      20: this.collectionGrop.get('denomination20')?.value || 0,
      10: this.collectionGrop.get('denomination10')?.value || 0,
      5: this.collectionGrop.get('denomination5')?.value || 0,
      2: this.collectionGrop.get('denomination2')?.value || 0,
      1: this.collectionGrop.get('denomination1')?.value || 0
    };

    const total = Object.entries(denominations)
      .reduce((sum, [denom, count]) => sum + (Number(denom) * count), 0);

    this.collectionGrop.patchValue({
      cashAmount: total
    }, { emitEvent: false });

    // this.updateAmounts();
  }

  validateNumber(event: any) {
    const input = event.target;
    let value = input.value.replace(/[^0-9]/g, '');
    value = value === '' ? '0' : value;
    input.value = value;
  }


  getCashTotal(): number {
    if (this.newCollection.collectionType !== 'Cash') return 0;
    return Object.entries(this.selectedDenominations)
      .reduce((sum, [denom, count]) => sum + (Number(denom) * (count || 0)), 0);
  }

  getOnlineTotal(): number {
    return this.newCollection.collectionType === 'Online' ? this.newCollection.totalAmount : 0;
  }

  getTotalAmount(): number {
    return this.getCashTotal() + this.getOnlineTotal();
  }

  needsOnlinePayment(): boolean {
    return this.newCollection.totalAmount > this.getCashTotal();
  }

  getRemainingAmount(): number {
    const remaining = this.newCollection.totalAmount - this.getCashTotal();
    return remaining > 0 ? remaining : 0;
  }

  updateAmounts() {
    const totalAmount = this.collectionGrop.get('totalAmount')?.value || 0;
    const cashAmount = this.collectionGrop.get('cashAmount')?.value || 0;
    // const onlineAmount = totalAmount - cashAmount;

    // this.collectionGrop.patchValue({
    //   onlineAmount: onlineAmount >= 0 ? onlineAmount : 0
    // }, { emitEvent: false });
  }

  isValidTotal(): boolean {
    if (this.newCollection.collectionType === 'Cash') {
      const isValid = this.newCollection.totalAmount > 0 &&
        this.getCashTotal() <= this.newCollection.totalAmount;
      if (this.needsOnlinePayment()) {
        return isValid && !!this.newCollection.onlineType;
      }
      return isValid;
    }
    return this.newCollection.totalAmount > 0;
  }
}
