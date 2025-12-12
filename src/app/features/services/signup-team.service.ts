import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Team } from '../models/team';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupTeamService {

  private url = `${environment.apiUrl}/api/v1/orquestrador/ligas`;

  constructor(private http: HttpClient) { }

  //Cadastro em lote (nova rota)
  cadastrarTimes(ligaId: string, times: { nome: string }[]): Observable<any> {
    return this.http.post(`${this.url}/${ligaId}/times/lote`, times);
  }

}
