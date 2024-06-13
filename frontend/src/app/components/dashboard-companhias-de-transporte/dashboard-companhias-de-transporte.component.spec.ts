import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCompanhiasDeTransporteComponent } from './dashboard-companhias-de-transporte.component';

describe('DashboardCompanhiasDeTransporteComponent', () => {
  let component: DashboardCompanhiasDeTransporteComponent;
  let fixture: ComponentFixture<DashboardCompanhiasDeTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCompanhiasDeTransporteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardCompanhiasDeTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
