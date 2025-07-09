import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InhabilitarPeliculaComponent } from './inhabilitar-pelicula.component';

describe('InhabilitarPeliculaComponent', () => {
  let component: InhabilitarPeliculaComponent;
  let fixture: ComponentFixture<InhabilitarPeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InhabilitarPeliculaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InhabilitarPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
