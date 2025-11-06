package commerce.nobreza.loja.masculina.nobreza_loja.Repository;

import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Pedido;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    // Método essencial para uma futura página "Meus Pedidos"
    // Encontra todos os pedidos de um usuário, ordenados pelo mais recente
    List<Pedido> findByUsuarioOrderByDataPedidoDesc(Usuario usuario);
}