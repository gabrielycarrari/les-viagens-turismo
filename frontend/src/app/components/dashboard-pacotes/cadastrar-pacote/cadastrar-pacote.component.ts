import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { CadastroEnderecoComponent } from '../../endereco/cadastro-endereco/cadastro-endereco.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { HotelService } from '../../hotel/hotel.service';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { Veiculo } from '../../veiculo/veiculo';
import { CompanhiaTransporteService } from '../../companhiaTransporte/companhiaTransporte.service';
import { CompanhiaTransporte } from '../../companhiaTransporte/companhiaTransporte';
import { VeiculoService } from '../../veiculo/veiculo.service';
import { TransportePacote } from '../../pacotes/pacote/transportePacote';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Hotel } from '../../hotel/hotel';
import { PacoteService } from '../../pacotes/pacote/pacote.service';
import { HotelPacote } from '../../pacotes/pacote/hotelPacote';

@Component({
  selector: 'app-cadastrar-pacote',
  standalone: true,
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    provideNativeDateAdapter()
  ],
  imports: [
    FormsModule,
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
    MatExpansionModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatIconModule
  ],
  templateUrl: './cadastrar-pacote.component.html',
  styleUrl: './cadastrar-pacote.component.scss'
})
export class CadastrarPacoteComponent {
  form!: FormGroup;
  titulo: string = this.data.titulo;
  isUnico: FormControl = new FormControl(true);

  companhiasTransporte: CompanhiaTransporte[] = [];
  veiculosSelect: Veiculo[] = [];
  hoteis: Hotel[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private companhiaService: CompanhiaTransporteService,
    private veiculoService: VeiculoService,
    private hotelService: HotelService,
    private pacoteService: PacoteService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialogRef: MatDialogRef<CadastrarPacoteComponent>,
    readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.carregarCompanhias();
    this.carregarHoteis();

    if (this.data.idPacote) {
      this.carregarPacote();
    }else {
      this.adicionarTransportePacote();
    }
  }

  carregarPacote(){
    this.pacoteService.getById(this.data.idPacote).subscribe({
      next: (pacote) => {
        this.form.patchValue(pacote);
        if (pacote.hotelPacote) {
          pacote.hotelPacote.forEach(hP => {
            this.carregarHotelPacote(hP);
          });
        }
        if (pacote.transportePacote) {
          pacote.transportePacote.forEach(tP => {
            this.carregarTransportePacote(tP);
          });
        }
      }
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      id: [''],
      nome: ['', [Validators.required]],
      vagas: ['', [Validators.required, Validators.min(1)]],
      valorTotal: ['', [Validators.required, Validators.min(1)]],
      descricao: ['', [Validators.required]],
      dataSaida: ['', [Validators.required]],
      horaSaida: ['', [Validators.required]],
      enderecoSaida: this.formBuilder.group({
        id: [''],
        cep: [''],
        uf: [''],
        cidade: [''],
        bairro: [''],
        rua: [''],
        numero: [''],
        pontoReferencia: ['']
      }),
      dataChegada: ['', [Validators.required]],
      horaChegada: ['', [Validators.required]],
      enderecoDestino: this.formBuilder.group({
        id: [''],
        cep: [''],
        uf: [''],
        cidade: [''],
        bairro: [''],
        rua: [''],
        numero: [''],
        pontoReferencia: ['']
      }),
      hotelPacote: this.formBuilder.array([]),
      transportePacote: this.formBuilder.array([]),
    });
  }

  carregarCompanhias(){
    this.companhiaService.list().subscribe({
      next: (companhiasTransporte) => {
        this.companhiasTransporte = companhiasTransporte;
        console.log("Companhias de Transporte recebidos:", companhiasTransporte);
      },
      error: (error) => {
        console.error('Erro ao buscar companhias de transporte', error);
        alert('Erro ao buscar companhias de transporte: ' + error.message);
      }
    });
  }

  carregarHoteis(){
    this.hotelService.list().subscribe({
      next: (hoteis) => {
        this.hoteis = hoteis;
        // console.log("Hoteis recebidos:", hoteis);
      },
      error: (error) => {
        // console.error('Erro ao buscar companhias de transporte', error);
        alert('Erro ao buscar hoteis: ' + error.message);
      }
    });
  }

