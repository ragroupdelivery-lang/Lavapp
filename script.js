// =================================================================================
// ⚙️ CONFIGURAÇÕES GERAIS
// =================================================================================
const WHATSAPP_NUMBER = '5517996430729'; // ✅ NÚMERO REAL APLICADO

// =================================================================================
// 📦 CATÁLOGO DE SERVIÇOS
// =================================================================================
const serviceCategories = {
    planos: {
        title: "Planos Mensais", subtitle: "A solução perfeita para cada estilo de vida", services: [
            { id: 1, name: "Plano SOLO", tagline: "Ideal para quem mora sozinho", price: 169.90, originalPrice: 199.90, unit: "mês", description: "4 recolhas mensais. Suas roupas são tratadas com sabão Omo Profissional e finalizadas com o toque suave de Comfort.", features: ["4 recolhas mensais", "Até 8kg por cesto", "Omo Profissional + Comfort", "Entrega grátis na sua porta"], problem: "Mora sozinho e quer praticidade?", solution: "Este plano foi feito para você!", savings: "Economize R$ 30" },
            { id: 2, name: "Plano DUO", tagline: "Perfeito para casais ativos", price: 259.90, originalPrice: 299.90, unit: "mês", description: "6 recolhas mensais. Utilizamos Omo Profissional e Comfort para garantir que suas roupas estejam sempre impecáveis.", features: ["6 recolhas mensais", "Até 8kg por cesto", "Omo Profissional + Comfort", "Entrega grátis", "Suporte prioritário"], popular: true, problem: "Casal com agenda corrida?", solution: "Mais tempo para vocês dois!", savings: "Economize R$ 40" },
            { id: 3, name: "Plano INFINITY", tagline: "A solução para famílias grandes", price: 329.90, originalPrice: 399.90, unit: "mês", description: "8 recolhas mensais com a qualidade Omo Profissional e Comfort para cuidar das roupas de quem você ama.", features: ["8 recolhas mensais", "Até 8kg por cesto", "Omo Profissional + Comfort", "Entrega grátis", "Suporte VIP 24h", "Desconto em serviços extras"], problem: "Família grande, muita roupa?", solution: "Tranquilidade para toda família!", savings: "Economize R$ 70" },
            { id: 4, name: "Ciclo Extra com Desconto", tagline: "Para quando você precisa de mais", price: 7.50, originalPrice: 15.00, unit: "ciclo", description: "Exclusivo para assinantes! Adicione ciclos extras com 50% de desconto." },
            { id: 5, name: "Cuidado Hipoalergênico", tagline: "Especial para peles sensíveis", price: 10.00, unit: "ciclo", description: "Substituímos o amaciante padrão pelo Comfort Puro Cuidado, dermatologicamente testado." }
        ]
    },
    avulsos: {
        title: "Serviços Avulsos", subtitle: "Soluções pontuais para suas necessidades específicas", services: [
            { id: 6, name: "Cesto Base (Lavar & Dobrar)", tagline: "O essencial para sua semana", price: 44.90, unit: "cesto", description: "Até 8kg de roupas tratadas com Omo Profissional e Comfort.", features: ["Até 8kg de roupas", "Omo Profissional + Comfort", "Secagem controlada", "Dobra cuidadosa"], problem: "Precisa lavar roupas pontualmente?", solution: "Solução rápida e eficiente!" },
            { id: 17, name: "Ciclo Adicional de Cuidado", tagline: "Cores e tecidos tratados separadamente", price: 15.00, unit: "ciclo", description: "Adicione um ciclo de lavagem extra ao seu Cesto Base para separar peças brancas, pretas, coloridas ou delicadas.", problem: "Quer separar roupas por tipo?", solution: "Adicione um ciclo e relaxe!", isNew: true },
            { id: 16, name: "Tratamento Tira-Manchas", tagline: "Para manchas que parecem impossíveis", price: 14.90, unit: "tratamento", description: "Tratamento intensivo com Vanish Oxi Action para remover manchas difíceis e revitalizar o branco." },
            { id: 8, name: "Cuidado Hipoalergênico", price: 15.00, unit: "cesto", description: "Lavagem completa com Comfort Puro Cuidado. Ideal para peles sensíveis, bebês e pessoas com alergias." },
            { id: 9, name: "Passadoria: 5 Peças", price: 19.90, unit: "serviço", description: "Adicione a passadoria profissional para receber suas peças prontas para usar." },
            { id: 10, name: "Passadoria: 10 Peças", price: 34.90, unit: "serviço", description: "Adicione a passadoria profissional para receber suas peças prontas para usar." },
            { id: 11, name: "Passadoria: 20 Peças", price: 58.90, unit: "serviço", description: "Adicione a passadoria profissional para receber suas peças prontas para usar." }
        ]
    },
    especiais: {
        title: "Cuidados Especiais", subtitle: "Tratamento premium para suas peças mais queridas", services: [
            { id: 12, name: "Edredom/Cobertor (Casal/Queen)", tagline: "Higiene profunda para noites perfeitas", price: 44.90, unit: "peça", description: "Higienização com Omo Profissional. Entregue em embalagem protetora de PVC.", features: ["Higienização com Omo Profissional", "Eliminação de ácaros", "Secagem especial", "Embalagem protetora de PVC"], problem: "Edredom com cheiro ou ácaros?", solution: "Higiene profunda e proteção!" },
            { id: 13, name: "Edredom/Cobertor (King)", tagline: "Cuidado especial para peças grandes", price: 79.90, unit: "peça", description: "Tratamento premium com Omo Profissional e embalagem protetora de PVC." },
            { id: 14, name: "Jogo de Cama", tagline: "Frescor para noites perfeitas", price: 39.90, unit: "jogo", description: "Lavagem completa com o cuidado de Omo e Comfort." },
            { id: 15, name: "Lavagem de Toalhas", tagline: "Maciez e absorção renovadas", price: 39.90, unit: "kit", description: "Kit com 2 toalhas de corpo + 4 de rosto. Processo especial com Omo e Comfort." }
        ]
    }
};

