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

// Limpar campos e remover required de inputs invisíveis
function resetFields() {
    const allInputs = [
        emailLogin, passwordLogin,
        username, emailCadastro, passwordCadastro, confirmPassword,
        recoverEmail, recoveryCode, newPassword, confirmNewPassword
    ];

    allInputs.forEach(input => {
        input.value = "";
        input.required = input.offsetParent !== null; // required apenas se visível
    });
}

// TROCA DE SEÇÃO
function showSection(section) {
    container.classList.remove("login-view", "register-view", "recovery-view");
    message.innerText = "";
    resetFields();

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
    resetFields();
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
        const response = await fetch("/api/register", {
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

        message.innerText = "Cadastro realizado com sucesso!";
        resetFields();
        showSection("login");
    } catch (err) {
        message.innerText = "Erro de conexão com o servidor.";
        console.error(err);
    }
});

// ==================== LOGIN ====================
loginButton.addEventListener("click", async () => {
    message.innerText = ""; // limpa mensagens

    if (!emailLogin.value || !passwordLogin.value) {
        message.innerText = "Preencha todos os campos.";
        return;
    }

    try {
        const formData = new URLSearchParams();
        formData.append("email-login", emailLogin.value);
        formData.append("password-login", passwordLogin.value);

        const response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formData,
            credentials: "same-origin" // necessário para cookies de sessão
        });

        if (response.redirected) {
            // login bem-sucedido → redireciona para a página principal
            window.location.href = response.url;
        } else if (!response.ok) {
            message.innerText = "Usuário ou senha incorretos.";
        }
    } catch (err) {
        message.innerText = "Erro de conexão com o servidor.";
        console.error(err);
    }
});

// ==================== RECUPERAÇÃO DE SENHA ====================
sendCodeButton.addEventListener("click", async () => {
    try {
        const response = await fetch("/apirecovery/send-code", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: recoverEmail.value })
        });


        if (!response.ok) {
            const error = await response.json();
            message.innerText = error.message || "Erro ao enviar código.";
            return;
        }

        savedEmail = recoverEmail.value.trim().toLowerCase();
        message.innerText = "Código enviado para seu email!";
        showRecoveryStep("code-step");

    } catch (err) {
        message.innerText = "Erro de conexão com o servidor.";
        console.error(err);
    }
});

verifyCodeButton.addEventListener("click", async () => {

    try {
        const response = await fetch("/apirecovery/check", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code: recoveryCode.value,
                email:savedEmail,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            message.innerText = error.message || "Código incorreto.";
            return;
        }

        savedCode = recoveryCode.value;
        message.innerText = "Código verificado!";
        showRecoveryStep("new-password-step");
    } catch (err) {
        message.innerText = "Erro de conexão com o servidor.";
        console.error(err);
    }

});



resetPasswordButton.addEventListener("click", async () => {

    if (newPassword.value !== confirmNewPassword.value) {
        message.innerText = "Senhas não coincidem.";
        return;
    }

    try {
        const response = await fetch("/apirecovery/changepassword", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                newPassword: newPassword.value,
                code: savedCode,
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
