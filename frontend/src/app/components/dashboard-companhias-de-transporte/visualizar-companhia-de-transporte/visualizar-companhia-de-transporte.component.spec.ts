import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarCompanhiaDeTransporteComponent } from './visualizar-companhia-de-transporte.component';

describe('VisualizarCompanhiaDeTransporteComponent', () => {
  let component: VisualizarCompanhiaDeTransporteComponent;
  let fixture: ComponentFixture<VisualizarCompanhiaDeTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarCompanhiaDeTransporteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizarCompanhiaDeTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
