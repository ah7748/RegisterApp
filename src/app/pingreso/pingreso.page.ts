import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import * as QRCode from 'qrcode';


@Component({
  selector: 'app-pingreso',
  templateUrl: './pingreso.page.html',
  styleUrls: ['./pingreso.page.scss'],
})
export class PingresoPage implements OnInit {
  profesorActual: any;
  profesores = [
    {
      nombre: 'Mario',
      apellido: 'Perez',
      clases: [
        { nombre: 'Matemática I', seccion: '002' },
        { nombre: 'Programación de Algoritmos', seccion: '001' }
      ]
    },
    {
      nombre: 'katherine',
      apellido: 'joestar',
      clases: [
        {nombre: 'matematicas I', seccion: '002'},
        {nombre: 'estadistica descriptiva', seccion: ['001','002']}
     ]
    },
    {
      nombre: 'javier',
      apellido: 'cavernas',
      clases: [
        {nombre:'programacion BDD',seccion: '001'},
        {nombre:'programacion de algoritmos', seccion:'002'}
      ]
    },
    {
      nombre: 'thiare',
      apellido: 'gonzales',
      clases: [
        {nombre:'Diseño web',seccion: ['001','002']},
        {nombre:'Javascript',seccion: '001'}
      ]
    },
    {
      nombre: 'Andres',
      apellido: 'Calderon',
      clases: [
        {nombre:'programacion BDD',seccion: '002'},
        {nombre: 'Javascript',seccion: '002'}]
    }
  ];

  toggleClase(clase: any) {
    if (typeof clase === 'string') {
      // Tratar como una cadena, tal vez mostrar un mensaje de error
      console.error('Error: se esperaba un objeto, pero se recibió una cadena.');
    } else {
      // Tratar como un objeto
      clase.expandido = !clase.expandido;
    }
  }
  

  constructor(private authService: AuthService, private navCtrl: NavController) {}

  
  ngOnInit() {
    this.profesorActual = this.authService.getUsuarioActual();
    console.log(this.profesorActual);
  }
  generarQR(claseNombre: string, seccion: string) {
    // Puedes pasar información adicional a la página de generación de QR si es necesario
    this.navCtrl.navigateForward(['/generar-qr', { claseNombre, seccion }]);
  }

}
