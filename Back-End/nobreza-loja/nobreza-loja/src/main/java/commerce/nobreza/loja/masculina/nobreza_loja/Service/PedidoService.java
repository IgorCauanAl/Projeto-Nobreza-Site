package commerce.nobreza.loja.masculina.nobreza_loja.Service;

import commerce.nobreza.loja.masculina.nobreza_loja.Entity.*;
import commerce.nobreza.loja.masculina.nobreza_loja.Enum.StatusPedido;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.*;
import commerce.nobreza.loja.masculina.nobreza_loja.dto.CheckoutFormDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final CarrinhoItensRepository carrinhoItensRepository;
    private final UserRepository usuarioRepository;
    private final EnderecoRepository enderecoRepository;
    private final MetodoPagamentoRepository metodoPagamentoRepository;

    @Transactional
    public Pedido criarPedidoDoCarrinho(CheckoutFormDto form, String userEmail) {

        Usuario usuario = usuarioRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // --- 1. Lógica do Endereço ---
        // O usuário selecionou um endereço salvo OU preencheu um novo?
        Endereco enderecoEntrega;

        if (form.getEnderecoId() != null) {
            // Usar endereço salvo
            enderecoEntrega = enderecoRepository.findById(form.getEnderecoId())
                    .orElseThrow(() -> new RuntimeException("Endereço salvo não encontrado"));
            // Validação de segurança
            if (!enderecoEntrega.getUsuario().getId().equals(usuario.getId())) {
                throw new SecurityException("Acesso negado ao endereço");
            }
        } else {
            // Criar e salvar um novo endereço
            enderecoEntrega = new Endereco();
            enderecoEntrega.setUsuario(usuario);
            enderecoEntrega.setCep(form.getCep());
            enderecoEntrega.setRua(form.getRua());
            enderecoEntrega.setNumero(form.getNumero());
            enderecoEntrega.setComplemento(form.getComplemento());
            enderecoEntrega.setBairro(form.getBairro());
            enderecoEntrega.setCidade(form.getCidade());
            enderecoEntrega.setEstado(form.getEstado());
            // (Você pode adicionar um 'isPrincipal' ou 'nome' ao Endereco)
            enderecoEntrega = enderecoRepository.save(enderecoEntrega);
        }

        MetodoPagamento metodoUsado;

        if ("credit-card".equals(form.getPaymentMethod())) {
            if (form.getMetodoPagamentoId() != null) {
                // Usar cartão salvo
                metodoUsado = metodoPagamentoRepository.findById(form.getMetodoPagamentoId())
                        .orElseThrow(() -> new RuntimeException("Cartão salvo não encontrado"));
                if (!metodoUsado.getUsuario().getId().equals(usuario.getId())) {
                    throw new SecurityException("Acesso negado ao cartão");
                }
            } else {
                // Salvar o novo cartão (Simplificado - NÃO armazene o número completo!)
                // Um gateway de pagamento real retornaria um 'token'
                metodoUsado = new MetodoPagamento();
                metodoUsado.setUsuario(usuario);
                metodoUsado.setBandeiraCartao("VISA"); // Simulação
                String num = form.getNovoCartaoNumero();
                metodoUsado.setUltimosQuatroDigitos(num.substring(num.length() - 4));
                metodoUsado.setTokenCartao("TOKEN_SIMULADO_" + num.substring(num.length() - 4));
                metodoUsado = metodoPagamentoRepository.save(metodoUsado);
            }
            // ... aqui você chamaria o gateway de pagamento com 'metodoUsado'
        }
        // ... Lógica para PIX ou Boleto ...


        // --- 3. Atualizar Informações do Usuário (Opcional) ---
        // (Opcional: Se o formulário de identificação for para atualizar o perfil)
        if (StringUtils.hasText(form.getNomeCompleto()) && !form.getNomeCompleto().equals(usuario.getNome())) {
            usuario.setNome(form.getNomeCompleto());
            // (Salve o 'usuario' se alterar)
        }

        // --- 4. Criar o Pedido ---
        Pedido pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setEnderecoEntrega(enderecoEntrega);
        pedido.setDataPedido(LocalDateTime.now());
        pedido.setStatus(StatusPedido.PENDENTE);

        // --- 5. Processar Itens e Calcular Total ---
        List<CarrinhoItens> itensCarrinho = carrinhoItensRepository.findByUsuario(usuario);
        if (itensCarrinho.isEmpty()) {
            throw new RuntimeException("Seu carrinho está vazio.");
        }

        Set<ItemPedido> itensDePedido = new HashSet<>();
        BigDecimal valorTotal = BigDecimal.ZERO;

        for (CarrinhoItens cartItem : itensCarrinho) {
            Produto produto = cartItem.getProduto();

            ItemPedido itemPedido = new ItemPedido();
            itemPedido.setPedido(pedido);
            itemPedido.setProduto(produto);
            itemPedido.setQuantidade(cartItem.getQuantidade());
            itemPedido.setPrecoNaCompra(produto.getPrice());

            itensDePedido.add(itemPedido);
            valorTotal = valorTotal.add(
                    produto.getPrice().multiply(new BigDecimal(cartItem.getQuantidade()))
            );
        }

        pedido.setItens(itensDePedido);
        pedido.setValorTotal(valorTotal);

        // --- 6. Simular Pagamento ---
        // (Após chamada real ao gateway)
        pedido.setStatus(StatusPedido.PAGO); // Simulação de pagamento aprovado

        // --- 7. Salvar e Limpar Carrinho ---
        Pedido pedidoSalvo = pedidoRepository.save(pedido);
        carrinhoItensRepository.deleteAll(itensCarrinho);

        return pedidoSalvo;
    }
}