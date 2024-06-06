import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ClienteService } from '../../cliente/cliente.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { CadastroEnderecoComponent } from '../../endereco/cadastro-endereco/cadastro-endereco.component';
import { MatDivider } from '@angular/material/divider';
import { AlterarSenhaComponent } from '../../perfil/alterar-senha/alterar-senha.component';
import { Validadores } from '../../validadores/validadores';

@Component({
  selector: 'app-alterar-cliente',
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
    MatDivider
  ],
  templateUrl: './alterar-cliente.component.html',
  styleUrl: './alterar-cliente.component.scss'
})
export class AlterarClienteComponent {
  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialogRef: MatDialogRef<AlterarClienteComponent>,
    readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.carregarCliente();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      id: [''],
      login: ['', [Validators.required] ],
      cpf: ['', [Validators.required, Validadores.cpf]],
      nome: ['', [Validators.required] ],
      data_nascimento: ['', [Validators.required] ],
      telefone: ['', [Validators.required, Validadores.telefone]],
      email: ['', [Validators.required, Validators.email]],
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

  private carregarCliente(){
    const id = this.data.idCliente;
    this.clienteService.getById(id).subscribe({
      next: (cliente) => {
        this.form.patchValue(cliente);
      },
      error: () => {
        this.snackBar.open('Ocorreu um erro ao carregar os dados.', '', { duration: 5000 });
      }
    });
  }

  onSubmit() {
    if (this.validateForm(this.form)) {
      const formValue = this.form.value;
      this.clienteService.save(formValue).subscribe({
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
    this.snackBar.open('Alteração realizada com sucesso!', '', { duration: 5000, panelClass: ["snackbar-success"] });
  }

  private onError() {
    this.snackBar.open('Ocorreu um erro...', '', { duration: 5000, panelClass: ["snackbar-error"] });
  }

  private validateForm(form: FormGroup): boolean {
    this.validateAddressFields();
    if (form.invalid) {
      this.snackBar.open('Formulário inválido.', '', { duration: 5000, panelClass: ["snackbar-error"] });
      return false;
    }
    return true;
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

  openChangePasswordDialog() {
    this.dialog.open(AlterarSenhaComponent, {
      width: '500px',
      minWidth: '260px',
      data: {
        login: this.form.controls["login"].value,
        tipo: 'CLIENTE'
      },
    });
  }

  getMensagemError(controlName: string): string {
    const control = this.form.get(controlName);

    if (control == null) return 'Erro desconhecido'
    if (control.hasError('required')) return 'Campo obrigatório';
    if (control.hasError('cpfInvalido')) return 'CPF inválido';
    if (control.hasError('email')) return 'Email inválido';
    if (control.hasError('telefoneInvalido')) return 'Telefone inválido';

    return 'Valor inválido';
  }
}
