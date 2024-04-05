package ViagensETurismo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ViagensETurismo.models.Cliente;
import ViagensETurismo.repositories.ClienteRepository;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

 

    public Cliente save(Cliente cliente){
        return clienteRepository.save(cliente);
    }

}
