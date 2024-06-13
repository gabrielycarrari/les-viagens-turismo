import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAvaliacoesComponent } from './dashboard-avaliacoes.component';

describe('DashboardAvaliacoesComponent', () => {
  let component: DashboardAvaliacoesComponent;
  let fixture: ComponentFixture<DashboardAvaliacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAvaliacoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardAvaliacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
