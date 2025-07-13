import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarFuncionesComponent } from './gestionar-funciones.component';

describe('GestionarFuncionesComponent', () => {
  let component: GestionarFuncionesComponent;
  let fixture: ComponentFixture<GestionarFuncionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarFuncionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarFuncionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
