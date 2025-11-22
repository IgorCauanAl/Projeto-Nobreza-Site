package commerce.nobreza.loja.masculina.nobreza_loja.Service;
import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmailService {


    private final JavaMailSender javaMailSender;

    public void enviarEmail(String destinatario, String assunto, String corpo){

         SimpleMailMessage mensagem = new SimpleMailMessage();

         mensagem.setTo(destinatario);
         mensagem.setSubject(assunto);
         mensagem.setText(corpo);
         mensagem.setFrom("NobrezaADM@teste.com");

         javaMailSender.send(mensagem);
    }
}
