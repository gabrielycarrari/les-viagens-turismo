package viagens_e_turismo.services;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import viagens_e_turismo.dtos.AlterarSenhaRecordDto;
import viagens_e_turismo.dtos.ClienteRecordDto;
import viagens_e_turismo.models.Avaliacao;
import viagens_e_turismo.models.Cliente;
import viagens_e_turismo.models.Endereco;
import viagens_e_turismo.models.Reserva;
import viagens_e_turismo.repositories.AvaliacaoRepository;
import viagens_e_turismo.repositories.ClienteRepository;
import viagens_e_turismo.repositories.ReservaRepository;


@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private ReservaRepository reservaRepository;
    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
 

    public Cliente save(ClienteRecordDto clienteRecordDto){
        var cliente = new Cliente();
        var endereco = new Endereco();

        String encodedPassword = passwordEncoder.encode(clienteRecordDto.senha());

        BeanUtils.copyProperties(clienteRecordDto, cliente);
        BeanUtils.copyProperties(clienteRecordDto.endereco(), endereco);
        
        cliente.setSenha(encodedPassword);
        cliente.setEndereco(endereco);
        
        saveValidation(cliente);

        return clienteRepository.save(cliente);
    }

    public Cliente update(int id, ClienteRecordDto clienteRecordDto) {
        Optional<Cliente> clienteDb = clienteRepository.findById(id);

        if (clienteDb.isPresent()) {
            Cliente cliente = clienteDb.get();

            String senha = cliente.getSenha();

            BeanUtils.copyProperties(clienteRecordDto, cliente);

            cliente.setSenha(senha);
            
            var endereco = new Endereco();
            BeanUtils.copyProperties(clienteRecordDto.endereco(), endereco);
            endereco.setId(cliente.getEndereco().getId());
            cliente.setEndereco(endereco); 
        
            saveValidation(cliente);
        
            return clienteRepository.save(cliente);
        }else{
            throw new EntityNotFoundException("Cliente" + id + "não encontrado.");
        }
        
    }
    
    public Optional<Cliente> findById(int id){
        return clienteRepository.findById(id);
    }


    public List<Cliente> findAll(){
        return clienteRepository.findAll();
    }


    public Cliente findByLogin(String login){
        return clienteRepository.findByLogin(login);
    }

    public boolean login(ClienteRecordDto clienteRecordDto){
        Cliente cliente = clienteRepository.findByLogin(clienteRecordDto.login());
        if(cliente != null){
            
            return passwordEncoder.matches(clienteRecordDto.senha(), cliente.getSenha());
        }
        return false;
    }

    public boolean alterarSenha(AlterarSenhaRecordDto alterarSenhaRecordDto){
        Cliente cliente = clienteRepository.findByLogin(alterarSenhaRecordDto.login());
        if(cliente != null){
            if(passwordEncoder.matches(alterarSenhaRecordDto.senhaAtual(), cliente.getSenha())){
                String encodedPassword = passwordEncoder.encode(alterarSenhaRecordDto.senhaNova());
                cliente.setSenha(encodedPassword);
                clienteRepository.save(cliente);
                return true;
            }
        }
        return false;
    }

    private void saveValidation(Cliente cliente){
        if(cliente.getId() == 0){
            if(clienteRepository.findByLogin(cliente.getLogin()) != null){
                throw new IllegalArgumentException("Login já cadastrado");
            }
        }
        
    }

    public void delete(int id){
        Cliente cliente = findById(id).orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado com o ID: " + id));
        List<Reserva> reservas = reservaRepository.findByCliente(cliente);
        reservaRepository.deleteAll(reservas);
        List<Avaliacao> avaliacoes = avaliacaoRepository.findByCliente(cliente);
        avaliacaoRepository.deleteAll(avaliacoes);
        clienteRepository.delete(cliente);
    }


}
