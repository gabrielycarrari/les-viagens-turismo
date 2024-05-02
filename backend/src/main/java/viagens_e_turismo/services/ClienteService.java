package viagens_e_turismo.services;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import viagens_e_turismo.dtos.ClienteRecordDto;
import viagens_e_turismo.models.Cliente;
import viagens_e_turismo.models.Endereco;
import viagens_e_turismo.repositories.ClienteRepository;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

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
    
    public Optional<Cliente> findById(int id){
        return clienteRepository.findById(id);
    }

    public boolean login(ClienteRecordDto clienteRecordDto){
        Cliente cliente = clienteRepository.findByLogin(clienteRecordDto.login());
        if(cliente != null){
            
            return passwordEncoder.matches(clienteRecordDto.senha(), cliente.getSenha());
        }
        return false;
    }

    private void saveValidation(Cliente cliente){
        if(clienteRepository.findByLogin(cliente.getLogin()) != null){
            throw new IllegalArgumentException("Login já cadastrado");
        }
    }
}
