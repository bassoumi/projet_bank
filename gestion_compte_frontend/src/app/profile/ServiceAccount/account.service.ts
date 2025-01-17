import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:3000/account';


  constructor(private http: HttpClient) {}

  createAccount(accountData: any): Observable<any> {
    return this.http.post(this.apiUrl, accountData);
  }

  GetAccountS(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getById(accountId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${accountId}`);
  }

  update(accountId: string,dataAcount:any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${accountId}`,dataAcount);
  }
  delete(accountId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${accountId}`);
  }

}
