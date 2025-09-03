/* ===============================
   Configurações
================================== */

// Número do WhatsApp da LavApp (já configurado)
const WHATS_NUMBER = "5517996430729";

// Cupom disponível (ex.: 10% off primeira compra)
const COUPONS = {
  BEMVINDO10: { type: "percent", value: 10, description: "10% de desconto na 1ª compra" },
};

/* ===============================
   Utilidades
================================== */

const brl = (n) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function maskPhone(v) {
  return v
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{4}).*/, "$1-$2");
}

function maskCEP(v) {
  return v.replace(/\D/g, "").replace(/^(\d{5})(\d)/, "$1-$2").slice(0, 9);
}

function toast(msg, type = "info") {
  const c = document.createElement("div");
  c.textContent = msg;
  c.className =
    "fixed left-1/2 -translate-x-1/2 bottom-6 z-[60] px-4 py-2 rounded-lg text-white " +
    (type === "success"
      ? "bg-emerald-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-gray-800");
  document.body.appendChild(c);
  setTimeout(() => c.remove(), 2500);
}

/* ===============================
   Carrinho
================================== */

let cart = JSON.parse(localStorage.getItem("lavapp_cart") || "[]");
let appliedCoupon = JSON.parse(localStorage.getItem("lavapp_coupon") || "null");

function saveCart() {
  localStorage.setItem("lavapp_cart", JSON.stringify(cart));
}

function saveCoupon() {
  localStorage.setItem("lavapp_coupon", JSON.stringify(appliedCoupon));
}

function addToCart({ id, name, price }) {
  const found = cart.find((i) => i.id === id);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ id, name, price: Number(price), qty: 1 });
  }
  saveCart();
  renderCart();
  toast(`Adicionado: ${name}`, "success");
}

function removeFromCart(id) {
  cart = cart.filter((i) => i.id !== id);
  saveCart();
  renderCart();
}

function changeQty(id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
  } else {
    saveCart();
    renderCart();
  }
}

function calcTotals() {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  let discount = 0;

  if (appliedCoupon) {
    if (appliedCoupon.type === "percent") {
      discount = (appliedCoupon.value / 100) * subtotal;
    } else if (appliedCoupon.type === "value") {
      discount = appliedCoupon.value;
    }
  }

  if (discount > subtotal) discount = subtotal;
  const total = subtotal - discount;

  return { subtotal, discount, total };
}

function renderCart() {
  const container = document.getElementById("cart-items");
  if (!container) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `<p class="text-center text-gray-500">Seu carrinho está vazio. Adicione itens do catálogo.</p>`;
  } else {
    cart.forEach((item) => {
      const row = document.createElement("div");
      row.className =
        "py-3 flex items-center justify-between gap-3 text-sm md:text-base";
      row.innerHTML = `
        <div class="flex-1">
          <strong>${item.name}</strong>
          <div class="text-gray-500">${brl(item.price)} • qtd:
            <button class="px-2 py-0.5 border rounded-md" data-act="dec" data-id="${item.id}">-</button>
            <span class="inline-block min-w-[24px] text-center">${item.qty}</span>
            <button class="px-2 py-0.5 border rounded-md" data-act="inc" data-id="${item.id}">+</button>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="font-bold">${brl(item.price * item.qty)}</div>
          <button class="text-red-600 hover:underline" data-act="del" data-id="${item.id}">Remover</button>
        </div>
      `;
      container.appendChild(row);
    });

    container.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      const id = btn.getAttribute("data-id");
      const act = btn.getAttribute("data-act");
      if (act === "inc") changeQty(id, 1);
      if (act === "dec") changeQty(id, -1);
      if (act === "del") removeFromCart(id);
    }, { once: true });
  }

  const { subtotal, discount, total } = calcTotals();
  document.getElementById("subtotal").textContent = brl(subtotal);
  document.getElementById("discount").textContent = brl(discount);
  document.getElementById("total").textContent = brl(total);
}

/* ===============================
   Cupom
================================== */
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "apply-coupon") {
    const code = document.getElementById("coupon").value.trim().toUpperCase();
    const feedback = document.getElementById("coupon-feedback");
    if (!code) {
      feedback.textContent = "Digite um cupom.";
      return;
    }
    if (!COUPONS[code]) {
      appliedCoupon = null;
      saveCoupon();
      feedback.textContent = "Cupom inválido.";
      renderCart();
      return;
    }
    appliedCoupon = COUPONS[code];
    saveCoupon();
    feedback.textContent = `Aplicado: ${appliedCoupon.description || code}`;
    renderCart();
  }
});

/* ===============================
   Catálogo (botões "Adicionar")
================================== */
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-add");
  if (!btn) return;
  const card = btn.closest(".product");
  if (!card) return;

  addToCart({
    id: card.dataset.id,
    name: card.dataset.name,
    price: card.dataset.price,
  });
});

/* ===============================
   Formulário de pedido
================================== */

