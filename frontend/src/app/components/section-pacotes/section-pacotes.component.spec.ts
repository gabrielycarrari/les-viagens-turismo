import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPacotesComponent } from './section-pacotes.component';

describe('SectionPacotesComponent', () => {
  let component: SectionPacotesComponent;
  let fixture: ComponentFixture<SectionPacotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionPacotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionPacotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
