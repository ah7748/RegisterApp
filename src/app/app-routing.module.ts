import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
    
    
  },
  {
    
    path: 'home',
loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
    
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'listado',
    loadChildren: () => import('./listado/listado.module').then( m => m.ListadoPageModule)
  },
  {
    path: 'einicios',
    loadChildren: () => import('./einicios/einicios.module').then( m => m.EiniciosPageModule)
  },
  {
    path: 'olvidar',
    loadChildren: () => import('./olvidar/olvidar.module').then( m => m.OlvidarPageModule)
  },
  {
    path: 'aingreso',
    loadChildren: () => import('./aingreso/aingreso.module').then( m => m.AingresoPageModule)
  },
  {
    path: 'pingreso',
    loadChildren: () => import('./pingreso/pingreso.module').then( m => m.PingresoPageModule)
  },
  {
    path: 'codigoqr',
    loadChildren: () => import('./codigoqr/codigoqr.module').then( m => m.CodigoqrPageModule)
  },
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },
  {
    path: 'alumno',
    loadChildren: () => import('./alumno/alumno.module').then( m => m.AlumnoPageModule)
  },
  {
    path: 'profesor',
    loadChildren: () => import('./profesor/profesor.module').then( m => m.ProfesorPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
