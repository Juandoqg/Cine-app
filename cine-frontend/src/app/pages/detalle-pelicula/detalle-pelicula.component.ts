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
@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrl: './detalle-pelicula.component.css',
  imports: [CommonModule, NavbarComponent, FooterComponent],

})
export class DetallePeliculaComponent implements OnInit {
  pelicula!: Pelicula;
  trailerSafeUrl!: SafeResourceUrl;
  funcionesPorDia: { [dia: string]: Funcion[] } = {}; // agrupadas por día

  constructor(
    private route: ActivatedRoute,
    private peliculaService: PeliculaService,
    private funcionService: FuncionService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.peliculaService.getPeliculaPorId(id).subscribe({
      next: (peli) => {
        this.pelicula = peli;
        this.trailerSafeUrl = this.sanitizarUrl(peli.trailerUrl);

        // Obtener funciones
        this.funcionService.getFuncionesPorPelicula(id.toString()).subscribe({
          next: (funciones) => {
            this.agruparFuncionesPorDia(funciones);
          }
        });
      }
    });
  }

  private agruparFuncionesPorDia(funciones: Funcion[]): void {
    this.funcionesPorDia = funciones.reduce((acc, funcion) => {
      const fechaObj = new Date(funcion.fecha);
      const dia = fechaObj.toLocaleDateString();

      if (!acc[dia]) acc[dia] = [];
      acc[dia].push(funcion);
      return acc;
    }, {} as { [dia: string]: Funcion[] });
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
}
