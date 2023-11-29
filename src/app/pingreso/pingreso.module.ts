import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PingresoPageRoutingModule } from './pingreso-routing.module';

import { PingresoPage } from './pingreso.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PingresoPageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [PingresoPage]
})
export class PingresoPageModule {}
