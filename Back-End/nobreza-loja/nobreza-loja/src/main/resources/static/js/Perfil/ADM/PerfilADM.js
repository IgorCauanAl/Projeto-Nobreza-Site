document.addEventListener("DOMContentLoaded", function () {
    // Navegação entre seções
    const navLinks = document.querySelectorAll(".nav-link");
    const contentSections = document.querySelectorAll(".content-section");

    navLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("data-target");

            navLinks.forEach((navLink) => navLink.classList.remove("active"));
            contentSections.forEach((section) => section.classList.remove("active"));

            this.classList.add("active");
            document.getElementById(targetId).classList.add("active");
        });
    });



// Gerenciamento de cores
    const colorInput = document.getElementById("color-picker-input");
    const hexInput = document.getElementById("color-hex-input");
    const addColorBtn = document.getElementById("add-color-btn");
    const selectedColorsContainer = document.getElementById("selected-colors-container");
    const hiddenColorsInput = document.getElementById("prod-cores-hidden");

    let colors = [];

    function updateHiddenInput() {
        hiddenColorsInput.value = colors.join(",");
        console.log("Cores selecionadas:", hiddenColorsInput.value);
    }

    function renderColors() {
        selectedColorsContainer.innerHTML = "";

        if (colors.length === 0) {
            selectedColorsContainer.innerHTML = '<div style="color:#666; font-style:italic;">Nenhuma cor selecionada</div>';
            return;
        }

        colors.forEach((color, index) => {
            const colorWrapper = document.createElement("div");
            colorWrapper.style.display = "flex";
            colorWrapper.style.alignItems = "center";
            colorWrapper.style.gap = "5px";
            colorWrapper.style.marginBottom = "5px";

            const colorDiv = document.createElement("div");
            colorDiv.style.backgroundColor = color;
            colorDiv.style.width = "30px";
            colorDiv.style.height = "30px";
            colorDiv.style.border = "1px solid #ccc";
            colorDiv.style.borderRadius = "4px";
            colorDiv.title = color;

            const removeBtn = document.createElement("button");
            removeBtn.innerHTML = "×";
            removeBtn.type = "button";
            removeBtn.style.background = "#ff4444";
            removeBtn.style.color = "white";
            removeBtn.style.border = "none";
            removeBtn.style.borderRadius = "50%";
            removeBtn.style.width = "20px";
            removeBtn.style.height = "20px";
            removeBtn.style.cursor = "pointer";
            removeBtn.addEventListener("click", () => {
                colors.splice(index, 1);
                renderColors();
                updateHiddenInput();
            });

            colorWrapper.appendChild(colorDiv);
            colorWrapper.appendChild(removeBtn);
            selectedColorsContainer.appendChild(colorWrapper);
        });
    }

    function addColor(color) {
        // Validar formato HEX
        const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        if (!hexRegex.test(color)) {
            alert("Formato de cor inválido. Use formato HEX (ex: #FFFFFF)");
            return false;
        }

        if (!colors.includes(color.toUpperCase())) {
            colors.push(color.toUpperCase());
            renderColors();
            updateHiddenInput();
            return true;
        } else {
            alert("Esta cor já foi adicionada!");
            return false;
        }
    }

    addColorBtn.addEventListener("click", () => {
        let color = hexInput.value.trim() || colorInput.value;
        if (!color) {
            alert("Por favor, selecione ou digite uma cor!");
            return;
        }

        // Adicionar # se não tiver
        if (!color.startsWith('#') && color.length === 6) {
            color = '#' + color;
        }

        addColor(color);

        // Resetar inputs
        hexInput.value = "";
        colorInput.value = "#000000";
    });

// Permitir Enter no input HEX
    hexInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addColorBtn.click();
        }
    });

// Sincronizar color picker com input HEX
    colorInput.addEventListener("input", () => {
        hexInput.value = colorInput.value.toUpperCase();
    });

    hexInput.addEventListener("input", () => {
        const value = hexInput.value.trim();
        if (value.startsWith('#') && value.length === 7) {
            colorInput.value = value;
        }
    });

// Inicializar renderização
    renderColors();



