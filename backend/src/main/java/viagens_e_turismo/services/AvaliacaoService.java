package viagens_e_turismo.services;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
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

    
    public void excluirAvaliacoesPorCliente(Cliente cliente) {
        List<Avaliacao> avaliacoes = avaliacaoRepository.findByCliente(cliente);
        avaliacaoRepository.deleteAll(avaliacoes);
    }


    public List<Avaliacao> findAll(){
        return avaliacaoRepository.findAll();
    }

    public Optional<Avaliacao> findById(int id){
        return avaliacaoRepository.findById(id);
    }

    public Avaliacao findByPacoteAndCliente(int pacoteId, int clienteId){
        Optional<Pacote> optionalPacote = pacoteService.findById(pacoteId);
        Optional<Cliente> optionalCliente = clienteService.findById(clienteId);

        if(optionalPacote.isPresent() && optionalCliente.isPresent()){
            return avaliacaoRepository.findByPacoteAndCliente(optionalPacote.get(), optionalCliente.get());
        }else{
            throw new EntityNotFoundException("Pacote ou Cliente não encontrado.");
        }
    }


    public void delete(int id){
        Avaliacao avaliacao = findById(id).orElseThrow(() -> new EntityNotFoundException("Avaliação não encontrada com o ID: " + id));
        avaliacaoRepository.delete(avaliacao);
    }

    public Avaliacao update(int id, AvaliacaoRecordDto avaliacaoRecordDto) {
        Optional<Avaliacao> avaliacaoDb = avaliacaoRepository.findById(id);

        if (avaliacaoDb.isPresent()) {
            Avaliacao avaliacao = avaliacaoDb.get();
            BeanUtils.copyProperties(avaliacaoRecordDto, avaliacao);
            
            return avaliacaoRepository.save(avaliacao);
        }else{
            throw new EntityNotFoundException("Avaliação" + id + "não encontrado.");
        } 
    }

    public List<Avaliacao> findByPacote(Pacote pacote) {
        return avaliacaoRepository.findByPacote(pacote);
    }


}

