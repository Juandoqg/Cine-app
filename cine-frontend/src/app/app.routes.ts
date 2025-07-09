import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { CarteleraComponent } from './pages/cartelera/cartelera.component';
import { ProximamenteComponent } from './pages/proximamente/proximamente.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'cartelera', component: CarteleraComponent },
  { path: 'proximamente', component: ProximamenteComponent },
  { path: '**', redirectTo: '' }
];
