import { Comodidade } from './../../comodidade/comodidade';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { CadastroEnderecoComponent } from '../../endereco/cadastro-endereco/cadastro-endereco.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ClienteService } from '../../cliente/cliente.service';
import { Router } from '@angular/router';
import { HotelService } from '../../hotel/hotel.service';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { Validadores } from '../../validadores/validadores';

@Component({
  selector: 'app-cadastrar-hotel',
  standalone: true,
  imports: [
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    CadastroEnderecoComponent,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDivider,
    MatSliderModule,
    MatExpansionModule
  ],
  templateUrl: './cadastrar-hotel.component.html',
  styleUrl: './cadastrar-hotel.component.scss'
})
export class CadastrarHotelComponent {
  form!: FormGroup;
  titulo: string = this.data.titulo;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private hotelService: HotelService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialogRef: MatDialogRef<CadastrarHotelComponent>,
    readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initForm();
    if (this.data.idHotel) this.carregarHotel();
  }

  carregarHotel(){
    this.hotelService.getById(this.data.idHotel).subscribe({
      next: (hotel) => {
        this.form.patchValue(hotel);
        if (hotel.comodidades) {
          hotel.comodidades.forEach(comodidade => {
            this.carregarComodidade(comodidade);
          });
        }
      }
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      id: [''],
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      telefone: ['', [Validators.required, Validadores.telefone]],
      email: ['', [Validators.required, Validators.email]],
      classificacao: ['', [Validators.required]],
      comodidades: this.formBuilder.array([]),
      endereco: this.formBuilder.group({
        id: [''],
        cep: [''],
        uf: [''],
        cidade: [''],
        bairro: [''],
        rua: [''],
        numero: [''],
        pontoReferencia: ['']
      })
    });
  }

  onSubmit() {
    this.validateComodidades()
    if (this.validateForm(this.form)) {
      const formValue = this.form.value;
        this.hotelService.save(formValue).subscribe({
          next: () => {
            this.onSuccess();
            this.dialogRef.close(true);
          },
          error: () => this.onError()
        });

    }else{
      this.form.markAllAsTouched();
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  private onSuccess(){
    this.snackBar.open('Aleração realizada com sucesso!', '', { duration: 5000, panelClass: ["snackbar-success"] });
  }

  private onError() {
    this.snackBar.open('Ocorreu um erro...', '', { duration: 5000, panelClass: ["snackbar-error"] });
  }

  private validateForm(form: FormGroup): boolean {
    // this.validateAddressFields();
    if (form.invalid) {
      this.snackBar.open('Formulário inválido.', '', { duration: 5000, panelClass: ["snackbar-error"] });
      return false;
    }
    return true;
  }

  private validateComodidades(): void {
    for (let i = 0; i < this.comodidades.length; i++) {
      let comodidade = this.comodidades.at(i);
      comodidade.get('nome')?.addValidators(Validators.required);
      comodidade.get('nome')?.updateValueAndValidity();
    }
  }

  private validateAddressFields(): void {
    const endereco = this.form.get('endereco') as FormGroup;
    const hasAddressValue = Object.values(endereco.value).some(value => !!value);
    const hasChanges = this.form.get('endereco')?.dirty

    if (hasAddressValue && hasChanges) {
      for (const key in endereco.controls) {
        endereco.get(key)?.setValidators(Validators.required);
        endereco.get(key)?.updateValueAndValidity();
      }
    } else {
      for (const key in endereco.controls) {
        endereco.get(key)?.clearValidators();
        endereco.get(key)?.updateValueAndValidity();
      }
    }
  }

  get comodidades(): FormArray {
    return this.form.get('comodidades') as FormArray;
  }

  adicionarComodidade(): void {
    const comodidadeForm = this.formBuilder.group({
      id: [''],
      nome: [''],
      descricao: ['']
    });

    this.comodidades.push(comodidadeForm);
  }

  carregarComodidade(comodidade: Comodidade): void {
    const comodidadeForm = this.formBuilder.group({
      id: comodidade.id,
      nome: comodidade.nome,
      descricao: comodidade.descricao
    });

    this.comodidades.push(comodidadeForm);
  }

  removerComodidade(index: number): void {
    this.comodidades.removeAt(index);
  }

  getMensagemError(controlName: string, index: number = 0): string {
    let control;
    if(index > 0){
      control = this.comodidades.at(index).get(controlName);
    }else {
      control = this.form.get(controlName);
    }

    if(controlName == 'vagas') console.log(control)

    if (control == null) return 'Erro desconhecido'
    if (control.hasError('required')) return 'Campo obrigatório';
    if (control.hasError('email')) return 'Email inválido';
    if (control.hasError('telefoneInvalido')) return 'Telefone inválido';

    return 'Valor inválido';
  }
}
