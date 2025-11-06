package commerce.nobreza.loja.masculina.nobreza_loja.Repository;

import commerce.nobreza.loja.masculina.nobreza_loja.Entity.MetodoPagamento;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MetodoPagamentoRepository extends JpaRepository<MetodoPagamento, Long> {

    // Método essencial para o GET /checkout
    // Busca todos os cartões salvos de um usuário
    List<MetodoPagamento> findByUsuario(Usuario usuario);
}