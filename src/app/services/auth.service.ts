import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  iniciarSesion(correo: string, contrasena: string): Observable<any> {
    const url = `${this.baseUrl}/usuarios`; // Cambié la URL a algo más específico para el inicio de sesión
  
    return this.http.get(url, { params: { correo, contrasena } }).pipe(
      catchError(error => {
        console.error('Error en la solicitud de inicio de sesión:', error);
        return throwError('Error de autenticación');
      })
    );
  }

  setTipoUsuario(tipo: string) {
    localStorage.setItem('tipoUsuario', tipo);
  }

  getTipoUsuario(): string {
    return localStorage.getItem('tipoUsuario') || '';
  }

  limpiarTipoUsuario() {
    localStorage.removeItem('tipoUsuario');
  }
}