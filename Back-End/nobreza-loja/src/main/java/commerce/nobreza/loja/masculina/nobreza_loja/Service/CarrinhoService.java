package commerce.nobreza.loja.masculina.nobreza_loja.Service;

import commerce.nobreza.loja.masculina.nobreza_loja.DTO.CarrinhoItensDTO;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.CarrinhoItens;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Produto;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Usuario;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.CarrinhoItensRepository;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.ProductRepository;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CarrinhoService {

    private final CarrinhoItensRepository carrinhoItensRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    @Transactional
    public void adicionarItem(Long produtoId, int quantidade, String emailUsuario) {

        Usuario usuario = userRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Produto produto = productRepository.findById(produtoId)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));


        Optional<CarrinhoItens> itemExistenteOpt = carrinhoItensRepository
                .findByUsuarioAndProduto(usuario, produto);

        if (itemExistenteOpt.isPresent()) {

            CarrinhoItens itemExistente = itemExistenteOpt.get();
            itemExistente.setQuantidade(itemExistente.getQuantidade() + quantidade);
            carrinhoItensRepository.save(itemExistente);
        } else {

            CarrinhoItens novoItem = new CarrinhoItens();
            novoItem.setUsuario(usuario);
            novoItem.setProduto(produto);
            novoItem.setQuantidade(quantidade);
            novoItem.setAdicionadoEm(LocalDateTime.now());
            carrinhoItensRepository.save(novoItem);
        }
    }

    @Transactional(readOnly = true)
    public List<CarrinhoItensDTO> getItensDoUsuario(String emailUsuario) {
        Usuario usuario = userRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return carrinhoItensRepository.findByUsuario(usuario)
                .stream()
                .map(CarrinhoItensDTO::new)
                .collect(Collectors.toList());
    }


    @Transactional
    public void removerItem(Long itemId, String emailUsuario) {

        Usuario usuario = userRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        CarrinhoItens item = carrinhoItensRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item do carrinho não encontrado"));


        if (!item.getUsuario().getId().equals(usuario.getId())) {

            throw new SecurityException("Acesso negado: Este item não pertence a você.");
        }


        carrinhoItensRepository.delete(item);
    }

}