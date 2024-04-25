package ViagensETurismo.dtos;

import ViagensETurismo.models.CompanhiaTransporte;

public record VeiculoRecordDto( 
     String nome,
     int vagas,
     String registro,
     CompanhiaTransporte companhiaTransporte
    ) {

}
