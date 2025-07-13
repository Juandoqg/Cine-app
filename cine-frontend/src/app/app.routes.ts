import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProximamenteComponent } from './pages/proximamente/proximamente.component';
import { DetallePeliculaComponent} from './pages/detalle-pelicula/detalle-pelicula.component';
import { AdminGuard } from './guards/admin.guard';
import { RegisterComponent } from './pages/register/register.component';
import { CompraTicketComponent } from './pages/compra-ticket/compra-ticket.component';
import { ProcesarPagoComponent } from './pages/procesar-pago/procesar-pago.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MisComprasComponent } from './pages/mis-compras/mis-compras.component';
export const routes: Routes = [

  // 🟢 Layout Público
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'registrarse', component: RegisterComponent },
      { path: 'proximamente', component: ProximamenteComponent },
      
      { path: 'pelicula/:id', component: DetallePeliculaComponent },
      { path: 'comprar/:id', component: CompraTicketComponent },
      { path: 'procesar-pago', component: ProcesarPagoComponent },
      { path: 'mis-compras', component: MisComprasComponent },

    ]
  },
  // 🟢 Layout para admin
{
  path: 'admin',
  component: AdminLayoutComponent,
  canActivate: [AdminGuard],
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'peliculas'  
    },
    {
      path: 'peliculas',
      loadChildren: () =>
        import('./pages/admin/peliculas-admin/peliculas-admin.routing')
          .then(m => m.PeliculasAdminRoutingModule)
    },
    {
      path: 'clientes',
      loadChildren: () =>
        import('./pages/admin/clientes-admin/clientes-admin.routing')
          .then(m => m.ClientesAdminRoutingModule)
    },
    {
      path: 'compras',
      loadChildren: () =>
        import('./pages/admin/compras-clientes/compras-clientes.routing')
          .then(m => m.ComprasAdminRoutingModule)
    },
    {
      path: 'funciones',
      loadChildren: () =>
        import('./pages/admin/funciones-admin/funciones-admin.routing')
          .then(m => m.FuncionesAdminRoutingModule)
    },
  ]
},


  { path: '**', redirectTo: '' },
];