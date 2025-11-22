package commerce.nobreza.loja.masculina.nobreza_loja.Service;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Role;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Usuario;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.PedidoRepository;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.RoleRepository;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class ADMUserService {


    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PedidoRepository pedidoRepository;



    public List<Usuario> listUser(){
        return userRepository.findAll();
    }

    @Transactional
    public boolean promoteToAdmin(Long userId, String requestingAdminEmail) {
        if (!"nobrezaADM@teste.com".equals(requestingAdminEmail)) {
            return false;
        }

        Usuario user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                .orElseThrow(() -> new RuntimeException("Role ADMIN não encontrada"));

        user.getRoles().add(adminRole);
        userRepository.save(user);

        return true;
    }

    public void deleteUser(Long id){

        Usuario user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        pedidoRepository.deleteAll(user.getPedidos());

        userRepository.deleteById(id);


    }


}