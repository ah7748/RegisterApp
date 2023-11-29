import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as QRCode from 'angularx-qrcode';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQRPage implements OnInit {
  texto: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Obtener la información de la ruta, que incluye la clase y la sección
    this.route.paramMap.subscribe(params => {
      const claseNombre = params.get('claseNombre');
      const seccion = params.get('seccion');

      // Crear el texto para el código QR con la sección y la fecha actual
      this.texto = `Clase: ${claseNombre} , Sección: ${seccion}, Fecha: ${new Date().toLocaleDateString()}`;
    });
  }
}