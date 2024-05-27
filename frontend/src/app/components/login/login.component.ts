import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule, Location } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../cliente/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../autenticacao/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form!: FormGroup;

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
      login: ['', [Validators.required] ],
      senha: ['', [Validators.required] ],
    });
  }

  onSubmit(): void {
    if(this.form.valid){
      let login: string = this.form.get('login')?.value;
      let password: string = this.form.get('senha')?.value;

      this.authService.login(login, password).subscribe({
        next: response => {
          // Redirecionar com base no tipo de usuário
          if (response.userType === 'FUNCIONARIO') {
            this.router.navigate(['dashboard-clientes']);
          } else {
            this.router.navigate(['']);
          }
        },
        error: error => {
          console.error('Falha na autenticação', error);
          alert('Usuário ou senha inválidos!');
        }
      });
    }
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess(){
    this.snackBar.open('Login realizado com sucesso!', '', { duration: 5000 });
    this.router.navigate(['/']);
  }

  private onError(error: string) {
    error = error || 'Erro desconhecido';
    this.snackBar.open('Ocorreu um erro: ' + error, '', { duration: 5000 });
  }
}
