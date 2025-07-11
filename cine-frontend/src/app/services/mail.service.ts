import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment';

interface MailData {
  to: string;
  movie: string;
  tickets: number;
  total: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private readonly apiUrl = `${environment.apiUrl}/mail`;

  constructor(private http: HttpClient) {}

  enviarCorreoConfirmacion(data: MailData): Observable<any> {
    return this.http.post(`${this.apiUrl}/confirm-purchase`, data);
  }
}
