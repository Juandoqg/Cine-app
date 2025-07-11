import { Component } from '@angular/core';
import { NavbarAdminComponent } from '../../../components/navbar-admin/navbar-admin.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-compras-clientes',
  imports: [NavbarAdminComponent, FooterComponent, RouterModule],
  templateUrl: './compras-clientes.component.html',
  styleUrl: './compras-clientes.component.css'
})
export class ComprasClientesComponent {

}
