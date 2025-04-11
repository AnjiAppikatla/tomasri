import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface PaymentType {
  id: number;
  name: string;
  category: 'Cash' | 'Online' | 'Other';
  description: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentTypes: PaymentType[] = [];
  private paymentTypesSubject = new BehaviorSubject<PaymentType[]>(this.paymentTypes);
  paymentTypes$ = this.paymentTypesSubject.asObservable();

  addPaymentType(paymentType: Omit<PaymentType, 'id'>) {
    const newType: PaymentType = {
      ...paymentType,
      id: this.paymentTypes.length + 1
    };
    this.paymentTypes = [...this.paymentTypes, newType];
    this.paymentTypesSubject.next(this.paymentTypes);
  }
}