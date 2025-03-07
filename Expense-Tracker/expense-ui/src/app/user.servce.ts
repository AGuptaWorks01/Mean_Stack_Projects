import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:3000/api';

    private http = inject(HttpClient)

    CreateUser(userData: any): Observable<any> {
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
        return this.http.post(`${this.apiUrl}/users`, userData, { headers })
    }

    getUsers(): Observable<any> {
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
        return this.http.get(`${this.apiUrl}/users`, { headers })
    }

    updateUser(userId: string, userData: any): Observable<any> {
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
        return this.http.patch(`${this.apiUrl}/users/${userId}`, userData, { headers })
    }

    deleteUser(userId: string): Observable<any> {
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
        return this.http.delete(`${this.apiUrl}/users/${userId}`, { headers })
    }
}
