import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcion } from '../models/funcion.model';
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class FuncionService {
  private readonly apiUrl = `${environment.apiUrl}/funciones`;

  constructor(private http: HttpClient) {}

   getFuncionesPorPelicula(peliculaId: string): Observable<Funcion[]> {
    return this.http.get<Funcion[]>(`${this.apiUrl}/pelicula/${peliculaId}`, {
      withCredentials: true
    });
  }

  getFuncionPorId(id: number): Observable<Funcion> {
    return this.http.get<Funcion>(`${this.apiUrl}/${id}`, {
      withCredentials: true
    });
  }

  crearFuncion(funcion: Funcion): Observable<any> {
    return this.http.post(this.apiUrl, funcion, {
      withCredentials: true
    });
  }

  obtenerTodas(): Observable<Funcion[]> {
    return this.http.get<Funcion[]>(this.apiUrl, {
      withCredentials: true
    });
  }

  habilitarFuncion(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/habilitar/${id}`, {}, {
      withCredentials: true
    });
  }

  inhabilitarFuncion(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/inhabilitar/${id}`, {}, {
      withCredentials: true
    });
  }

}
