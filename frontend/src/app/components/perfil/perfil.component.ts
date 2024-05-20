import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule, Location } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ClienteService } from '../cliente/cliente.service';
import { AuthService } from '../autenticacao/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';
import { CadastroEnderecoComponent } from '../endereco/cadastro-endereco/cadastro-endereco.component';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatExpansionModule,
    CadastroEnderecoComponent
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  form!: FormGroup;
  formEndereco!: FormGroup;
  passwordConfirm!: FormControl;
  // panelOpenState = false;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    // private funcionarioService: FuncionarioService,
    private location: Location,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.carregarDados();
  }

  initForm(): void {
    // this.formEndereco = this.formBuilder.group({
    //   id: [''],
    //   CEP: [''],
    //   UF: [''],
    //   cidade: [''],
    //   bairro: [''],
    //   rua: [''],
    //   numero: [''],
    //   pontoReferencia: ['']
    // });

    this.form = this.formBuilder.group({
      id: [''],
      login: ['', [Validators.required] ],
      cpf: ['', [Validators.required] ],
      nome: ['', [Validators.required] ],
      data_nascimento: ['', [Validators.required] ],
      telefone: ['', [Validators.required] ],
      email: ['', [Validators.required, Validators.email] ],
      endereco: this.formBuilder.group({
        id: [''],
        CEP: [''],
        UF: [''],
        cidade: [''],
        bairro: [''],
        rua: [''],
        numero: [''],
        pontoReferencia: ['']
      })
    });
  }

  carregarDados(): void {
    if (this.authService.getUserType() === 'CLIENTE') {
      this.carregarCliente(this.authService.getId());
    } else {
      this.carregarFuncionario(this.authService.getId());
    }
  }

  onSubmit() {
    if (this.validateForm(this.form)) {
      const formValue = this.form.value;
      if (this.authService.getUserType() === 'CLIENTE') {
        this.clienteService.save(formValue).subscribe({
          next: () => {
            this.onSuccess();
            this.authService.saveSession(this.form.controls["id"].value, "CLIENTE", this.form.controls['nome'].value);
          },
          error: () => this.onError()
        });
      }else {
        // this.funcionarioService.save(formValue).subscribe({
        //   next: () => this.onSuccess(),
        //   error: () => this.onError()
        // });
      }
    }else{
      this.form.markAllAsTouched();
    }
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess(){
    this.snackBar.open('Aleração realizada com sucesso!', '', { duration: 5000, panelClass: ["snackbar-success"] });
    //enviar o nome do cliente/funcionario para a sessão
    // this.authService.saveSession("CLIENTE", this.form.controls['nome'].value);
  }

  private onError() {
    this.snackBar.open('Ocorreu um erro...', '', { duration: 5000, panelClass: ["snackbar-error"] });
  }

  private validateForm(form: FormGroup): boolean {
    if (form.invalid) {
      this.snackBar.open('Formulário inválido.', '', { duration: 5000, panelClass: ["snackbar-error"] });
      return false;
    }
    this.validateAddressFields();
    return true;
  }

  private validateAddressFields(): void {
    const endereco = this.form.get('endereco') as FormGroup;
    const hasAddressValue = Object.values(endereco.value).some(value => !!value);

    if (hasAddressValue) {
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

  get name() {
    return this.form.get('nome');
  }

  public hasChanges(){
    if (this.form.dirty || this.form.get("endereco")?.dirty) {
      return false;
    }
    return true
  }

  private carregarCliente(id: number){
    this.clienteService.getById(id).subscribe({
      next: (cliente) => {
        this.form.patchValue(cliente);
      },
      error: () => {
        this.snackBar.open('Ocorreu um erro ao carregar os dados.', '', { duration: 5000 });
      }
    });
  }

  private carregarFuncionario(id: number){}

  openChangePasswordDialog() {
    const dialogRef = this.dialog.open(AlterarSenhaComponent, {
      width: '500px',
      minWidth: '260px',
      data: {login: this.form.controls["login"].value},
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     // Aqui você pode tratar o resultado (por exemplo, enviar para o backend)
    //     console.log('Senha alterada:', result);
    //   }

    // });
  }
}
