// ==================== ELEMENTOS PRINCIPAIS ====================
const container = document.getElementById("retangulo-login");
const toggleLink = document.getElementById("toggle-link");
const toggleText = document.getElementById("toggle-text");
const recoveryFields = document.getElementById("recovery-fields");
const forgotLink = document.getElementById("forgot-password-link");
const message = document.getElementById("message");

// BOTÕES
const loginButton = document.getElementById("login-button");
const registerButton = document.getElementById("register-button");
const sendCodeButton = document.getElementById("send-code");
const verifyCodeButton = document.getElementById("verify-code");
const resetPasswordButton = document.getElementById("reset-password");

// CAMPOS LOGIN
const emailLogin = document.getElementById("email-login");
const passwordLogin = document.getElementById("password-login");

// CAMPOS CADASTRO
const username = document.getElementById("username");
const emailCadastro = document.getElementById("email-cadastro");
const passwordCadastro = document.getElementById("password-cadastro");
const confirmPassword = document.getElementById("confirm-password");
const aceitarEmails = document.getElementById("aceitar-emails");

// CAMPOS RECUPERAÇÃO
const recoverEmail = document.getElementById("recover-email");
const recoveryCode = document.getElementById("recovery-code");
const newPassword = document.getElementById("new-password");
const confirmNewPassword = document.getElementById("confirm-new-password");

// BOTÕES VOLTAR
const backButtons = document.querySelectorAll(".btn-back");

// ==================== FUNÇÕES ====================

// TROCA DE SEÇÃO
function showSection(section) {
  container.classList.remove("login-view", "register-view", "recovery-view");
  message.innerText = "";

  // Limpar campos
  emailLogin.value = "";
  passwordLogin.value = "";
  username.value = "";
  emailCadastro.value = "";
  passwordCadastro.value = "";
  confirmPassword.value = "";
  recoverEmail.value = "";
  recoveryCode.value = "";
  newPassword.value = "";
  confirmNewPassword.value = "";

  if (section === "login") {
    container.classList.add("login-view");
    recoveryFields.style.display = "none";
    document.getElementById("form-titulo").innerText = "Login";
  } else if (section === "register") {
    container.classList.add("register-view");
    recoveryFields.style.display = "none";
    document.getElementById("form-titulo").innerText = "Cadastro";
  } else if (section === "recovery") {
    container.classList.add("recovery-view");
    recoveryFields.style.display = "flex";
    document.getElementById("form-titulo").innerText = "Recuperar Senha";
    showRecoveryStep("email-step");
  }
}

// PASSOS DE RECUPERAÇÃO
function showRecoveryStep(stepId) {
  const steps = document.querySelectorAll(".recovery-step");
  steps.forEach((step) => step.classList.remove("current-step"));
  document.getElementById(stepId).classList.add("current-step");
}

// ==================== EVENTOS ====================

// TOGGLE LOGIN / CADASTRO
toggleLink.addEventListener("click", (e) => {
  e.preventDefault();
  if (container.classList.contains("login-view")) {
    showSection("register");
    toggleText.innerText = "Já tem uma conta?";
    toggleLink.innerText = "Clique aqui para entrar";
  } else {
    showSection("login");
    toggleText.innerText = "Não tem uma conta?";
    toggleLink.innerText = "Clique aqui para cadastrar";
  }
});

// ESQUECEU SENHA
forgotLink.addEventListener("click", (e) => {
  e.preventDefault();
  showSection("recovery");
});

// BOTÕES VOLTAR
backButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-target");
    if (target === "login") showSection("login");
    else showRecoveryStep(target);
  });
});

// ==================== LOGIN ====================
loginButton.addEventListener("click", async () => {
  if (!emailLogin.value || !passwordLogin.value) {
    message.innerText = "Preencha todos os campos obrigatórios.";
    return;
  }

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailLogin.value,
        password: passwordLogin.value,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      message.innerText = error.message || "Erro ao realizar login.";
      return;
    }

    const data = await response.json();
    message.innerText = "Login realizado com sucesso!";
    // window.location.href = "/dashboard"; // Redirecionar para dashboard
  } catch (err) {
    message.innerText = "Erro de conexão com o servidor.";
    console.error(err);
  }
});

// ==================== CADASTRO ====================
registerButton.addEventListener("click", async () => {
  if (
    !username.value ||
    !emailCadastro.value ||
    !passwordCadastro.value ||
    !confirmPassword.value
  ) {
    message.innerText = "Preencha todos os campos obrigatórios.";
    return;
  }

  if (passwordCadastro.value !== confirmPassword.value) {
    message.innerText = "Senhas não coincidem.";
    return;
  }

  try {
    const response = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
        email: emailCadastro.value,
        password: passwordCadastro.value,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      message.innerText = error.message || "Erro ao realizar cadastro.";
      return;
    }

    const data = await response.json();
    message.innerText = "Cadastro realizado com sucesso!";
    showSection("login");
  } catch (err) {
    message.innerText = "Erro de conexão com o servidor.";
    console.error(err);
  }
});

// ==================== RECUPERAÇÃO DE SENHA ====================
sendCodeButton.addEventListener("click", async () => {
  if (!recoverEmail.value) {
    message.innerText = "Digite seu email.";
    return;
  }

  try {
    const response = await fetch("/recovery/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: recoverEmail.value }),
    });

    if (!response.ok) {
      const error = await response.json();
      message.innerText = error.message || "Erro ao enviar código.";
      return;
    }

    message.innerText = "Código enviado para seu email!";
    showRecoveryStep("code-step");
  } catch (err) {
    message.innerText = "Erro de conexão com o servidor.";
    console.error(err);
  }
});

verifyCodeButton.addEventListener("click", async () => {
  if (!recoveryCode.value) {
    message.innerText = "Digite o código recebido.";
    return;
  }

  try {
    const response = await fetch("/recovery/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: recoverEmail.value,
        code: recoveryCode.value,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      message.innerText = error.message || "Código incorreto.";
      return;
    }

    message.innerText = "Código verificado!";
    showRecoveryStep("new-password-step");
  } catch (err) {
    message.innerText = "Erro de conexão com o servidor.";
    console.error(err);
  }
});

resetPasswordButton.addEventListener("click", async () => {
  if (!newPassword.value || !confirmNewPassword.value) {
    message.innerText = "Preencha todos os campos obrigatórios.";
    return;
  }

  if (newPassword.value !== confirmNewPassword.value) {
    message.innerText = "Senhas não coincidem.";
    return;
  }

  try {
    const response = await fetch("/recovery/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: recoverEmail.value,
        newPassword: newPassword.value,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      message.innerText = error.message || "Erro ao resetar senha.";
      return;
    }

    message.innerText = "Senha alterada com sucesso!";
    showSection("login");
  } catch (err) {
    message.innerText = "Erro de conexão com o servidor.";
    console.error(err);
  }
});
