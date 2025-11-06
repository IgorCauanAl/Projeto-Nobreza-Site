package commerce.nobreza.loja.masculina.nobreza_loja.Controller.Login.ADM;
import commerce.nobreza.loja.masculina.nobreza_loja.Service.ManageUserService;
import commerce.nobreza.loja.masculina.nobreza_loja.Service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.math.BigDecimal;
import java.security.Principal;

@Controller
@AllArgsConstructor
public class ADMController {
    private final ManageUserService managerUserService;
    private final ProductService productService;

    @GetMapping("/manageruser")
    public String viewUser (Model model) {
        model.addAttribute("usuarios", managerUserService.listUser());
        return "PerfilADM";
    }

    @PostMapping("/admin/usuarios/promover/{id}")
    public String promoteUser(
            @PathVariable Long id,
            Principal principal,
            RedirectAttributes redirectAttributes
    ) {
        boolean promoted = managerUserService.promoteToAdmin(id, principal.getName());

        if (promoted) {
            redirectAttributes.addFlashAttribute("success", "Usuário promovido a ADMIN com sucesso!");
        } else {
            redirectAttributes.addFlashAttribute("error", "Você não tem permissão para promover usuários.");
        }

        return "redirect:/manageruser";
    }

    @PostMapping("/admin/usuarios/deletar/{id}")
    public String deleteUser(@PathVariable Long id){
        managerUserService.deleteUser(id);
        return "redirect:/manageruser";
    }


}