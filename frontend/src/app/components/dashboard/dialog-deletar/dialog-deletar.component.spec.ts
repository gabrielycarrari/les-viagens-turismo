import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeletarComponent } from './dialog-deletar.component';

describe('DialogDeletarComponent', () => {
  let component: DialogDeletarComponent;
  let fixture: ComponentFixture<DialogDeletarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDeletarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogDeletarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
