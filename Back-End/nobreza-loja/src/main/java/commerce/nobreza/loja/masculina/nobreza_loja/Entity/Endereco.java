package commerce.nobreza.loja.masculina.nobreza_loja.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tb_endereco")
@Getter
@Setter
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Muitos endereços pertencem a um usuário
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @NotBlank
    @Size(max = 255)
    private String rua;

    @NotBlank
    @Size(max = 100)
    private String cidade;

    @NotBlank
    @Size(max = 50)
    private String estado;

    @NotBlank
    @Size(max = 20)
    private String cep;

    @NotBlank
    @Size(max = 20)
    private String complemento;

    @NotBlank
    @Size(max = 20)
    private String numero;

    @NotBlank
    @Size(max = 20)
    private String bairro;

    @Column(nullable = false)
    private boolean padrao;

}
