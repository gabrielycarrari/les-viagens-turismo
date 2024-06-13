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
  @Input() nomeForm!: string;

  get enderecoFormGroup() {
    if (this.nomeForm){
      return this.form.get(this.nomeForm) as FormGroup;
    }
    return this.form.get('endereco') as FormGroup;
  }

  getMensagemError(controlName: string): string {
    const control = this.enderecoFormGroup.get(controlName);

    if (control == null) return 'Erro desconhecido'
    if (control.hasError('required')) return 'Campo obrigatório';
    if (control.hasError('cepInvalido')) return 'CEP inválido';
    return 'Valor inválido';
  }
}
