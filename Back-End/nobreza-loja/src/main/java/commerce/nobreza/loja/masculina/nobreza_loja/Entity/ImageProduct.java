package commerce.nobreza.loja.masculina.nobreza_loja.Entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="tb_imageproduct")
@NoArgsConstructor
public class ImageProduct {

    public ImageProduct (String url_image,Produto product ){
        this.url_image = url_image;
        this.product = product;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "url_image", nullable = false)
    private String url_image;

    //Determinar a foto principal do produto
    @Column(name = "image_principal", nullable = false)
    private boolean image_principal;

    //Muitas imagens para um produto
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Produto product;


}
