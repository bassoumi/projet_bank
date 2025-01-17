import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../loginService/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup; // Définir un FormGroup pour le formulaire
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: LoginService, private router:Router) {
    // Initialisation du formulaire avec Reactive Forms
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onlogin() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value; // Récupération des valeurs du formulaire
      this.authService.login(credentials).subscribe({
        next: (response) => {
         
          const token = response.token;
          localStorage.setItem('auth_token', token);
          this.router.navigate(['/Profile/consultaion']);        },
        error: (error) => {
          this.errorMessage ='Verifiez Votre nom ou votre mon de passe';
        },
      });
    } else {
      this.errorMessage = 'Please fill in the required fields correctly';
    }
  }
}
