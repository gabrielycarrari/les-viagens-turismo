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
@Table(name = "CompanhiaTransporte")
public class CompanhiaTransporte {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "companhia_sequence")
    @SequenceGenerator(name = "companhia_sequence", sequenceName = "companhia_seq", allocationSize = 1)
    private int id;
    private String nome;
    private String CNPJ;
    private String categoria;
    private String telefone;
    private String email;
    private String descricao;
    // @OneToMany(cascade = CascadeType.ALL)
    // @JoinColumn(name = "veiculo_id", referencedColumnName = "id")
    // private List<Veiculo> veiculos;

}
