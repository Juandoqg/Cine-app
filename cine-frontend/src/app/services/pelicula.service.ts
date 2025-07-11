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
  return this.http.get<Pelicula[]>(`${this.apiUrl}/admin`);
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
  return this.http.post<Pelicula>('http://localhost:3000/peliculas', pelicula);
}

}
