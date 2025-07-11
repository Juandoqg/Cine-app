import { Component  , OnInit } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TipoPagoService } from '../../services/tipo-pago.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-procesar-pago',
  imports: [NavbarComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './procesar-pago.component.html',
  styleUrl: './procesar-pago.component.css'
})
export class ProcesarPagoComponent implements OnInit {
  pelicula: any;
  funcion: any;
  sala: any;
  cantidadTickets: number = 1;
  total: number = 0;
  numeroCuenta: string = ''; 

  tiposPago: any[] = [];
  tipoPagoSeleccionadoId: number | null = null;

  constructor(
    private router: Router,
    private tipoPagoService: TipoPagoService
  ) {}

  ngOnInit(): void {
    const state = history.state;
    this.pelicula = state.pelicula;
    this.funcion = state.funcion;
    this.sala = state.sala;
    this.cantidadTickets = state.cantidadTickets || 1;
    this.total = state.total || 0;

    this.tipoPagoService.obtenerTodos().subscribe((tipos) => {
      this.tiposPago = tipos;
    });
  }

  confirmarPago(): void {
    if (this.tipoPagoSeleccionadoId) {
      // Aquí puedes continuar con lógica de crear la compra y procesar el pago
      console.log('Pago confirmado con tipo:', this.tipoPagoSeleccionadoId);
      console.log('Datos de la compra:', {
        pelicula: this.pelicula,
        funcion: this.funcion,
        sala: this.sala,
        cantidadTickets: this.cantidadTickets,
        total: this.total
      });
      alert('¡Pago realizado con éxito!');
      this.router.navigate(['/']);
    }
  }
}
