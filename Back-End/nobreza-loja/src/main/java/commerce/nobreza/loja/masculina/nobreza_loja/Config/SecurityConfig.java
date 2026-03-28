package commerce.nobreza.loja.masculina.nobreza_loja.Config;

import commerce.nobreza.loja.masculina.nobreza_loja.Service.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final CustomUserDetailsService customUserDetailsService;

    public SecurityConfig(CustomUserDetailsService customUserDetailsService) {
        this.customUserDetailsService = customUserDetailsService;
    }

    //Metodo que retornar a senha criptografada
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();

    }

    //Define o AuthenticationManager(Delegar a autenticação para o provider)
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    //Define o AuthenticationProvider(Faz a autenticação do usuário)
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(customUserDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    // Configura a cadeia de filtros das rotas
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, CustomSucessHandler successHandler, CustomFailureHandler failureHandler) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests((auth) -> auth

                        .requestMatchers("/css/**", "/js/**", "/img/**").permitAll()

                        .requestMatchers("/api/page_principal", "/api/catalog/page", "/user/manager", "/api/register", "/login","/apirecovery/**", "/api/fragments/**", "/page_principal","/api/cart/remove/**", "/api/ai/chat").permitAll()

                        .requestMatchers("/manageruser","/admin/usuarios/deletar/**","/admin/usuarios/promover/{id}","/delete/**", "/api/products/**", "/admin/stats/**").hasRole("ADMIN")

                        .anyRequest().authenticated()

                )


                .formLogin(form -> form
                        .loginPage("/html/login.html")
                        .loginProcessingUrl("/login")
                        .usernameParameter("email-login")
                        .passwordParameter("password-login")
                        .successHandler(successHandler)
                        .failureHandler(failureHandler)
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/login.html")
                )
                .authenticationProvider(authenticationProvider())
                .build();
    }

}
