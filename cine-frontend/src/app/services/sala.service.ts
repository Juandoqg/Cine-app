import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment';

export interface Sala {
  id: number;
  nombre: string;
  capacidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class SalaService {
  private readonly apiUrl = `${environment.apiUrl}/salas`;

  constructor(private http: HttpClient) {}

  obtenerPorId(id: number): Observable<Sala> {
    return this.http.get<Sala>(`${this.apiUrl}/${id}`);
  }

  obtenerTodas(): Observable<Sala[]> {
    return this.http.get<Sala[]>(this.apiUrl);
  }
}
