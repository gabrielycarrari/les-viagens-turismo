import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarCompanhiaComponent } from './cadastrar-companhia.component';

describe('CadastrarCompanhiaComponent', () => {
  let component: CadastrarCompanhiaComponent;
  let fixture: ComponentFixture<CadastrarCompanhiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarCompanhiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarCompanhiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
