import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro-alumno',
  templateUrl: './registro-alumno.page.html',
  styleUrls: ['./registro-alumno.page.scss'],
})
export class RegistroAlumnoPage {
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  contrasena: string = '';

  // Definir mensajes de error
  errorMessages = {
    nombre: {
      required: 'El nombre es requerido, recordar no se permiten caracteres especiales ni numeros.',
    },
    apellido: {
      required: 'El apellido es requerido, recordar no se permiten caracteres especiales ni numeros.',
    },
    correo: {
      required: 'El correo es requerido.',
      pattern: 'El formato de correo es inválido para alumno.',
    },
    contrasena: {
      required: 'La contraseña es requerida.',
    },
  };

  constructor(private authService: AuthService) {}

  
  validarCorreo() {
    if (!/^[a-zA-Z]+.[a-zA-Z]+@duocuc\.cl$/.test(this.correo)) {
      return "El formato de correo es inválido para alumno. No se permiten números en el correo.";
    }
    return '';
  }

 
  validarNombre() {
    if (!/^[a-zA-Z]+$/.test(this.nombre)) {
      return this.errorMessages.nombre.required;
    }
    else if (!this.nombre) {
      return this.errorMessages.nombre.required;
    }
    return '';
  }

  
  validarApellido() {
    if (!/^[a-zA-Z]+$/.test(this.apellido)) {
      return this.errorMessages.apellido.required;
    }
    else if (!this.apellido) {
      return this.errorMessages.apellido.required;
    }
    return '';
  }

  
  validarContrasena() {
    if (!this.contrasena) {
      return this.errorMessages.contrasena.required;
    }
    return '';
  }

  registrar() {
   
    const correoError = this.validarCorreo();
    const nombreError = this.validarNombre();
    const apellidoError = this.validarApellido();
    const contrasenaError = this.validarContrasena();

    if (correoError || nombreError || apellidoError || contrasenaError) {
      console.error(correoError || nombreError || apellidoError || contrasenaError);
      return;
    }

    const alumno = {
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      contrasena: this.contrasena,
    };

    this.authService.registrarAlumno(alumno).subscribe(
      (data) => {
        
        console.log('Registro exitoso', data);
      },
      (error) => {
        
        console.error('Error en el registro', error);
      }
    );
  }
}