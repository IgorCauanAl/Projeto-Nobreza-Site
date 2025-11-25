document.addEventListener("DOMContentLoaded", function () {

    // 1. SISTEMA DE NOTIFICAÇÕES
    function showNotification(message, type = 'success') {
        let container = document.getElementById('notification-container');

        if (!container) {
            container = document.createElement('div');
            container.id = 'notification-container';
            container.style.cssText = "position: fixed; top: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;";
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.classList.add('toast', type);


        let iconClass = 'fa-info-circle';
        if (type === 'success') iconClass = 'fa-check-circle';
        if (type === 'error') iconClass = 'fa-exclamation-circle';
        if (type === 'warning') iconClass = 'fa-exclamation-triangle';

        toast.innerHTML = `
            <i class="fas ${iconClass}"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);


        void toast.offsetWidth;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (container.contains(toast)) {
                    container.removeChild(toast);
                }
            }, 300);
        }, 4000);
    }

    //  NAVEGAÇÃO DE ABAS
    const navLinks = document.querySelectorAll(".nav-link");
    const contentSections = document.querySelectorAll(".content-section");

    navLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("data-target");

            navLinks.forEach((navLink) => navLink.classList.remove("active"));
            contentSections.forEach((section) => section.classList.remove("active"));

            this.classList.add("active");
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add("active");
            }
        });
    });


    // GERENCIADOR DE CORES

    const colorInput = document.getElementById("color-picker-input");
    const hexInput = document.getElementById("color-hex-input");
    const addColorBtn = document.getElementById("add-color-btn");
    const selectedColorsContainer = document.getElementById("selected-colors-container");
    const hiddenColorsInput = document.getElementById("prod-cores-hidden");

    let colors = [];

    function updateHiddenInput() {
        hiddenColorsInput.value = colors.join(",");
    }

    function renderColors() {
        selectedColorsContainer.innerHTML = "";

        if (colors.length === 0) {
            selectedColorsContainer.innerHTML = '<div style="color: rgba(255,255,255,0.5); font-style:italic; font-size: 0.9rem;">Nenhuma cor selecionada</div>';
            return;
        }

        colors.forEach((color, index) => {
            const colorWrapper = document.createElement("div");
            colorWrapper.className = "color-swatch";
            colorWrapper.style.backgroundColor = color;
            colorWrapper.title = color;

            const removeBtn = document.createElement("button");
            removeBtn.className = "remove-color";
            removeBtn.innerHTML = "×";
            removeBtn.type = "button";

            removeBtn.addEventListener("click", () => {
                colors.splice(index, 1);
                renderColors();
                updateHiddenInput();
            });

            colorWrapper.appendChild(removeBtn);
            selectedColorsContainer.appendChild(colorWrapper);
        });
    }

    function addColor(color) {
        const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

        if (!hexRegex.test(color)) {
            showNotification("Formato de cor inválido. Use HEX (ex: #FFFFFF)", "error");
            return false;
        }

        if (!colors.includes(color.toUpperCase())) {
            colors.push(color.toUpperCase());
            renderColors();
            updateHiddenInput();
            return true;
        } else {
            showNotification("Esta cor já foi adicionada!", "warning");
            return false;
        }
    }

    if (addColorBtn) {
        addColorBtn.addEventListener("click", () => {
            let color = hexInput.value.trim() || colorInput.value;

            if (!color) {
                showNotification("Por favor, selecione ou digite uma cor!", "warning");
                return;
            }

            if (!color.startsWith('#') && (color.length === 6 || color.length === 3)) {
                color = '#' + color;
            }

            if(addColor(color)) {
                hexInput.value = "";
            }
        });
    }

    if (hexInput) {
        hexInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                addColorBtn.click();
            }
        });

        hexInput.addEventListener("input", () => {
            const value = hexInput.value.trim();
            if (value.startsWith('#') && value.length === 7) {
                colorInput.value = value;
            }
        });
    }

    if (colorInput) {
        colorInput.addEventListener("input", () => {
            hexInput.value = colorInput.value.toUpperCase();
        });
    }

    renderColors();


    // SUBMISSÃO DO FORMULÁRIO DE PRODUTO
    const form = document.querySelector(".product-form");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();


            if (colors.length === 0) {
                showNotification("Adicione pelo menos uma cor ao produto!", "warning");
                return;
            }


            updateHiddenInput();

            const formData = new FormData(form);

            try {
                const response = await fetch("/api/products/admin/produtos/adicionar", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    const successMessage = await response.text();
                    showNotification("Produto adicionado com sucesso!", "success");


                    form.reset();
                    colors = [];
                    renderColors();
                    updateHiddenInput();


                    if(colorInput) colorInput.value = "#000000";
                    if(hexInput) hexInput.value = "";

                } else {
                    const errorText = await response.text();
                    console.error("Erro backend:", errorText);
                    showNotification("Erro: " + errorText, "error");
                }
            } catch (err) {
                console.error("Erro na requisição:", err);
                showNotification("Erro ao conectar ao servidor.", "error");
            }
        });
    }

    // MODAL DE CONFIRMAÇÃO
    const modalOverlay = document.getElementById('confirmationModal');

    if (modalOverlay) {
        const modalTitle = document.getElementById('modalTitle');
        const modalMessage = document.getElementById('modalMessage');
        const modalConfirmBtn = document.getElementById('modalConfirmBtn');
        const modalCancelBtn = document.getElementById('modalCancelBtn');

        let formToSubmit = null;

        function showModal(title, message, confirmClass) {
            modalTitle.textContent = title;
            modalMessage.textContent = message;


            modalConfirmBtn.className = 'btn-confirm';
            if (confirmClass) {
                modalConfirmBtn.classList.add(confirmClass);
            }

            modalOverlay.style.display = 'flex';

            setTimeout(() => {
                modalOverlay.classList.add('show');
            }, 10);
        }

        function hideModal() {
            modalOverlay.classList.remove('show');
            setTimeout(() => {
                modalOverlay.style.display = 'none';
                formToSubmit = null;
            }, 300);
        }


        document.querySelectorAll('.btn-promote').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                formToSubmit = button.closest('form');
                showModal(
                    'Promover Usuário',
                    'Deseja promover este usuário a Administrador?',
                    'promote' // Classe CSS específica se houver
                );
            });
        });

        document.querySelectorAll('.btn-delete').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                formToSubmit = button.closest('form');
                showModal(
                    'Deletar Usuário',
                    'Esta ação é irreversível. Deseja realmente deletar?',
                    '' // Usa estilo padrão (vermelho)
                );
            });
        });

        modalConfirmBtn.addEventListener('click', () => {
            if (formToSubmit) {
                formToSubmit.submit();
            }
            hideModal();
        });

        modalCancelBtn.addEventListener('click', hideModal);

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                hideModal();
            }
        });
    }


    // FILTRO DA TABELA DE USUÁRIOS
    const searchInput = document.getElementById("searchInput");
    const tableBody = document.getElementById("userTableBody");
    const noUserRow = document.getElementById("noUserRow");

    if (tableBody) {
        const userRows = Array.from(tableBody.querySelectorAll("tr")).filter(
            (row) => row.id !== "noUserRow"
        );

        if (searchInput && userRows.length > 0) {
            searchInput.addEventListener("input", () => {
                const searchTerm = searchInput.value.toLowerCase();
                let visibleCount = 0;

                userRows.forEach((row) => {

                    const name = row.cells[0].textContent.toLowerCase();
                    const email = row.cells[1].textContent.toLowerCase();

                    const isMatch = name.includes(searchTerm) || email.includes(searchTerm);

                    if (isMatch) {
                        row.style.display = "";
                        visibleCount++;
                    } else {
                        row.style.display = "none";
                    }
                });

                if (noUserRow) {
                    noUserRow.style.display = visibleCount === 0 ? "" : "none";
                }
            });
        }
    }
});