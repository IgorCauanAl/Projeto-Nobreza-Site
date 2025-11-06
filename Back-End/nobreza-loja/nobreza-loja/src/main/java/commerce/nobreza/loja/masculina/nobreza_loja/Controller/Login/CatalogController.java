package commerce.nobreza.loja.masculina.nobreza_loja.Controller.Login;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Produto;
import commerce.nobreza.loja.masculina.nobreza_loja.Service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/api/catalog")
@AllArgsConstructor
public class CatalogController {

    private final ProductService productService;

    @GetMapping("/page")
    public String getCatalogPage(

            @RequestParam(name = "category", required = false) String category,
            @RequestParam("groupTitle") String groupTitle,
            @RequestParam("pageTitle") String pageTitle,
            @RequestParam(name = "page", defaultValue = "1") int page,

            Model model
    ) {


        model.addAttribute("groupTitle", groupTitle);
        model.addAttribute("pageTitle", pageTitle);

        Page<Produto> produtosPage;

        if (category != null && !category.isEmpty()) {

            produtosPage = productService.findProdutosByCategory(category, page);

            model.addAttribute("category", category);

        } else {

            produtosPage = productService.findAllPaginated(page);
        }

        model.addAttribute("produtosPage", produtosPage);

        model.addAttribute("totalProdutosCount", produtosPage.getTotalElements());

        return "catalog";
    }
}