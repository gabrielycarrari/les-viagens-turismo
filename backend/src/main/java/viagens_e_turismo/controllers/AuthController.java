package viagens_e_turismo.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import viagens_e_turismo.responses.LoginResponse;
import viagens_e_turismo.services.AuthService;

@RestController
public class AuthController {

    @Autowired
    AuthService authService;


    @PostMapping("/api/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest){ 
        
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");
        LoginResponse response = authService.login(username, password);

        if(response != null){
            return ResponseEntity.ok(response);
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login ou senha inválidos");
        }
        
    }
}
