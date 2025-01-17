import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../ServiceAccount/account.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-creation-compte',
  templateUrl: './creation-compte.component.html',
  styleUrls: ['./creation-compte.component.css']
})
export class CreationCompteComponent implements OnInit {
  createAccountForm: FormGroup = new FormGroup({});  
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createAccountForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{8,15}$')]],
      dob: ['', [Validators.required]],
      accountType: ['', [Validators.required]],
      balance: [0, [Validators.required]],
      address: this.fb.group({
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        zip: ['', [Validators.required]],
      }),
      notificationPreference: ['email', [Validators.required]], 
    });
  }
  
  

  onCreateAccount(): void {
    this.errorMessage = null; 
  
    if (this.createAccountForm && this.createAccountForm.valid) {
      this.accountService.createAccount(this.createAccountForm.value).subscribe({
        next: (response) => {
          console.log('Account created:', response);
          this.router.navigate(['/Profile/consultaion']);
        },
        error: (error) => {
          console.error('Error creating account:', error);
          this.errorMessage = error.error?.message || 'Une erreur est survenue lors de la création du compte.';
        },
      });
    } else {
      this.errorMessage = 'Veuillez corriger les erreurs dans le formulaire avant de soumettre.';
    }
  }
  
}



