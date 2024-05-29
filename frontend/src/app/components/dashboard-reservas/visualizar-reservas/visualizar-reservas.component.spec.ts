import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarReservasComponent } from './visualizar-reservas.component';

describe('VisualizarReservasComponent', () => {
  let component: VisualizarReservasComponent;
  let fixture: ComponentFixture<VisualizarReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarReservasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizarReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