const coupons = { 'BEMVINDO10': { type: 'percentage', value: 0.10, description: '10% de desconto de boas-vindas!' } };

// Restante do seu código JavaScript, exatamente como o anterior...
// ... (as funções de carrinho, formulário, etc. permanecem as mesmas) ...

// ✅ FUNÇÕES LEGAIS ATUALIZADAS (com disclaimer)
function showLegalModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-60 z-50 backdrop-blur-sm flex items-center justify-center p-6';
    modal.onclick = (e) => { if(e.target === modal) modal.remove(); };
    modal.innerHTML = `
        <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div class="p-8">
                <div class="flex justify-between items-center mb-8">
                    <h2 class="text-3xl font-bold text-gray-800">${title}</h2>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600 text-3xl">&times;</button>
                </div>
                <div class="prose max-w-none text-gray-600 space-y-4">
                    ${content}
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function showPrivacyPolicy(event) {
    event.preventDefault();
    const title = 'Política de Privacidade';
    const content = `
        <p class="text-sm text-red-600 font-semibold">AVISO: Este é um texto genérico. Recomenda-se a revisão por um profissional.</p>
        <h3 class="text-xl font-semibold text-gray-800">1. Coleta de Informações</h3>
        <p>Coletamos informações que você nos fornece diretamente para processar seu pedido, como nome, telefone e endereço.</p>
        <h3 class="text-xl font-semibold text-gray-800">2. Uso das Informações</h3>
        <p>Suas informações são usadas exclusivamente para a prestação dos nossos serviços de coleta, lavagem e entrega. Não compartilhamos seus dados com terceiros.</p>
        <h3 class="text-xl font-semibold text-gray-800">3. Seus Direitos</h3>
        <p>Você pode solicitar a visualização ou exclusão dos seus dados a qualquer momento entrando em contato conosco.</p>
        <p class="text-sm text-gray-500 mt-8">Última atualização: Setembro 2025</p>
    `;
    showLegalModal(title, content);
}

function showTermsOfService(event) {
    event.preventDefault();
    const title = 'Termos de Serviço';
    const content = `
        <p class="text-sm text-red-600 font-semibold">AVISO: Este é um texto genérico. Recomenda-se a revisão por um profissional.</p>
        <h3 class="text-xl font-semibold text-gray-800">1. Nossos Serviços</h3>
        <p>Nos comprometemos a tratar suas roupas com o máximo cuidado, utilizando produtos profissionais e as melhores práticas de lavanderia.</p>
        <h3 class="text-xl font-semibold text-gray-800">2. Pagamento</h3>
        <p>O pagamento dos serviços é realizado no momento da entrega, via PIX, dinheiro ou cartão, salvo em casos de planos mensais com acerto prévio.</p>
        <h3 class="text-xl font-semibold text-gray-800">3. Garantia de Satisfação</h3>
        <p>Sua satisfação é nossa garantia. Caso não fique satisfeito com algum serviço, entre em contato em até 24h para que possamos encontrar uma solução.</p>
        <p class="text-sm text-gray-500 mt-8">Última atualização: Setembro 2025</p>
    `;
    showLegalModal(title, content);
}

// ... (Restante de todo o código JavaScript que já tínhamos) ...
