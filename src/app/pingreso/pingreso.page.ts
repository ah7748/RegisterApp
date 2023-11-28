import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

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
        { nombre: 'Matemática I', seccion: '001' },
        { nombre: 'Programación de Algoritmos', seccion: '001' }
      ]
    },
    {
      nombre: 'katherine',
      apellido: 'joestar',
      clases: [
        {nombre: 'matematicas I', seccion: '002'},
        {nombre: 'estadistica descriptiva', seccion: '001'}
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

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.profesorActual = this.authService.getUsuarioActual();
    console.log(this.profesorActual);
  }
}
