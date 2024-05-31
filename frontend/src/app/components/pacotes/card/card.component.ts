import { Avaliacao } from './../../avaliacoes/avaliacao';
import { Pacote } from './../pacote/pacote';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvaliacaoService } from '../../avaliacoes/avaliacao.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnChanges {
  @Input() pacote!: Pacote;
  avaliacoes: Avaliacao[] = [];
  media: number = 0;
  qtdAvaliacoes: number = 0;
  resumo:String = "";

  constructor(private serviceAvaliacao: AvaliacaoService) {}

  ngOnInit(): void {
    if (this.pacote?.id) {
      this.listarAvaliacoesPorPacote(this.pacote.id);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pacote'] && this.pacote?.id) {
      this.listarAvaliacoesPorPacote(this.pacote.id);
    }
  }

  listarAvaliacoesPorPacote(pacoteId: number): void {
    this.serviceAvaliacao.listByPacote(pacoteId).subscribe({
      next: (avaliacoes) => {
        this.avaliacoes = avaliacoes;
        console.log('Avaliações recebidas:', avaliacoes);
        this.calcularMediaAvaliacoes();
      },
      error: (error) => {
        console.error('Erro ao buscar avaliações', error);
        alert('Erro ao buscar avaliações: ' + error.message);
      }
    });
  }

  calcularMediaAvaliacoes(): void {
    let total = 0;
    let qtd = 0;
    for (let avaliacao of this.avaliacoes) {
      if (avaliacao.pacote?.id === this.pacote.id && avaliacao.qtdEstrelas !== undefined) {
        qtd++;
        total += avaliacao.qtdEstrelas;
      }
    }
    this.qtdAvaliacoes = qtd;
    this.media = qtd > 0 ? total / qtd : 0;
    if(this.media == 0){
      this.resumo="Não Avaliado"
    }
    else if(this.media > 0 && this.media <=3 ){
      this.resumo="Ruim"
    }
    else if(this.media > 3 && this.media <= 5){
      this.resumo="Regular"
    }

    else if(this.media > 5 && this.media <= 7){
      this.resumo="Bom"
    }

    else if(this.media > 7 && this.media <= 8){
      this.resumo="Muito Bom"
    }
    else if(this.media > 8 && this.media <= 10){
      this.resumo="Excelente"
    }
  }
}
