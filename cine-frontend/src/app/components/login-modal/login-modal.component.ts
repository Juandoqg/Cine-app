import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  email = '';
  password = '';
  loginError: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<LoginModalComponent>,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar

  ) {}

  cerrarYRedirigir() {
  this.dialogRef.close();
  this.router.navigate(['/registrarse']);
}
  
  login() {
  this.loginError = null;

   if (!this.email || !this.password) {
    this.loginError = 'Todos los campos son obligatorios';
    return;
  }

  if (this.password.length < 8) {
    this.loginError = 'La contraseña debe tener al menos 8 caracteres';
    return;
  }

  this.authService.login(this.email, this.password).subscribe({
    next: () => {
      this.authService.fetchUserInfo().subscribe({
        next: user => {
          if (user) {
            console.log('Usuario autenticado:', user);

            // ✅ Mostrar snackbar
            this.snackBar.open('Sesión iniciada correctamente ✅', 'Cerrar', {
              duration: 3000,
              panelClass: ['snackbar-success'],
            });

            // ✅ Cerrar modal e indicar éxito
            this.dialogRef.close(true);

            // ✅ Redirigir por rol
            if (user.rol === 'admin') {
              this.router.navigate(['/admin/peliculas']);
            } else {
              // Ruta de clientes si es necesario
            }
          }
        },
        error: () => {
          this.loginError = 'No se pudo obtener la información del usuario.';
        }
      });
    },
    error: (err) => {
      // Mostrar mensaje real desde el backend si existe
      if (err.error && err.error.message) {
        this.loginError = err.error.message;
      } else {
        this.loginError = 'Error desconocido al iniciar sesión.';
      }
    }
  });
}

loginWithGoogle() {
  const returnUrl = encodeURIComponent(window.location.origin + '/'); 
  window.location.href = `http://localhost:3000/auth/google?state=${returnUrl}`;
}
}
