package commerce.nobreza.loja.masculina.nobreza_loja.Controller.Login.ADM;

import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Endereco;
import commerce.nobreza.loja.masculina.nobreza_loja.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import java.security.Principal;

@Controller
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountManagerController {

    private final UserService userService;


    @PostMapping("/details")
    public String changeDetails(
            @RequestParam("name") String novoNome,
            Principal principal,
            RedirectAttributes redirectAttributes
    ) {

        String username = principal.getName();

        try {
            userService.changeName(username, novoNome);
            redirectAttributes.addFlashAttribute("successMessage", "Nome alterado com sucesso!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", "Erro ao alterar o nome.");
        }

        return "redirect:/user/manager";
    }


    @PostMapping("/password")
    public String changePassword(
            @RequestParam("current-password") String currentPassword,
            @RequestParam("new-password") String newPassword,
            @RequestParam("confirm-password") String confirmPassword,
            Principal principal,
            RedirectAttributes redirectAttributes
    ) {
        String username = principal.getName();

        try {
            System.out.println("teste:" + currentPassword +"," + newPassword + "," + confirmPassword);
            userService.changePassword(username, currentPassword, newPassword, confirmPassword);
            redirectAttributes.addFlashAttribute("successMessage", "Senha alterada com sucesso!");
        } catch (IllegalArgumentException e) {
            redirectAttributes.addFlashAttribute("errorMessage", e.getMessage());
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", "Erro ao processar a alteração de senha.");
        }

        return "redirect:/user/manager";
    }

    @PostMapping("/salvar")
    public String saveNewAddres(
            @ModelAttribute Endereco endereco,
            Principal principal,
            RedirectAttributes redirectAttributes
            ){

        try{
            String emailUsuario = principal.getName();

            userService.saveAddress(endereco,emailUsuario);

            redirectAttributes.addFlashAttribute("sucessMessage.","Endereço salvo com sucesso!");
        } catch(Exception e){
            redirectAttributes.addFlashAttribute("failureMessage.","Endereço não foi salvo!");
        }
        return "redirect:/user/manager";
    }


}
