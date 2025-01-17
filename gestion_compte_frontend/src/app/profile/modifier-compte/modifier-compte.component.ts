import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AccountService } from '../ServiceAccount/account.service';
import { Router } from '@angular/router';
import { Account } from '../../models/Account';

@Component({
  selector: 'app-modifier-compte',
  templateUrl: './modifier-compte.component.html',
  styleUrls: ['./modifier-compte.component.css']
})
export class ModifierCompteComponent implements OnInit {
  accounts: Account[] = []; 
  selectedAccount: Account | null = null; 
  accountForm: FormGroup; 
  errorMessage: string = ''; 

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
  ) {
    this.accountForm = this.fb.group({
      accountType: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      balance: ['', [Validators.required, Validators.min(0)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{8,15}$')]],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        zip: ['', [Validators.required, Validators.pattern('^[0-9]{2,5}$')]]
      }),
      dob: ['', Validators.required],
      status: ['', Validators.required],
      notifications: this.fb.group({
        email: [false],
        sms: [false]
      })
    });
  }

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountService.GetAccountS().subscribe({
      next: (data) => {
        this.accounts = data;
      },
      error: (err) => {
        this.errorMessage = 'An error occurred while fetching accounts.';
      }
    });
  }

  selectAccount(account: Account): void {
    this.selectedAccount = account;

    const patchedData = {
      accountType: account.accountType || '',
      name: account.name || '',
      balance: account.balance || 0,
      email: account.email || '',
      phone: account.phone || '',
      address: {
        street: account.address?.street || '',
        city: account.address?.city || '',
        zip: account.address?.zip || ''
      },
      dob: account.dob || '',
      status: account.status || '',
      notifications: {
        email: account.notifications?.email || false,
        sms: account.notifications?.sms || false
      }
    };

    this.accountForm.patchValue(patchedData);
  }

  updateAccount(): void {
    if (this.accountForm.invalid) {
      this.errorMessage = 'Please correct the errors in the form.';
      return;
    }

    const accountId = this.selectedAccount?._id;
    const updatedData = this.accountForm.value;

    if (!accountId) {
      this.errorMessage = 'No account selected for updating.';
      return;
    }

    this.accountService.update(accountId, updatedData).subscribe({
      next: (response) => {
        window.location.reload();
      },
      error: (error) => {
        this.errorMessage = 'An error occurred while updating the account. Please try again.';
      }
    });
  }



  formatDate(date: string | null): string {
    if (!date) return '';
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
