import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarPacotesComponent } from './visualizar-pacotes.component';

describe('VisualizarPacotesComponent', () => {
  let component: VisualizarPacotesComponent;
  let fixture: ComponentFixture<VisualizarPacotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarPacotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizarPacotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
