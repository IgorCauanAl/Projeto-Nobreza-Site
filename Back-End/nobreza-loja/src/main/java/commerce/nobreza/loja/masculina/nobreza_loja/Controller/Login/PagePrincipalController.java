package commerce.nobreza.loja.masculina.nobreza_loja.Controller.Login;

import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Produto;
import commerce.nobreza.loja.masculina.nobreza_loja.Service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@AllArgsConstructor
public class PagePrincipalController {

    private ProductService productService;

    private static final int MOST_WANTED_PAGE_SIZE = 4;
    private static final int NEWS_PAGE_SIZE = 5;

    @GetMapping("/page_principal")
    public String showPagePrincipal(
            @RequestParam(name = "mw_page", defaultValue = "0") int mw_page,
            @RequestParam(name ="nw_page", defaultValue = "0") int nw_page,
            Model model
    ){

        Page<Produto> mostWanted = productService.getMostWantedProducts(mw_page,MOST_WANTED_PAGE_SIZE);
        Page<Produto> news = productService.getNewsProducts(nw_page,NEWS_PAGE_SIZE);

        model.addAttribute("mostWantedProducts", mostWanted);
        model.addAttribute("newsProducts", news);

        return "page_principal";
    }


    @GetMapping("/api/fragments/most-wanted")
    public String getMostWantedFragment(
            @RequestParam(name = "mw_page", defaultValue = "0") int mw_page,
            @RequestParam(name ="n_page", defaultValue = "0") int n_page,
            Model model) {

        Page<Produto> mostWanted = productService.getMostWantedProducts(mw_page, MOST_WANTED_PAGE_SIZE);
        model.addAttribute("mostWantedProducts", mostWanted);

        model.addAttribute("newsProducts", productService.getNewsProducts(n_page, NEWS_PAGE_SIZE));


        return "page_principal :: mostWantedFragment";
    }

    @GetMapping("/api/fragments/news")
    public String getNewsFragment(
            @RequestParam(name = "mw_page", defaultValue = "0") int mw_page,
            @RequestParam(name ="n_page", defaultValue = "0") int n_page,
            Model model) {

        Page<Produto> news = productService.getNewsProducts(n_page, NEWS_PAGE_SIZE);
        model.addAttribute("newsProducts", news);

        model.addAttribute("mostWantedProducts", productService.getMostWantedProducts(mw_page, MOST_WANTED_PAGE_SIZE));


        return "page_principal :: newsFragment";
    }

}
