package commerce.nobreza.loja.masculina.nobreza_loja.Controller.Login;

import commerce.nobreza.loja.masculina.nobreza_loja.DTO.CodeDTO;
import commerce.nobreza.loja.masculina.nobreza_loja.DTO.NewPasswordDTO;
import commerce.nobreza.loja.masculina.nobreza_loja.DTO.RecoveryEmailDTO;
import commerce.nobreza.loja.masculina.nobreza_loja.Exception.EmailNotFoundException;
import commerce.nobreza.loja.masculina.nobreza_loja.Exception.TokenExpiratedException;
import commerce.nobreza.loja.masculina.nobreza_loja.Exception.TokenInvalideException;
import commerce.nobreza.loja.masculina.nobreza_loja.Service.PasswordRecoveryService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/apirecovery")
@AllArgsConstructor
public class PasswordRecoveryController {

    private final PasswordRecoveryService passwordRecoveryService;

    @PostMapping("/send-code")
    public ResponseEntity<Map<String, String>> recuperarSenha(@RequestBody RecoveryEmailDTO dto) {
        try {
            passwordRecoveryService.enviarCodigo(dto);
            return ResponseEntity.ok(Map.of("message", "Código enviado com sucesso!"));
        } catch (EmailNotFoundException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email não cadastrado"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }


    @PostMapping("/check")
    public ResponseEntity<Map<String, String>> checkCode(@RequestBody CodeDTO dto) {
        try {
            passwordRecoveryService.checkCode(dto);
            return ResponseEntity.ok(Map.of("message", "Código validado com sucesso"));
        } catch (TokenInvalideException e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Código invalido!"));
        } catch (TokenExpiratedException e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Código Expirado!"));
        }

    }

    @PostMapping("/changepassword")
    public ResponseEntity<Map<String, String>> changePassword(@RequestBody NewPasswordDTO dto) {

        System.out.println("teste: " + dto.getNewPassword());

        try {
            passwordRecoveryService.changePassword(dto);
            return ResponseEntity.ok(Map.of("message", "Senha trocada com sucesso"));
        } catch (TokenInvalideException e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Código inválido!"));
        } catch (TokenExpiratedException e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Código Expirado!"));
        }

    }



}