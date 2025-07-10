import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProximamenteComponent } from './pages/proximamente/proximamente.component';
import { DetallePeliculaComponent} from './pages/detalle-pelicula/detalle-pelicula.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { PeliculasAdminComponent} from './pages/admin/peliculas-admin/peliculas-admin.component';
import { ClientesAdminComponent } from './pages/admin/clientes-admin/clientes-admin.component';
import { ComprasClientesComponent } from './pages/admin/compras-clientes/compras-clientes.component';
import { RegisterComponent } from './pages/register/register.component';


export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'proximamente', component: ProximamenteComponent },
  { path: 'pelicula/:id', component: DetallePeliculaComponent},
  { path: 'registrarse', component: RegisterComponent},


  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'admin/clientes', component: ClientesAdminComponent, canActivate: [AdminGuard] },
  { path: 'admin/compras', component: ComprasClientesComponent, canActivate: [AdminGuard] },

  {
    path: 'admin/peliculas',
    canActivate: [AdminGuard],

    loadChildren: () =>
      import('./pages/admin/peliculas-admin/peliculas-admin.routing')
        .then(m => m.PeliculasAdminRoutingModule)
  },

  
  { path: '**', redirectTo: '' },
];
