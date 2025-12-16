import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginOrganizerService {

  private apiUrl = `${environment.apiUrl}/api/v1/auth/login`;

  constructor(private http: HttpClient) { }

  login(data: { email: string; senha: string }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
