package commerce.nobreza.loja.masculina.nobreza_loja.DTO;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.CarrinhoItens;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Produto;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter @Setter
public class CarrinhoItensDTO {
    private Long id;
    private String nomeProduto;
    private BigDecimal precoProduto;
    private int quantidade;
    private String imagemUrl;

    public CarrinhoItensDTO(CarrinhoItens item) {
        this.id = item.getId();
        this.nomeProduto = item.getProduto().getName();
        this.precoProduto = item.getProduto().getPrice();
        this.quantidade = item.getQuantidade();
        if (item.getProduto().getImages() != null && !item.getProduto().getImages().isEmpty()) {
            this.imagemUrl = item.getProduto().getImages().get(0).getUrl_image();
        } else {
            this.imagemUrl = "/img/default-product.png";
        }
    }

    public CarrinhoItensDTO(Produto produto, int quantidade) {
        this.id = produto.getId();
        this.nomeProduto = produto.getName();
        this.precoProduto = produto.getPrice();
        this.quantidade = quantidade;
        if (produto.getImages() != null && !produto.getImages().isEmpty()) {
            this.imagemUrl = produto.getImages().get(0).getUrl_image();
        } else {
            this.imagemUrl = "/img/default-product.png";
        }
    }
}