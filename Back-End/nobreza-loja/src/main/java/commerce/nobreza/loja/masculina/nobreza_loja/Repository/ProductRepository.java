package commerce.nobreza.loja.masculina.nobreza_loja.Repository;

import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Category;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Produto;
import commerce.nobreza.loja.masculina.nobreza_loja.Enum.ProductSection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ProductRepository extends JpaRepository<Produto, Long> {


    Page<Produto> findBySection(ProductSection section, Pageable pageable);

    List<Produto> findTop5ByNameStartingWithIgnoreCase(String nome);

    @Query(value = "SELECT p FROM Produto p WHERE " +
            "(:category IS NULL OR p.category = :category) AND " + // Compara Objeto com Objeto
            "(:min IS NULL OR p.price >= :min) AND " +
            "(:max IS NULL OR p.price <= :max)",

            countQuery = "SELECT COUNT(p) FROM Produto p WHERE " +
                    "(:category IS NULL OR p.category = :category) AND " +
                    "(:min IS NULL OR p.price >= :min) AND " +
                    "(:max IS NULL OR p.price <= :max)")
    Page<Produto> findProdutosByFilters(
            @Param("category") Category category,
            @Param("min") Double min,
            @Param("max") Double max,
            Pageable pageable
    );
}
