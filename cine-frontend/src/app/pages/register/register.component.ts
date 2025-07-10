import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService} from '../../services/auth.service';
@Component({
  selector: 'app-register',
  imports:[NavbarComponent, FooterComponent, CommonModule, FormsModule],
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

  constructor( private router: Router ,  private authService: AuthService) {}

  registrarse() {
    this.authService.registrar(this.usuario).subscribe({
      next: (res) => {
        console.log('Registro exitoso', res);
        this.router.navigate(['/']); // redirige al home u otra ruta
      },
      error: (err) => {
        console.error('Error al registrar:', err);
      }
    });
  }
}
