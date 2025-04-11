import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { SidenavService } from '../../data-services/sidenav.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    MatButtonModule, 
    MatToolbarModule,
    MatSidenavModule,
    SidenavComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  mobileSidebar = false;

  constructor(
    private sidenavService: SidenavService,
  ) {}

  ngOnInit() {
    this.sidenavService.mySidebarVariable$.subscribe((value) => {
      this.mobileSidebar = value;
    });
  }


  toggleMenu() {
    this.sidenavService.setMySidebarVariable(!this.mobileSidebar);
  }
}
