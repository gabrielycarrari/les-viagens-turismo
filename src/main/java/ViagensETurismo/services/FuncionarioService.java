package ViagensETurismo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ViagensETurismo.models.Funcionario;
import ViagensETurismo.repositories.FuncionarioRepository;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

   
    public Funcionario save(Funcionario funcionario){
        return funcionarioRepository.save(funcionario);
    }


}
