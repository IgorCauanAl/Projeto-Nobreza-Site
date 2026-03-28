package commerce.nobreza.loja.masculina.nobreza_loja.Controller.Login;

import commerce.nobreza.loja.masculina.nobreza_loja.DTO.CarrinhoItensDTO;
import commerce.nobreza.loja.masculina.nobreza_loja.DTO.CheckoutFormDto;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Endereco;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.MetodoPagamento;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Pedido;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Usuario;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.EnderecoRepository;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.MetodoPagamentoRepository;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.PedidoRepository;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.UserRepository;
import commerce.nobreza.loja.masculina.nobreza_loja.Service.CarrinhoService;
import commerce.nobreza.loja.masculina.nobreza_loja.Service.PedidoService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.math.BigDecimal;
import java.util.List;

@Controller
@AllArgsConstructor
public class CheckoutController {

    private final CarrinhoService carrinhoService;
    private final PedidoService pedidoService;
    private final PedidoRepository pedidoRepository;
    private final UserRepository usuarioRepository;
    private final EnderecoRepository enderecoRepository;
    private final MetodoPagamentoRepository metodoPagamentoRepository;

    @GetMapping("/checkout")
    public String showCheckoutPage(
            @AuthenticationPrincipal UserDetails userDetails,
            Model model
    ) {
        if (userDetails == null) {
            return "redirect:/login";
        }

        Usuario usuario = usuarioRepository.findByEmail(userDetails.getUsername()).get();


        List<CarrinhoItensDTO> itemsParaCheckout = carrinhoService.getItensDoUsuario(userDetails.getUsername());
        BigDecimal precoTotal = itemsParaCheckout.stream()
                .map(item -> item.getPrecoProduto().multiply(new BigDecimal(item.getQuantidade())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);


        List<Endereco> enderecos = enderecoRepository.findByUsuario(usuario);
        List<MetodoPagamento> metodosPagamento = metodoPagamentoRepository.findByUsuario(usuario);

        model.addAttribute("checkoutItems", itemsParaCheckout);
        model.addAttribute("totalPrice", precoTotal);
        model.addAttribute("enderecos", enderecos);
        model.addAttribute("metodosPagamento", metodosPagamento);
        model.addAttribute("checkoutFormDto", new CheckoutFormDto());

        return "Checkout";
    }

    @PostMapping("/checkout/processar")
    public String processarCheckout(
            @ModelAttribute CheckoutFormDto form,
            @AuthenticationPrincipal UserDetails userDetails,
            RedirectAttributes redirectAttributes
    ) {
        if (userDetails == null) {
            return "redirect:/login";
        }

        try {
            Pedido novoPedido = pedidoService.criarPedidoDoCarrinho(form, userDetails.getUsername());

            return "redirect:/pedido/confirmado/" + novoPedido.getId();

        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", "Erro ao processar seu pedido: " + e.getMessage());
            return "redirect:/checkout";
        }
    }

    @GetMapping("/pedido/confirmado/{pedidoId}")
    public String showPaginaConfirmacao(
            @PathVariable Long pedidoId,
            @AuthenticationPrincipal UserDetails userDetails,
            Model model
    ) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));


        if (!pedido.getUsuario().getEmail().equals(userDetails.getUsername())) {
            return "redirect:/";
        }

        model.addAttribute("pedido", pedido);

        return "closing";
    }
}