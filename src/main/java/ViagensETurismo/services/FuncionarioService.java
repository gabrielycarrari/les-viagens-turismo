package ViagensETurismo.services;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ViagensETurismo.dtos.FuncionarioRecordDto;
import ViagensETurismo.models.Funcionario;
import ViagensETurismo.repositories.FuncionarioRepository;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

   
    public Funcionario save(FuncionarioRecordDto funcionarioRecordDto){
        var funcionario = new Funcionario();
        BeanUtils.copyProperties(funcionarioRecordDto, funcionario);
        return funcionarioRepository.save(funcionario);
    }


}
