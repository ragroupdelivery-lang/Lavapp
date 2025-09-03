// ✅ CONFIGURAÇÃO REAL - NÚMERO DO WHATSAPP CONFIGURADO
const WHATSAPP_NUMBER = '5517996430729'; // (17) 99643-0729

// Salva o carrinho no LocalStorage
function saveCartToLocalStorage() {
  localStorage.setItem('laundryCart', JSON.stringify(cart));
}

// Carrega o carrinho do LocalStorage
function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem('laundryCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

// Catálogo de serviços premium
const serviceCategories = [
    { name: 'Planos Mensais', icon: '📅', description: 'Economia e praticidade para o mês todo', services: [ { id: 1, name: 'Plano SOLO', description: '4 recolhas mensais do nosso Cesto Base (até 8kg de roupas do dia a dia, lavadas e dobradas). Ideal para quem mora sozinho ou tem poucas roupas.', price: 169.90, originalPrice: 199.90, unit: 'mês', icon: '👤', badge: 'Popular', badgeType: 'popular', savings: 'Economize R$ 30', features: ['4 recolhas mensais', 'Até 8kg por cesto', 'Lavagem + dobra', 'Entrega grátis'] }, { id: 2, name: 'Plano DUO', description: '6 recolhas mensais do nosso Cesto Base (até 8kg de roupas do dia a dia, lavadas e dobradas). Perfeito para casais ou pessoas ativas.', price: 259.90, originalPrice: 299.90, unit: 'mês', icon: '👫', badge: 'Recomendado', badgeType: 'recommended', savings: 'Economize R$ 40', features: ['6 recolhas mensais', 'Até 8kg por cesto', 'Lavagem + dobra', 'Entrega grátis', 'Suporte prioritário'] }, { id: 3, name: 'Plano INFINITY', description: '8 recolhas mensais do nosso Cesto Base (até 8kg de roupas do dia a dia, lavadas e dobradas). A escolha ideal para famílias grandes.', price: 329.90, originalPrice: 399.90, unit: 'mês', icon: '👨‍👩‍👧‍👦', savings: 'Economize R$ 70', features: ['8 recolhas mensais', 'Até 8kg por cesto', 'Lavagem + dobra', 'Entrega grátis', 'Suporte VIP', 'Desconto em extras'] }, { id: 4, name: 'Ciclo Extra com Desconto', description: 'Adicione um ciclo de lavagem extra em qualquer recolha do seu plano por um preço especial para separar roupas delicadas ou coloridas.', price: 7.50, originalPrice: 15.00, unit: 'ciclo', icon: '➕', savings: '50% OFF' }, { id: 5, name: 'Cuidado Hipoalergênico (Planos)', description: 'Troque para produtos da linha Puro Cuidado em uma de suas recolhas. Ideal para peles sensíveis e bebês.', price: 10.00, unit: 'ciclo', icon: '🌿' } ] },
    { name: 'Lavanderia do Dia a Dia', icon: '👕', description: 'Serviços avulsos para suas necessidades', services: [ { id: 6, name: 'Cesto Base (Lavar & Dobrar)', description: 'Ideal para as roupas da semana (até 8kg). Inclui um ciclo de lavagem profissional, secagem controlada e dobra cuidadosa.', price: 44.90, unit: 'cesto', icon: '🧺', features: ['Até 8kg de roupas', 'Lavagem profissional', 'Secagem controlada', 'Dobra cuidadosa'] }, { id: 7, name: 'Ciclo Extra para Cesto Base', description: 'Precisa separar roupas? Adicione um ciclo de lavagem ao seu cesto base para cuidar de peças coloridas ou delicadas separadamente.', price: 15.00, unit: 'ciclo', icon: '🔄' }, { id: 8, name: 'Cuidado Hipoalergênico', description: 'Serviço por cesto. Um ciclo completo com produtos da linha Puro Cuidado, garantindo uma limpeza suave para peles sensíveis.', price: 15.00, unit: 'cesto', icon: '🌿' }, { id: 9, name: 'Passadoria: 5 Peças', description: 'Receba 5 peças não apenas lavadas, mas também passadas e prontas para usar, com acabamento profissional de loja.', price: 19.90, unit: 'serviço', icon: '👔' }, { id: 10, name: 'Passadoria: 10 Peças', description: 'Receba 10 peças não apenas lavadas, mas também passadas e prontas para usar, com acabamento profissional de loja.', price: 34.90, unit: 'serviço', icon: '👔' }, { id: 11, name: 'Passadoria: 20 Peças', description: 'Receba 20 peças não apenas lavadas, mas também passadas e prontas para usar, com acabamento profissional de loja.', price: 58.90, unit: 'serviço', icon: '👔' } ] },
    { name: 'Cuidados Especiais', icon: '✨', description: 'Tratamento premium para peças especiais', services: [ { id: 12, name: 'Edredom/Cobertor (Casal/Queen)', description: 'Garanta a higienização completa e o frescor dos seus edredons e cobertores, removendo ácaros, impurezas e odores.', price: 44.90, unit: 'peça', icon: '🛏️', features: ['Higienização profunda', 'Remoção de ácaros', 'Secagem especial', 'Embalagem protetora'] }, { id: 13, name: 'Edredom/Cobertor (King)', description: 'O mesmo cuidado e higienização profunda, dimensionado para as suas maiores peças de conforto e aquecimento.', price: 79.90, unit: 'peça', icon: '🛏️' }, { id: 14, name: 'Jogo de Cama', description: 'Lavagem completa para seu jogo de cama (1 lençol, 2 fronhas), devolvendo o frescor e a maciez para noites de sono perfeitas.', price: 39.90, unit: 'jogo', icon: '🛌' }, { id: 15, name: 'Lavagem de Toalhas', description: 'Higienização que recupera a maciez e o poder de absorção das suas toalhas (2 de corpo, 4 de rosto), deixando-as como novas.', price: 39.90, unit: 'kit', icon: '🏖️' } ] }
];

// Estado da aplicação
const services = serviceCategories.flatMap(category => category.services);
let cart = [];
let activeTab = 0;
let selectedShift = null;

// Configuração dos turnos
const shifts = [
    { id: 'morning', name: 'Manhã', icon: '🌅', time: '08:00 às 12:00', startHour: 8, endHour: 12, cutoffMinutes: 150 },
    { id: 'afternoon', name: 'Tarde', icon: '☀️', time: '13:00 às 17:00', startHour: 13, endHour: 17, cutoffMinutes: 150 },
    { id: 'evening', name: 'Noite', icon: '🌙', time: '18:00 às 22:00', startHour: 18, endHour: 22, cutoffMinutes: 150 }
];

// Utilitários
function formatPrice(price) {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const text = document.getElementById('notification-text');
    text.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Renderizar abas de navegação
function renderTabs() {
    const tabsNav = document.getElementById('tabs-nav');
    tabsNav.innerHTML = serviceCategories.map((category, index) => `
        <button onclick="switchTab(${index})" class="tab-button flex items-center space-x-3 px-6 py-3 rounded-lg font-semibold transition-all text-sm ${ index === activeTab ? 'premium-button text-white shadow-lg' : 'text-gray-600 hover:text-blue-600 hover:bg-white/50' }" id="tab-${index}" >
            <span class="text-xl">${category.icon}</span>
            <div class="text-left">
                <div>${category.name}</div>
                <div class="text-xs opacity-75">${category.description}</div>
            </div>
        </button>
    `).join('');
}

// Alternar entre abas
function switchTab(tabIndex) {
    activeTab = tabIndex;
    renderTabs();
    renderActiveTabContent();
}

// Renderizar conteúdo da aba ativa
function renderActiveTabContent() {
    const tabContent = document.getElementById('tab-content');
    const category = serviceCategories[activeTab];
    tabContent.innerHTML = `
        <div class="grid gap-6">
            ${category.services.map(service => `
                <div class="service-card glass-effect rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-white/20">
                    <div class="flex flex-col lg:flex-row lg:items-start justify-between space-y-4 lg:space-y-0">
                        <div class="flex items-start space-x-4 flex-1">
                            <div class="text-4xl">${service.icon}</div>
                            <div class="flex-1">
                                <div class="flex items-center space-x-3 mb-2">
                                    <h4 class="text-xl font-bold text-gray-800">${service.name}</h4>
                                    ${service.badge ? `<div class="badge-${service.badgeType} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">${service.badge}</div>` : ''}
                                    ${service.savings ? `<div class="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">${service.savings}</div>` : ''}
                                </div>
                                <p class="text-gray-600 mb-4 leading-relaxed">${service.description}</p>
                                ${service.features ? `<div class="flex flex-wrap gap-2 mb-4">${service.features.map(feature => `<span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"> ✓ ${feature} </span>`).join('')}</div>` : ''}
                            </div>
                        </div>
                        <div class="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
                            <div class="text-center lg:text-right">
                                ${service.originalPrice ? `<div class="text-sm text-gray-500 line-through">R$ ${service.originalPrice.toFixed(2)}</div>` : ''}
                                <div class="text-3xl font-bold price-highlight">${formatPrice(service.price)}</div>
                                <div class="text-sm text-gray-600">por ${service.unit}</div>
                            </div>
                            <div class="flex items-center space-x-4">
                                <div class="quantity-control flex items-center space-x-3 px-4 py-2 rounded-xl">
                                    <button onclick="changeQuantity(${service.id}, -1)" class="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-700 transition-all">-</button>
                                    <span id="qty-${service.id}" class="w-8 text-center font-bold text-lg">0</span>
                                    <button onclick="changeQuantity(${service.id}, 1)" class="w-8 h-8 rounded-full premium-button text-white flex items-center justify-center font-bold transition-all">+</button>
                                </div>
                                <button onclick="addToCart(${service.id})" class="success-button text-white px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-lg">Adicionar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Alterar quantidade
function changeQuantity(serviceId, change) {
    const qtyElement = document.getElementById(`qty-${serviceId}`);
    let currentQty = parseInt(qtyElement.textContent);
    currentQty = Math.max(0, currentQty + change);
    qtyElement.textContent = currentQty;
}

// Adicionar ao carrinho
function addToCart(serviceId) {
    const qty = parseInt(document.getElementById(`qty-${serviceId}`).textContent);
    if (qty === 0) {
        showNotification('Selecione uma quantidade primeiro!', 'warning');
        return;
    }
    const service = services.find(s => s.id === serviceId);
    const existingItem = cart.find(item => item.id === serviceId);
    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push({ id: serviceId, name: service.name, price: service.price, unit: service.unit, quantity: qty, icon: service.icon });
    }
    document.getElementById(`qty-${serviceId}`).textContent = '0';
    updateCart();
    showNotification(`${service.name} adicionado ao carrinho!`);
}

// Atualizar carrinho
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalPrice = document.getElementById('total-price');
    const headerTotal = document.getElementById('header-total');
    const orderSummary = document.getElementById('order-summary');
    const subtotal = document.getElementById('subtotal');
    const finalTotal = document.getElementById('final-total');

    if (cart.length === 0) {
        cartItems.innerHTML = `<div class="text-center py-12"><div class="text-6xl mb-4">🛒</div><p class="text-gray-500 text-lg font-medium">Carrinho vazio</p><p class="text-gray-400 text-sm mt-2">Adicione serviços para começar</p></div>`;
        cartCount.textContent = '0';
        totalPrice.textContent = 'R$ 0,00';
        headerTotal.textContent = 'R$ 0,00';
        orderSummary.classList.add('hidden');
    } else {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartCount.textContent = totalItems;
        totalPrice.textContent = formatPrice(total);
        headerTotal.textContent = formatPrice(total);
        subtotal.textContent = formatPrice(total);
        finalTotal.textContent = formatPrice(total);
        orderSummary.classList.remove('hidden');
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item glass-effect rounded-xl p-4 mb-3 border border-white/20">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3 flex-1">
                        <span class="text-2xl">${item.icon}</span>
                        <div class="flex-1">
                            <div class="font-semibold text-gray-800">${item.name}</div>
                            <div class="text-sm text-gray-600">${item.quantity} ${item.unit} × ${formatPrice(item.price)}</div>
                        </div>
                    </div>
                    <div class="flex items-center space-x-3">
                        <span class="font-bold text-lg price-highlight">${formatPrice(item.price * item.quantity)}</span>
                        <button onclick="removeFromCart(${item.id})" class="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-all"> ✕ </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    saveCartToLocalStorage();
}

// Remover do carrinho
function removeFromCart(serviceId) {
    const item = cart.find(item => item.id === serviceId);
    cart = cart.filter(item => item.id !== serviceId);
    updateCart();
    showNotification(`${item.name} removido do carrinho!`);
}

// Enviar pedido via WhatsApp
document.getElementById('order-form').addEventListener('submit', function(e) {
    e.preventDefault();
    if (cart.length === 0) {
        showNotification('Adicione pelo menos um item ao carrinho!', 'warning');
        return;
    }
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const cep = document.getElementById('customer-cep').value;
    const street = document.getElementById('customer-street').value;
    const number = document.getElementById('customer-number').value;
    const complement = document.getElementById('customer-complement').value;
    const neighborhood = document.getElementById('customer-neighborhood').value;
    const city = document.getElementById('customer-city').value;
    const state = document.getElementById('customer-state').value;
    const pickupDate = document.getElementById('pickup-date').value;
    const notes = document.getElementById('customer-notes').value;

    if (!pickupDate || !selectedShift) {
        showNotification('Selecione data e turno para coleta!', 'warning');
        return;
    }

    const fullAddress = `${street}, ${number}${complement ? `, ${complement}` : ''} - ${neighborhood}, ${city}/${state} - CEP: ${cep}`;
    const button = document.getElementById('send-order');
    const originalText = button.innerHTML;
    button.innerHTML = `<div class="loading-spinner w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div> <span>Preparando pedido...</span>`;
    button.disabled = true;

    setTimeout(() => {
        const selectedShiftInfo = shifts.find(s => s.id === selectedShift);
        const formattedDate = new Date(pickupDate + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        let message = `🏆 *PEDIDO PREMIUM - LAVANDERIA EXPRESS*\n\n`;
        message += `👤 *Cliente:* ${name}\n`;
        message += `📱 *Telefone:* ${phone}\n`;
        message += `📍 *Endereço de Entrega:*\n${fullAddress}\n\n`;
        message += `📅 *AGENDAMENTO DA COLETA:*\n`;
        message += `• Data: ${formattedDate}\n`;
        message += `• Turno: ${selectedShiftInfo.icon} ${selectedShiftInfo.name} (${selectedShiftInfo.time})\n\n`;
        message += `🛍️ *ITENS SELECIONADOS:*\n`;
        cart.forEach((item, index) => {
            message += `${index + 1}. ${item.icon} *${item.name}*\n`;
            message += ` • Quantidade: ${item.quantity} ${item.unit}\n`;
            message += ` • Valor unitário: ${formatPrice(item.price)}\n`;
            message += ` • Subtotal: *${formatPrice(item.price * item.quantity)}*\n\n`;
        });
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        message += `💰 *VALOR TOTAL: ${formatPrice(total)}*\n`;
        message += `🚚 *Taxa de entrega: GRÁTIS*\n\n`;
        if (notes) {
            message += `📝 *Observações especiais:*\n${notes}\n\n`;
        }
        message += `⏰ *Pedido realizado em:* ${new Date().toLocaleString('pt-BR')}\n`;
        message += `🎯 *Prazo de entrega:* 24 horas\n`;
        message += `✅ *Status:* Aguardando confirmação\n\n`;
        message += `_Obrigado por escolher a Lavanderia Express!_ 🧺✨`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        
        button.innerHTML = originalText;
        button.disabled = false;
        
        window.open(whatsappUrl, '_blank');
        showNotification('Pedido enviado com sucesso!');
    }, 2000);
});

// Funções de agendamento
function isWeekday(date) { const day = date.getDay(); return day >= 1 && day <= 5; }

function isShiftAvailable(shift, selectedDate) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const pickupDate = new Date(selectedDate + 'T00:00:00');
    if (pickupDate > today) return true;
    if (pickupDate.getTime() === today.getTime()) {
        const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();
        const cutoffTime = shift.endHour * 60 - 150;
        return currentTotalMinutes < cutoffTime;
    }
    return false;
}

function renderShiftOptions() {
    const shiftOptions = document.getElementById('shift-options');
    const selectedDate = document.getElementById('pickup-date').value;
    if (!selectedDate) {
        shiftOptions.innerHTML = '<p class="text-gray-500 text-sm">Selecione uma data primeiro</p>';
        return;
    }
    const pickupDate = new Date(selectedDate + 'T00:00:00');
    shiftOptions.innerHTML = shifts.map(shift => {
        const isAvailable = isShiftAvailable(shift, selectedDate);
        const isSelected = selectedShift === shift.id;
        return `
            <div class="shift-option ${isSelected ? 'selected' : ''} ${!isAvailable ? 'disabled' : ''} glass-effect rounded-xl p-4" onclick="${isAvailable ? `selectShift('${shift.id}')` : ''}">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3"><span class="text-2xl">${shift.icon}</span><div><div class="font-semibold text-gray-800">${shift.name}</div><div class="text-sm text-gray-600">${shift.time}</div></div></div>
                    <div class="text-right">${isSelected ? `<div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"><svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg></div>` : `<div class="w-6 h-6 border-2 border-gray-300 rounded-full"></div>`} ${!isAvailable ? `<div class="text-xs text-red-500 mt-1">Indisponível</div>` : ''}</div>
                </div>
            </div>`;
    }).join('');
}

function selectShift(shiftId) {
    selectedShift = shiftId;
    renderShiftOptions();
}

function setupDateValidation() {
    const dateInput = document.getElementById('pickup-date');
    const dateError = document.getElementById('date-error');
    const today = new Date();
    dateInput.min = today.toISOString().split('T')[0];
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    dateInput.max = maxDate.toISOString().split('T')[0];
    dateInput.addEventListener('change', function(e) {
        const selectedDate = new Date(e.target.value + 'T00:00:00');
        if (!isWeekday(selectedDate)) {
            dateError.classList.remove('hidden');
            e.target.value = '';
        } else {
            dateError.classList.add('hidden');
        }
        selectedShift = null;
        renderShiftOptions();
    });
}

// Funções de máscara e validação de formulário
function applyPhoneMask(value) {
    value = value.replace(/\D/g, '');
    if (value.length <= 11) {
        value = value.replace(/(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{4,5})(\d{4})$/, '$1-$2');
    }
    return value;
}

function applyCepMask(value) {
    value = value.replace(/\D/g, '');
    if (value.length <= 8) {
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
    }
    return value;
}

async function searchCep(cep) {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) return null;
    const loading = document.getElementById('cep-loading');
    const error = document.getElementById('cep-error');
    loading.classList.remove('hidden');
    error.classList.add('hidden');
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();
        loading.classList.add('hidden');
        if (data.erro) { error.classList.remove('hidden'); return null; }
        return data;
    } catch (err) {
        loading.classList.add('hidden');
        error.classList.remove('hidden');
        return null;
    }
}

function fillAddressFields(addressData) {
    document.getElementById('customer-street').value = addressData.logradouro || '';
    document.getElementById('customer-neighborhood').value = addressData.bairro || '';
    document.getElementById('customer-city').value = addressData.localidade || '';
    document.getElementById('customer-state').value = addressData.uf || '';
    document.getElementById('customer-number').focus();
    showNotification('Endereço encontrado! Complete com o número.', 'success');
}

function setupFormValidation() {
    const phoneInput = document.getElementById('customer-phone');
    phoneInput.addEventListener('input', e => e.target.value = applyPhoneMask(e.target.value));
    
    const cepInput = document.getElementById('customer-cep');
    cepInput.addEventListener('input', e => e.target.value = applyCepMask(e.target.value));
    cepInput.addEventListener('blur', async e => {
        if (e.target.value.length === 9) {
            const addressData = await searchCep(e.target.value);
            if (addressData) fillAddressFields(addressData);
        }
    });
    cepInput.addEventListener('input', e => {
        if (e.target.value.length < 9) {
            ['customer-street', 'customer-neighborhood', 'customer-city', 'customer-state'].forEach(id => document.getElementById(id).value = '');
            document.getElementById('cep-error').classList.add('hidden');
        }
    });
}

// Inicializar aplicação
function initializeApp() {
    loadCartFromLocalStorage();
    renderTabs();
    renderActiveTabContent();
    updateCart();
    setupDateValidation();
    renderShiftOptions();
    document.documentElement.style.scrollBehavior = 'smooth';
}

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupFormValidation();
});
