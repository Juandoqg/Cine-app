import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private readonly apiUrl = `${environment.apiUrl}/ventas`;

  constructor(private http: HttpClient) {}

  crearVenta(data: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, data, {
        withCredentials: true
        });
  }

  obtenerVentas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      withCredentials: true
    });
  }

  obtenerVentasPorClienteId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cliente/${id}`, { withCredentials: true });
  }
}
