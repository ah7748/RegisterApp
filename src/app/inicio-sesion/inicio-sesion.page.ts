import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: 'inicio-sesion.page.html',
  styleUrls: ['inicio-sesion.page.scss'],
})
export class InicioSesionPage {
  constructor(private authService: AuthService, private router: Router) {}

  async iniciarSesion(correo: string, contrasena: string, tipoUsuario: string) {
    try {
      let response;

      this.authService.setUsuarioActual(response);


      // Verificar el formato del correo electrónico y redirigir
      if (correo.endsWith('@duocuc.cl')) {
        this.router.navigate(['/aingreso']);
      } else if (correo.endsWith('@profesor.duoc.cl')) {
        this.router.navigate(['/pingreso']);
      }
    } catch (error) {
      // Manejar errores de autenticación, mostrar mensajes, etc.
      console.error('Error de autenticación', error);
    }
  }
}