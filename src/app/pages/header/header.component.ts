import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  faSearch,
  faCartShopping,
  faBars,
  faUser,
  faFileExport,
} from '@fortawesome/free-solid-svg-icons';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLogged = true;
  signin = faFileExport;
  user = faUser;
  cart = faCartShopping;
  menuBar = faBars;
  searchicon = faSearch;
  constructor(private router: Router, private dialog: MatDialog) {}

  onClick() {
    this.router.navigate(['signUp']);
  }
  openDialogBox(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.height = '500px';
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;


    this.dialog.open(LoginComponent, dialogConfig);
  }
}
