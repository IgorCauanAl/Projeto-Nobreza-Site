package commerce.nobreza.loja.masculina.nobreza_loja.Repository;

import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Category;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Produto;
import commerce.nobreza.loja.masculina.nobreza_loja.Enum.ProductSection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ProductRepository extends JpaRepository<Produto, Long> {

    Page<Produto> findByCategory(Category category, Pageable pageable);

    Page<Produto> findBySection(ProductSection section, Pageable pageable);
}
