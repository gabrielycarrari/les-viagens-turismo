package viagens_e_turismo.dtos;

public record EnderecoRecordDto(

     String CEP,
     String UF,
     String cidade,
     String bairro,
     String rua,
     int numero,
     String pontoReferencia
    
) {

}