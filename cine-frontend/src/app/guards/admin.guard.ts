import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.fetchUserInfo().pipe(
      map(user => {
        if (user?.rol === 'admin') {
          return true;
        } else {
          return this.router.parseUrl('/');
        }
      })
    );
  }
}
