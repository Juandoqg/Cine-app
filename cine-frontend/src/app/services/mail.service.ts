import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment';
import { MailData } from '../models/mail.model';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private readonly apiUrl = `${environment.apiUrl}/mail`;

  constructor(private http: HttpClient) {}

  enviarCorreoConfirmacion(data: MailData): Observable<any> {
  return this.http.post(`${this.apiUrl}/confirm-purchase`, data, {
    withCredentials: true
  });
}
}
