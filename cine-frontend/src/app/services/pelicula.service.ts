import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pelicula } from '../models/pelicula.model';
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  private readonly apiUrl = `${environment.apiUrl}/peliculas`;

  constructor(private http: HttpClient) {}

   getPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(`${this.apiUrl}/admin`, { withCredentials: true });
  }
  
  getPeliculasActivas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.apiUrl);
  }

  getPeliculasProximamente(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(`${this.apiUrl}/proximamente`);
  }

  getPeliculaPorId(id: number): Observable<Pelicula> {
    return this.http.get<Pelicula>(`${this.apiUrl}/${id}`);
  }

  crearPelicula(pelicula: Partial<Pelicula>): Observable<Pelicula> {
    return this.http.post<Pelicula>(this.apiUrl, pelicula, { withCredentials: true });
  }

  updatePelicula(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data, { withCredentials: true });
  }

  inhabilitarPelicula(id: number) {
    return this.http.patch(`${this.apiUrl}/inhabilitar/${id}`, {}, { withCredentials: true });
  }

  
}
