import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

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

  getToken(): string | null {
    return localStorage.getItem('authToken')
  }

  removeToken(): void {
    localStorage.removeItem('authToken')
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  getUserRole(): String | null {
    const token = this.getToken()
    if (!token) return null

    try {
      const decoded: any = jwtDecode(token)
      return decoded.role || null
    } catch (error) {
      console.error("Error decoding token:", error)
      return null
    }
  }

}
