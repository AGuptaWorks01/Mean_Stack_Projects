import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private basUrl = 'http://localhost:3000/api/auth'
  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.basUrl}/register`, data)
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.basUrl}/login`, data)
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token)
  }

  getToken(): String | null {
    return localStorage.getItem('authToken')
  }

  removeToken(): void {
    localStorage.removeItem('authToken')
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
