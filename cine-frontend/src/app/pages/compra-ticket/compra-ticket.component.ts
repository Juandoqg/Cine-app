import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuncionService } from '../../services/funcion.service';
import { PeliculaService } from '../../services/pelicula.service';
import { Funcion } from '../../models/funcion.model';
import { Pelicula } from '../../models/pelicula.model';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalaService } from '../../services/sala.service';
import { Sala } from '../../models/sala.model';


@Component({
  selector: 'app-compra-ticket',
  imports: [NavbarComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './compra-ticket.component.html',
  styleUrl: './compra-ticket.component.css',
})


export class CompraTicketComponent implements OnInit {
  funcionId!: number;
  funcion!: Funcion;
  pelicula!: Pelicula;
  sala!: Sala;

  cantidadTickets: number = 1;
  precioPorTicket: number = 0;

  constructor(
    private route: ActivatedRoute,
    private funcionService: FuncionService,
    private peliculaService: PeliculaService,
    private salaService: SalaService
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

      this.peliculaService.getPeliculaPorId(Number(funcion.peliculaId)).subscribe((peli) => {
        this.pelicula = peli;
      });

      this.salaService.obtenerPorId(Number(funcion.salaId)).subscribe((sala) => {
        this.sala = sala;
      });
    });
  }

  get total(): number {
    return this.precioPorTicket * this.cantidadTickets;
  }
}
