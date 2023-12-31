import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: 'inicio-sesion.page.html',
  styleUrls: ['inicio-sesion.page.scss'],
})
export class InicioSesionPage {
  correo: string;
  contrasena: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async iniciarSesion() {
    try {
      const response = await this.authService.iniciarSesion(this.correo, this.contrasena).toPromise();
      console.log('Respuesta del servidor:', response);

      if (response && response[0] && response[0].correo) {
        const tipoUsuario = response[0].rol;
        const nombreAlumno = response[0].nombre;
        const clasesProfesor = response[0].clases || []; // Asumiendo que las clases se devuelven desde el servidor

        this.authService.setTipoUsuario(tipoUsuario);
        this.authService.setNombreAlumno(nombreAlumno);

        if (tipoUsuario === 'alumno') {
          this.authService.setNombreAlumno(nombreAlumno);
          this.router.navigate(['/aingreso']);
        } else if (tipoUsuario === 'profesor') {
          this.authService.setNombreProfe(nombreAlumno); // Se actualiza el nombre del profesor
          this.authService.setUsuarioActual(response[0]); // Se actualiza el objeto del profesor actual
          this.router.navigate(['/pingreso']);
        } else {
          console.error('Tipo de usuario no reconocido');
        }
      } else {
        console.error('Usuario no encontrado o contraseña incorrecta');
        this.mostrarAlerta('Error de autenticación', 'Usuario no encontrado o contraseña incorrecta');
      }
    } catch (error) {
      console.error('Error de autenticación', error);
      this.mostrarAlerta('Error', 'Error de autenticación');
    }
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}