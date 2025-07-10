import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraTicketComponent } from './compra-ticket.component';

describe('CompraTicketComponent', () => {
  let component: CompraTicketComponent;
  let fixture: ComponentFixture<CompraTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompraTicketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompraTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
