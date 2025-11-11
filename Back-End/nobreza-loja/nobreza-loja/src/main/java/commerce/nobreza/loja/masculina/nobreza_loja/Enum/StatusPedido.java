package commerce.nobreza.loja.masculina.nobreza_loja.Enum;

public enum StatusPedido {
    PENDENTE("Pendente"),
    PROCESSANDO("Processando"),
    PAGO("Pago"),
    ENTREGUE("Entregue"),
    CANCELADO("Cancelado");

    private final String displayValue;

    StatusPedido(String displayValue) {
        this.displayValue = displayValue;
    }

    public String getDisplayValue() {
        return displayValue;
    }
}
