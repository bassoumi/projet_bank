import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl ='http://localhost:3000/api';
  constructor(private http:HttpClient , private router: Router) { }

  login(credentials:{username:string,password:string}):Observable<any>{
    return this.http.post<{token:string}>(`${this.baseUrl}/login`,credentials)
  }

  getProtectedData(token:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/protected`,{
      headers:{Authorization:`Bearer ${token}`}
    })
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }



  logout(): void {
    // Supprimez le token JWT stocké (localStorage ou sessionStorage)
    localStorage.removeItem('token'); 

    // Optionnel : Supprimer d'autres données liées à l'utilisateur
    localStorage.removeItem('userData');

    // Redirection vers la page d'accueil
    this.router.navigate(['/']);
  }




}
