import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** Retorna o userId contido no TOKEN JWT */
  getUserIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Token não encontrado no localStorage");
      return null;
    }

    try {
      const decoded: any = jwtDecode(token);

      console.log("TOKEN DECODIFICADO:", decoded);

      // Verifique qual campo contém o userId
      return decoded.sub   // normalmente o ID do usuário
          || decoded.userId
          || decoded.id
          || null;

    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      return null;
    }
  }
}
