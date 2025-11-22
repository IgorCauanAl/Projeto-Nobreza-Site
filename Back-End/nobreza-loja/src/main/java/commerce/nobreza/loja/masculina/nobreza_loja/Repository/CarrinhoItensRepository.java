package commerce.nobreza.loja.masculina.nobreza_loja.Repository;

import commerce.nobreza.loja.masculina.nobreza_loja.Entity.CarrinhoItens;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Produto;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CarrinhoItensRepository extends JpaRepository<CarrinhoItens, Long> {
    Optional<CarrinhoItens> findByUsuarioAndProduto(Usuario usuario, Produto produto);
    List<CarrinhoItens> findByUsuario(Usuario usuario);
}