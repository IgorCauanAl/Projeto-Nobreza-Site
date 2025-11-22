package commerce.nobreza.loja.masculina.nobreza_loja.Controller.Login;
import commerce.nobreza.loja.masculina.nobreza_loja.DTO.CarrinhoItensDTO;
import commerce.nobreza.loja.masculina.nobreza_loja.Service.CarrinhoService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@AllArgsConstructor
public class CarrinhoController {

    private final CarrinhoService carrinhoService;


    @PostMapping("/add/{produtoId}")
    public ResponseEntity<Map<String, String>> adicionarAoCarrinho(
            @PathVariable Long produtoId,
            @RequestParam(value = "quantidade", defaultValue = "1") int quantidade,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        if (userDetails == null) {

            return ResponseEntity.status(401).body(Map.of("message", "Usuário não autenticado"));
        }

        try {
            carrinhoService.adicionarItem(produtoId, quantidade, userDetails.getUsername());
            return ResponseEntity.ok(Map.of("message", "Produto adicionado ao carrinho!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }


    @GetMapping("/items")
    public ResponseEntity<List<CarrinhoItensDTO>> getItensCarrinho(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build(); // Sem usuário, sem itens
        }

        List<CarrinhoItensDTO> items = carrinhoService.getItensDoUsuario(userDetails.getUsername());
        return ResponseEntity.ok(items);
    }

    @PostMapping("/remove/{itemId}")
    public ResponseEntity<Map<String, String>> removerDoCarrinho(
            @PathVariable Long itemId,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        if (userDetails == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Usuário não autenticado"));
        }

        try {
            carrinhoService.removerItem(itemId, userDetails.getUsername());
            return ResponseEntity.ok(Map.of("message", "Item removido do carrinho."));
        } catch (SecurityException e) {

            return ResponseEntity.status(403).body(Map.of("message", e.getMessage()));
        } catch (Exception e) {

            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }

    }

}