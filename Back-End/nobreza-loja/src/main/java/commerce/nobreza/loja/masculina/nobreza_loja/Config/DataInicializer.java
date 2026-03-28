package commerce.nobreza.loja.masculina.nobreza_loja.Config;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Category;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Role;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Usuario;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.CategoryRepository;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.RoleRepository;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
@AllArgsConstructor
public class DataInicializer implements CommandLineRunner {

 private final RoleRepository roleRepository;
 private final CategoryRepository categoryRepository;
 private final UserRepository usuarioRepository;
 private final PasswordEncoder passwordEncoder;

    //Inicializar como padrão ROLE_USER E ROLER_ADMIN no banco
    @Override
    public void run(String... args) {
        if (!roleRepository.existsByName("ROLE_USER")) {
            roleRepository.save(new Role("ROLE_USER"));
        }
        if (!roleRepository.existsByName("ROLE_ADMIN")) {
            roleRepository.save(new Role("ROLE_ADMIN"));
        }

        // Criar usuário ADMIN se não existir
        if (usuarioRepository.findByEmail("admin@nobreza.com").isEmpty()) {
            Usuario admin = new Usuario();
            admin.setNome("Administrador");
            admin.setEmail("admin@nobreza.com");
            admin.setSenha(passwordEncoder.encode("admin123"));

            Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                    .orElseGet(() -> roleRepository.save(new Role("ROLE_ADMIN")));

            Set<Role> roles = new HashSet<>();
            roles.add(adminRole);
            admin.setRoles(roles);
            
            usuarioRepository.save(admin);
        }

        List<String> defaultCategories = Arrays.asList(
                "Ternos", "Camisas", "Sapatos", "Acessórios", "Calças", "Gravatas"
        );

        for (String categoryName : defaultCategories) {
            if (categoryRepository.findByName(categoryName).isEmpty()) {
                categoryRepository.save(new Category(categoryName));
            }
        }
    }
}
