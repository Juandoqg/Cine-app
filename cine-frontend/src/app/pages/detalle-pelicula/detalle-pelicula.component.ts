import {
  Component,
  OnInit,
  inject
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculaService } from '../../services/pelicula.service';
import { Pelicula } from '../../models/pelicula.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Funcion } from '../../models/funcion.model';
import { FuncionService } from '../../services/funcion.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginModalComponent } from '../../components/login-modal/login-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrl: './detalle-pelicula.component.css',
  imports: [CommonModule],
})
export class DetallePeliculaComponent implements OnInit {
  pelicula!: Pelicula;
  trailerSafeUrl!: SafeResourceUrl;

  diasDisponibles: Date[] = [];
  diasVisibles: Date[] = [];
  diaSeleccionado!: Date;
  funcionesPorDia: { [dia: string]: Funcion[] } = {};

  private inicioIndex = 0;
  private readonly cantidadVisible = 5;

  private dialog = inject(MatDialog);
  isLoggedIn = false;
  userRole: string | null = null;

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
            this.actualizarDiasVisibles();
          },
        });
      },
    });
  }

  private agruparFuncionesPorDia(funciones: Funcion[]): void {
  this.funcionesPorDia = {};
  this.diasDisponibles = [];

  funciones.forEach((funcion) => {
    // ✅ Extraer fecha manualmente para evitar errores de zona horaria
    const [anio, mes, dia] = funcion.fecha.split('T')[0].split('-').map(Number);
    const fechaLocal = new Date(anio, mes - 1, dia); // mes va de 0-11

    const clave = fechaLocal.toDateString();

    if (!this.funcionesPorDia[clave]) {
      this.funcionesPorDia[clave] = [];
      this.diasDisponibles.push(fechaLocal);
    }

    this.funcionesPorDia[clave].push(funcion);
  });

  this.diaSeleccionado = this.diasDisponibles[0];
}

  actualizarDiasVisibles(): void {
    this.diasVisibles = this.diasDisponibles.slice(
      this.inicioIndex,
      this.inicioIndex + this.cantidadVisible
    );
  }

  scrollIzquierda(): void {
    if (this.inicioIndex > 0) {
      this.inicioIndex--;
      this.actualizarDiasVisibles();
    }
  }

  scrollDerecha(): void {
    if (this.inicioIndex + this.cantidadVisible < this.diasDisponibles.length) {
      this.inicioIndex++;
      this.actualizarDiasVisibles();
    }
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
        this.dialog
          .open(LoginModalComponent, { width: '400px' })
          .afterClosed()
          .subscribe(() => {
            this.authService.fetchUserInfo().subscribe((user) => {
              this.isLoggedIn = !!user;
              this.userRole = user?.rol ?? null;
            });
          });
      }
    });
  }
}
