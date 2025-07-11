import { Component } from '@angular/core';
import { NavbarAdminComponent } from '../../../components/navbar-admin/navbar-admin.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-clientes-admin',
  imports: [NavbarAdminComponent, FooterComponent],
  templateUrl: './clientes-admin.component.html',
  styleUrl: './clientes-admin.component.css'
})
export class ClientesAdminComponent {

}
