import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organizer } from '../models/organizer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupOrganizerService {

  private url = 'https://orchestration-service-dev.onrender.com/api/v1/orquestrador/usuarios';


  constructor(private http: HttpClient) { }

  registerOrganizer(organizer: Organizer): Observable<Organizer> {
    return this.http.post<Organizer>(this.url, organizer);
  }
}
