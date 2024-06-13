import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarPacoteComponent } from './cadastrar-pacote.component';

describe('CadastrarPacoteComponent', () => {
  let component: CadastrarPacoteComponent;
  let fixture: ComponentFixture<CadastrarPacoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarPacoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarPacoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
