document.addEventListener("DOMContentLoaded", function () {

    const stepIdentificacao = document.getElementById("identificacao");
    const stepEndereco = document.getElementById("endereco");
    const stepPagamento = document.getElementById("pagamento");

    const btnParaEndereco = document.querySelector("#identificacao .btn-next-step");
    const btnParaPagamento = document.querySelector("#endereco .btn-next-step");

    const checkoutForm = document.querySelector('.checkout-form');

    const pixModalOverlay = document.getElementById('pix-modal-overlay');
    const pixLoadingState = document.getElementById('pix-loading-state');
    const pixPaymentState = document.getElementById('pix-payment-state');
    const pixModalClose = document.getElementById('pix-modal-close');
    const pixQrCodeImage = document.getElementById('pix-qr-code-image');
    const pixCopiaColaText = document.getElementById('pix-copia-cola-text');
    const pixCopiaColaBtn = document.getElementById('pix-copia-cola-btn');

    let pollInterval;

    function validateContainer(container) {
        const inputs = container.querySelectorAll("input[required], select[required], textarea[required]");
        for (let input of inputs) {
            if (!input.checkValidity()) {
                input.reportValidity();
                return false;
            }
        }
        return true;
    }

    function goToStep(targetStep) {
        document.querySelectorAll(".checkout-step").forEach((step) => {
            step.classList.remove("active");
        });
        if (targetStep) {
            targetStep.classList.add("active");
            targetStep.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    if (btnParaEndereco) {
        btnParaEndereco.addEventListener("click", () => {
            const formPF = document.getElementById("form-pf");
            const containerParaValidar = formPF.classList.contains("active")
                ? formPF
                : document.getElementById("form-pj");

            if (validateContainer(containerParaValidar)) {
                goToStep(stepEndereco);
            }
        });
    }

    if (btnParaPagamento) {
        btnParaPagamento.addEventListener("click", () => {
            const containerEndereco = document.querySelector("#endereco .step-form");
            if (validateContainer(containerEndereco)) {
                goToStep(stepPagamento);
            }
        });
    }

    const customerTypeTabs = document.querySelectorAll(".customer-type-tabs .tab-btn");
    const customerForms = document.querySelectorAll(".customer-form");

    customerTypeTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            customerTypeTabs.forEach((item) => item.classList.remove("active"));
            customerForms.forEach((form) => form.classList.remove("active"));

            tab.classList.add("active");
            document.getElementById(tab.getAttribute("data-form")).classList.add("active");
        });
    });

    const paymentTabs = document.querySelectorAll(".payment-method-tab");
    const paymentPanels = document.querySelectorAll(".payment-panel");

    paymentTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            paymentTabs.forEach((item) => item.classList.remove("active"));
            tab.classList.add("active");

            const targetId = tab.querySelector('input[type="radio"]').value;
            paymentPanels.forEach((panel) => panel.classList.remove("active"));
            document.getElementById(targetId + "-content").classList.add("active");
        });
    });

    checkoutForm.addEventListener('submit', handleCheckoutSubmit);

    async function handleCheckoutSubmit(event) {
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

        if (paymentMethod !== 'pix') return;

        event.preventDefault();
        openPixModal();

        try {
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

            if (!response.ok) throw new Error('Falha ao gerar o pedido.');

            const pixData = await response.json();
            showPixPaymentData(pixData);

        } catch (error) {
            console.error(error);
            alert('Erro ao processar. Tente novamente.');
            closePixModal();
        }
    }

    function openPixModal() {
        pixModalOverlay.classList.remove('pix-modal-hidden');
        pixLoadingState.classList.remove('pix-modal-hidden');
        pixPaymentState.classList.add('pix-modal-hidden');
    }

    function closePixModal() {
        pixModalOverlay.classList.add('pix-modal-hidden');
        if (pollInterval) clearInterval(pollInterval);
    }

    function showPixPaymentData(data) {
        pixLoadingState.classList.add('pix-modal-hidden');
        pixPaymentState.classList.remove('pix-modal-hidden');

        pixQrCodeImage.src = `data:image/png;base64,${data.qrCodeBase64}`;
        pixCopiaColaText.value = data.copiaECola;

        if (pollInterval) clearInterval(pollInterval);
        pollInterval = setInterval(async () => {
            try {
                const statusResponse = await fetch(`/pedido/confirmado/${data.orderId}`);
                const statusData = await statusResponse.json();
                if (statusData.status === 'PAGO') {
                    clearInterval(pollInterval);
                    window.location.href = `/pedidos/sucesso/${data.orderId}`;
                }
            } catch (err) {
                console.error("Erro verificando pagamento:", err);
            }
        }, 5000);
    }

    pixModalClose.addEventListener('click', closePixModal);

    pixCopiaColaBtn.addEventListener('click', () => {
        pixCopiaColaText.select();
        document.execCommand('copy');
        alert('Código Pix copiado!');
    });
});

const selectEndereco = document.getElementById('endereco-selecionado');

if (selectEndereco) {
    selectEndereco.addEventListener('change', function() {

        const selectedOption = this.options[this.selectedIndex];

        if (this.value === "") {
            limparCamposEndereco();
        } else {
            document.getElementById('cep').value = selectedOption.dataset.cep || "";
            document.getElementById('rua').value = selectedOption.dataset.rua || "";
            document.getElementById('numero').value = selectedOption.dataset.numero || "";
            document.getElementById('complemento').value = selectedOption.dataset.complemento || "";
            document.getElementById('bairro').value = selectedOption.dataset.bairro || "";
            document.getElementById('cidade').value = selectedOption.dataset.cidade || "";
            document.getElementById('estado').value = selectedOption.dataset.estado || "";
        }
    });
}

function limparCamposEndereco() {
    document.getElementById('cep').value = "";
    document.getElementById('rua').value = "";
    document.getElementById('numero').value = "";
    document.getElementById('complemento').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('estado').value = "";
}