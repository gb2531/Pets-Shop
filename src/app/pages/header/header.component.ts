import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  faSearch,
  faCartShopping,
  faBars,
  faUser,
  faFileExport,
  faL,
} from '@fortawesome/free-solid-svg-icons';
import { LoginComponent } from '../login/login.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogged = false;
  private tokenSubscription: Subscription | undefined;
  token: string | null = null;
  signin = faFileExport;
  user = faUser;
  cart = faCartShopping;
  menuBar = faBars;
  searchicon = faSearch;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private auth: AuthService
  ) {}
  ngOnDestroy(): void {
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.tokenSubscription = this.auth.token$.subscribe((token) => {
      this.isLogged = !token;
    });
  }

  onClick() {
    this.router.navigate(['signUp']);
  }
  openDialogBox(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.height = '500px';
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;

    const dialogref = this.dialog.open(LoginComponent, dialogConfig);
    dialogref.afterClosed().subscribe((result) => {
      if (result) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  }

  logout(){
    this.auth.removeToken();
    this.isLogged = false;
  }
}
