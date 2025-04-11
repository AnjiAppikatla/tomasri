import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidenavService } from '../../data-services/sidenav.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  // @Output() pageChangeEvent = new EventEmitter<string>();
  
  activepage: string = 'dashboard';

  ngOnInit() {
    this.sidenavService.myVariable$.subscribe((value) => {
      this.activepage = value;
    });
  }

  constructor(
    private sidenavService: SidenavService,
  ) {}
  pageChange(type:string){
    this.activepage = type; 
    this.sidenavService.setMyVariable(type);
    this.sidenavService.setMySidebarVariable(false)
    // this.pageChangeEvent.emit(type)
  }
}
