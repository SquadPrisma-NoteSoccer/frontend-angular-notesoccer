import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { League } from '../models/league';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupLeagueService {

  private url = `${environment.apiUrl}/api/v1/orquestrador/ligas`;

  constructor(private http: HttpClient) { }

  registrarLiga(nomeDaLiga: string) {
    const organizer = JSON.parse(localStorage.getItem('organizer')!);
    const userId = organizer.id;

    return this.http.post<League>(this.url, {
      nome: nomeDaLiga,
      userId: userId
    });
  }

}
