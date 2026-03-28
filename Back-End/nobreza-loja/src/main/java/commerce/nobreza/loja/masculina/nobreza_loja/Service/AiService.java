package commerce.nobreza.loja.masculina.nobreza_loja.Service;

import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Pedido;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Produto;
import commerce.nobreza.loja.masculina.nobreza_loja.Entity.Usuario;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.PedidoRepository;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.ProductRepository;
import commerce.nobreza.loja.masculina.nobreza_loja.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AiService {

    private final ChatClient.Builder chatClientBuilder;
    private final ProductRepository productRepository;
    private final ChatMemory chatMemory;
    private final UserRepository userRepository;
    private final PedidoRepository pedidoRepository;

    public String getProductRecommendation(String userQuery, String chatId, String userEmail) {
        if (userQuery == null || userQuery.trim().isEmpty()) {
            return "Por favor, faça uma pergunta sobre nossos produtos.";
        }

        try {
            List<Produto> allProducts = productRepository.findAll();

            if (allProducts.isEmpty()) {
                return "Desculpe, nosso catálogo de produtos está vazio no momento.";
            }

            // Formatação dos produtos para o contexto da IA
            String productsContext = allProducts.stream()
                    .map(p -> String.format("- %s (R$ %.2f): %s [Categoria: %s]",
                            p.getName(),
                            p.getPrice(),
                            p.getDescription(),
                            p.getCategory() != null ? p.getCategory().getName() : "Geral"))
                    .collect(Collectors.joining("\n"));

            String purchaseHistoryContext = "";
            if (userEmail != null && !userEmail.isEmpty()) {
                Optional<Usuario> userOpt = userRepository.findByEmail(userEmail);
                if (userOpt.isPresent()) {
                    List<Pedido> pedidos = pedidoRepository.findByUsuario(userOpt.get());
                    if (!pedidos.isEmpty()) {
                        String history = pedidos.stream()
                                .flatMap(p -> p.getItens().stream())
                                .map(item -> item.getProduto().getName())
                                .distinct()
                                .collect(Collectors.joining(", "));
                        purchaseHistoryContext = "HISTÓRICO DE COMPRAS DO USUÁRIO: O usuário já comprou anteriormente: " + history + ". Use essa informação para personalizar as recomendações, se relevante.";
                    }
                }
            }

            String systemText = """
                    Você é um assistente virtual da loja 'Nobreza'.
                    
                    Sua tarefa é recomendar produtos baseando-se EXCLUSIVAMENTE na lista de produtos abaixo.
                    
                    LISTA DE PRODUTOS DISPONÍVEIS NO BANCO DE DADOS:
                    {productsContext}
                    
                    {purchaseHistoryContext}
                    
                    REGRAS RÍGIDAS:
                    1. Analise a pergunta do usuário e procure na lista acima por produtos relevantes.
                    2. Se encontrar produtos que atendam ao pedido, recomende-os citando o nome, o preço e a descrição.
                    3. Se o usuário pedir algo que NÃO existe na lista acima (ex: pediu 'tênis' e não tem tênis na lista), você DEVE responder: "A loja não tem algo do tipo."
                    4. NÃO invente produtos. NÃO recomende nada que não esteja na lista "LISTA DE PRODUTOS DISPONÍVEIS".
                    5. Ignore qualquer conhecimento prévio sobre moda que não esteja refletido na lista de produtos. Se não está na lista, não existe na loja.
                    6. Se houver histórico de compras, use-o para sugerir produtos complementares ou do mesmo estilo, mas APENAS se estiverem na lista de produtos disponíveis.
                    """;

            ChatClient chatClient = chatClientBuilder
                    .defaultAdvisors(new MessageChatMemoryAdvisor(chatMemory))
                    .build();

            String finalPurchaseHistoryContext = purchaseHistoryContext;
            return chatClient.prompt()
                    .system(s -> s.text(systemText)
                            .param("productsContext", productsContext) //Enviando para a Ollama
                            .param("purchaseHistoryContext", finalPurchaseHistoryContext))
                    .user(userQuery)
                    .advisors(a -> a.param(MessageChatMemoryAdvisor.CHAT_MEMORY_CONVERSATION_ID_KEY, chatId))
                    .call()
                    .content();

        } catch (Exception e) {
            log.error("Erro ao processar recomendação da IA: {}", e.getMessage());
            return "Desculpe, estou com dificuldades técnicas no momento. Tente novamente mais tarde.";
        }
    }
}
