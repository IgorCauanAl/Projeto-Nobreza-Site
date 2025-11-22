package commerce.nobreza.loja.masculina.nobreza_loja.Service;
import commerce.nobreza.loja.masculina.nobreza_loja.DTO.NewPasswordDTO;
import commerce.nobreza.loja.masculina.nobreza_loja.DTO.RecoveryEmailDTO;
import commerce.nobreza.loja.masculina.nobreza_loja.DTO.CodeDTO;
import commerce.nobreza.loja.masculina.nobreza_loja.Exception.EmailNotFoundException;
import commerce.nobreza.loja.masculina.nobreza_loja.Exception.TokenExpiratedException;
import commerce.nobreza.loja.masculina.nobreza_loja.Exception.TokenInvalideException;
import org.apache.commons.codec.digest.DigestUtils;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.TokenSenha;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Usuario;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.TokenSenhaRepository;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PasswordRecoveryService {


    private final TokenSenhaRepository tokenSenhaRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;



    private String codeSafe() {
        SecureRandom random = new SecureRandom();
        int codigo = 100000 + random.nextInt(900000);
        return String.valueOf(codigo);
    }


    private String hashToken(String token) {
        return DigestUtils.sha256Hex(token); // converte em hash hexadecimal
    }


    public void enviarCodigo(RecoveryEmailDTO dto){
        TokenSenha tokenParaSalvar;

        String tokenGerado = codeSafe();
        String hashToken = hashToken(tokenGerado);


        Usuario u = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new EmailNotFoundException("Email informado não está cadastrado"));

        //Associar token ao usuario
        Optional<TokenSenha> tokenExistenteOpt = tokenSenhaRepository.findByUsuario(u);

        if(tokenExistenteOpt.isPresent()){
            tokenParaSalvar = tokenExistenteOpt.get();
            tokenParaSalvar.setCode(hashToken);
            tokenParaSalvar.setExpiration(LocalDateTime.now().plusMinutes(15));

        }else{
            tokenParaSalvar = new TokenSenha();
            tokenParaSalvar.setUsuario(u);
            tokenParaSalvar.setCode(hashToken);
            tokenParaSalvar.setExpiration(LocalDateTime.now().plusMinutes(15));
        }

        tokenSenhaRepository.save(tokenParaSalvar);

        try {
            emailService.enviarEmail(u.getEmail(), "Site Nobreza E-commerce",
                    "Seu código de senha é " + tokenGerado + ". Ele expira em 15 minutos.");
        } catch (Exception e) {
            throw new RuntimeException("Falha ao enviar e-mail: " + e.getMessage(), e);
        }


    }

    public void checkCode (CodeDTO dto){
        Usuario user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new EmailNotFoundException("Email não encontrado"));

        TokenSenha token = tokenSenhaRepository.findByUsuario(user)
                .orElseThrow(() -> new TokenInvalideException("Nenhum código gerado para esse usuário"));


        if (!token.getCode().equals(hashToken(dto.getCode())))
            throw new TokenInvalideException("Código inválido");

        if (token.getExpiration().isBefore(LocalDateTime.now()))
            throw new TokenExpiratedException("Código expirado");
    }

    public void changePassword(NewPasswordDTO dto) {
        String hashedCode = hashToken(dto.getCode());
        TokenSenha t = tokenSenhaRepository.findByCode(hashedCode)
                .orElseThrow(() -> new TokenInvalideException("Código inválido"));

        if (t.getExpiration().isBefore(LocalDateTime.now())) {
            throw new TokenExpiratedException("Código expirado");
        }

        Usuario usuario = t.getUsuario();
        usuario.setSenha(passwordEncoder.encode(dto.getNewPassword()));
        userRepository.save(usuario);
        tokenSenhaRepository.delete(t);
    }


}