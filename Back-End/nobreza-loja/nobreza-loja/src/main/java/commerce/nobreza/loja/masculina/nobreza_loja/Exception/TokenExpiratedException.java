package commerce.nobreza.loja.masculina.nobreza_loja.Exception;

public class TokenExpiratedException extends RuntimeException {
    public TokenExpiratedException(String message) {
        super(message);
    }
}
