package commerce.nobreza.loja.masculina.nobreza_loja.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckoutFormDto {


    private String nomeCompleto;
    private String email;
    private String dataNascimento;
    private String cpf;
    private String numeroCelular;


    private String razaoSocial;
    private String cnpj;


    private Long enderecoId;

    private String cep;
    private String rua;
    private String numero;
    private String complemento;
    private String bairro;
    private String cidade;
    private String estado;


    private String paymentMethod;


}