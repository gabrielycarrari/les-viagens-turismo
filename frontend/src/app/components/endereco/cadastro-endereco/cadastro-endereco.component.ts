import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-cadastro-endereco',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './cadastro-endereco.component.html',
  styleUrl: './cadastro-endereco.component.scss'
})
export class CadastroEnderecoComponent {
  @Input() form!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    console.log('form', this.form);
    console.log('Endereco: ', this.form.get('endereco'))
  }

  get enderecoFormGroup() {
    return this.form.get('endereco') as FormGroup;
  }
}
