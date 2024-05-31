import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliarPacoteComponent } from './avaliar-pacote.component';

describe('AvaliarPacoteComponent', () => {
  let component: AvaliarPacoteComponent;
  let fixture: ComponentFixture<AvaliarPacoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaliarPacoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvaliarPacoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
