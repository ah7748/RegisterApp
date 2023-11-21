import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AingresoPageRoutingModule } from './aingreso-routing.module';

import { AingresoPage } from './aingreso.page';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { QrcodeComponent } from '@techiediaries/ngx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AingresoPageRoutingModule,
    BarcodeScanner,
    QrcodeComponent
  ],
  declarations: [AingresoPage]
})
export class AingresoPageModule {}
