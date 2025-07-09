import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pelicula } from '../models/pelicula.model';
@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  private apiUrl = 'http://localhost:3000/peliculas';

  constructor(private http: HttpClient) {}

  getPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.apiUrl);
  }
  getPeliculasProximamente(): Observable<Pelicula[]> {
  return this.http.get<Pelicula[]>(`${this.apiUrl}/proximamente`);
  }
  getPeliculaPorId(id: number): Observable<Pelicula> {
  return this.http.get<Pelicula>(`${this.apiUrl}/${id}`);
  }

}
