package viagens_e_turismo.dtos;

import viagens_e_turismo.models.CompanhiaTransporte;

public record VeiculoRecordDto( 
     String nome,
     int vagas,
     String registro,
     CompanhiaTransporte companhiaTransporte
    ) {

}
