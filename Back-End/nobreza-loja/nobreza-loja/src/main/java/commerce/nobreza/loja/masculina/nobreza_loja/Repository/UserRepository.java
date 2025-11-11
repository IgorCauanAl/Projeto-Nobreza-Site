package commerce.nobreza.loja.masculina.nobreza_loja.Repository;

import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Pedido;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Usuario, Long> {
  Optional<Usuario> findByEmail(String email);
  Optional<Usuario> findByNome(String nome);
}
