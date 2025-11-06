package commerce.nobreza.loja.masculina.nobreza_loja.Controller.Login;

import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Produto;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.ProductRepository;
import commerce.nobreza.loja.masculina.nobreza_loja.Service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@AllArgsConstructor
public class ClothesController {

    private final ProductService productService;
    private final ProductRepository produtoRepository;

    @GetMapping("/produto/{id}")
    public String getProdutoDetalhe(@PathVariable Long id, Model model) {

        Produto produtoPrincipal = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado com ID: " + id));

        model.addAttribute("produto", produtoPrincipal);

        return "clothes";
    }

}
