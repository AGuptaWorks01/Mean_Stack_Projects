import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class CustFeedBackService {
    private apiUrl = 'http://localhost:3000/api/feed/feedback'
    constructor(private http: HttpClient, private authService: AuthService) { }

    private getAuthHeaders() {
        const token = this.authService.getToken();
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }

    getUserFeedbacks(): Observable<any> {
        return this.http.get(`${this.apiUrl}`, { headers: this.getAuthHeaders() })
    }

    addFeedbak(feedback: string): Observable<any> {
        return this.http.post(this.apiUrl, { feedback }, { headers: this.getAuthHeaders() })
    }

    updateFeedback(id: string, feedback: string): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, { feedback }, { headers: this.getAuthHeaders() });
    }

    deleteFeedback(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
    }
}
