import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProximamenteComponent } from './pages/proximamente/proximamente.component';
import { DetallePeliculaComponent} from './pages/detalle-pelicula/detalle-pelicula.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'proximamente', component: ProximamenteComponent },
  { path: 'pelicula/:id', component: DetallePeliculaComponent},
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard]
  },




  
  { path: '**', redirectTo: '' },
];
