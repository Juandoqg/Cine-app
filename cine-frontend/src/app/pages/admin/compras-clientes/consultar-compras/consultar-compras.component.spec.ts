import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarComprasComponent } from './consultar-compras.component';

describe('ConsultarComprasComponent', () => {
  let component: ConsultarComprasComponent;
  let fixture: ComponentFixture<ConsultarComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarComprasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
