import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaPacoteComponent } from './pagina-pacote.component';

describe('PaginaPacoteComponent', () => {
  let component: PaginaPacoteComponent;
  let fixture: ComponentFixture<PaginaPacoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaPacoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginaPacoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
