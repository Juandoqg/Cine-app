import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcion } from '../models/funcion.model';
@Injectable({
  providedIn: 'root'
})
export class FuncionService {
  private apiUrl = 'http://localhost:3000/funciones';  

  constructor(private http: HttpClient) {}

  getFuncionesPorPelicula(peliculaId: string): Observable<Funcion[]> {
    return this.http.get<Funcion[]>(`${this.apiUrl}/pelicula/${peliculaId}`);
  }
}
