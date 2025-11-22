package commerce.nobreza.loja.masculina.nobreza_loja.Controller.Login;

import commerce.nobreza.loja.masculina.nobreza_loja.DTO.RegisterUserDTO;
import commerce.nobreza.loja.masculina.nobreza_loja.Exception.EmailAlreadyExistException;
import commerce.nobreza.loja.masculina.nobreza_loja.Service.RegisterService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class RegisterController {

    private final RegisterService registerService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody RegisterUserDTO dto) {
        try {
            registerService.register(dto);
            return ResponseEntity.ok(Map.of("message", "Registro feito com sucesso"));
        } catch (EmailAlreadyExistException e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email já cadastrado!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }


}