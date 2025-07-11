import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private userRole: string | null = null;
  private currentUser: Usuario | null = null;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }, { withCredentials: true });
  }

  registrar(usuario: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/register`, usuario); 
  }
  fetchUserInfo(): Observable<Usuario | null> {
    return this.http.get<Usuario>(`${this.apiUrl}/me`, { withCredentials: true }).pipe(
      tap(user => {
        this.userRole = user.rol;
        this.currentUser = user;
      }),
      catchError(() => {
        this.userRole = null;
        this.currentUser = null;
        return of(null);
      })
    );
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe(() => {
      this.userRole = null;
      this.currentUser = null;
      this.router.navigate(['']);
    });
  }

  getRole(): string | null {
    return this.userRole;
  }

  setRole(rol: string): void {
    this.userRole = rol;
  }

  getCurrentUser(): Usuario | null {
    return this.currentUser;
  }

  isLoggedIn(): Observable<boolean> {
  return this.fetchUserInfo().pipe(
    map(user => !!user), 
    catchError(() => of(false))
  );
}
}
