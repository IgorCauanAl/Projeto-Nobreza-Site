package commerce.nobreza.loja.masculina.nobreza_loja.Service;

import commerce.nobreza.loja.masculina.nobreza_loja.DTO.ProductSuggestionDTO;
import commerce.nobreza.loja.masculina.nobreza_loja.DTO.SearchSuggestionDTO;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Category;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Produto;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.CategoryRepository;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.ProductRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SearchService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;


    public SearchSuggestionDTO findSuggestions(String query){

        List<Produto> products = productRepository.findTop5ByNameStartingWithIgnoreCase(query);

        List<ProductSuggestionDTO> productsDTO = products.stream()
                .map(productDto -> new ProductSuggestionDTO(
                        productDto.getId(),
                        productDto.getName(),
                        productDto.getImages().isEmpty() ? "/img/default.png" : productDto.getImages().get(0).getUrl_image()
                ))
                .collect(Collectors.toList());

        List<Category> categories = categoryRepository.findTop5ByNameStartingWithIgnoreCase(query);

        List<String> textSuggestions = categories.stream()
                .map(Category::getName)
                .collect(Collectors.toList());

        return new SearchSuggestionDTO(textSuggestions, productsDTO);

    }

}
