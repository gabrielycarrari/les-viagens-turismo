import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { CommonModule } from '@angular/common';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { AlterarClienteComponent } from '../../dashboard-clientes/alterar-cliente/alterar-cliente.component';
import { Subject } from 'rxjs';
import { ClienteService } from '../../cliente/cliente.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservaService } from '../reserva.service';

@Component({
  selector: 'app-realizar-reserva',
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatListModule,
    MatButtonToggleModule,
    CommonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatExpansionModule],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
  templateUrl: './realizar-reserva.component.html',
  styleUrl: './realizar-reserva.component.scss'
})
export class RealizarReservaComponent implements OnInit{

  form!: FormGroup;
  constructor(private formBuilder: FormBuilder,public dialogRef: MatDialogRef<RealizarReservaComponent> , @Inject(MAT_DIALOG_DATA) public data: any,private router: Router,public dialog: MatDialog, public clienteService:ClienteService,private snackBar: MatSnackBar, public reservaService: ReservaService ) {}



  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });


  checkBoxChecked: boolean = false;

  checkBoxChecked2: boolean = false;

  ngOnInit() {
    this.initForm();
    this.carregarReserva();
  }



  initForm(): void {
    this.form = this.formBuilder.group({
      id: [''],
      quantidade: ['', [Validators.required]],
      observacoes: [''],
      pacote: [''],
      cliente: ['']
    });
  }


  carregarReserva(){
      this.form.patchValue({
        pacote: this.data.pacote,
        cliente: this.data.cliente
      });
  }

  sair(): void {
    this.dialogRef.close(false);
  }

  reloadClient(){
    this.clienteService.getById(this.data.cliente.id).subscribe(cliente => {
      this.data.cliente = cliente;
    });

  }

  onSave(){
    if(this.form.valid){
      this.reservaService.save(this.form.value).subscribe(
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
    }else{

    }

  }

  private onSuccess(){
    this.snackBar.open('Reserva realizada com sucesso!', '', {
      duration: 5000,
      panelClass: ["snackbar-success"]
    });
  }

  private onError(error: string) {
    this.snackBar.open(error, 'Reserva não realizada com sucesso!', {
      duration: 5000,
      panelClass: ["snackbar-error"]
    });
  }

  onCancel() {
    this.dialogRef.close();
  }


  openEditDialog( id: number) {
    const dialogRef = this.dialog.open(AlterarClienteComponent, {
      data: {idCliente: id},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.reloadClient();
        this.carregarReserva();
      }
    });
  }
}
