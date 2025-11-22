package commerce.nobreza.loja.masculina.nobreza_loja.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "tb_metodopagamento")
public class MetodoPagamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "token_cartao", nullable = false)
    private String tokenCartao;

    @Column(name = "bandeira_cartao", length = 50)
    private String bandeiraCartao;

    @Column(name = "ultimos_quatro_digitos", length = 4)
    private String ultimosQuatroDigitos;

    // Muitos métodos de pagamento pertencem a um usuário, ou seja muitos cartões.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;


}
