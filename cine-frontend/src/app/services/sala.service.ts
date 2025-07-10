import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Sala {
  id: number;
  nombre: string;
  capacidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class SalaService {
  private apiUrl = 'http://localhost:3000/salas'; // Ajusta si usas otra URL

  constructor(private http: HttpClient) {}

  obtenerPorId(id: number): Observable<Sala> {
    return this.http.get<Sala>(`${this.apiUrl}/${id}`);
  }

  obtenerTodas(): Observable<Sala[]> {
    return this.http.get<Sala[]>(this.apiUrl);
  }
}
