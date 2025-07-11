import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-procesar-pago',
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './procesar-pago.component.html',
  styleUrl: './procesar-pago.component.css'
})
export class ProcesarPagoComponent {

}
