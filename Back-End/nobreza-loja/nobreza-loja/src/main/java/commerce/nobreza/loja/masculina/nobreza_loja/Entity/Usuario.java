package commerce.nobreza.loja.masculina.nobreza_loja.Entity;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "tb_usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_usuario")
    private String nome;

    @Column(name = "email_usuario")
    private String email;

    @Column(name = "senha_usuario")
    private String senha;

    //Muitas permissões para muitos usuarios
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "tb_usuario_role",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name ="role_id")
    )
    private Set<Role> roles = new HashSet<>();

    // Um usuário pode ter muitos métodos de pagamento.
    @OneToMany(
            mappedBy = "usuario",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<MetodoPagamento> metodosPagamento = new HashSet<>();

    //Um usuario pode ter muitos carrinhos
    @OneToMany(
            mappedBy = "usuario",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<CarrinhoItens> itensCarrinho = new HashSet<>();

    //Token da Senha
    @OneToOne(mappedBy = "usuario" , cascade = CascadeType.ALL)
    private TokenSenha tokenSenha;

    @OneToMany(
            mappedBy = "usuario",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Endereco> enderecos = new HashSet<>();


    @OneToMany(
            mappedBy = "usuario",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Pedido> pedidos = new HashSet<>();

    //Método para verificar se é adm ou user para o tymeleaft em PerfilADM
    public boolean hasRole(String roleName) {
        return roles.stream().anyMatch(role -> role.getName().equals(roleName));
    }



}
