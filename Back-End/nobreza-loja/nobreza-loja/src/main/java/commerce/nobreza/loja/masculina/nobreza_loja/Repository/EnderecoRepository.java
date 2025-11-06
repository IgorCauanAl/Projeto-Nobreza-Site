package commerce.nobreza.loja.masculina.nobreza_loja.Repository;

import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Endereco;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnderecoRepository extends JpaRepository<Endereco, Long> {

    // Método essencial para o GET /checkout
    // Busca todos os endereços salvos de um usuário
    List<Endereco> findByUsuario(Usuario usuario);
}