package commerce.nobreza.loja.masculina.nobreza_loja.DTO;

import lombok.Data;

import java.util.List;

@Data
public class SearchSuggestionDTO {
    private List<String> textSuggestions;
    private List<ProductSuggestionDTO> productSuggestions;

    public SearchSuggestionDTO(List<String>textSuggestions,List<ProductSuggestionDTO>productSuggestions){
        this.textSuggestions = textSuggestions;
        this.productSuggestions = productSuggestions;
    }

}
