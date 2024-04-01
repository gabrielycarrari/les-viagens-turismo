package ViagensETurismo.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.io.Serializable;

@Data
@Entity
@Table(name = "Endereco")
public class EnderecoModel implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;
    private String CEP;
    private String UF;
    private String cidade;
    private String bairro;
    private String rua;
    private int numero;
    private String pontoReferencia;

}
