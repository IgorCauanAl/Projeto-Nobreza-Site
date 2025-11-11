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
            // Parâmetros de contexto
            @RequestParam("groupTitle") String groupTitle,
            @RequestParam("pageTitle") String pageTitle,

            // Parâmetros de Filtro e Paginação
            @RequestParam(name = "category", required = false) String category, // Recebe a String
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(defaultValue = "newest") String sort,
            @RequestParam(name = "min", required = false) Double min,
            @RequestParam(name = "max", required = false) Double max,
            Model model
    ) {

        // 1. CHAMA O NOVO MÉTODO ÚNICO
        // O if/else foi removido. O Service agora cuida de tudo.
        Page<Produto> produtosPage = productService.findProdutos(category, page, sort, min, max);

        // 2. Adiciona os resultados ao Model
        model.addAttribute("produtosPage", produtosPage);
        model.addAttribute("totalProdutosCount", produtosPage.getTotalElements());

        // 3. Adiciona TODOS os parâmetros de volta ao Model
        // (Necessário para a paginação)
        model.addAttribute("groupTitle", groupTitle);
        model.addAttribute("pageTitle", pageTitle);
        model.addAttribute("category", category);
        model.addAttribute("sort", sort);
        model.addAttribute("min", min);
        model.addAttribute("max", max);

        return "catalog";
    }
}