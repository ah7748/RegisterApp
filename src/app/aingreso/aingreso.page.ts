import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import jsQR from 'jsqr';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-aingreso',
  templateUrl: './aingreso.page.html',
  styleUrls: ['./aingreso.page.scss'],
})
export class AingresoPage implements OnInit {
  code: any;
  scanActive = false;
  scanResult = null;
  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  videoElement: any;
  canvasElement: any;
  canvasContext: any;
  loading: HTMLIonLoadingElement;
  nombreAlumno: string;

  constructor(private barcodeScanner: BarcodeScanner, private toastCtrl: ToastController, private loadingCtrl: LoadingController, private authService: AuthService, private http: HttpClient) { }

  ngAfterViewInit() {
    this.videoElement = this.video.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
  }

  ngOnInit() { 
    this.nombreAlumno = this.authService.getNombreAlumno();
  }

  async startScan() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    this.videoElement.srcObject = stream;
    this.videoElement.setAttribute('playsinline', true);
    this.videoElement.play();
    this.loading = await this.loadingCtrl.create({});
    await this.loading.present();
    requestAnimationFrame(this.scan.bind(this));
  }

  stopScan() {
    this.scanActive = false;
  }

  async scan() {
    console.log('SCAN');
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
        this.scanActive = true;
      }
      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;
      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });
      console.log('code: ', code);
      if (code) {
        this.scanActive = false;
        this.scanResult = code.data;
        this.showQrToast();
      } else {
        if (this.scanActive) {
          requestAnimationFrame(this.scan.bind(this));
        }
      }
    } else {
      requestAnimationFrame(this.scan.bind(this));
    }
  }

  reset() {
    this.scanResult = null;
  }

  async showQrToast() {
    const toast = await this.toastCtrl.create({
      message: `Open ${this.scanResult}?`,
      position: 'top',
      buttons: [{
        text: 'Open',
        handler: async () => {
          await this.registerAttendance();  // Llama a la función para registrar asistencia
          window.open(this.scanResult, '_system', 'location=yes');
        }
      }]
    });
    toast.present();
  }

  async registerAttendance() {
    try {
      // Aquí debes construir el objeto que se enviará al servidor (json-server)
      const attendanceData = {
        studentName: this.nombreAlumno,
        dateTime: new Date().toISOString()  // Puedes ajustar el formato según tus necesidades
      };

      // Realiza la petición HTTP al servidor (json-server) para registrar la asistencia
      const apiUrl = 'http://localhost:3000/asistencias';  // Reemplaza con tu URL de json-server
      await this.http.post(apiUrl, attendanceData).toPromise();

      console.log('Asistencia registrada correctamente.');
    } catch (error) {
      console.error('Error al registrar la asistencia:', error);
    }
 }
}