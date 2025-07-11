import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InhabilitarClientesComponent } from './inhabilitar-clientes.component';

describe('InhabilitarClientesComponent', () => {
  let component: InhabilitarClientesComponent;
  let fixture: ComponentFixture<InhabilitarClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InhabilitarClientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InhabilitarClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
