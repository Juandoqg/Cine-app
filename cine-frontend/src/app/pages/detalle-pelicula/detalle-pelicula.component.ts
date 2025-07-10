import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculaService } from '../../services/pelicula.service';
import { Pelicula } from '../../models/pelicula.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Funcion } from '../../models/funcion.model';
import { FuncionService } from '../../services/funcion.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrl: './detalle-pelicula.component.css',
  imports: [CommonModule, NavbarComponent, FooterComponent],
})
export class DetallePeliculaComponent implements OnInit {
  pelicula!: Pelicula;
  trailerSafeUrl!: SafeResourceUrl;
  diasDisponibles: Date[] = [];
  diaSeleccionado!: Date;
  funcionesPorDia: { [dia: string]: Funcion[] } = {};

  constructor(
    private route: ActivatedRoute,
    private peliculaService: PeliculaService,
    private funcionService: FuncionService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private router: Router

  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.peliculaService.getPeliculaPorId(id).subscribe({
      next: (peli) => {
        this.pelicula = peli;
        this.trailerSafeUrl = this.sanitizarUrl(peli.trailerUrl);

        this.funcionService.getFuncionesPorPelicula(id.toString()).subscribe({
          next: (funciones) => {
            this.agruparFuncionesPorDia(funciones);
          }
        });
      }
    });
  }

  private agruparFuncionesPorDia(funciones: Funcion[]): void {
    this.funcionesPorDia = {};
    this.diasDisponibles = [];

    funciones.forEach(funcion => {
      const fecha = new Date(funcion.fecha);
      const clave = fecha.toDateString();

      if (!this.funcionesPorDia[clave]) {
        this.funcionesPorDia[clave] = [];
        this.diasDisponibles.push(fecha);
      }

      this.funcionesPorDia[clave].push(funcion);
    });

    this.diaSeleccionado = this.diasDisponibles[0];
  }

  get funcionesDelDiaSeleccionado(): Funcion[] {
  return this.diaSeleccionado
    ? this.funcionesPorDia[this.diaSeleccionado.toDateString()] || []
    : [];
}


  sanitizarUrl(url: string): SafeResourceUrl {
    const videoId = this.extraerIdYoutube(url);
    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  private extraerIdYoutube(url: string): string {
    const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : '';
  }


  irAComprar(funcionId: number): void {
  this.authService.isLoggedIn().subscribe((logueado) => {
    if (logueado) {
      this.router.navigate(['/comprar', funcionId]);
    } else {
      this.router.navigate(['/login'], { queryParams: { redirect: `/comprar/${funcionId}` } });
    }
  });
}

}
