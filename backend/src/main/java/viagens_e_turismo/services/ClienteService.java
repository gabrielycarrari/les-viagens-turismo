package viagens_e_turismo.services;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import viagens_e_turismo.dtos.ClienteRecordDto;
import viagens_e_turismo.models.Cliente;
import viagens_e_turismo.models.Endereco;
import viagens_e_turismo.repositories.ClienteRepository;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

 

    public Cliente save(ClienteRecordDto clienteRecordDto){
        var cliente = new Cliente();
        var endereco = new Endereco();
        BeanUtils.copyProperties(clienteRecordDto, cliente);
        BeanUtils.copyProperties(clienteRecordDto.endereco(), endereco);
        cliente.setEndereco(endereco);
        return clienteRepository.save(cliente);
    }
    
    public Optional<Cliente> findById(int id){
        return clienteRepository.findById(id);
    }

}
