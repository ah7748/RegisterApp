import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { InicioSesionAPage } from 'inicio-sesion-a/inicio-sesion-a.page';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  
  tipoUsuario: string = ''

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

iniciarSesion(correo: string, contrasena: string): Observable<any> {
  const url = `${this.baseUrl}/alumno`; 

  // Realiza la lógica de inicio de sesión aquí, por ejemplo:
  return this.http.post(url, { correo, contrasena });
}


setTipoUsuario(tipo: string) {
  this.tipoUsuario = tipo;
}
}