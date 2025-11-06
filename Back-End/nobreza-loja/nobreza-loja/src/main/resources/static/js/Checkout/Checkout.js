document.addEventListener("DOMContentLoaded", function () {

    // --- 1. LÓGICA DE NAVEGAÇÃO DAS ETAPAS (CORRIGIDA) ---

    // Seleciona as SEÇÕES de cada etapa
    const stepIdentificacao = document.getElementById("identificacao");
    const stepEndereco = document.getElementById("endereco");
    const stepPagamento = document.getElementById("pagamento");

    // Seleciona os BOTÕES que disparam a navegação
    const btnParaEndereco = document.querySelector("#identificacao .btn-next-step");
    const btnParaPagamento = document.querySelector("#endereco .btn-next-step");

    // Função para navegar para uma etapa específica
    function goToStep(targetStep) {
        // Esconde todas as etapas
        document.querySelectorAll(".checkout-step").forEach((step) => {
            step.classList.remove("active");
        });

        // Mostra a etapa alvo
        if (targetStep) {
            targetStep.classList.add("active");
            // Rola suavemente para o topo da nova etapa
            targetStep.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    // CORREÇÃO: Usamos 'click' nos botões 'type="button"'
    if (btnParaEndereco) {
        btnParaEndereco.addEventListener("click", () => {
            // (Futuramente, adicione sua validação de formulário aqui)
            goToStep(stepEndereco);
        });
    }

    // CORREÇÃO: Usamos 'click' nos botões 'type="button"'
    if (btnParaPagamento) {
        btnParaPagamento.addEventListener("click", () => {
            // (Futuramente, adicione sua validação de formulário aqui)
            goToStep(stepPagamento);
        });
    }

    // --- 2. LÓGICA DAS ABAS PF/PJ (Pessoa Física / Jurídica) ---
    const customerTypeTabs = document.querySelectorAll(
        ".customer-type-tabs .tab-btn"
    );
    const customerForms = document.querySelectorAll(".customer-form");

    customerTypeTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            // Remove a classe 'active' de todas as abas e formulários
            customerTypeTabs.forEach((item) => item.classList.remove("active"));
            customerForms.forEach((form) => form.classList.remove("active"));

            // Adiciona a classe 'active' na aba clicada
            tab.classList.add("active");

            // Pega o ID do formulário alvo do atributo 'data-form'
            const targetFormId = tab.getAttribute("data-form");

            // Mostra o formulário correspondente
            document.getElementById(targetFormId).classList.add("active");
        });
    });

    // --- 3. LÓGICA DAS ABAS DE PAGAMENTO (Cartão, Pix, Boleto) ---
    const paymentTabs = document.querySelectorAll(".payment-method-tab");
    const paymentPanels = document.querySelectorAll(".payment-panel");

    paymentTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            // Remove a classe 'active' de todas as abas
            paymentTabs.forEach((item) => item.classList.remove("active"));
            // Adiciona a classe 'active' apenas na aba clicada
            tab.classList.add("active");

            // Pega o valor do radio button dentro da aba clicada (ex: "credit-card")
            const targetId = tab.querySelector('input[type="radio"]').value;

            // Esconde todos os painéis de conteúdo
            paymentPanels.forEach((panel) => panel.classList.remove("active"));

            // Mostra o painel de conteúdo correspondente (ex: "credit-card-content")
            document.getElementById(targetId + "-content").classList.add("active");
        });
    });

}); // Fim do DOMContentLoaded