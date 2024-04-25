package viagens_e_turismo.models;

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
@Table(name = "Veiculo")
public class Veiculo {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "veiculo_sequence")
    @SequenceGenerator(name = "veiculo_sequence", sequenceName = "veiculo_seq", allocationSize = 1)
    private int id;
    private String nome;
    private int vagas;
    private String registro;
    
    @ManyToOne
    @JoinColumn(name="companhia_transporte_id")
    private CompanhiaTransporte companhiaTransporte; 
}
