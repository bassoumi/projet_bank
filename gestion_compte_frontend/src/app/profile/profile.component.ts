import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  shouldShowNavbar: boolean = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  
  ngOnInit(): void {
    // Observer les changements de route
    this.router.events.subscribe((event) => {
      // Vérifier la route active
      if (this.router.url.includes('details')) {  // Modifiez selon votre route 'details'
        this.shouldShowNavbar = false;
      } else {
        this.shouldShowNavbar = true;
      }
    });
  }
}
