package viagens_e_turismo.services;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import viagens_e_turismo.dtos.FuncionarioRecordDto;
import viagens_e_turismo.models.Funcionario;
import viagens_e_turismo.repositories.FuncionarioRepository;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

   
    public Funcionario save(FuncionarioRecordDto funcionarioRecordDto){
        var funcionario = new Funcionario();
        BeanUtils.copyProperties(funcionarioRecordDto, funcionario);

        saveValidation(funcionario);
        return funcionarioRepository.save(funcionario);
    }

    public Funcionario findByLogin(String login){
        return funcionarioRepository.findByLogin(login);
    }

    private void saveValidation(Funcionario funcionario){
        if(funcionarioRepository.findByLogin(funcionario.getLogin()) != null){
            throw new IllegalArgumentException("Login já cadastrado");
        }
    }

    public List<Funcionario> findAll(){
        return funcionarioRepository.findAll();
    }
}
