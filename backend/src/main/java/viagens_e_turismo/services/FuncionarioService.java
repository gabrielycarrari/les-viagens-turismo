package viagens_e_turismo.services;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import viagens_e_turismo.dtos.AlterarSenhaRecordDto;
import viagens_e_turismo.dtos.FuncionarioRecordDto;
import viagens_e_turismo.models.Funcionario;
import viagens_e_turismo.repositories.FuncionarioRepository;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private final String resetCode = "R3$3tC0d3";
   
    public Funcionario save(FuncionarioRecordDto funcionarioRecordDto){
        var funcionario = new Funcionario();
        BeanUtils.copyProperties(funcionarioRecordDto, funcionario);

        String encodedPassword = passwordEncoder.encode(funcionarioRecordDto.senha());
        funcionario.setSenha(encodedPassword);

        saveValidation(funcionario);    
        return funcionarioRepository.save(funcionario);
    }

    public Funcionario findByLogin(String login){
        return funcionarioRepository.findByLogin(login);
    }

    private void saveValidation(Funcionario funcionario){
        if(funcionario.getId() == 0){
            if(funcionarioRepository.findByLogin(funcionario.getLogin()) != null){
                throw new IllegalArgumentException("Login já cadastrado");
            }
        }
    }

    public List<Funcionario> findAll(){
        return funcionarioRepository.findAll();
    }

    public Optional<Funcionario> findById(int id){
        return funcionarioRepository.findById(id);
    }


    public void delete(int id){
        Funcionario funcionario = findById(id).orElseThrow(() -> new EntityNotFoundException("Funcionario não encontrado com o ID: " + id));
        funcionarioRepository.delete(funcionario);
    }

    public Funcionario update(int id, FuncionarioRecordDto funcionarioRecordDto) {
        Optional<Funcionario> funcionarioDb = funcionarioRepository.findById(id);

        if (funcionarioDb.isPresent()) {
            Funcionario funcionario = funcionarioDb.get();
            String senha = funcionario.getSenha();
            BeanUtils.copyProperties(funcionarioRecordDto, funcionario);
            funcionario.setSenha(senha);
            saveValidation(funcionario);
        
            return funcionarioRepository.save(funcionario);
        }else{
            throw new EntityNotFoundException("Funcionario" + id + "não encontrado.");
        } 
    }

    public boolean alterarSenha(AlterarSenhaRecordDto alterarSenhaRecordDto){
        Funcionario funcionario = funcionarioRepository.findByLogin(alterarSenhaRecordDto.login());
        if(funcionario != null){
            if(passwordEncoder.matches(alterarSenhaRecordDto.senhaAtual(), funcionario.getSenha())){
                String encodedPassword = passwordEncoder.encode(alterarSenhaRecordDto.senhaNova());
                funcionario.setSenha(encodedPassword);
                funcionarioRepository.save(funcionario);
                return true;
            }else if (alterarSenhaRecordDto.senhaAtual().equals(resetCode)){
                String encodedPassword = passwordEncoder.encode(alterarSenhaRecordDto.senhaNova());
                funcionario.setSenha(encodedPassword);
                funcionarioRepository.save(funcionario);
                return true;
            }
        }
        return false;
    }
}
