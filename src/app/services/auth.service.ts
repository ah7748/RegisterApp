import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  usuarioActual: any;

  constructor(private http: HttpClient) { }

  setUsuarioActual(usuario: any) {
    this.usuarioActual = usuario;
  } 
  
  registrarProfesor(profesor: any) {
    if (!/^[\w-]+\.[\w-]+@profesor\.duoc\.cl$/.test(profesor.correo)) {
      return throwError('Formato de correo inválido para profesor');
    }
    return this.http.post(`${this.baseUrl}/profesor`, profesor);
  }

  registrarAlumno(alumno: any) {
    if (!/^[\w-]+\.[\w-]+@duocuc\.cl$/.test(alumno.correo)) {
      return throwError('Formato de correo inválido para alumno');
    }
    return this.http.post(`${this.baseUrl}/alumno`, alumno);
  }

  iniciarSesionAlumno(correo: string, contrasena: string): Observable<any> {
    const url = `${this.baseUrl}/alumno`;
  
    return this.http.post(url, { correo, contrasena }).pipe(
      catchError(error => {
        console.error('Error en la solicitud de inicio de sesión (alumno):', error);
        return throwError('Error de autenticación (alumno)');
      })
    );
  }
  
  iniciarSesionProfesor(correo: string, contrasena: string): Observable<any> {
    const url = `${this.baseUrl}/profesor`;
  
    return this.http.post(url, { correo, contrasena }).pipe(
      catchError(error => {
        console.error('Error en la solicitud de inicio de sesión (profesor):', error);
        return throwError('Error de autenticación (profesor)');
      })
    );
  }

  setTipoUsuario(tipo: string) {
    // Puedes realizar lógica adicional aquí según tus necesidades
    // Por ejemplo, almacenar el tipo de usuario en un servicio o en el localStorage
    localStorage.setItem('tipoUsuario', tipo);
  }

  getTipoUsuario(): string {
    // Obtener el tipo de usuario almacenado
    return localStorage.getItem('tipoUsuario') || '';
  }

  limpiarTipoUsuario() {
    // Limpiar el tipo de usuario almacenado
    localStorage.removeItem('tipoUsuario');
  }
}