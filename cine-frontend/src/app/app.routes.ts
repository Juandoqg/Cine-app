import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProximamenteComponent } from './pages/proximamente/proximamente.component';
import { DetallePeliculaComponent} from './pages/detalle-pelicula/detalle-pelicula.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'proximamente', component: ProximamenteComponent },
  { path: 'pelicula/:id', component: DetallePeliculaComponent},





  
  { path: '**', redirectTo: '' },
];
