package commerce.nobreza.loja.masculina.nobreza_loja.Controller.Login;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Produto;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
@Controller
@RequestMapping("api/catalog")
@AllArgsConstructor
public class CatalogController {

    private final ProductRepository productRepository;

    @GetMapping("/page")
    public String catalogPage(@RequestParam(value = "category", required = false) String category, Model model) {
        List<Produto> produtos;
        if (category != null) {
            produtos = productRepository.findByCategoryName(category);
        } else {
            produtos = productRepository.findAll();
        }
        model.addAttribute("produtos", produtos);
        model.addAttribute("selectedCategory", category);
        return "catalog";
    }

}