// Evento para enviar o formulário
    const form = document.querySelector(".product-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        console.log("=== 🚀 INÍCIO DO DEBUG ===");

        // Validar se há pelo menos uma cor selecionada
        if (colors.length === 0) {
            alert("Por favor, adicione pelo menos uma cor!");
            return;
        }

        // 1. VERIFICAR TODOS OS CAMPOS DO FORMULÁRIO ANTES DO FormData
        console.log("=== 1. VALORES DOS CAMPOS NO HTML ===");
        const campos = [
            { id: 'prod-nome', name: 'prodNome' },
            { id: 'prod-preco', name: 'prodPreco' },
            { id: 'prodTipo', name: 'prodTipo' },
            { id: 'prodRef', name: 'prodRef' },
            { id: 'prodQuantidade', name: 'prodQuantidade' },
            { id: 'prodDescricao', name: 'prodDescricao' },
            { id: 'prodComposicao', name: 'prodComposicao' },
            { id: 'prodPixDesconto', name: 'prodPixDesconto' },
            { id: 'prodPromocao', name: 'prodPromocao' },
            { id: 'prodFoto', name: 'prodFoto' },
            { id: 'prod-cores-hidden', name: 'prod-cores' }
        ];

        campos.forEach(campo => {
            const element = document.getElementById(campo.id);
            if (element) {
                let valor = element.value;
                if (element.type === 'checkbox') {
                    valor = element.checked;
                }
                if (element.type === 'file') {
                    valor = element.files[0] ? element.files[0].name : 'NENHUM ARQUIVO';
                }
                console.log(`✅ ${campo.name}: ${valor}`);
            } else {
                console.log(`❌ ${campo.name}: ELEMENTO NÃO ENCONTRADO NO DOM`);
            }
        });

        // 2. VERIFICAR O FormData
        const formData = new FormData(form);

        console.log("=== 2. FORM DATA CRIADO ===");
        let formDataVazio = true;
        for (let [key, value] of formData.entries()) {
            formDataVazio = false;
            if (value instanceof File) {
                console.log(`📁 ${key}: ARQUIVO - ${value.name} (${value.size} bytes)`);
            } else {
                console.log(`📝 ${key}: ${value}`);
            }
        }

        if (formDataVazio) {
            console.log("❌ FORM DATA ESTÁ VAZIO!");
        } else {
            console.log("✅ FORM DATA CONTÉM DADOS");
        }

        // 3. VERIFICAR SE TODOS OS CAMPOS ESPERADOS ESTÃO NO FormData
        console.log("=== 3. VERIFICAÇÃO DE CAMPOS NO FormData ===");
        const camposEsperados = [
            'prodNome', 'prodPreco', 'prodTipo', 'prodRef',
            'prodQuantidade', 'prodDescricao', 'prodComposicao',
            'prodPixDesconto', 'prodPromocao', 'prodFoto', 'prod-cores'
        ];

        const camposPresentes = Array.from(formData.keys());
        console.log("Campos presentes no FormData:", camposPresentes);

        camposEsperados.forEach(campo => {
            if (formData.has(campo)) {
                console.log(`✅ ${campo}: PRESENTE no FormData`);
            } else {
                console.log(`❌ ${campo}: AUSENTE no FormData`);
            }
        });

        // 4. VERIFICAR TAMANHO TOTAL DO FORM DATA
        let tamanhoTotal = 0;
        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                tamanhoTotal += value.size;
            } else {
                tamanhoTotal += new Blob([value]).size;
            }
        }
        console.log(`=== 4. TAMANHO TOTAL: ${tamanhoTotal} bytes ===`);

        console.log("=== 5. ENVIANDO PARA O BACKEND... ===");

        try {
            const response = await fetch("/api/products", {
                method: "POST",
                body: formData,
            });

            console.log("=== 6. RESPOSTA DO BACKEND ===");
            console.log("Status:", response.status, response.statusText);
            console.log("OK?", response.ok);

            if (response.ok) {
                const successMessage = await response.text();
                console.log("✅ Mensagem de sucesso:", successMessage);
                alert("✅ Produto adicionado com sucesso!");
                form.reset();
                colors = [];
                renderColors();
                updateHiddenInput();
            } else {
                const errorText = await response.text();
                console.log("❌ Erro do backend:", errorText);
                alert("❌ Erro: " + errorText);
            }
        } catch (err) {
            console.error("=== ❌ ERRO NA REQUISIÇÃO ===", err);
            alert("⚠️ Erro ao conectar ao servidor.");
        }

        console.log("=== 🏁 FIM DO DEBUG ===");
    });



 });


