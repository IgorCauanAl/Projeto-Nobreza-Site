package commerce.nobreza.loja.masculina.nobreza_loja.Entity;

import commerce.nobreza.loja.masculina.nobreza_loja.Enum.ProductSection;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "tb_produto")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "referencia")
    private String referencia;

    @Column(name = "composition")
    private String composition;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "amount")
    private int amount;

    @Enumerated(EnumType.STRING)
    private ProductSection section;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "discount_pix")
    private Double discountPix;

    @Column(name = "created_in")
    private LocalDateTime createdIn;

    @Column(name = "access_count")
    private Long accessCount = 0L;

    @ManyToMany
    @JoinTable(
            name= "product_colors",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "color_id")
    )
    private Set<Cor> colors = new HashSet<>();


    @OneToMany(
            mappedBy = "product",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.EAGER
    )
    private List<ImageProduct> images = new ArrayList<>();


}
