import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule, Location } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../autenticacao/auth.service';
import { Validadores } from '../../validadores/validadores';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule ],
  templateUrl: './cadastro-cliente.component.html',
  styleUrl: './cadastro-cliente.component.scss'
})
export class CadastroClienteComponent implements OnInit {

  form!: FormGroup;
  passwordConfirm!: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private service: ClienteService,
    private location: Location,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      id: [''],
      login: ['', [Validators.required] ],
      senha: ['', [Validators.required] ],
      cpf: ['', [Validators.required, Validadores.cpf] ],
      nome: ['', [Validators.required] ],
      data_nascimento: ['', [Validators.required] ],
      telefone: ['', [Validators.required, Validadores.telefone] ],
      email: ['', [Validators.required, Validators.email] ],
      endereco: this.formBuilder.group({
        id: [''],
      })
    });
    this.passwordConfirm = new FormControl('', [Validators.required, Validadores.confirmPassword(this.form)]);
  }

  onSubmit() {
    if (this.validateForm(this.form)) {
      const formValue = this.form.value;
      this.service.save(formValue).subscribe({
        next: response => this.onSuccess(response.id? response.id : 0),
        error: () => this.onError()
      });
    }else{
      this.form.markAllAsTouched();
      this.passwordConfirm.markAsTouched();
    }
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess(id: number){
    this.snackBar.open('Cadastro realizado com sucesso!', '', { duration: 5000, panelClass: ["snackbar-success"] });
    this.authService.saveSession(id, "CLIENTE", this.form.controls['nome'].value);
    this.router.navigate(['/']);
  }

  private onError() {
    this.snackBar.open('Ocorreu um erro...', '', { duration: 5000, panelClass: ["snackbar-error"] });
  }

  private validateForm(form: FormGroup): boolean {
    if (form.invalid) {
      this.snackBar.open('Formulário inválido.', '', { duration: 5000, panelClass: ["snackbar-error"] });
      return false;
    }
    if (form.get('senha')?.value !== this.passwordConfirm.value) {
      this.snackBar.open('As senhas não conferem.', '', { duration: 5000, panelClass: ["snackbar-error"] });
      return false;
    }
    return true;
  }

  get name() {
    return this.form.get('nome');
  }

  getMensagemError(controlName: string): string {
    let control = null;

    if (controlName == "passwordConfirm") {
      control = this.passwordConfirm;
    }else {
      control = this.form.get(controlName);
    }

    if (control == null) return 'Erro desconhecido'
    if (control.hasError('required')) return 'Campo obrigatório';
    if (control.hasError('cpfInvalido')) return 'CPF inválido';
    if (control.hasError('email')) return 'Email inválido';
    if (control.hasError('telefoneInvalido')) return 'Telefone inválido';
    if (control.hasError('confirmPasswordInvalid')) return 'Senhas não conferem';

    return 'Valor inválido';
  }

}
