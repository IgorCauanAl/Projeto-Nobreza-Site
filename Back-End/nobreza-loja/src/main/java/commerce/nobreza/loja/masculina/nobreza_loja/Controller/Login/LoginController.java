package commerce.nobreza.loja.masculina.nobreza_loja.Controller.Login;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("api")
public class LoginController {

    @GetMapping("/page_principal")
    public String pagePrincipal() {
        return "page_principal";
    }


    @GetMapping("/logout")
    public String logout (HttpServletRequest request){
        SecurityContextHolder.clearContext();

        request.getSession().invalidate();
        return "redirect:/login.html";
    }

}