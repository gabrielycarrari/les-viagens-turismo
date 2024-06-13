import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarAvaliacaoComponent } from './visualizar-avaliacao.component';

describe('VisualizarAvaliacaoComponent', () => {
  let component: VisualizarAvaliacaoComponent;
  let fixture: ComponentFixture<VisualizarAvaliacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarAvaliacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizarAvaliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
