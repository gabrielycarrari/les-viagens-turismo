package ViagensETurismo.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "Avaliacao")
public class Avaliacao {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "avaliacao_sequence")
    @SequenceGenerator(name = "avaliacao_sequence", sequenceName = "avaliacao_seq", allocationSize = 1)
    private int id;

    @ManyToOne
    @JoinColumn(name="pacote_id")
    private Pacote pacote;

    @ManyToOne
    @JoinColumn(name="cliente_id")
    private Cliente cliente;

    private int qtdEstrelas;
    private String comentario;
    private boolean identificacao;
    
}
