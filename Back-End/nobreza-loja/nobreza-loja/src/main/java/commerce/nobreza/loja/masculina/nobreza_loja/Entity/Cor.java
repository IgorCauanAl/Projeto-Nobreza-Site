package commerce.nobreza.loja.masculina.nobreza_loja.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tb_cor")
@Getter
@Setter
public class Cor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code_hex", length = 7,nullable = false, unique = true)
    private String codeHex;

    @ManyToMany(mappedBy = "colors")
    private Set<Produto> produtos = new HashSet<>();

}
