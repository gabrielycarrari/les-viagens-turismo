package ViagensETurismo.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "Comodidade")
public class Comodidade {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "comodidade_sequence")
    @SequenceGenerator(name = "comodidade_sequence", sequenceName = "comodidade_seq", allocationSize = 1)
    private int id;
    private String nome;
    private String descricao;
}
