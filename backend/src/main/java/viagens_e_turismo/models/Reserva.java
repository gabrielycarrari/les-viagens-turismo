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
@Table(name = "Reserva")
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reserva_sequence")
    @SequenceGenerator(name = "reserva_sequence", sequenceName = "reserva_seq", allocationSize = 1)
    private int id;

    @ManyToOne
    @JoinColumn(name="pacote_id")
    private Pacote pacote;

    @ManyToOne
    @JoinColumn(name="cliente_id")
    private Cliente cliente;

    private String observacoes;
    
}
