import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private usuarioActual: any;

  constructor(private http: HttpClient) {}

  iniciarSesion(correo: string, contrasena: string): Observable<any> {
    const url = `${this.baseUrl}/usuarios`; 
  
    return this.http.get(url, { params: { correo, contrasena } }).pipe(
      catchError(error => {
        console.error('Error en la solicitud de inicio de sesión:', error);
        return throwError('Error de autenticación');
      })
    );
  }

   // Información del usuario actual
   setUsuarioActual(usuario: any) {
    this.usuarioActual = usuario;
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
  }

  getUsuarioActual(): any {
    if (!this.usuarioActual) {
      const usuarioGuardado = localStorage.getItem('usuarioActual');
      if (usuarioGuardado) {
        this.usuarioActual = JSON.parse(usuarioGuardado);
      }
    }
    return this.usuarioActual;
  }

  limpiarUsuarioActual() {
    this.usuarioActual = null;
    localStorage.removeItem('usuarioActual');
  }

  // TIPO DE USUARIO
  setTipoUsuario(tipo: string) {
    localStorage.setItem('tipoUsuario', tipo);
  }
  getTipoUsuario(): string {
    return localStorage.getItem('tipoUsuario') || '';
  }

  limpiarTipoUsuario() {
    localStorage.removeItem('tipoUsuario');
  }

  // NOMBRE ALUMNO
  setNombreAlumno(nombre: string){
    localStorage.setItem('nombreAlumno', nombre)
  }
  getNombreAlumno(): string {
    return localStorage.getItem('nombreAlumno') || '';
  }
  limpiarNombreAlumno() {
    localStorage.removeItem('nombreAlumno');
  }

  //NOMBRE PROFE
  setNombreProfe(nombre: string){
    localStorage.setItem('nombreProfe', nombre)
  }
  getNombreProfe(): string {
    return localStorage.getItem('nombreProfe') || '';
  }
  limpiarNombreProfe() {
    localStorage.removeItem('nombreProfe');
  }
  
}