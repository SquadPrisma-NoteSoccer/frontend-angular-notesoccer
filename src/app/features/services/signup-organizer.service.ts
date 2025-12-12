import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organizer } from '../models/organizer';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignupOrganizerService {
  private url = `${environment.apiUrl}/api/v1/auth/signup`;

  constructor(private http: HttpClient) {}

  registerOrganizer(organizer: Organizer): Observable<Organizer> {
    return this.http.post<Organizer>(this.url, organizer);
  }
}
