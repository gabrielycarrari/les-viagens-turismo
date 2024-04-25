package viagens_e_turismo.services;
import java.util.Optional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import viagens_e_turismo.dtos.AvaliacaoRecordDto;
import viagens_e_turismo.models.Avaliacao;
import viagens_e_turismo.models.Cliente;
import viagens_e_turismo.models.Pacote;
import viagens_e_turismo.repositories.AvaliacaoRepository;



@Service
public class AvaliacaoService {

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private PacoteService pacoteService;


   
    public Avaliacao save(AvaliacaoRecordDto avaliacaoRecordDto){    
        
            var avaliacao = new Avaliacao();
            BeanUtils.copyProperties(avaliacaoRecordDto, avaliacao);

            Optional<Cliente> optionalCliente = clienteService.findById(avaliacaoRecordDto.cliente().getId());
            if(optionalCliente.isPresent()){
                avaliacao.setCliente(optionalCliente.get());
            }else {
                throw new RuntimeException("Cliente com ID: " + avaliacaoRecordDto.cliente().getId() + " não encontrado.");
            } 

            Optional<Pacote> optionalPacote = pacoteService.findById(avaliacaoRecordDto.pacote().getId());
            if(optionalPacote.isPresent()){
                avaliacao.setPacote(optionalPacote.get());
            }else {
                throw new RuntimeException("Pacote com ID: " + avaliacaoRecordDto.pacote().getId() + " não encontrado.");
            } 
       
        return avaliacaoRepository.save(avaliacao);
    }

}
