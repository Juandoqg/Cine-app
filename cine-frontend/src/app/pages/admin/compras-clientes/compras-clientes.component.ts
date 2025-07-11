import { Component } from '@angular/core';
import { NavbarAdminComponent } from '../../../components/navbar-admin/navbar-admin.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-compras-clientes',
  imports: [NavbarAdminComponent, FooterComponent],
  templateUrl: './compras-clientes.component.html',
  styleUrl: './compras-clientes.component.css'
})
export class ComprasClientesComponent {

}
