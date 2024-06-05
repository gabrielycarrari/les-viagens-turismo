import { Comodidade } from '../../comodidade/comodidade';
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
import { Veiculo } from '../../veiculo/veiculo';
import { CompanhiaTransporteService } from '../../companhiaTransporte/companhiaTransporte.service';
import { Validadores } from '../../validadores/validadores';

@Component({
  selector: 'app-cadastrar-companhia',
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
  templateUrl: './cadastrar-companhia.component.html',
  styleUrl: './cadastrar-companhia.component.scss'
})
export class CadastrarCompanhiaComponent {
  form!: FormGroup;
  titulo: string = this.data.titulo;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private companhiaService: CompanhiaTransporteService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialogRef: MatDialogRef<CadastrarCompanhiaComponent>,
    readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initForm();
    console.log(this.data.idCompanhia)
    if (this.data.idCompanhia) this.carregarCompanhia();
  }

  carregarCompanhia(){
    this.companhiaService.getById(this.data.idCompanhia).subscribe({
      next: (companhia) => {
        this.form.patchValue(companhia);
        if (companhia.veiculos) {
          companhia.veiculos.forEach(veiculo => {
            this.carregarVeiculo(veiculo);
          });
        }
      }
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      id: [''],
      nome: ['', [Validators.required]],
      cnpj: ['', [Validators.required, Validadores.cnpj]],
      descricao: ['', [Validators.required]],
      telefone: ['', [Validators.required, Validadores.telefone]],
      email: ['', [Validators.required, Validators.email]],
      categoria: ['', [Validators.required]],
      veiculos: this.formBuilder.array([])
    });
  }

  onSubmit() {
    this.validateVeiculos();
    if (this.validateForm(this.form)) {
      const formValue = this.form.value;
      this.companhiaService.save(formValue).subscribe({
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
    if (form.invalid) {
      this.snackBar.open('Formulário inválido.', '', { duration: 5000, panelClass: ["snackbar-error"] });
      return false;
    }
    return true;
  }

  private validateVeiculos(){
    let veiculos = this.veiculos;
    for (let i = 0; i < veiculos.length; i++) {
      let veiculo = veiculos.at(i);
      veiculo.get('nome')?.addValidators(Validators.required);
      veiculo.get('nome')?.updateValueAndValidity();
      veiculo.get('registro')?.addValidators(Validators.required);
      veiculo.get('registro')?.updateValueAndValidity();
      veiculo.get('vagas')?.setValidators(Validators.required);
      veiculo.get('vagas')?.addValidators(Validators.min(1));
      veiculo.get('vagas')?.updateValueAndValidity();
    }
  }

  get veiculos(): FormArray {
    return this.form.get('veiculos') as FormArray;
  }

  adicionarVeiculo(): void {
    const veiculoForm = this.formBuilder.group({
      id: [''],
      nome: [''],
      registro: [''],
      vagas: ['', [Validators.min(1)]]
    });

    this.veiculos.push(veiculoForm);
  }

  carregarVeiculo(veiculo: Veiculo): void {
    const veiculoForm = this.formBuilder.group({
      id: veiculo.id,
      nome: veiculo.nome,
      registro: veiculo.registro,
      vagas: veiculo.vagas
    });

    this.veiculos.push(veiculoForm);
  }

  removerVeiculo(index: number): void {
    this.veiculos.removeAt(index);
  }

  getMensagemError(controlName: string, index: number = 0): string {
    let control;
    if(index > 0){
      control = this.veiculos.at(index).get(controlName);
    }else {
      control = this.form.get(controlName);
    }

    if(controlName == 'vagas') console.log(control)

    if (control == null) return 'Erro desconhecido'
    if (control.hasError('required')) return 'Campo obrigatório';
    if (control.hasError('cpfInvalido')) return 'CPF inválido';
    if (control.hasError('cnpjInvalido')) return 'CNPJ inválido';
    if (control.hasError('email')) return 'Email inválido';
    if (control.hasError('telefoneInvalido')) return 'Telefone inválido';
    if (control.hasError('min')) return 'Valor mínimo inválido';

    return 'Valor inválido';
  }
}
