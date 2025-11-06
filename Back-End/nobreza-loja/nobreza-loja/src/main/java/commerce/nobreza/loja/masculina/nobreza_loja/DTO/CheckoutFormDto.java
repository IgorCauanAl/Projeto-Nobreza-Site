package commerce.nobreza.loja.masculina.nobreza_loja.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckoutFormDto {

    // --- Seção 1: Identificação (PF) ---
    private String nomeCompleto;
    private String email;
    private String dataNascimento;
    private String cpf;
    private String celularPf;

    // --- Seção 1: Identificação (PJ) ---
    private String razaoSocial;
    private String cnpj;
    // (etc. para PJ)

    // --- Seção 2: Endereço ---
    // ID do endereço salvo (se selecionado)
    private Long enderecoId;

    // Campos para um NOVO endereço
    private String cep;
    private String rua;
    private String numero;
    private String complemento;
    private String bairro;
    private String cidade;
    private String estado;

    // --- Seção 3: Pagamento ---
    // Radio button: "credit-card", "pix", "boleto"
    private String paymentMethod;

    // ID do cartão salvo (se selecionado)
    private Long metodoPagamentoId;

    // Campos para um NOVO cartão
    private String novoCartaoNumero;
    private String novoCartaoNome;
    private String novoCartaoValidade;
    private String novoCartaoCVV;
    private String parcelamento; // Ex: "1", "2", etc.
}