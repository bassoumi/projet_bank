import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../loginService/login.service'; // Service d'authentification

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService); // Injecter le service d'authentification
  const router = inject(Router); // Injecter le routeur

  if (authService.isAuthenticated()) {
    return true; // Autoriser l'accès
  } else {
    router.navigate(['/login']); // Rediriger vers la page de connexion
    return false; // Bloquer l'accès
  }
};
