package commerce.nobreza.loja.masculina.nobreza_loja.Controller.Product;
import commerce.nobreza.loja.masculina.nobreza_loja.Service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.math.BigDecimal;

@Controller
@RequestMapping("/api/products")
@AllArgsConstructor
public class ProductController {

    private final ProductService productService;


    @PostMapping("/admin/produtos/adicionar")
    public String addProduct(
            @RequestParam("prodNome") String nome,
            @RequestParam("prodPreco") BigDecimal preco,
            @RequestParam("prodTipo") String tipo,
            @RequestParam("prodRef") String ref,
            @RequestParam("prodQuantidade") Integer quantidade,
            @RequestParam("prodDescricao") String descricao,
            @RequestParam("prodComposicao") String composicao,
            @RequestParam("prodSection") String secao,
            @RequestParam("prodFoto") MultipartFile foto,
            @RequestParam(name = "prodCores", required = false) String cores,
            @RequestParam(name = "prodPixDesconto", required = false) Double pixDesconto,
            @RequestParam(name = "prodPromocao", defaultValue = "false") boolean promocao,
            RedirectAttributes redirectAttributes
    ) {
        try {
            productService.createProduct(
                    nome, preco, tipo, ref, quantidade, descricao, composicao,
                    foto, cores, pixDesconto, promocao, secao
            );
            redirectAttributes.addFlashAttribute("success", "Produto adicionado com sucesso!");
        } catch (IOException e) {
            e.printStackTrace();
            redirectAttributes.addFlashAttribute("error", "Erro ao salvar a imagem do produto.");
        } catch (Exception e) {
            e.printStackTrace();
            redirectAttributes.addFlashAttribute("error", "Erro ao adicionar o produto.");
        }

        return "redirect:/manageruser";
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {

        productService.deleteProductById(id);

        return ResponseEntity.ok().build();
    }

}