import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule, Router } from '@angular/router';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  isLoggedIn = false;
  userRole: string | null = null;

  ngOnInit(): void {
    this.authService.fetchUserInfo().subscribe(user => {
      this.isLoggedIn = !!user;
      this.userRole = user?.rol ?? null;
    });
  }

  abrirLogin(): void {
    this.dialog.open(LoginModalComponent, { width: '400px' }).afterClosed().subscribe(() => {
      // refrescar estado después de login
      this.authService.fetchUserInfo().subscribe(user => {
        this.isLoggedIn = !!user;
        this.userRole = user?.rol ?? null;
      });
    });
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userRole = null;
  }

  irAMisCompras(): void {
    this.router.navigate(['/mis-compras']);
  }
}
