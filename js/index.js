        // Lógica do Modal Dinâmico
        const modal = document.getElementById("productModal");
        const closeModal = document.querySelector(".close-modal");

        // Pegamos todos os botões "Ver Destaque"
        const btnsDestaque = document.querySelectorAll(".open-modal-btn");

        // Quando clicar em qualquer botão "Ver Destaque"
        btnsDestaque.forEach(btn => {
            btn.addEventListener("click", function () {
                // Preenche o Modal com as informações do botão clicado
                document.getElementById("modalTitle").innerText = this.getAttribute("data-title");
                document.getElementById("modalDesc").innerText = this.getAttribute("data-desc");
                document.getElementById("modalPrice").innerText = this.getAttribute("data-price");

                // Lógica de Preço Promocional
                const oldPrice = this.getAttribute("data-price-old");
                const oldPriceEl = document.getElementById("modalOldPrice");
                const labelDe = document.getElementById("labelDe");
                const labelPor = document.getElementById("labelPor");
                
                if (oldPrice) {
                    oldPriceEl.innerText = oldPrice;
                    oldPriceEl.style.display = "inline-block";
                    labelDe.style.display = "inline-block";
                    labelPor.style.display = "inline-block";
                } else {
                    oldPriceEl.style.display = "none";
                    labelDe.style.display = "none";
                    labelPor.style.display = "none";
                }

                // Mídia
                const videoUrl = this.getAttribute("data-video");
                const videoEl = document.getElementById("modalVideo");
                const videoThumb = document.getElementById("modalThumbVideo");
                const mainImg = document.getElementById("modalMainImg");
                
                if (videoUrl) {
                    videoEl.src = videoUrl;
                    videoThumb.src = videoUrl;
                    videoEl.style.display = "block";
                    videoThumb.style.display = "inline-block";
                    mainImg.style.display = "none";
                } else {
                    videoEl.style.display = "none";
                    videoThumb.style.display = "none";
                    mainImg.src = this.getAttribute("data-img1");
                    mainImg.style.display = "block";
                }

                // Miniaturas preenchimento (esconde se estiver vazia)
                ['modalImg1','modalImg2','modalImg3','modalImg4'].forEach((id, i) => {
                    const imgEl = document.getElementById(id);
                    const src = this.getAttribute('data-img' + (i+1));
                    if (src && src.trim() !== '') {
                        imgEl.src = src;
                        imgEl.style.display = 'inline-block';
                    } else {
                        imgEl.src = '';
                        imgEl.style.display = 'none';
                    }
                });
                
                // Limpeza dos check de tamanho
                const radios = document.querySelectorAll('input[name="modalSize"]');
                radios.forEach(r => r.checked = false);

                // Exibe conteúdo longo / estendido se tiver
                const extendedDesc = this.getAttribute("data-extended-desc");
                const extendedContainer = document.getElementById("modalExtendedInfo");
                const extendedTextTarget = document.getElementById("modalExtendedDesc");
                const reviewsContainer = document.getElementById("modalReviewsContainer");
                const reviewsContentTarget = document.getElementById("modalReviewsContent");
                const reviewsHTML = this.getAttribute("data-reviews");
                
                if (extendedDesc || reviewsHTML) {
                    extendedContainer.style.display = "block";
                    
                    if(extendedDesc) {
                        extendedTextTarget.innerHTML = extendedDesc; // Injeta HTML com strongs/quebras e listas
                        extendedTextTarget.style.display = "block";
                    } else {
                        extendedTextTarget.style.display = "none";
                    }

                    if(reviewsHTML) {
                        reviewsContentTarget.innerHTML = reviewsHTML;
                        reviewsContainer.style.display = "block";
                    } else {
                        reviewsContainer.style.display = "none";
                    }
                } else {
                    extendedContainer.style.display = "none";
                }

                // === CONFIGURAÇÃO DE CORES + TAMANHOS ===
                const colorsJSON = this.getAttribute("data-colors");
                const linkP = this.getAttribute("data-link-p");
                const linkM = this.getAttribute("data-link-m");
                const linkG = this.getAttribute("data-link-g");
                const sizesContainer = document.getElementById("modalSizes");
                const sizesButtonsContainer = document.getElementById("modalSizesContainer");
                const colorsContainer = document.getElementById("modalColors");
                const colorsButtonsContainer = document.getElementById("modalColorsContainer");

                // Limpa seleções anteriores
                document.querySelectorAll('.color-option').forEach(c => c.classList.remove('selected'));
                window.currentColorLinks = null;
                window.currentCheckoutLinks = null;
                window.hasColors = false;
                
                let availableSizes = [];

                if (colorsJSON) {
                    // PRODUTO COM VARIAÇÃO DE COR E TAMANHO
                    const colorsData = JSON.parse(colorsJSON);
                    window.currentColorsData = colorsData;
                    window.hasColors = true;

                    // Extrair tamanhos disponíveis da primeira cor
                    const firstColor = Object.values(colorsData)[0];
                    availableSizes = Object.keys(firstColor).filter(k => k !== 'cor' && k !== 'img');

                    // Gera as bolinhas de cor dinamicamente
                    colorsButtonsContainer.innerHTML = '';
                    Object.keys(colorsData).forEach(colorName => {
                        const colorInfo = colorsData[colorName];
                        const btn = document.createElement('div');
                        btn.className = 'color-option';
                        btn.setAttribute('data-color-name', colorName);
                        btn.innerHTML = `<div class="color-circle" style="background: ${colorInfo.cor};"></div><span>${colorName}</span>`;
                        btn.addEventListener('click', function() {
                            // Remove seleção de todas as cores
                            document.querySelectorAll('.color-option').forEach(c => c.classList.remove('selected'));
                            // Marca esta como selecionada
                            this.classList.add('selected');
                            // Salva os links desta cor
                            window.currentColorLinks = colorsData[colorName];

                            // Troca a imagem principal para a imagem da cor selecionada
                            const colorImg = colorsData[colorName].img;
                            if (colorImg) {
                                const mainVideo = document.getElementById('modalVideo');
                                const mainImage = document.getElementById('modalMainImg');
                                mainVideo.style.display = 'none';
                                mainVideo.pause();
                                mainImage.src = colorImg;
                                mainImage.style.display = 'block';
                            }
                        });
                        colorsButtonsContainer.appendChild(btn);
                    });

                    colorsContainer.style.display = "block";
                    sizesContainer.style.display = "block";

                } else if (linkP || linkM || linkG) {
                    // PRODUTO SÓ COM TAMANHO (ex: Vestido de Couro)
                    colorsContainer.style.display = "none";
                    sizesContainer.style.display = "block";
                    window.currentCheckoutLinks = { P: linkP, M: linkM, G: linkG };
                    availableSizes = [];
                    if (linkP) availableSizes.push('P');
                    if (linkM) availableSizes.push('M');
                    if (linkG) availableSizes.push('G');
                } else {
                    colorsContainer.style.display = "none";
                    sizesContainer.style.display = "none";
                    window.currentCheckoutLinks = null;
                }

                // Renderizar botões de tamanho dinamicamente
                if (sizesButtonsContainer) {
                    sizesButtonsContainer.innerHTML = '';
                    availableSizes.forEach(size => {
                        sizesButtonsContainer.innerHTML += `
                            <label class="size-label">
                                <input type="radio" name="modalSize" value="${size}"> ${size}
                            </label>
                        `;
                    });
                }

                // Exibe o modal
                modal.style.display = "flex";
            });
        });

        // === BOTÃO ADQUIRIR AGORA ===
        document.getElementById("modalBuyBtn").addEventListener("click", function () {
            const sizesContainer = document.getElementById("modalSizes");
            
            if (sizesContainer.style.display !== "block") {
                // Produto sem variação nenhuma
                console.log("Redirecionar para compra padrão do item sem variação");
                return;
            }

            // Verifica tamanho
            const sizeSelected = document.querySelector('input[name="modalSize"]:checked');
            if (!sizeSelected) {
                alert("⚠️ Por favor, selecione um tamanho (P, M ou G) antes de prosseguir.");
                return;
            }

            if (window.hasColors) {
                // Produto com COR + TAMANHO
                if (!window.currentColorLinks) {
                    alert("⚠️ Por favor, selecione uma cor antes de prosseguir.");
                    return;
                }
                const link = window.currentColorLinks[sizeSelected.value];
                if (link) {
                    window.location.href = link;
                } else {
                    alert("Desculpe, essa combinação de cor e tamanho não está disponível.");
                }
            } else {
                // Produto só com TAMANHO
                if (window.currentCheckoutLinks && window.currentCheckoutLinks[sizeSelected.value]) {
                    window.location.href = window.currentCheckoutLinks[sizeSelected.value];
                } else {
                    alert("Desculpe, esse tamanho não tem um link cadastrado.");
                }
            }
        });

        // Fechar Modal no "X"
        const videoThumbBtn = document.getElementById("modalThumbVideo");
        const mainImgView = document.getElementById("modalMainImg");
        const mainVideoView = document.getElementById("modalVideo");
        const thumbImgs = [
            document.getElementById("modalImg1"),
            document.getElementById("modalImg2"),
            document.getElementById("modalImg3"),
            document.getElementById("modalImg4")
        ];

        videoThumbBtn.addEventListener("click", function () {
            if (this.getAttribute("src")) {
                mainImgView.style.display = "none";
                mainVideoView.style.display = "block";
                mainVideoView.play();
            }
        });

        thumbImgs.forEach(thumb => {
            thumb.addEventListener("click", function () {
                const src = this.getAttribute("src");
                // Garante que só troque a imagem se o src for válido
                if (src && src.trim() !== "" && src !== "null" && src !== "undefined") {
                    mainVideoView.style.display = "none";
                    mainVideoView.pause();
                    mainImgView.src = src;
                    mainImgView.style.display = "block";
                }
            });
        });

        // Fechar Modal no "X"
        closeModal.onclick = function () {
            modal.style.display = "none";
            document.getElementById("modalVideo").pause(); // Pausa o vídeo ao fechar
        }

        // Fechar Modal clicando fora dele
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                document.getElementById("modalVideo").pause();
            }
        }