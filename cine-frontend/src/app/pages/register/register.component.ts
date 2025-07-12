import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService} from '../../services/auth.service';
@Component({
  selector: 'app-register',
  imports:[ CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  usuario = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: '',
    rol : 'cliente',
    activo : true
  };

  constructor( private router: Router ,  private authService: AuthService,   private snackBar: MatSnackBar
) {}

registrarse() {
  this.authService.registrar(this.usuario).subscribe({
    next: () => {
      this.snackBar.open('¡Registro exitoso! 🎉', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass: ['snackbar-success']
      });
      this.router.navigate(['/']);
    },
    error: (err) => {
      console.error('Error al registrar:', err);

      const mensaje = err?.error?.message || 'Error al registrar. Intenta de nuevo.';

      this.snackBar.open(mensaje, 'Cerrar', {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
    }
  });
}


}
