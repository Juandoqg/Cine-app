import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cine-frontend';
   constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // ✅ Esto restablece el rol desde la cookie si el usuario sigue logueado
    this.authService.fetchUserInfo().subscribe();
       // Verificar si viene de login con Google
    const url = new URL(window.location.href);
    const loginSuccess = url.searchParams.get('login');

    if (loginSuccess === 'success') {
      this.snackBar.open('Sesión iniciada correctamente ✅', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-success'],
      });

      // Limpiar el parámetro `login=success` de la URL
      url.searchParams.delete('login');
      window.history.replaceState({}, '', url.pathname + url.search);
    }
  }
    
  }

