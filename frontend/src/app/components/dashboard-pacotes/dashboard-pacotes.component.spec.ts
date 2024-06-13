import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPacotesComponent } from './dashboard-pacotes.component';

describe('DashboardPacotesComponent', () => {
  let component: DashboardPacotesComponent;
  let fixture: ComponentFixture<DashboardPacotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPacotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardPacotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
