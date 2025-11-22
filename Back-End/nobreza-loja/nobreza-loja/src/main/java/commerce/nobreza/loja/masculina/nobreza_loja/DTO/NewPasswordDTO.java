package commerce.nobreza.loja.masculina.nobreza_loja.DTO;

import lombok.Data;

@Data
public class NewPasswordDTO {
    private String email;
    private String newPassword;
    private String code;
}
