package commerce.nobreza.loja.masculina.nobreza_loja.Repository;

import commerce.nobreza.loja.masculina.nobreza_loja.DTO.CodeDTO;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.TokenSenha;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenSenhaRepository extends JpaRepository<TokenSenha,Long> {

    Optional<TokenSenha> findByUsuario(Usuario usuario);
    Optional<TokenSenha> findByCode(String code);
}
