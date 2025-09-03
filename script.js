// =================================================================================
// ⚙️ CONFIGURAÇÕES GERAIS
// =================================================================================
const WHATSAPP_NUMBER = '5517996430729'; // Número oficial

// Cupom inicial
const coupons = {
  'BEMVINDO10': { type: 'percentage', value: 0.10, description: '10% de desconto de boas-vindas!' }
};

// =================================================================================
// 🧭 ESTADO / VARIÁVEIS GLOBAIS
// =================================================================================
let cart = [];
let currentCategory = 'planos';
let isSubmitting = false;
let appliedCoupon = null;
let serviceCategories = {}; // Este objeto será preenchido pelo catalog.json

// =================================================================================
// 🚀 INICIALIZAÇÃO DA APLICAÇÃO
// =================================================================================
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Carrega o catálogo de serviços do arquivo JSON
    const response = await fetch('catalog.json');
    if (!response.ok) throw new Error('Falha ao carregar o catálogo de serviços.');
    serviceCategories = await response.json();
    
    // Continua com a inicialização padrão
    cart = JSON.parse(localStorage.getItem('lavapp-cart')) || [];
    setupEventListeners();
    showCatalogCategory('planos');
    updateCartDisplay();
    if (cart.length > 0) showCartFloat();
    document.getElementById('ano').textContent = new Date().getFullYear();

  } catch (error) {
    console.error(error);
    document.getElementById('main-content').innerHTML = '<p class="text-center text-red-600 font-semibold p-8">Desculpe, ocorreu um erro ao carregar nossos serviços. Por favor, recarregue a página.</p>';
  }
});

// =================================================================================
// 🔗 AÇÕES E EVENTOS PRINCIPAIS
// =================================================================================
function setupEventListeners() {
  document.getElementById('order-form').addEventListener('submit', handleFormSubmit);
  document.getElementById('cart-modal').addEventListener('click', e => { if (e.target.id === 'cart-modal') toggleCart(); });
  setupDatePicker();
  setupMasks();
  setupCEPLookup();
}

// Abre o WhatsApp para contato direto
function openWhatsApp() {
  window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank');
}

// =================================================================================
// 🗂️ LÓGICA DO CATÁLOGO
// =================================================================================
function showCatalogCategory(category) {
  currentCategory = category;
  const buttons = document.querySelectorAll('.nav-pill');
  buttons.forEach(btn => btn.classList.remove('active'));
  
  const categoryMap = { 'planos': 0, 'avulsos': 1, 'especiais': 2 };
  const idx = categoryMap[category];
  
  if (idx !== undefined && buttons[idx]) {
    buttons[idx].classList.add('active');
  }
  
  renderCategory(category);
}

function renderCategory(category) {
  const mainContent = document.getElementById('main-content');
  const categoryData = serviceCategories[category];

  if (!categoryData) {
    mainContent.innerHTML = '';
    return;
  }

  let html = `
    <div class="text-center mb-12">
      <h2 class="section-title">${categoryData.title}</h2>
      <p class="text-gray-600">${categoryData.subtitle}</p>
    </div>
  `;

  if (category === 'planos') {
    const mainPlans = categoryData.services.slice(0, 3);
    const extras = categoryData.services.slice(3);
    html += '<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">';
    mainPlans.forEach(s => html += generateServiceCard(s));
    html += '</div>';
    if(extras.length > 0) {
      html += '<div class="grid grid-cols-1 md:grid-cols-2 gap-8">';
      extras.forEach(s => html += generateServiceCard(s));
      html += '</div>';
    }
  } else {
    const cols = category === 'avulsos' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2';
    html += `<div class="grid grid-cols-1 ${cols} gap-8">`;
    categoryData.services.forEach(s => html += generateServiceCard(s));
    html += '</div>';
  }

  mainContent.innerHTML = html;
}

