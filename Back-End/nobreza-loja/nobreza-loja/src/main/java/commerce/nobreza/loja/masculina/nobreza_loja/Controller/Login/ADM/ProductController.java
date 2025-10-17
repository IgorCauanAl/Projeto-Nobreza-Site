package commerce.nobreza.loja.masculina.nobreza_loja.Controller.Login.ADM;

import commerce.nobreza.loja.masculina.nobreza_loja.DTO.ProductDTO;
import commerce.nobreza.loja.masculina.nobreza_loja.Service.ProductService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Controller
@RequestMapping("api/products")
@AllArgsConstructor
public class ProductController {


    private final ProductService productService;

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<?> addProduct(
            @Valid @ModelAttribute ProductDTO product,
            BindingResult bindingResult,
            @RequestParam(value = "prod-cores", required = false) String hexColorsString) {

        // Debug melhorado
        System.out.println("=== DADOS RECEBIDOS ===");
        System.out.println("Nome: " + product.getProdNome());
        System.out.println("Preço: " + product.getProdPreco());
        System.out.println("Tipo: " + product.getProdTipo());
        System.out.println("Referência: " + product.getProdRef());
        System.out.println("Quantidade: " + product.getProdQuantidade());
        System.out.println("Cores String: " + hexColorsString);
        System.out.println("Arquivo: " + (product.getProdFoto() != null ? product.getProdFoto().getOriginalFilename() : "null"));

        // Validação de erros
        if (bindingResult.hasErrors()) {
            bindingResult.getFieldErrors().forEach(error ->
                    System.out.println("Erro no campo " + error.getField() + ": " + error.getDefaultMessage())
            );
            return ResponseEntity.badRequest().body("Dados inválidos: " + bindingResult.getFieldErrors());
        }

        try {
            // Converter CSV de cores em Set<String>
            Set<String> hexColors = new HashSet<>();
            if (hexColorsString != null && !hexColorsString.isEmpty()) {
                hexColors.addAll(Arrays.asList(hexColorsString.split(",")));
            }
            product.setProdCores(hexColors);

            // Chamar o service
            productService.createProduct(
                    product.getProdNome(),
                    product.getProdPreco(),
                    product.getProdTipo(),
                    product.getProdRef(),
                    product.getProdQuantidade(),
                    product.getProdDescricao(),
                    product.getProdComposicao(),
                    product.getProdPixDesconto(),
                    product.getProdPromocao(),
                    product.getProdFoto(),
                    product.getProdCores()
            );

            return ResponseEntity.ok("Produto adicionado com sucesso!");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Erro ao salvar a imagem: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro interno: " + e.getMessage());
        }
    }
}
