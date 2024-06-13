import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AvaliacaoService } from '../../avaliacoes/avaliacao.service';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-avaliar-pacote',
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
    MatSliderModule
  ],
  templateUrl: './avaliar-pacote.component.html',
  styleUrl: './avaliar-pacote.component.scss'
})
export class AvaliarPacoteComponent {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AvaliarPacoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private avaliacaoService: AvaliacaoService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.carregarAvaliacao();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      id: [''],
      qtdEstrelas: ['', [Validators.required] ],
      comentario: ['', [Validators.required] ],
      identificacao: [false],
      pacote: [''],
      cliente: ['']
    });
  }

  carregarAvaliacao(){
    if (this.data.avaliacao){
      this.form.patchValue(this.data.avaliacao);
    }else{
      this.form.patchValue({
        pacote: this.data.reserva.pacote,
        cliente: this.data.reserva.cliente
      });
    }
  }

  onSave(){
    console.log(this.form.value);
    console.log(this.data.reserva)
    if(this.form.valid){
      this.avaliacaoService.save(this.form.value).subscribe(
        {
          next: () => {
            this.onSuccess();
            this.dialogRef.close();
          },
          error: e => {
            this.onError(e.error);
          }
        }
      );
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
