import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionService } from '../../services/funcion.service';
import { PeliculaService } from '../../services/pelicula.service';
import { Funcion } from '../../models/funcion.model';
import { Pelicula } from '../../models/pelicula.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalaService } from '../../services/sala.service';
import { Sala } from '../../models/sala.model';
import { VentaService } from '../../services/venta.service';


@Component({
  selector: 'app-compra-ticket',
  imports: [CommonModule, FormsModule],
  templateUrl: './compra-ticket.component.html',
  styleUrl: './compra-ticket.component.css',
})
export class CompraTicketComponent implements OnInit {
  funcionId!: number;
  funcion!: Funcion;
  pelicula!: Pelicula;
  sala!: Sala;

  ventasRealizadas: number = 0;
  cantidadDisponible: number = 0;
  cantidadTickets: number = 1;
  precioPorTicket: number = 0;

  constructor(
    private route: ActivatedRoute,
    private funcionService: FuncionService,
    private peliculaService: PeliculaService,
    private salaService: SalaService,
    private ventaService: VentaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.funcionId = Number(this.route.snapshot.paramMap.get('id'));

    this.funcionService.getFuncionPorId(this.funcionId).subscribe((funcion: Funcion) => {
      if (!funcion) {
        console.error('No se encontró la función con ID:', this.funcionId);
        return;
      }

      this.funcion = funcion;
      this.precioPorTicket = funcion.precio;

      // Obtener película
      this.peliculaService.getPeliculaPorId(Number(funcion.peliculaId)).subscribe((peli) => {
        this.pelicula = peli;
      });

      // Obtener sala y luego las ventas
      this.salaService.obtenerPorId(Number(funcion.salaId)).subscribe((sala) => {
        this.sala = sala;

        this.ventaService.obtenerVentasPorFuncionId(this.funcionId).subscribe((ventas) => {
          this.ventasRealizadas = ventas.reduce((acc, venta) => acc + venta.cantidadTickets, 0);
          this.cantidadDisponible = Math.max(this.sala.capacidad - this.ventasRealizadas, 0);

          if (this.cantidadTickets > this.cantidadDisponible) {
            this.cantidadTickets = this.cantidadDisponible;
          }
        });
      });
    });
  }

  get total(): number {
    return this.precioPorTicket * this.cantidadTickets;
  }

 irAProcesarPago(): void {
   if (
    !this.cantidadTickets ||
    this.cantidadTickets < 1 ||
    this.cantidadTickets > this.cantidadDisponible ||
    this.cantidadDisponible <= 0
  ) {
    alert('No se puede continuar: no hay tickets disponibles o la cantidad ingresada no es válida.');
    return;
  }


  this.router.navigate(['/procesar-pago'], {
    state: {
      pelicula: this.pelicula,
      funcion: this.funcion,
      sala: this.sala,
      cantidadTickets: this.cantidadTickets,
      total: this.total
    }
  });
}
}
