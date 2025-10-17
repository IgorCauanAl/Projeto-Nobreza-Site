package commerce.nobreza.loja.masculina.nobreza_loja.Service;

import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Category;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Cor;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.ImageProduct;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Produto;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.CategoryRepository;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.ColorRepository;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Service
@AllArgsConstructor
public class ProductService {

    private ProductRepository productRepository;
    private FileStorageService fileStorageService;
    private CategoryRepository categoryRepository;
    private ColorRepository colorRepository;

    public Produto createProduct(
            String name,
            BigDecimal price,
            String categoryName,
            String reference,
            Integer amount,
            String description,
            String composition,
            Double discountPix,
            Boolean promotion,
            MultipartFile photo,
            Set<String> hexColors
    ) throws IOException {

        // Salvar imagem
        String photoPath = fileStorageService.save(photo, "produto_" + System.currentTimeMillis());


        // Criar produto
        Produto p = new Produto();
        p.setName(name);
        p.setPrice(price);
        p.setReferencia(reference);
        p.setAmount(amount);
        p.setDescription(description);
        p.setComposition(composition);
        p.setCreatedIn(LocalDateTime.now());
        p.setDiscountPix(discountPix);
        p.setPromotion(promotion != null ? promotion : false);

        // Buscar categoria
        Category cat = categoryRepository.findByName(categoryName)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
        p.setCategory(cat);

        // Criar imagem principal
        ImageProduct img = new ImageProduct();
        img.setUrl_image(photoPath);
        img.setImage_principal(true);
        img.setProduct(p);
        p.getImages().add(img);

        // Associar cores
        if (hexColors != null) {
            for (String hex : hexColors) {
                Cor cor = colorRepository.findByCodeHex(hex)
                        .orElseGet(() -> {
                            Cor novaCor = new Cor();
                            novaCor.setCodeHex(hex);
                            return colorRepository.save(novaCor);
                        });
                p.getColors().add(cor);
            }
        }

        // Salvar produto
        return productRepository.save(p);
    }
}


