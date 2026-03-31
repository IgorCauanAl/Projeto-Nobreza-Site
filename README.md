# Nobreza Ternos - E-commerce de Moda Masculina

Este é um projeto de e-commerce focado na venda de ternos e artigos de moda masculina, desenvolvido como uma aplicação web completa, utilizando Java com Spring Boot no back-end.

## Sobre o Projeto

A plataforma "Nobreza Ternos" oferece uma experiência de compra online, permitindo que os usuários naveguem pelo catálogo de produtos, visualizem detalhes, adicionem itens ao carrinho e finalizem a compra. O sistema conta com funcionalidades de cadastro de clientes, autenticação e gerenciamento de produtos.

## Recurso de Inteligência Artificial: Assistente de Estilo

Para aprimorar a experiência do usuário, o projeto incorpora um **Assistente de Estilo** baseado em Inteligência Artificial, que oferece recomendações e sugestões de moda personalizadas.

### Como a IA é Aplicada?

O recurso de IA foi implementado utilizando o **Spring AI** integrado ao **Ollama**, um serviço que permite executar modelos de linguagem grandes (LLMs) localmente.

1.  **Interação com o Usuário:** O cliente pode fazer perguntas abertas ao assistente, como "Qual a melhor combinação de camisa e gravata para um terno azul?" ou "Que tipo de sapato devo usar em um casamento diurno?".
2.  **Processamento da Pergunta:** O back-end da aplicação recebe a pergunta do usuário e a envia para o modelo de linguagem que está sendo executado pelo Ollama.
3.  **Geração da Resposta:** O modelo de IA processa a pergunta em seu contexto de moda e gera uma resposta em linguagem natural, oferecendo conselhos, sugestões de produtos do catálogo e dicas de estilo.
4.  **Exibição para o Usuário:** A resposta gerada pela IA é então exibida na interface do site, proporcionando ao cliente um atendimento personalizado e interativo, como se estivesse conversando com um estilista virtual.


---

### Como Executar o Projeto com Docker

Para facilitar a execução e a avaliação do projeto, todo o ambiente foi containerizado com Docker.

**Pré-requisitos:**
*   [Docker Desktop](https://www.docker.com/products/docker-desktop) instalado.

**Passos:**

1.  **Clone o repositório:**
    ```sh
    git clone <URL_DO_SEU_REPOSITORIO>
    cd <NOME_DO_PROJETO>
    ```

2.  **Suba os contêineres:**
    Execute o comando a seguir na raiz do projeto. Ele irá construir a imagem da aplicação e iniciar todos os serviços (aplicação, banco de dados e IA).
    ```sh
    docker-compose up --build
    ```

3.  **Acesse a aplicação:**
    Após a conclusão do processo, a aplicação estará disponível em [http://localhost:8080](http://localhost:8080).

4.  **Para parar o ambiente:**
    Pressione `Ctrl + C` no terminal e execute o comando abaixo para desligar e remover os contêineres.
    ```sh
    docker-compose down
    ```
