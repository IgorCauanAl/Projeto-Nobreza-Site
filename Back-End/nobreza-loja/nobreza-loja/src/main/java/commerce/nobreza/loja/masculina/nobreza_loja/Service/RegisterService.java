package commerce.nobreza.loja.masculina.nobreza_loja.Service;
import commerce.nobreza.loja.masculina.nobreza_loja.DTO.RegisterUserDTO;
import commerce.nobreza.loja.masculina.nobreza_loja.DTO.ReturnRegisterDTO;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Role;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Usuario;
import commerce.nobreza.loja.masculina.nobreza_loja.Exception.EmailAlreadyExistException;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.RoleRepository;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
@Getter
@Setter
@AllArgsConstructor
public class RegisterService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private RoleRepository roleRepository;

    public ReturnRegisterDTO register(RegisterUserDTO dto) {

        Optional<Usuario> usuario = userRepository.findByEmail(dto.getEmail());

        if (usuario.isPresent()) {
            throw new EmailAlreadyExistException("Email já está cadastrado");
        }

        Usuario user = new Usuario();
        user.setNome(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setSenha(passwordEncoder.encode(dto.getPassword()));

        Role roleUser = roleRepository.findByName("ROLE_USER")
                        .orElseThrow(() -> new  RuntimeException("Role user não encontrada"));

        user.setRoles(Set.of(roleUser));

        userRepository.save(user);

        ReturnRegisterDTO responseDto = new ReturnRegisterDTO();
        responseDto.setName(user.getNome());
        responseDto.setEmail(user.getEmail());

        return responseDto;
    }

}