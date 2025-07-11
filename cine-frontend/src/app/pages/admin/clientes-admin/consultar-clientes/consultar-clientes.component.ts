import { Component } from '@angular/core';
import { NavbarAdminComponent } from '../../../../components/navbar-admin/navbar-admin.component';
import { FooterComponent } from '../../../../components/footer/footer.component';

@Component({
  selector: 'app-consultar-clientes',
  imports: [NavbarAdminComponent, FooterComponent],
  templateUrl: './consultar-clientes.component.html',
  styleUrl: './consultar-clientes.component.css'
})
export class ConsultarClientesComponent {

}
