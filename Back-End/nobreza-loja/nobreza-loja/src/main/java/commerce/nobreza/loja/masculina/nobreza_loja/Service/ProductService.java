package commerce.nobreza.loja.masculina.nobreza_loja.Service;

import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Category;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Cor;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.ImageProduct;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Produto;
import commerce.nobreza.loja.masculina.nobreza_loja.Enum.ProductSection;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.CategoryRepository;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.ColorRepository;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ColorRepository colorRepository;

    private final String UPLOAD_DIR = "uploads/";

    @Transactional
    public void createProduct(
            String nome, BigDecimal preco, String tipo, String ref, Integer quantidade,
            String descricao, String composicao, MultipartFile foto, String cores,
            Double pixDesconto, boolean promocao, String secao
    ) throws IOException {

        String savedImageUrl = saveImage(foto);

        Category category = findOrCreateCategory(tipo);

        Set<Cor> coresSet = new HashSet<>();
        if (cores != null && !cores.isEmpty()) {
            List<String> hexCodes = Arrays.asList(cores.split(","));
            for (String hex : hexCodes) {
                coresSet.add(findOrCreateCor(hex.toUpperCase()));
            }
        }

        Produto produto = new Produto();
        produto.setName(nome);
        produto.setPrice(preco);
        produto.setReferencia(ref);
        produto.setAmount(quantidade);
        produto.setDescription(descricao);
        produto.setComposition(composicao);
        produto.setDiscountPix(pixDesconto != null ? pixDesconto : 0.0);
        produto.setPromotion(promocao);
        produto.setCreatedIn(LocalDateTime.now());

        produto.setCategory(category);
        produto.setColors(coresSet);

        try{
            ProductSection section = ProductSection.valueOf(secao.toUpperCase());
            produto.setSection(section);
        }catch(IllegalArgumentException | NullPointerException e){
            produto.setSection(ProductSection.CATEGORY);
        }

        ImageProduct productImage = new ImageProduct(savedImageUrl, produto);
        produto.getImages().add(productImage);

        productRepository.save(produto);
    }

    // Método auxiliar para Categoria
    private Category findOrCreateCategory(String categoryName) {

        return categoryRepository.findByName(categoryName)
                .orElseGet(() -> {
                    Category newCategory = new Category(categoryName);
                    return categoryRepository.save(newCategory);
                });
    }

    // Método auxiliar para Cor
    private Cor findOrCreateCor(String hexCode) {

        return colorRepository.findByCodeHex(hexCode)
                .orElseGet(() -> {
                    Cor newCor = new Cor(hexCode);
                    return colorRepository.save(newCor);
                });
    }


    public Page<Produto> findAllPaginated(int page){
        int pageIndex = (page < 1) ? 0 : page - 1;

        Pageable pageable = PageRequest.of(pageIndex, 8);

        return productRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Page<Produto> findProdutosByCategory(String categoryName, int page) {

        Category category = categoryRepository.findByName(categoryName)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada: " +categoryName));

        int pageIndex = (page < 1) ? 0 : page - 1;

        Pageable pageable = PageRequest.of(pageIndex, 8);

        return productRepository.findByCategory(category, pageable);
    }


    private String saveImage(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IOException("O arquivo de imagem está vazio.");
        }

        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String uniqueFileName = UUID.randomUUID().toString() + extension;

        Path filePath = uploadPath.resolve(uniqueFileName);
        Files.copy(file.getInputStream(), filePath);

        return "/" + UPLOAD_DIR + uniqueFileName;
    }


    public void deleteProductById(Long id) {

        productRepository.deleteById(id);

    }


    public Page<Produto> getMostWantedProducts(int page,int pageSize){
        Pageable pageable = PageRequest.of(page, pageSize);
        return productRepository.findBySection(ProductSection.MOST_WANTED, pageable);
    }

    public Page<Produto> getNewsProducts(int page, int pageSize){
        Pageable pageable = PageRequest.of(page, pageSize);
        return productRepository.findBySection(ProductSection.NEWS, pageable);
    }



}


