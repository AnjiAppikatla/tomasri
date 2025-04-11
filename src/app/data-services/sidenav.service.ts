import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor() { }

  private myVariableSubject = new BehaviorSubject<string>('dashboard');
  myVariable$ = this.myVariableSubject.asObservable();

  private mySidebarVariableSubject = new BehaviorSubject<boolean>(false);
  mySidebarVariable$ = this.mySidebarVariableSubject.asObservable();

  // Method to update the variable
  setMyVariable(value: string) {
    this.myVariableSubject.next(value);
  }

  setMySidebarVariable(value: boolean) {
    this.mySidebarVariableSubject.next(value);
  }


}
