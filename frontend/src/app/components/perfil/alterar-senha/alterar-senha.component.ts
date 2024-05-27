import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { AuthService } from '../../autenticacao/auth.service';
import { ClienteService } from '../../cliente/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuncionarioService } from '../../funcionario/funcionario.service';

@Component({
  selector: 'app-alterar-senha',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './alterar-senha.component.html',
  styleUrl: './alterar-senha.component.scss'
})
export class AlterarSenhaComponent {
  changePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AlterarSenhaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private clienteService: ClienteService,
    private funcionarioService: FuncionarioService,
    private snackBar: MatSnackBar,
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  onSave() {
    if (this.changePasswordForm.valid) {
      const passwords = this.changePasswordForm.value;
      const payload = {
        login: this.data.login,
        senhaAtual: passwords.currentPassword,
        senhaNova: passwords.newPassword
      };
      const tipo = this.data.tipo
      if (this.authService.getUserType() === 'CLIENTE' || tipo === 'CLIENTE') {
        this.clienteService.alterarSenha(payload).subscribe(
          {
            next: () => {
              this.onSuccess();
              this.dialogRef.close();
            },
            error: e => {
              this.onError(e.error);
              this.changePasswordForm.controls['currentPassword'].setErrors({ 'incorrect': true });
            }
          }
        );
      } else {
        this.funcionarioService.alterarSenha(payload).subscribe(
          {
            next: () => {
              this.onSuccess();
              this.dialogRef.close();
            },
            error: e => {
              this.onError(e.error);
              this.changePasswordForm.controls['currentPassword'].setErrors({ 'incorrect': true });
            }
          }
        );
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  private onSuccess(){
    this.snackBar.open('Alteração realizada com sucesso!', '', {
      duration: 5000,
      panelClass: ["snackbar-success"]
    });
  }

  private onError(error: string) {
    this.snackBar.open(error, '', {
      duration: 5000,
      panelClass: ["snackbar-error"]
    });
  }
}
