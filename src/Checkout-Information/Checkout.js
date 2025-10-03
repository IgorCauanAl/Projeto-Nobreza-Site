document.addEventListener("DOMContentLoaded", function () {
  // Seleciona os formulários de cada etapa
  const formIdentificacao = document.getElementById("form-identificacao");
  const formEndereco = document.getElementById("form-endereco");

  // Seleciona as seções de cada etapa
  const stepIdentificacao = document.getElementById("identificacao");
  const stepEndereco = document.getElementById("endereco");
  const stepPagamento = document.getElementById("pagamento");

  // Função para navegar para uma etapa específica
  function goToStep(targetStep) {
    // Esconde todas as etapas
    document.querySelectorAll(".checkout-step").forEach((step) => {
      step.classList.remove("active");
    });

    // Mostra a etapa alvo
    if (targetStep) {
      targetStep.classList.add("active");
      targetStep.scrollIntoView({ behavior: "smooth", block: "start" }); // Rola suavemente para o topo da nova etapa
    }
  }

  // Evento para o formulário de IDENTIFICAÇÃO
  if (formIdentificacao) {
    formIdentificacao.addEventListener("submit", function (event) {
      event.preventDefault(); // Impede o envio real do formulário
      // Lógica de validação aqui...

      // Avança para a próxima etapa
      goToStep(stepEndereco);
    });
  }

  // Evento para o formulário de ENDEREÇO
  if (formEndereco) {
    formEndereco.addEventListener("submit", function (event) {
      event.preventDefault(); // Impede o envio real do formulário
      // Lógica de validação aqui...

      // Avança para a próxima etapa
      goToStep(stepPagamento);
    });
  }
});

// Adicione este código dentro do seu evento 'DOMContentLoaded'

document.addEventListener("DOMContentLoaded", function () {
  // (Código anterior para as etapas do checkout...)
  const formIdentificacao = document.getElementById("form-identificacao");
  const formEndereco = document.getElementById("form-endereco");
  const stepIdentificacao = document.getElementById("identificacao");
  const stepEndereco = document.getElementById("endereco");
  const stepPagamento = document.getElementById("pagamento");

  function goToStep(targetStep) {
    document.querySelectorAll(".checkout-step").forEach((step) => {
      step.classList.remove("active");
    });
    if (targetStep) {
      targetStep.classList.add("active");
      targetStep.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  if (formIdentificacao) {
    formIdentificacao.addEventListener("submit", function (event) {
      event.preventDefault();
      goToStep(stepEndereco);
    });
  }

  if (formEndereco) {
    formEndereco.addEventListener("submit", function (event) {
      event.preventDefault();
      goToStep(stepPagamento);
    });
  }

  // --- NOVO CÓDIGO PARA AS ABAS DE PAGAMENTO ---
  const paymentTabs = document.querySelectorAll(".payment-method-tab");
  const paymentPanels = document.querySelectorAll(".payment-panel");

  paymentTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove a classe 'active' de todas as abas
      paymentTabs.forEach((item) => item.classList.remove("active"));
      // Adiciona a classe 'active' apenas na aba clicada
      tab.classList.add("active");

      // Pega o valor do radio button dentro da aba clicada
      const targetId = tab.querySelector('input[type="radio"]').value;

      // Esconde todos os painéis de conteúdo
      paymentPanels.forEach((panel) => panel.classList.remove("active"));

      // Mostra o painel de conteúdo correspondente
      document.getElementById(targetId + "-content").classList.add("active");
    });
  });
});

// Adicione este código DENTRO do seu evento 'DOMContentLoaded'

document.addEventListener("DOMContentLoaded", function () {
  // (O código anterior para as etapas do checkout permanece aqui...)

  // --- NOVO CÓDIGO PARA AS ABAS PF/PJ ---
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
});
