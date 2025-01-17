import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AccountBanker';
  isOnProfile: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.isOnProfile = event.url.startsWith('/Profile/');
      }
    });
  }

}
