import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private http=inject(HttpClient)
private baseUrl = "http://localhost:3000/api/auth"

register(data:any):Observable<any>{
  return this.http.post<any>(`${this.baseUrl}/register`,data);
}

  login(data:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/login`,data);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }
}