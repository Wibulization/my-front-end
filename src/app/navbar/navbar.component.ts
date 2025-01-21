import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  username: string | null = null;
  isLoggedIn: boolean = false;
  isNavbarOpen = false; 

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen; 
  }

  ngOnInit() {
    const storageUsername = localStorage.getItem('username');
    if(storageUsername)
    {
      this.isLoggedIn = true;
      this.username = storageUsername;
    }
  }

  logout() {
    localStorage.removeItem('username');
    this.isLoggedIn = false;
    this.username = null;
    this.isNavbarOpen = false;
  }
}
