import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioSesionAPageRoutingModule } from './inicio-sesion-a-routing.module';

import { InicioSesionAPage } from './inicio-sesion-a.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioSesionAPageRoutingModule
  ],
  declarations: [InicioSesionAPage]
})
export class InicioSesionAPageModule {}
