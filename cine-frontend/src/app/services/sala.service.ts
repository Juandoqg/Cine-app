import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment';
import { Sala } from '../models/sala.model';

@Injectable({
  providedIn: 'root'
})
export class SalaService {
  private readonly apiUrl = `${environment.apiUrl}/salas`;

  constructor(private http: HttpClient) {}

  obtenerPorId(id: number): Observable<Sala> {
    return this.http.get<Sala>(`${this.apiUrl}/${id}`, {
      withCredentials: true
    });
  }

  obtenerTodas(): Observable<Sala[]> {
    return this.http.get<Sala[]>(this.apiUrl, {
      withCredentials: true
    });
  }
}
