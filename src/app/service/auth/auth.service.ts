import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = environment.backendApiBaseUrl;

  constructor(private http: HttpClient) { }
    
  register(username:string,email:string,password:string):Observable<any>{
    const registerRequest = { username, email, password };
    return this.http.post(`${this.api}/register`, registerRequest).pipe(
      catchError(({error}) => { 
        console.error('Đã xảy ra lỗi:', error);
        return throwError(() => new Error(error?.message || 'Unknown error'));
      })
    );
  }

  login(email:string,password:string):Observable<any>{
    const loginRequest = { email, password };
    return this.http.post(`${this.api}/login`, loginRequest).pipe(
      catchError(({error}) => { 
        console.error('Đã xảy ra lỗi:', error);
        return throwError(() => new Error(error?.message || 'Unknown error'));
      })
    );
  }

}
