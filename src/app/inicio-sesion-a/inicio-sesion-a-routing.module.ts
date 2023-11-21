import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioSesionAPage } from './inicio-sesion-a.page';

const routes: Routes = [
  {
    path: '',
    component: InicioSesionAPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioSesionAPageRoutingModule {}
