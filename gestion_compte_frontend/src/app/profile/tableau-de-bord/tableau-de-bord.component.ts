import { Component, OnInit } from '@angular/core';
import { AccountService } from '../ServiceAccount/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tableau-de-bord',
  templateUrl: './tableau-de-bord.component.html',
  styleUrls: ['./tableau-de-bord.component.css']
})
export class TableauDeBordComponent implements OnInit {
  accounts: any[] = []; 
  errorMessage: string = '';
  statusStats: any = {};
  totalComptes: number = 0;
  comptesParType: any = {};
  notificationStats: any = {}; 
  accountTypeStats: any = {};
  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.fetchAccounts();
  }

  fetchAccounts(): void {
    this.accountService.GetAccountS().subscribe({
      next: (data) => {
        this.accounts = data;
        this.calculerStatistiques();
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des comptes:', err);
        this.errorMessage = 'Une erreur est survenue lors de la récupération des comptes.';
      }
    });
  }





  calculerStatistiques(): void {
    const epargneAccounts = this.accounts.filter(acc => acc.accountType === 'épargne').length;
    const courantAccounts = this.accounts.filter(acc => acc.accountType === 'courant').length;
    const professionnelAccounts = this.accounts.filter(acc => acc.accountType === 'professionnel').length;
  
    this.comptesParType = {
      'épargne': epargneAccounts,
      'courant': courantAccounts,
      'professionnel': professionnelAccounts
    };
  


    
    
    const emailNotifications = this.accounts.filter(acc => acc.notifications?.email).length;
    const smsNotifications = this.accounts.filter(acc => acc.notifications?.sms).length;
  
    const totalNotifications = emailNotifications + smsNotifications;
  
    this.notificationStats = {
      email: emailNotifications,
      sms: smsNotifications,
      emailPercentage: totalNotifications ? (emailNotifications / totalNotifications) * 100 : 0,
      smsPercentage: totalNotifications ? (smsNotifications / totalNotifications) * 100 : 0
    };





    
    this.totalComptes = this.accounts.length;

    const actifAccounts = this.accounts.filter(acc => acc.status === 'actif').length;
    const inactifAccounts = this.accounts.filter(acc => acc.status === 'inactif').length;
    const fermeAccounts = this.accounts.filter(acc => acc.status === 'fermé').length;
  
    this.statusStats = {
      actif: actifAccounts,
      inactif: inactifAccounts,
      ferme: fermeAccounts,
      actifPercentage: this.totalComptes ? (actifAccounts / this.totalComptes) * 100 : 0,
      inactifPercentage: this.totalComptes ? (inactifAccounts / this.totalComptes) * 100 : 0,
      fermePercentage: this.totalComptes ? (fermeAccounts / this.totalComptes) * 100 : 0
    };
  }
  

}
