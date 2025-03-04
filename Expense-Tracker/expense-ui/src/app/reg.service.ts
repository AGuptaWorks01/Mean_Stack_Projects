import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegService {
  private apiUrl = 'http://localhost:3000/api';

  private http = inject(HttpClient)

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reg`, { email, password })
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password })
  }

  // protectedApiCall(token: string): Observable<any> {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
  //   return this.http.get(`${this.apiUrl}/protected`, { headers })
  // }
}
