package viagens_e_turismo.models;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;


@Data
@Entity
public class TransportePacote implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name="pacote_id")
    @JsonBackReference
    private Pacote pacote;


    @ManyToOne
    @JoinColumn(name="veiculo_id")
    private Veiculo veiculo;
    

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "endereco_saida_id", referencedColumnName = "id")
    private Endereco enderecoSaida;

    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "endereco_chegada_id", referencedColumnName = "id")
    private Endereco enderecoChegada;

    
    // @ManyToOne(cascade = CascadeType.ALL)
    // @JoinColumn(name="veiculo_id", referencedColumnName = "id")
   // private Veiculo veiculo;
}
