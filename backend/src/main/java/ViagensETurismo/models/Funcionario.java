package ViagensETurismo.models;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;


@Data
@Entity
@Table(name = "Funcionario")
public class Funcionario {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "funcionario_sequence")
    @SequenceGenerator(name = "funcionario_sequence", sequenceName = "funcionario_seq", allocationSize = 1)
    private int id;
    private String login;
    private String senha;
    private String cpf;
    private String nome;
    private LocalDate data_nascimento;
    private String telefone;
    private String email;
}
