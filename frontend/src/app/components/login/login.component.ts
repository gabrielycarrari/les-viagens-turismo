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
    private router: Router
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

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      this.service.login(formValue).subscribe({
        next: (response) => {
          console.log(response);
          this.onSuccess()},
        error: (response) => {
          console.error(response);
          this.onError(response.error)
        }
      });
    }else{
      this.form.markAllAsTouched();

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
