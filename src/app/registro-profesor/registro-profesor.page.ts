import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro-profesor',
  templateUrl: './registro-profesor.page.html',
  styleUrls: ['./registro-profesor.page.scss'],
})
export class RegistroProfesorPage {
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  contrasena: string = '';
  codigo: string = ''; // Debe ser generado por el servidor

  // Definir mensajes de error
  errorMessages = {
    nombre: {
      required: 'El nombre es requerido, recordar no se admiten caracteres especiales ni numeros', 
    },
    apellido: {
      required: 'El apellido es requerido,  recordar no se admiten caracteres especiales ni numeros.',
    },
    correo: {
      required: 'El correo es requerido.',
      pattern: 'El formato de correo es inválido para profesor.',
    },
    contrasena: {
      required: 'La contraseña es requerida.',
    },
  };

  constructor(private authService: AuthService) {}

  // Función para validar el formato del correo
  validarCorreo() {
    if (!/^[\w-]+.\.[\w-]+@profesor\.duoc\.cl$/.test(this.correo)) {
      return this.errorMessages.correo.pattern;
    }
    
    return '';
  }

  // Función para validar el campo de nombre
  validarNombre() {
    if (!/^[a-zA-Z]+$/.test(this.nombre)) {
    return this.errorMessages.nombre.required;
  }
    else if (!this.nombre) {
      return this.errorMessages.nombre.required;
    }
    return '';
  }

  // Función para validar el campo de apellido
  validarApellido() {
    if (!/^[a-zA-Z]+$/.test(this.apellido)) {
      return this.errorMessages.apellido.required;
    }
    else if (!this.apellido) {
      return this.errorMessages.apellido.required;
    }
    return '';
  }

  // Función para validar el campo de contraseña
  validarContrasena() {
    if (!this.contrasena) {
      return this.errorMessages.contrasena.required;
    }
    return '';
  }

  registrar() {
    // Validar campos antes de enviar la solicitud
    const correoError = this.validarCorreo();
    const nombreError = this.validarNombre();
    const apellidoError = this.validarApellido();
    const contrasenaError = this.validarContrasena();

    if (correoError || nombreError || apellidoError || contrasenaError) {
      console.error(correoError || nombreError || apellidoError || contrasenaError);
      return;
    }

    const profesor = {
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      contrasena: this.contrasena,
      codigo: this.codigo,
    };

    this.authService.registrarProfesor(profesor).subscribe(
      (data) => {
        // Manejar la respuesta exitosa aquí
        console.log('Registro exitoso', data);
      },
      (error) => {
        // Manejar el error de registro aquí
        console.error('Error en el registro', error);
      }
    );
  }
}