import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AingresoPageRoutingModule } from './aingreso-routing.module';
import { AingresoPage } from './aingreso.page';
import { QrcodeComponent } from '@techiediaries/ngx-qrcode';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AuthService } from '../services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AingresoPageRoutingModule,
  ],
  declarations: [AingresoPage],
  providers: [BarcodeScanner, AuthService],
})
export class AingresoPageModule {}