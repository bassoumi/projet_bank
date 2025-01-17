import { Component } from '@angular/core';
import { AccountService } from '../ServiceAccount/account.service';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/Account';
@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent {
  accounts: any[] = []; 
  errorMessage: string = ''; 
  
  constructor(private accountService: AccountService , private router: Router) {}

  ngOnInit(): void {
    this.fetchAccounts();
  }

  fetchAccounts(): void {
    this.accountService.GetAccountS().subscribe({
      next: (data: Account[]) => {  
        this.accounts = data.sort((a: Account, b: Account) => {
          const dateA = new Date(a.updatedAt).getTime();
          const dateB = new Date(b.updatedAt).getTime();
  
          return dateB - dateA;
        });
  
        console.log(this.accounts); 
      },
      error: (err) => {
        console.error('Error fetching accounts:', err);
        this.errorMessage = 'An error occurred while fetching accounts.';
      }
    });
  }
  
  
}