const form = document.getElementById("order-form");
if (form) {
  const nome = document.getElementById("nome");
  const telefone = document.getElementById("telefone");
  const cep = document.getElementById("cep");
  const endereco = document.getElementById("endereco");
  const numero = document.getElementById("numero");
  const bairro = document.getElementById("bairro");
  const complemento = document.getElementById("complemento");
  const observacoes = document.getElementById("observacoes");
  const cepFeedback = document.getElementById("cep-feedback");

  // Máscaras
  telefone.addEventListener("input", () => {
    telefone.value = maskPhone(telefone.value);
  });
  cep.addEventListener("input", () => {
    cep.value = maskCEP(cep.value);
  });

  // ViaCEP
  let cepTimer;
  cep.addEventListener("input", () => {
    clearTimeout(cepTimer);
    cepTimer = setTimeout(async () => {
      const onlyDigits = cep.value.replace(/\D/g, "");
      if (onlyDigits.length !== 8) return;
      cepFeedback.textContent = "Buscando endereço...";
      try {
        const res = await fetch(`https://viacep.com.br/ws/${onlyDigits}/json/`);
        const data = await res.json();
        if (data.erro) {
          cepFeedback.textContent = "CEP não encontrado.";
          return;
        }
        endereco.value = `${data.logradouro || ""}`.trim();
        bairro.value = `${data.bairro || ""}`.trim();
        cepFeedback.textContent = `${data.localidade || ""} - ${data.uf || ""}`;
      } catch {
        cepFeedback.textContent = "Não foi possível buscar o CEP.";
      }
    }, 400);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast("Adicione itens ao carrinho antes de enviar.", "error");
      return;
    }

    const { subtotal, discount, total } = calcTotals();
    const itemsStr = cart
      .map((i) => `• ${i.name} x${i.qty} — ${brl(i.price * i.qty)}`)
      .join("%0A");

    const addressStr = `${endereco.value}, ${numero.value}${bairro.value ? " — " + bairro.value : ""}${
      complemento.value ? " (" + complemento.value + ")" : ""
    } — CEP ${cep.value} — São José do Rio Preto/SP`;

    const msg =
      `*Novo pedido — LavApp*%0A%0A` +
      `*Cliente:* ${encodeURIComponent(nome.value)}%0A` +
      `*Telefone:* ${encodeURIComponent(telefone.value)}%0A` +
      `*Itens:*%0A${encodeURIComponent(itemsStr)}%0A%0A` +
      `*Subtotal:* ${encodeURIComponent(brl(subtotal))}%0A` +
      `*Desconto:* ${encodeURIComponent(brl(discount))}%0A` +
      `*Total:* ${encodeURIComponent(brl(total))}%0A%0A` +
      `*Endereço:* ${encodeURIComponent(addressStr)}%0A` +
      `*Observações:* ${encodeURIComponent(observacoes.value || "-")}`;

    const url = `https://wa.me/${WHATS_NUMBER}?text=${msg}`;
    window.open(url, "_blank");
  });
}

/* ===============================
   CTA WhatsApp (atalhos)
================================== */
function openWhatsBlank() {
  const url = `https://wa.me/${WHATS_NUMBER}`;
  window.open(url, "_blank");
}
document.getElementById("cta-hero-whatsapp")?.addEventListener("click", openWhatsBlank);
document.getElementById("cta-footer-whatsapp")?.addEventListener("click", openWhatsBlank);
document.getElementById("floating-whatsapp")?.addEventListener("click", openWhatsBlank);

/* ===============================
   Modal: Política / Termos
================================== */
function openModal(contentHTML) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modal-content");
  content.innerHTML = contentHTML;
  modal.classList.add("show");
  modal.classList.remove("hidden");
}
function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("show");
  setTimeout(() => modal.classList.add("hidden"), 50);
}
window.closeModal = closeModal;

window.showPrivacyPolicy = (e) => {
  e?.preventDefault();
  openModal(`
    <h2 class="text-2xl font-bold">Política de Privacidade</h2>
    <p>Levamos sua privacidade a sério. Coletamos apenas dados necessários para processar pedidos, realizar coletas/entregas e prestar atendimento.</p>
    <ul class="list-disc pl-5">
      <li><strong>Dados coletados:</strong> nome, telefone, endereço (via CEP), itens do pedido.</li>
      <li><strong>Finalidade:</strong> execução do serviço e comunicação com o cliente.</li>
      <li><strong>Compartilhamento:</strong> não compartilhamos dados com terceiros, salvo exigência legal.</li>
      <li><strong>Segurança:</strong> armazenamento em ambiente controlado e acesso restrito.</li>
      <li><strong>Direitos:</strong> você pode solicitar atualização ou exclusão dos seus dados.</li>
    </ul>
    <p>Ao utilizar a LavApp, você concorda com esta Política conforme a LGPD.</p>
  `);
};

window.showTermsOfService = (e) => {
  e?.preventDefault();
  openModal(`
    <h2 class="text-2xl font-bold">Termos de Serviço</h2>
    <p>Ao realizar um pedido, você concorda com as condições abaixo:</p>
    <ul class="list-disc pl-5">
      <li><strong>Coleta e entrega:</strong> realizadas em São José do Rio Preto, em horários combinados.</li>
      <li><strong>Prazo:</strong> estimado de até 48h para itens comuns. Itens especiais podem demandar prazo adicional.</li>
      <li><strong>Responsabilidade:</strong> eventuais avarias serão analisadas e ressarcidas conforme avaliação técnica.</li>
      <li><strong>Pagamento:</strong> Pix, cartão ou link de pagamento.</li>
      <li><strong>Cancelamento:</strong> pode ser solicitado até 1h antes do horário agendado de coleta.</li>
    </ul>
  `);
};

/* ===============================
   Ajudas e inicialização
================================== */

document.getElementById("ano").textContent = new Date().getFullYear();
renderCart();

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
document.getElementById("modal")?.addEventListener("click", (e) => {
  if (e.target.id === "modal") closeModal();
});

