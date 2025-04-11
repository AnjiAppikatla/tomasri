import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { PaymentService, PaymentType } from '../../data-services/payment.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'category', 'description', 'status'];
  dataSource!: MatTableDataSource<PaymentType>;
  selectedCategory: string = '';
  categories = ['All', 'Cash', 'Online', 'Other'];
  localPaymentTypes: PaymentType[] = [];

  newPaymentType = {
    name: '',
    category: '',
    description: '',
    isActive: true
  };

  showForm = false;

  constructor(private paymentService: PaymentService) {
    this.dataSource = new MatTableDataSource<PaymentType>([]);
  }

  ngOnInit() {
    this.paymentService.paymentTypes$.subscribe(types => {
      this.localPaymentTypes = [...types];
      this.dataSource.data = this.getFilteredTypes();
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.dataSource.data = this.getFilteredTypes();
  }

  getFilteredTypes(): PaymentType[] {
    if (!this.selectedCategory || this.selectedCategory === 'All') {
      return this.localPaymentTypes;
    }
    return this.localPaymentTypes.filter(type => type.category === this.selectedCategory);
  }

  addNewType() {
    if (this.newPaymentType.name && this.newPaymentType.category) {
      const newType: PaymentType = {
        id: this.localPaymentTypes.length + 1,
        name: this.newPaymentType.name,
        category: this.newPaymentType.category as 'Cash' | 'Online' | 'Other',
        description: this.newPaymentType.description,
        isActive: this.newPaymentType.isActive
      };
      
      this.localPaymentTypes = [newType, ...this.localPaymentTypes];
      this.dataSource.data = this.getFilteredTypes();
      this.paymentService.addPaymentType(newType);
      this.resetForm();
    }
  }

  private resetForm() {
    this.newPaymentType = {
      name: '',
      category: '',
      description: '',
      isActive: true
    };
    this.showForm = false;
  }
}
