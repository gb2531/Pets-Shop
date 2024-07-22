import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch,faCartShopping,faBars,faUser,faFileExport } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLogged = true;
  signin = faFileExport;
  user = faUser
  cart = faCartShopping
  menuBar = faBars;
  searchicon = faSearch;
  constructor(private router: Router) {}

  onClick(){
    this.router.navigate(['signUp']);
  }
}
