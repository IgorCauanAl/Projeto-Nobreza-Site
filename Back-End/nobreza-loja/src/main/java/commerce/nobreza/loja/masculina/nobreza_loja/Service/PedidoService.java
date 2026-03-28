package commerce.nobreza.loja.masculina.nobreza_loja.Service;

import commerce.nobreza.loja.masculina.nobreza_loja.Entity.*;
import commerce.nobreza.loja.masculina.nobreza_loja.Enum.StatusPedido;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.*;
import commerce.nobreza.loja.masculina.nobreza_loja.DTO.CheckoutFormDto;
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
    private final ProductRepository productRepository;

    @Transactional
    public Pedido criarPedidoDoCarrinho(CheckoutFormDto form, String userEmail) {

        Usuario usuario = usuarioRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));


        Endereco enderecoEntrega;

        if (form.getEnderecoId() != null) {
            enderecoEntrega = enderecoRepository.findById(form.getEnderecoId())
                    .orElseThrow(() -> new RuntimeException("Endereço salvo não encontrado"));
            if (!enderecoEntrega.getUsuario().getId().equals(usuario.getId())) {
                throw new SecurityException("Acesso negado ao endereço");
            }
        } else {

            enderecoEntrega = new Endereco();
            enderecoEntrega.setUsuario(usuario);
            enderecoEntrega.setCep(form.getCep());
            enderecoEntrega.setRua(form.getRua());
            enderecoEntrega.setNumero(form.getNumero());
            enderecoEntrega.setComplemento(form.getComplemento());
            enderecoEntrega.setBairro(form.getBairro());
            enderecoEntrega.setCidade(form.getCidade());
            enderecoEntrega.setEstado(form.getEstado());

            enderecoEntrega = enderecoRepository.save(enderecoEntrega);
        }




        if (StringUtils.hasText(form.getNomeCompleto()) && !form.getNomeCompleto().equals(usuario.getNome())) {
            usuario.setNome(form.getNomeCompleto());
        }


        Pedido pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setEnderecoEntrega(enderecoEntrega);
        pedido.setDataPedido(LocalDateTime.now());
        pedido.setStatus(StatusPedido.PENDENTE);
        pedido.setNumeroTelefone(form.getNumeroCelular());


        List<CarrinhoItens> itensCarrinho = carrinhoItensRepository.findByUsuario(usuario);
        if (itensCarrinho.isEmpty()) {
            throw new RuntimeException("Seu carrinho está vazio.");
        }

        Set<ItemPedido> itensDePedido = new HashSet<>();
        BigDecimal valorTotal = BigDecimal.ZERO;

        for (CarrinhoItens cartItem : itensCarrinho) {
            Produto produto = cartItem.getProduto();

            int quantidadeComprada = cartItem.getQuantidade();


            if (produto.getAmount() < quantidadeComprada) {

                throw new RuntimeException("Estoque insuficiente para o produto: " + produto.getName());
            }

            produto.setAmount(produto.getAmount() - quantidadeComprada);

            productRepository.save(produto);

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


        pedido.setStatus(StatusPedido.PAGO);

        Pedido pedidoSalvo = pedidoRepository.save(pedido);
        carrinhoItensRepository.deleteAll(itensCarrinho);

        return pedidoSalvo;
    }
}