  onSubmit() {
    if (this.validateForm(this.form)) {
      this.tratarEnderecos();
      const formValue = this.form.value;
      console.log("Form Value", formValue);
      this.pacoteService.save(formValue).subscribe({
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

  get transportePacote(): FormArray {
    return this.form.get('transportePacote') as FormArray;
  }

  get hotelPacote(): FormArray {
    return this.form.get('hotelPacote') as FormArray;
  }

  adicionarTransportePacote(): void {
    const transportePacoteForm = this.formBuilder.group({
      id: [''],
      veiculo: this.formBuilder.group({
        id: [''],
        nome: [''],
        registro: [''],
        vagas: [''],
        companhiaTransporte: ['']
      }),
      isIgualEnderecoSaida: [false],
      enderecoSaida: this.formBuilder.group({
        id: [''],
        cep: [''],
        uf: [''],
        cidade: [''],
        bairro: [''],
        rua: [''],
        numero: [''],
        pontoReferencia: ['']
      }),
      isIgualEnderecoChegada: [false],
      enderecoChegada: this.formBuilder.group({
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

    this.transportePacote.push(transportePacoteForm);
  }

  carregarTransportePacote(transportePacote: TransportePacote): void {
    const transportePacoteForm = this.formBuilder.group({
      id: transportePacote.id,
      veiculo: transportePacote.veiculo,
      enderecoSaida: transportePacote.enderecoSaida,
      enderecoChegada: transportePacote.enderecoChegada
    });

    this.transportePacote.push(transportePacoteForm);
  }

  removerTransportePacote(index: number): void {
    if(this.transportePacote.length == 1) {
      this.isUnico.setValue(true);
    }else if(this.transportePacote.length == 2){
      this.transportePacote.removeAt(index);
      this.isUnico.setValue(true);
    }else{
      this.transportePacote.removeAt(index);
    }
  }

  adicionarHotelPacote(): void {
    const hotelPacoteForm = this.formBuilder.group({
      id: [''],
      hotel: [''],
      tipoDiaria: [''],
      qtdDiarias: [''],
      dataEntrada: ['']
    });

    this.hotelPacote.push(hotelPacoteForm);
  }

  carregarHotelPacote(hotelPacote: HotelPacote): void {
    const hotelPacoteForm = this.formBuilder.group({
      id: hotelPacote.id,
      hotel: hotelPacote.hotel,
      tipoDiaria: hotelPacote.tipoDiaria,
      qtdDiarias: hotelPacote.qtdDiarias,
      dataEntrada: hotelPacote.dataEntrada
    });

    this.hotelPacote.push(hotelPacoteForm);
  }

  removerHotelPacote(index: number): void {
    this.hotelPacote.removeAt(index);
  }

  onHotelChange(index: number, hotel: Hotel): void {
    this.hotelPacote.controls[index].get('hotel')?.setValue(hotel);
  }

  onCompanhiaChange(index: number, companhiaId: number, companhia: CompanhiaTransporte): void {
    this.transportePacote.controls[index].get('veiculo')?.get('companhiaTransporte')?.setValue(companhia);
    this.loadVeiculos(companhiaId);
  }

  onVeiculoChange(index: number, v: Veiculo): void {
    console.log(v);
    this.transportePacote.controls[index].get('veiculo')?.get('id')?.setValue(v.id);
    this.transportePacote.controls[index].get('veiculo')?.get('nome')?.setValue(v.nome);
    this.transportePacote.controls[index].get('veiculo')?.get('registro')?.setValue(v.registro);
    this.transportePacote.controls[index].get('veiculo')?.get('vagas')?.setValue(v.vagas);
  }

  loadVeiculos(companhiaId: number): void {
    this.veiculoService.getByCompanhiaTransporteId(companhiaId).subscribe((veiculos: Veiculo[]) => {
      this.veiculosSelect = veiculos;
    });
  }

  getFormEnderecoTransportePacote(index: number): FormGroup {
    return this.transportePacote.at(index) as FormGroup;
  }

  getNomeVeiculo(index: number){
    const v: Veiculo = this.transportePacote.at(index).get('veiculo')?.value;
    return v.nome;
  }

  getNomeCompanhia(index: number){
    const v: Veiculo = this.transportePacote.at(index).get('veiculo')?.value;
    return v.companhiaTransporte.nome;
  }

  getNomeHotel(index: number){
    const hotel: Hotel = this.hotelPacote.at(index).get('hotel')?.value;
    return hotel.nome;
  }

  tratarEnderecos(){
    if(this.isUnico.value){
      const transportePacote = this.transportePacote.at(0) as FormGroup;
      const idSaida = transportePacote.get('enderecoSaida')?.get('id')?.value;
      transportePacote.get('enderecoSaida')?.patchValue(this.form.get('enderecoSaida')?.value);
      transportePacote.get('enderecoSaida')?.get('id')?.setValue(idSaida);
      transportePacote.get('isIgualEnderecoSaida')?.disabled;

      const idChegada = transportePacote.get('enderecoChegada')?.get('id')?.value;
      transportePacote.get('enderecoChegada')?.patchValue(this.form.get('enderecoDestino')?.value);
      transportePacote.get('enderecoChegada')?.get('id')?.setValue(idChegada);
      transportePacote.get('isIgualEnderecoChegada')?.disabled;
      return;
    }

    for (let i = 0; i < this.transportePacote.length; i++) {
      const transportePacote = this.transportePacote.at(i) as FormGroup;
      const isIgualEnderecoSaida = transportePacote.get('isIgualEnderecoSaida')?.value;
      const isIgualEnderecoChegada = transportePacote.get('isIgualEnderecoChegada')?.value;

      if (isIgualEnderecoSaida) {
        const id = transportePacote.get('enderecoSaida')?.get('id')?.value;
        transportePacote.get('enderecoSaida')?.patchValue(this.form.get('enderecoSaida')?.value);
        transportePacote.get('enderecoSaida')?.get('id')?.setValue(id);
      }
      transportePacote.get('isIgualEnderecoSaida')?.disabled;

      if (isIgualEnderecoChegada) {
        const id = transportePacote.get('enderecoChegada')?.get('id')?.value;
        transportePacote.get('enderecoChegada')?.patchValue(this.form.get('enderecoDestino')?.value);
        transportePacote.get('enderecoChegada')?.get('id')?.setValue(id);
      }
      transportePacote.get('isIgualEnderecoChegada')?.disabled;
    }
  }
}
