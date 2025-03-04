import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:3000/api/book';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders() {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  addTask(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addBook`, data, { headers: this.getAuthHeaders() });
  }

  getTasks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getBook`, { headers: this.getAuthHeaders() });
  }

  getTaskById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getBook/${id}`, { headers: this.getAuthHeaders() });
  }

  updateTask(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateBook/${id}`, data, { headers: this.getAuthHeaders() });
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/dltBook/${id}`, { headers: this.getAuthHeaders() });
  }
}
