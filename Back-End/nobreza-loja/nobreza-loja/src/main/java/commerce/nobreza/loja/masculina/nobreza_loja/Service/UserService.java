package commerce.nobreza.loja.masculina.nobreza_loja.Service;

import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Endereco;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Usuario;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.EnderecoRepository;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EnderecoRepository enderecoRepository;

    @Transactional
    public void changeName(String email, String newUsername) {
        Usuario usuario = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));


        usuario.setNome(newUsername);
        userRepository.save(usuario);
    }

    @Transactional
    public void changePassword(String username, String senhaAtual, String novaSenha, String confirmaSenha) {
        Usuario user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!novaSenha.equals(confirmaSenha)) {
            throw new IllegalArgumentException("As novas senhas não coincidem.");
        }

        if (!passwordEncoder.matches(senhaAtual, user.getSenha())) {

            throw new IllegalArgumentException("A senha atual está incorreta.");
        }

        user.setSenha(passwordEncoder.encode(novaSenha));
        userRepository.save(user);
    }

    @Transactional
    public void saveAddress(Endereco endereco, String emailUsuario){

        Usuario user = userRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        endereco.setUsuario(user);

        enderecoRepository.save(endereco);
    }

}
