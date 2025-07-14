import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}`, { withCredentials: true });
  }

  inhabilitarUsuario(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/inhabilitar/${id}`, {}, { withCredentials: true });
  }

  habilitarUsuario(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/habilitar/${id}`, {}, { withCredentials: true });
  }
}
