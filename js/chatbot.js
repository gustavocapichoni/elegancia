// ==========================================
// Chatbot Guiado — Elegância
// ==========================================

(function () {
    const toggleBtn = document.getElementById('chatbotToggle');
    const chatWindow = document.getElementById('chatbotWindow');
    const closeBtn = document.getElementById('chatbotClose');
    const messagesEl = document.getElementById('chatbotMessages');
    const optionsEl = document.getElementById('chatbotOptions');
    const badge = document.getElementById('chatbotBadge');
    const iconChat = toggleBtn.querySelector('.chatbot-icon-chat');
    const iconClose = toggleBtn.querySelector('.chatbot-icon-close');

    let isOpen = false;
    let firstOpen = true;

    // ── Toggle Chat ──
    toggleBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        if (isOpen) {
            chatWindow.classList.add('active');
            iconChat.style.display = 'none';
            iconClose.style.display = 'block';
            badge.style.display = 'none';
            toggleBtn.style.animation = 'none';
            if (firstOpen) {
                firstOpen = false;
                startChat();
            }
        } else {
            closeChatbot();
        }
    });

    closeBtn.addEventListener('click', () => {
        isOpen = false;
        closeChatbot();
    });

    function closeChatbot() {
        chatWindow.classList.remove('active');
        iconChat.style.display = 'block';
        iconClose.style.display = 'none';
        // Reinicia a conversa ao fechar
        messagesEl.innerHTML = '';
        optionsEl.innerHTML = '';
        firstOpen = true;
    }

    // ── Helpers ──
    function addMessage(text, type = 'bot') {
        const msg = document.createElement('div');
        msg.className = `chat-msg ${type}`;
        msg.innerHTML = text;
        messagesEl.appendChild(msg);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function showTyping() {
        const typing = document.createElement('div');
        typing.className = 'chat-typing';
        typing.id = 'typingIndicator';
        typing.innerHTML = '<span></span><span></span><span></span>';
        messagesEl.appendChild(typing);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function removeTyping() {
        const t = document.getElementById('typingIndicator');
        if (t) t.remove();
    }

    function clearOptions() {
        optionsEl.innerHTML = '';
    }

    function botSay(text, delay = 600) {
        return new Promise(resolve => {
            showTyping();
            setTimeout(() => {
                removeTyping();
                addMessage(text, 'bot');
                resolve();
            }, delay);
        });
    }

    function userSay(text) {
        addMessage(text, 'user');
    }

    function addOption(icon, label, callback) {
        const btn = document.createElement('button');
        btn.className = 'chat-option-btn';
        btn.innerHTML = `<span class="opt-icon">${icon}</span> ${label}`;
        btn.addEventListener('click', callback);
        optionsEl.appendChild(btn);
    }

    function addEmailBtn(label = '✉️ Falar com atendente por e-mail') {
        const btn = document.createElement('button');
        btn.className = 'chat-email-btn';
        btn.innerHTML = label;
        btn.addEventListener('click', () => {
            window.open('mailto:sac8elegancia@gmail.com?subject=Atendimento Elegância', '_blank');
        });
        optionsEl.appendChild(btn);
    }

    function addBackBtn() {
        const btn = document.createElement('button');
        btn.className = 'chat-back-btn';
        btn.textContent = '← Voltar ao menu';
        btn.addEventListener('click', () => {
            userSay('Voltar ao menu');
            clearOptions();
            showMainMenu();
        });
        optionsEl.appendChild(btn);
    }

    // ── Fluxo Principal ──
    async function startChat() {
        await botSay('Olá! 👋 Bem-vinda à <strong>Elegância</strong>!');
        await botSay('Como posso te ajudar hoje?', 800);
        showMainMenu();
    }

    function showMainMenu() {
        clearOptions();
        addOption('📏', 'Dúvidas sobre tamanhos', handleTamanhos);
        addOption('🚚', 'Prazo de entrega', handleEntrega);
        addOption('🔄', 'Trocas e devoluções', handleTrocas);
        addOption('💳', 'Formas de pagamento', handlePagamento);
        addOption('📦', 'Rastreio do pedido', handleRastreio);
        addEmailBtn();
    }

    // ── Tamanhos ──
    async function handleTamanhos() {
        userSay('Dúvidas sobre tamanhos');
        clearOptions();
        await botSay('Nossas peças seguem a tabela abaixo 👇');
        await botSay(
            '<strong>Tabela geral:</strong><br>' +
            '• <strong>P</strong> → veste 36/38<br>' +
            '• <strong>M</strong> → veste 40<br>' +
            '• <strong>G</strong> → veste 42/44<br><br>' +
            '💡 <em>Se preferir um caimento mais solto, escolha um tamanho acima.</em>',
            800
        );
        await botSay('Alguns produtos possuem numeração própria (36 a 42). Confira a descrição de cada peça!', 600);
        addBackBtn();
        addEmailBtn();
    }

    // ── Entrega ──
    async function handleEntrega() {
        userSay('Prazo de entrega');
        clearOptions();
        await botSay('Ótima pergunta! Aqui vai 📦');
        await botSay(
            '⚡ Todos os nossos produtos estão <strong>à pronta entrega</strong>!<br><br>' +
            '• O pedido é postado em até <strong>24h úteis</strong> após a compra.<br>' +
            '• Capitais: <strong>3 a 7 dias úteis</strong><br>' +
            '• Interior: <strong>5 a 12 dias úteis</strong><br><br>' +
            '📬 Você recebe o código de rastreio por e-mail assim que o pedido for despachado.',
            800
        );
        addBackBtn();
        addEmailBtn('📍 Consultar prazo exato de entrega');
    }

    // ── Trocas ──
    async function handleTrocas() {
        userSay('Trocas e devoluções');
        clearOptions();
        await botSay('Sua satisfação é prioridade! 💜');
        await botSay(
            '🔄 <strong>Primeira troca é GRÁTIS!</strong><br><br>' +
            '• Você tem até <strong>7 dias</strong> após o recebimento para solicitar.<br>' +
            '• A peça precisa estar <strong>sem uso</strong>, com etiqueta e embalagem original.<br>' +
            '• Devoluções com reembolso integral também estão disponíveis.<br><br>' +
            '✨ <em>Garantia Risco Zero — não amou? Devolvemos seu dinheiro!</em>',
            800
        );
        addBackBtn();
        addEmailBtn('🔄 Solicitar troca/devolução');
    }

    // ── Pagamento ──
    async function handlePagamento() {
        userSay('Formas de pagamento');
        clearOptions();
        await botSay('Aceitamos várias formas! 💳');
        await botSay(
            '✅ <strong>PIX</strong> — aprovação instantânea<br>' +
            '✅ <strong>Cartão de Crédito</strong> — em até 12x<br>' +
            '✅ <strong>Cartão de Débito</strong><br>' +
            '✅ <strong>Boleto Bancário</strong><br><br>' +
            '🔒 Ambiente <strong>100% seguro</strong> para pagamento.',
            800
        );
        addBackBtn();
    }

    // ── Rastreio ──
    async function handleRastreio() {
        userSay('Rastreio do pedido');
        clearOptions();
        await botSay('Para rastrear seu pedido 📦');
        await botSay(
            '1️⃣ Verifique seu <strong>e-mail</strong> (inclusive spam) — o código de rastreio é enviado automaticamente.<br><br>' +
            '2️⃣ Acesse <strong>rastreamento.correios.com.br</strong> e cole o código.<br><br>' +
            'Se não encontrou o código ou precisa de ajuda, fale com nosso time! 👇',
            800
        );
        addBackBtn();
        addEmailBtn('📍 Preciso de ajuda com rastreio');
    }

})();
