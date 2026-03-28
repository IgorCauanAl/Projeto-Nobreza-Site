package commerce.nobreza.loja.masculina.nobreza_loja.Controller.Login;

import commerce.nobreza.loja.masculina.nobreza_loja.Service.AiService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(
            @RequestBody Map<String, String> payload,
            HttpSession session,
            Principal principal) {

        String userQuery = payload.get("query");
        String chatId = session.getId();
        String userEmail = (principal != null) ? principal.getName() : null;

        String response = aiService.getProductRecommendation(userQuery, chatId, userEmail);

        return ResponseEntity.ok(Map.of(
                "response", response,
                "sessionId", chatId
        ));
    }
}
