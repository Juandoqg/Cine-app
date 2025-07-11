import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TipoPagoService {
  private readonly baseUrl = 'http://localhost:3000/tipo-pago';

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  obtenerPorId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