function generateServiceCard(service) {
  const hasDiscount = service.originalPrice && service.originalPrice > service.price;
  return `
  <div class="card-premium p-8 relative">
    ${service.popular ? '<div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-soft">✨ MAIS POPULAR</div>' : ''}
    ${service.isNew ? '<div class="absolute -top-4 right-4 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide">🆕 NOVO</div>' : ''}

    ${service.problem ? `<div class="mb-4"><p class="text-sm font-medium text-gray-500 mb-1">${service.problem}</p><p class="text-sm font-bold text-blue-600">${service.solution}</p></div>` : ''}

    <h3 class="text-2xl font-extrabold text-gray-900 mb-1 ${service.popular || service.isNew ? 'mt-4' : ''}">${service.name}</h3>
    ${service.tagline ? `<p class="text-base font-semibold text-indigo-600 mb-4">${service.tagline}</p>` : ''}

    <div class="mb-5">
      <div class="flex items-baseline gap-3">
        <span class="text-4xl font-extrabold text-blue-600">R$ ${service.price.toFixed(2).replace('.',',')}</span>
        ${hasDiscount ? `<span class="text-gray-500 line-through text-lg">R$ ${service.originalPrice.toFixed(2).replace('.',',')}</span>` : ''}
      </div>
      <span class="text-gray-600 text-sm">por ${service.unit}</span>
      ${service.savings ? `<div class="mt-2"><span class="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">${service.savings}</span></div>` : ''}
    </div>

    <p class="text-gray-600 mb-5 leading-relaxed">${service.description}</p>

    ${service.features ? `
      <ul class="text-sm text-gray-700 mb-6 space-y-2">
        ${service.features.map(f => `<li class="flex items-center"><svg class="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>${f}</li>`).join('')}
      </ul>` : ''}

    <button onclick="addToCart(event, '${service.name.replace(/'/g,"\\'")}', ${service.price}, '${service.unit}')" class="btn-cta-primary w-full">
      Adicionar ao Pedido
    </button>
  </div>`;
}

// =================================================================================
/* 🛒 LÓGICA DO CARRINHO */
// =================================================================================
function addToCart(event, name, price, unit) {
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, unit, quantity: 1 });
  }
  updateCartDisplay();

  // Anima o carrinho flutuante
  const cartFloatEl = document.getElementById('cart-float');
  if (!cartFloatEl.classList.contains('hidden')) {
    cartFloatEl.classList.add('is-updating');
    setTimeout(() => cartFloatEl.classList.remove('is-updating'), 300);
  }

  // Feedback visual no botão de adicionar
  const btn = event.target;
  const originalText = 'Adicionar ao Pedido';
  btn.textContent = '✓ Adicionado!';
  btn.style.filter = 'brightness(1.05)';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.filter = '';
    btn.disabled = false;
  }, 1600);
}

function updateQuantity(index, delta) {
  if (!cart[index]) return;
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
    showNotification('Item removido do carrinho.', 'info');
  }
  updateCartDisplay();
}

function clearCart() {
  if (cart.length > 0 && confirm('Tem certeza que deseja limpar todos os itens do carrinho?')) {
    cart = [];
    appliedCoupon = null;
    updateCartDisplay();
    showNotification('🗑️ Carrinho esvaziado!', 'success');
  }
}

function toggleCart() {
  document.getElementById('cart-modal').classList.toggle('hidden');
}

// ATUALIZADO: Funções para mostrar/esconder o carrinho com animação
function showCartFloat() {
  const cartFloatEl = document.getElementById('cart-float');
  cartFloatEl.classList.remove('hidden');
  setTimeout(() => cartFloatEl.classList.add('show'), 100);
}
function hideCartFloat() {
  const cartFloatEl = document.getElementById('cart-float');
  cartFloatEl.classList.remove('show');
  cartFloatEl.classList.add('hidden');
}

function saveCartToLocalStorage() {
  localStorage.setItem('lavapp-cart', JSON.stringify(cart));
}

function updateCartDisplay() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');
  let subtotal = 0;
  let totalItems = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="text-center text-gray-500 py-8">Seu carrinho está vazio.</p>';
    hideCartFloat();
  } else {
    cartItemsContainer.innerHTML = cart.map((item, i) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      totalItems += item.quantity;
      return `
        <div class="flex justify-between items-center p-4 bg-white rounded-2xl border border-slate-200/80">
          <div class="flex-1 pr-4">
            <h4 class="font-semibold text-gray-900">${item.name}</h4>
            <p class="text-sm text-gray-600">
