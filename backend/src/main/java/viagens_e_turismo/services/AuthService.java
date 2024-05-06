package viagens_e_turismo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import viagens_e_turismo.models.Cliente;
import viagens_e_turismo.models.Funcionario;
import viagens_e_turismo.responses.LoginResponse;


@Service
public class AuthService {

    @Autowired
    protected ClienteService clienteService;

    @Autowired
    protected FuncionarioService funcionarioService;


    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public LoginResponse login(String username, String password){
        Funcionario funcionario = funcionarioService.findByLogin(username);

        if(funcionario != null && passwordEncoder.matches(password, funcionario.getSenha())) {
                return new LoginResponse("FUNCIONARIO", funcionario.getNome()); 
            }
        

        Cliente cliente = clienteService.findByLogin(username);
        
        if(cliente != null && passwordEncoder.matches(password, cliente.getSenha())) {
                return new LoginResponse("CLIENTE", cliente.getNome()); 
            }
        

        return null;
    }
    
}

