package commerce.nobreza.loja.masculina.nobreza_loja.DTO;

import lombok.Data;

@Data
public class ProductSuggestionDTO {
    private long id;
    private String name;
    private String imageUrl;

    public ProductSuggestionDTO(long id, String name, String imageUrl){
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }

}
