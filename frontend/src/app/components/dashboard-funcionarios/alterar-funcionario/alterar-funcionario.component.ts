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
import { FuncionarioService } from '../../funcionario/funcionario.service';
import { AlterarSenhaComponent } from '../../perfil/alterar-senha/alterar-senha.component';

@Component({
  selector: 'app-alterar-funcionario',
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
  templateUrl: 'alterar-funcionario.component.html',
  styleUrl: 'alterar-funcionario.component.scss'
})
export class AlterarFuncionarioComponent {
  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private funcionarioService: FuncionarioService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialogRef: MatDialogRef<AlterarFuncionarioComponent>,
    readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.carregarFuncionario();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      id: [''],
      login: ['', [Validators.required] ],
      cpf: ['', [Validators.required] ],
      nome: ['', [Validators.required] ],
      data_nascimento: ['', [Validators.required] ],
      telefone: ['', [Validators.required] ],
      email: ['', [Validators.required, Validators.email] ],
    });
  }

  private carregarFuncionario(){
    const id = this.data.idFuncionario;
    this.funcionarioService.getById(id).subscribe({
      next: (funcionario) => {
        this.form.patchValue(funcionario);
      },
      error: () => {
        this.snackBar.open('Ocorreu um erro ao carregar os dados.', '', { duration: 5000 });
      }
    });
  }

  onSubmit() {
    if (this.validateForm(this.form)) {
      const formValue = this.form.value;
      this.funcionarioService.save(formValue).subscribe({
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

  openChangePasswordDialog() {
    this.dialog.open(AlterarSenhaComponent, {
      width: '500px',
      minWidth: '260px',
      data: {
        login: this.form.controls["login"].value,
        tipo: "FUNCIONARIO"
      },
    });
  }
}
