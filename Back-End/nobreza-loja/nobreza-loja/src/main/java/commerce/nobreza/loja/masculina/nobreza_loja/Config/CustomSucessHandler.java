package commerce.nobreza.loja.masculina.nobreza_loja.Config;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Set;

@Component
public class CustomSucessHandler implements AuthenticationSuccessHandler {

    //Método para redirecionar o usuário com base na sua permissão
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
                                        throws IOException, ServletException{
        Set<String> roles = AuthorityUtils.authorityListToSet(authentication.getAuthorities());

        if(roles.contains("ROLE_ADMIN")){
            response.sendRedirect("/page_principal");
        }else if (roles.contains("ROLE_USER")){
            response.sendRedirect("/page_principal");
        }else{
            response.sendRedirect("/html/login.html?erro=sem_permissao");
        }
    }
}
