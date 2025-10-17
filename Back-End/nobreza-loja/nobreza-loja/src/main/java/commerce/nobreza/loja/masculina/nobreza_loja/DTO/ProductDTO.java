package commerce.nobreza.loja.masculina.nobreza_loja.DTO;

import jakarta.validation.constraints.*;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.Set;

@Data
public class ProductDTO {

    @NotBlank(message = "Nome do produto é obrigatório")
    @Size(min = 2, max = 255, message = "Nome deve ter entre 2 e 255 caracteres")
    private String prodNome;

    @NotNull(message = "Preço é obrigatório")
    @DecimalMin(value = "0.01", message = "Preço deve ser maior que zero")
    private BigDecimal prodPreco;

    @NotBlank(message = "Tipo do produto é obrigatório")
    private String prodTipo;

    @NotBlank(message = "Referência é obrigatória")
    private String prodRef;

    @NotNull(message = "Quantidade é obrigatória")
    @Min(value = 0, message = "Quantidade não pode ser negativa")
    private Integer prodQuantidade;

    @NotBlank(message = "Descrição é obrigatória")
    @Size(min = 10, max = 1000, message = "Descrição deve ter entre 10 e 1000 caracteres")
    private String prodDescricao;

    @NotBlank(message = "Composição é obrigatória")
    private String prodComposicao;

    @DecimalMin(value = "0.0", message = "Desconto PIX não pode ser negativo")
    @DecimalMax(value = "100.0", message = "Desconto PIX não pode ser maior que 100%")
    private Double prodPixDesconto;

    private Boolean prodPromocao = false;

    @NotNull(message = "Foto do produto é obrigatória")
    private MultipartFile prodFoto;

    private Set<String> prodCores;
}
