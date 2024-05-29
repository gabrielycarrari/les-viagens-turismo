import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarHotelComponent } from './visualizar-hotel.component';

describe('VisualizarHotelComponent', () => {
  let component: VisualizarHotelComponent;
  let fixture: ComponentFixture<VisualizarHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarHotelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizarHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
