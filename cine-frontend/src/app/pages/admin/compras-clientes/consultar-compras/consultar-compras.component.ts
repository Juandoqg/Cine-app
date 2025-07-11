import { Component , OnInit} from '@angular/core';
import { NavbarAdminComponent } from '../../../../components/navbar-admin/navbar-admin.component';
import { FooterComponent } from '../../../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { VentaService } from '../../../../services/venta.service';

@Component({
  selector: 'app-consultar-compras',
  imports: [CommonModule],
  templateUrl: './consultar-compras.component.html',
  styleUrl: './consultar-compras.component.css'
})
export class ConsultarComprasComponent implements OnInit {
  ventas: any[] = [];

  constructor(private ventaService : VentaService) {}

 
  ngOnInit(): void {
    this.ventaService.obtenerVentas().subscribe({
      next: (data) => this.ventas = data,
      error: (err) => console.error('Error al obtener ventas', err)
    });
  }
}