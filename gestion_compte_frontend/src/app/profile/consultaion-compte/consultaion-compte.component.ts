import { Component, OnInit } from '@angular/core';
import { AccountService } from '../ServiceAccount/account.service';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/Account';

@Component({
  selector: 'app-consultaion-compte',
  templateUrl: './consultaion-compte.component.html',
  styleUrls: ['./consultaion-compte.component.css']
})
export class ConsultaionCompteComponent implements OnInit {
  accounts: any[] = []; 
  errorMessage: string = ''; 
  searchTerm: string = ''; 
  filteredAccounts: any[] = [];
  constructor(private accountService: AccountService , private router: Router) {}

  ngOnInit(): void {
    this.fetchAccounts();
  }

  fetchAccounts(): void {
    this.accountService.GetAccountS().subscribe({
      next: (data: Account[]) => {  
        this.accounts = data.sort((a: Account, b: Account) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
  
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

  filterAccounts(): void {
    if (!this.searchTerm.trim()) {
      this.filteredAccounts = this.accounts;
    } else {
      this.filteredAccounts = this.accounts.filter((account) =>
        account._id.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  
  resetSearch(): void {
    this.searchTerm = ''; 
    this.filteredAccounts = []; 
  }
  
 
  
  viewDetails(accountId: string) {
    this.router.navigate(['/Profile/details', accountId]);
  }

  deleteAccount(accountId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce compte ?')) {
      this.accountService.delete(accountId).subscribe(
        () => {
          this.accounts = this.accounts.filter(account => account._id !== accountId);
          alert('Compte supprimé avec succès');
        },
        (error) => {
          console.error('Erreur de suppression:', error);
          alert('Une erreur s\'est produite lors de la suppression');
        }
      );
    }

  }
}
