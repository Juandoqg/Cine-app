import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cine-frontend';
   constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // ✅ Esto restablece el rol desde la cookie si el usuario sigue logueado
    this.authService.fetchUserInfo().subscribe();
  }
}
