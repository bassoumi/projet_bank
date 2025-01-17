import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../ServiceAccount/account.service';


@Component({
  selector: 'app-detail-compte',
  templateUrl: './detail-compte.component.html',
  styleUrls: ['./detail-compte.component.css']
})
export class DetailCompteComponent implements OnInit {
  isPrinting: boolean = false;
  accountId: string | null = null;
  account: any;
  constructor(private route: ActivatedRoute, private accountService : AccountService, private router: Router) {}



  ngOnInit(): void {
    const accountId = this.route.snapshot.paramMap.get('id'); 
    if (accountId) {
      this.accountService.getById(accountId).subscribe((data) => {
        this.account = data; 
      });
    }
  }

  goBack() {
    this.router.navigate(['/Profile/consultaion']); 
  }



  
  printDetails(): void {
    this.isPrinting = true;
  
    setTimeout(() => {
      window.print(); 
  
      setTimeout(() => {
        this.isPrinting = false;
      }, 500);
    }, 100);
  }
  

}
