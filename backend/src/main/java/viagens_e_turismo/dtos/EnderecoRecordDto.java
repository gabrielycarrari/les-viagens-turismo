package viagens_e_turismo.dtos;

public record EnderecoRecordDto(

     String cep,
     String uf,
     String cidade,
     String bairro,
     String rua,
     int numero,
     String pontoReferencia
    
) {

}
