import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/loginService/login.service';

@Component({
  selector: 'app-profile-navbar',
  templateUrl: './profile-navbar.component.html',
  styleUrls: ['./profile-navbar.component.css']
})
export class ProfileNavbarComponent {
  isSidebarOpen = false; 
  currentTime: string = '';
  private timerId: any;

  constructor( private router: Router, private authservice:LoginService) {}

  ngOnInit() {

    this.resetSidebarState(); 
  }




  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.updateSidebarState();
  }

  private resetSidebarState() {
    this.isSidebarOpen = false;
    this.updateSidebarState();
  }

  private updateSidebarState() {
    const navBar = document.getElementById('nav-bar');
    const mainContent = document.querySelector('.main-content');

    if (this.isSidebarOpen) {
      navBar?.classList.remove('closed');
      if (mainContent) {
        mainContent.classList.remove('closed');
      }
    } else {
      navBar?.classList.add('closed');
      if (mainContent) {
        mainContent.classList.add('closed');
      }
    }
  }


  logout(): void {
    this.authservice.logout();
  }


}
