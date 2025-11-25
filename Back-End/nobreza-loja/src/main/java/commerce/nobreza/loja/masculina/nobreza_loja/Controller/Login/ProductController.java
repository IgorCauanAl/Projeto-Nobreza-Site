package commerce.nobreza.loja.masculina.nobreza_loja.Controller.Product;

import commerce.nobreza.loja.masculina.nobreza_loja.Service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;

@Controller
@RequestMapping("/api/products")
@AllArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping("/admin/produtos/adicionar")
    public ResponseEntity<String> addProduct(
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
            @RequestParam(name = "prodPixDesconto", required = false) Double pixDesconto
    ) {
        try {
            productService.createProduct(
                    nome, preco, tipo, ref, quantidade, descricao, composicao,
                    foto, cores, pixDesconto, secao
            );

            // Retorna status 200 OK com mensagem de texto para o JavaScript ler
            return ResponseEntity.ok("Produto adicionado com sucesso!");

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao salvar a imagem: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao adicionar o produto: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProductById(id);
        return ResponseEntity.ok().build();
    }
}