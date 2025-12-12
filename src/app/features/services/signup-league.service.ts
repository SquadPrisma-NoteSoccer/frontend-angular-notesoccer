import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { League } from '../models/league';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignupLeagueService {

  private url = `${environment.apiUrl}/api/v1/orquestrador/ligas`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  registrarLiga(nomeDaLiga: string) {
    const userId = this.authService.getUserIdFromToken();

    console.log("UserId obtido do token:", userId);

    if (!userId) {
      throw new Error("UserId não encontrado no token");
    }

    return this.http.post<League>(this.url, {
      nome: nomeDaLiga,
      userId: userId
    });
  }


}
