package commerce.nobreza.loja.masculina.nobreza_loja.Controller.Login.ADM;

import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Pedido;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Usuario;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.PedidoRepository;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("/user")
@RequiredArgsConstructor
public class UseController {

    private final UserRepository userRepository;
    private final PedidoRepository pedidoRepository;

    @GetMapping("/manager")
    public String viewUserManager(Model model, Principal principal){
        String loginDoUsuario = principal.getName();

        Usuario user = userRepository.findByEmail(loginDoUsuario)
                .orElse(null);


        List<Pedido> pedidos = pedidoRepository.findByUsuario(user);

        model.addAttribute("user", user);
        model.addAttribute("pedidos", pedidos);

        return "PerfilUSER";
    }


    @GetMapping("/pedido/{id}")
    public String viewDetailsRequest(@PathVariable("id") Long id, Model model, Principal principal) {

        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido não encontrado"));

        Usuario user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário não autenticado"));

        if (!pedido.getUsuario().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Acesso negado");
        }

        model.addAttribute("pedido", pedido);

        return "closing";
    }

    @PostMapping("/account/delete")
    public String deleteAccount(@AuthenticationPrincipal Usuario usuario, HttpServletRequest request) {

        if(usuario != null){
            userRepository.delete(usuario);
        }

        request.getSession().invalidate();

        return "redirect:/login.html";
    }
}
