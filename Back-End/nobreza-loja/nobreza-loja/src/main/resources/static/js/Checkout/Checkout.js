document.addEventListener("DOMContentLoaded", function () {

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

});

// Em Checkout.js

document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.querySelector('.checkout-form');
    const pixModalOverlay = document.getElementById('pix-modal-overlay');
    const pixLoadingState = document.getElementById('pix-loading-state');
    const pixPaymentState = document.getElementById('pix-payment-state');
    const pixModalClose = document.getElementById('pix-modal-close');
    const pixQrCodeImage = document.getElementById('pix-qr-code-image');
    const pixCopiaColaText = document.getElementById('pix-copia-cola-text');
    const pixCopiaColaBtn = document.getElementById('pix-copia-cola-btn');

    let pollInterval; // Variável para guardar o "timer" de verificação

    // 1. OUVIR O ENVIO DO FORMULÁRIO
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);

    // 2. FECHAR O MODAL (SE O USUÁRIO DESISTIR)
    pixModalClose.addEventListener('click', () => {
        pixModalOverlay.classList.add('pix-modal-hidden');
        // Para o "timer" de verificação
        if (pollInterval) {
            clearInterval(pollInterval);
        }
    });

    pixCopiaColaBtn.addEventListener('click', () => {
        pixCopiaColaText.select();
        document.execCommand('copy');
        alert('Código Pix copiado!');
    });

    // FUNÇÃO PRINCIPAL QUE CONTROLA O FLUXO
    async function handleCheckoutSubmit(event) {
        // Verifica qual método de pagamento está selecionado
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

        // SE NÃO FOR PIX, DEIXA O FORMULÁRIO SER ENVIADO NORMALMENTE
        if (paymentMethod !== 'pix') {
            return; // Continua o envio normal (para Cartão e Boleto)
        }

        // --- FLUXO DO PIX COMEÇA AQUI ---

        // 1. IMPEDE O ENVIO NORMAL DO FORMULÁRIO
        event.preventDefault();

        // 2. MOSTRA O MODAL NO ESTADO "CARREGANDO"
        pixModalOverlay.classList.remove('pix-modal-hidden');
        pixLoadingState.classList.remove('pix-modal-hidden');
        pixPaymentState.classList.add('pix-modal-hidden');

        try {
            // 3. ENVIA OS DADOS DO FORMULÁRIO PARA O BACKEND (COMO JSON)
            const formData = new FormData(checkoutForm);
            const formDataObject = Object.fromEntries(formData.entries());

            const response = await fetch(checkoutForm.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formDataObject)
            });

            if (!response.ok) {
                throw new Error('Falha ao gerar o pedido.');
            }

            const pixData = await response.json();
            // O backend deve retornar: { orderId: 123, qrCode: "imagem_base64", copiaECola: "codigo..." }

            // 4. ATUALIZA O MODAL com o QR Code e Inicia a Verificação
            showPixPayment(pixData);

        } catch (error) {
            console.error(error);
            alert('Erro ao processar seu pedido. Tente novamente.');
            pixModalOverlay.classList.add('pix-modal-hidden');
        }
    }

    function showPixPayment(data) {
        // 1. Esconde o "Carregando" e mostra o "Pagamento"
        pixLoadingState.classList.add('pix-modal-hidden');
        pixPaymentState.classList.remove('pix-modal-hidden');

        // 2. Preenche os dados do Pix no modal
        pixQrCodeImage.src = `data:image/png;base64,${data.qrCodeBase64}`; // Supondo que o back envia Base64
        pixCopiaColaText.value = data.copiaECola;

        // A cada 5 segundos, pergunta ao backend se o pedido foi pago
        if (pollInterval) clearInterval(pollInterval);

        pollInterval = setInterval(async () => {
            console.log("Verificando status do pagamento...");
            try {
                const statusResponse = await fetch(`/pedido/confirmado/${data.orderId}`);
                const statusData = await statusResponse.json();
                
                if (statusData.status === 'PAGO') {
                    clearInterval(pollInterval); // Para a verificação
                    // 5. REDIRECIONA PARA A TELA DE SUCESSO!
                    window.location.href = `/pedidos/sucesso/${data.orderId}`;
                }
            } catch (err) {
                console.error("Erro ao verificar status:", err);
            }
        }, 5000); // 5000ms = 5 segundos
    }
});