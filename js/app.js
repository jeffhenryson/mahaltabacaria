/* ==========================================================================
   Mahal Tabacaria — Web App Mobile-First
   JavaScript Vanilla · Estado global do carrinho · Checkout via WhatsApp
   ========================================================================== */

'use strict';

/* --------------------------------------------------------------------------
   CONFIGURAÇÃO — edite aqui o número do WhatsApp (padrão Meta: DDI+DDD+número)
   -------------------------------------------------------------------------- */
const WHATSAPP_NUMBER = '5583996697177';

/* --------------------------------------------------------------------------
   ARTES DOS PRODUTOS (SVG inline, geometria limpa na paleta Mahal)
   -------------------------------------------------------------------------- */
const ART = {
  pod: (a, b) => `
    <svg viewBox="0 0 120 120" class="w-full h-full">
      <rect x="44" y="22" width="32" height="78" rx="12" fill="${a}"/>
      <rect x="50" y="14" width="20" height="12" rx="5" fill="${b}"/>
      <rect x="51" y="34" width="18" height="30" rx="6" fill="#FFEBDB" opacity="0.85"/>
      <rect x="51" y="72" width="18" height="4" rx="2" fill="#FFEBDB" opacity="0.4"/>
      <rect x="51" y="80" width="18" height="4" rx="2" fill="#FFEBDB" opacity="0.4"/>
      <circle cx="60" cy="92" r="2.6" fill="#FFEBDB" opacity="0.7"/>
    </svg>`,

  seda: (a, b) => `
    <svg viewBox="0 0 120 120" class="w-full h-full">
      <rect x="26" y="30" width="60" height="66" rx="7" fill="${a}"/>
      <path d="M26 44h60v-7a7 7 0 0 0-7-7H33a7 7 0 0 0-7 7v7Z" fill="${b}"/>
      <rect x="36" y="56" width="40" height="4" rx="2" fill="#FFEBDB" opacity="0.75"/>
      <rect x="36" y="66" width="28" height="4" rx="2" fill="#FFEBDB" opacity="0.5"/>
      <path d="M74 26l22 10-6 46-16-8V26Z" fill="#FFEBDB" opacity="0.92"/>
      <path d="M74 26l22 10-3 5-19-8v-7Z" fill="${b}" opacity="0.55"/>
    </svg>`,

  essencia: (a, b) => `
    <svg viewBox="0 0 120 120" class="w-full h-full">
      <ellipse cx="60" cy="90" rx="34" ry="9" fill="${b}" opacity="0.35"/>
      <rect x="28" y="42" width="64" height="48" rx="10" fill="${a}"/>
      <rect x="28" y="34" width="64" height="16" rx="8" fill="${b}"/>
      <rect x="38" y="56" width="44" height="24" rx="6" fill="#FFEBDB" opacity="0.9"/>
      <path d="M52 74c0-7 4-9 8-13 4 4 8 6 8 13a8 8 0 0 1-16 0Z" fill="${a}"/>
    </svg>`,

  dichavador: (a, b) => `
    <svg viewBox="0 0 120 120" class="w-full h-full">
      <ellipse cx="60" cy="46" rx="34" ry="14" fill="${b}"/>
      <path d="M26 46v14c0 7.7 15.2 14 34 14s34-6.3 34-14V46" fill="${a}"/>
      <ellipse cx="60" cy="46" rx="26" ry="10" fill="#FFEBDB" opacity="0.28"/>
      <path d="M26 72v14c0 7.7 15.2 14 34 14s34-6.3 34-14V72" fill="${b}"/>
      <ellipse cx="60" cy="72" rx="34" ry="14" fill="${a}"/>
      <circle cx="48" cy="45" r="3" fill="${a}"/>
      <circle cx="66" cy="42" r="3" fill="${a}"/>
      <circle cx="60" cy="50" r="3" fill="${a}"/>
    </svg>`,

  isqueiro: (a, b) => `
    <svg viewBox="0 0 120 120" class="w-full h-full">
      <rect x="44" y="34" width="32" height="70" rx="9" fill="${a}"/>
      <rect x="44" y="34" width="32" height="20" rx="9" fill="${b}"/>
      <rect x="50" y="62" width="20" height="30" rx="5" fill="#FFEBDB" opacity="0.85"/>
      <circle cx="60" cy="30" r="6" fill="${b}"/>
      <path d="M60 6c5 6.5 8 10.4 8 14.6A8 8 0 0 1 52 20.6C52 16.4 55 12.5 60 6Z" fill="${a}"/>
      <path d="M60 12.5c2.6 3.4 4 5.6 4 7.9a4 4 0 0 1-8 0c0-2.3 1.4-4.5 4-7.9Z" fill="#FFEBDB" opacity="0.8"/>
    </svg>`,

  carvao: (a, b) => `
    <svg viewBox="0 0 120 120" class="w-full h-full">
      <path d="M60 18l17 10v20L60 58 43 48V28l17-10Z" fill="${a}"/>
      <path d="M60 18l17 10-17 10-17-10 17-10Z" fill="${b}" opacity="0.65"/>
      <path d="M37 56l17 10v20L37 96 20 86V66l17-10Z" fill="${b}"/>
      <path d="M37 56l17 10-17 10-17-10 17-10Z" fill="${a}" opacity="0.5"/>
      <path d="M83 56l17 10v20L83 96 66 86V66l17-10Z" fill="${a}"/>
      <path d="M83 56l17 10-17 10-17-10 17-10Z" fill="${b}" opacity="0.65"/>
    </svg>`,

  piteira: (a, b) => `
    <svg viewBox="0 0 120 120" class="w-full h-full">
      <rect x="20" y="52" width="80" height="16" rx="8" transform="rotate(-18 60 60)" fill="${a}"/>
      <rect x="20" y="52" width="26" height="16" rx="8" transform="rotate(-18 60 60)" fill="${b}"/>
      <rect x="34" y="56" width="52" height="4" rx="2" transform="rotate(-18 60 60)" fill="#FFEBDB" opacity="0.55"/>
      <circle cx="94" cy="44" r="5" fill="${b}" opacity="0.5"/>
      <circle cx="103" cy="35" r="3" fill="${b}" opacity="0.35"/>
    </svg>`,
};

/* --------------------------------------------------------------------------
   CATÁLOGO DE PRODUTOS
   -------------------------------------------------------------------------- */
const CATEGORIES = [
  { id: 'todos',          label: 'Todos' },
  { id: 'essencias',      label: 'Essências' },
  { id: 'sedas',          label: 'Sedas' },
  { id: 'vaporizadores',  label: 'Vaporizadores' },
  { id: 'acessorios',     label: 'Acessórios' },
];

const PRODUCTS = [
  { id: 1,  name: 'Pod Descartável Ignite V50 (Menthol)',          price: 89.90,  category: 'vaporizadores', art: 'pod',        tint: '#EAD9CF', a: '#662626', b: '#825B3E',
    desc: 'Vape descartável com até 5000 puffs e sabor menthol gelado. Bateria de longa duração, compacto e pronto para usar direto da embalagem.' },
  { id: 2,  name: 'Seda Smoking Deluxe King Size (C/ Piteira)',    price: 12.00,  category: 'sedas',         art: 'seda',       tint: '#F0DFC8', a: '#825B3E', b: '#662626',
    desc: 'Seda King Size ultrafina de origem espanhola, com queima lenta e uniforme. Acompanha piteiras de papel para um acabamento perfeito.' },
  { id: 3,  name: 'Essência Nay Vision 50g',                       price: 14.50,  category: 'essencias',     art: 'essencia',   tint: '#EBD8D0', a: '#662626', b: '#825B3E',
    desc: 'Essência premium de melaço suave e fumaça densa. Sabor marcante e duradouro, ideal para longas sessões de narguilé.' },
  { id: 4,  name: 'Dichavador de Metal Premium Mahal Pro',         price: 55.00,  category: 'acessorios',    art: 'dichavador', tint: '#E9DECE', a: '#825B3E', b: '#5D5B4C',
    desc: 'Dichavador de liga metálica com quatro câmaras, dentes afiados e coletor de pólen. Acabamento resistente da linha exclusiva Mahal.' },
  { id: 5,  name: 'Isqueiro Clipper Recarregável Colecionável',    price: 16.00,  category: 'acessorios',    art: 'isqueiro',   tint: '#F0DCC6', a: '#662626', b: '#825B3E',
    desc: 'Isqueiro Clipper original recarregável, com pedra removível que também funciona como socador. Edição colecionável e durável.' },
  { id: 6,  name: 'Carvão de Coco para Narguilé Hexagonal 1kg',    price: 34.00,  category: 'acessorios',    art: 'carvao',     tint: '#E7DAD2', a: '#5D5B4C', b: '#825B3E',
    desc: 'Carvão de coco 100% natural no formato hexagonal. Acende rápido, não solta faísca e mantém a brasa estável por mais tempo. Pacote de 1kg.' },
  { id: 7,  name: 'Essência Adalya Love 66 50g',                   price: 15.90,  category: 'essencias',     art: 'essencia',   tint: '#F0DCC6', a: '#825B3E', b: '#662626',
    desc: 'Blend frutado da Adalya com notas cítricas e refrescantes. Fumaça abundante e aroma envolvente, um dos sabores mais pedidos.' },
  { id: 8,  name: 'Essência Zomo Strong Mint 50g',                 price: 13.90,  category: 'essencias',     art: 'essencia',   tint: '#E4DFD0', a: '#5D5B4C', b: '#825B3E',
    desc: 'Menta forte e gelada da linha Strong da Zomo. Intensidade elevada para quem gosta de um sabor marcante e refrescante.' },
  { id: 9,  name: 'Seda OCB Organic Slim King Size',               price: 9.50,   category: 'sedas',         art: 'seda',       tint: '#EBD8D0', a: '#662626', b: '#5D5B4C',
    desc: 'Seda de cânhamo orgânico OCB, sem alvejantes e ultrafina. Queima natural e sabor puro, para uma experiência mais ecológica.' },
  { id: 10, name: 'Pod Descartável Oxbar G8000 (Grape Ice)',       price: 119.90, category: 'vaporizadores', art: 'pod',        tint: '#E9DECE', a: '#825B3E', b: '#662626',
    desc: 'Descartável Oxbar com até 8000 puffs e sabor uva gelada. Tela indicadora de bateria e nível de líquido, recarregável via USB-C.' },
  { id: 11, name: 'Piteira de Vidro Mahal Glass Cristal',          price: 25.00,  category: 'acessorios',    art: 'piteira',    tint: '#EAD9CF', a: '#825B3E', b: '#662626',
    desc: 'Piteira de vidro borossilicato reutilizável que filtra melhor e realça o sabor. Fácil de limpar, resistente e ecológica.' },
  { id: 12, name: 'Seda Bem Bolado Celulose Transparente',         price: 10.00,  category: 'sedas',         art: 'seda',       tint: '#E4DFD0', a: '#5D5B4C', b: '#662626',
    desc: 'Seda de celulose transparente, praticamente sem cinzas e com sabor neutro. Queima lenta e limpa, do início ao fim.' },
];

const CATEGORY_ICONS = {
  essencias: 'essencia',
  sedas: 'seda',
  vaporizadores: 'pod',
  acessorios: 'dichavador',
};

/* --------------------------------------------------------------------------
   ESTADO GLOBAL
   -------------------------------------------------------------------------- */
const state = {
  view: 'home',                                   // home | categories | cart | about
  filter: 'todos',
  query: '',                                      // texto da busca na Home
  sheetProduct: null,                             // id do produto aberto no detalhe
  cart: new Map(),                                // productId -> quantidade
};

const STORAGE_KEY = 'mahal-cart-v1';

function persistCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.cart]));
}

function restoreCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved)) {
      saved.forEach(([id, qty]) => {
        if (PRODUCTS.some((p) => p.id === id) && Number.isInteger(qty) && qty > 0) {
          state.cart.set(id, qty);
        }
      });
    }
  } catch {
    /* carrinho corrompido: inicia vazio */
  }
}

/* --------------------------------------------------------------------------
   UTILITÁRIOS
   -------------------------------------------------------------------------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const formatBRL = (value) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const cartCount = () => [...state.cart.values()].reduce((sum, q) => sum + q, 0);

const cartSubtotal = () =>
  [...state.cart.entries()].reduce((sum, [id, qty]) => {
    const product = PRODUCTS.find((p) => p.id === id);
    return sum + product.price * qty;
  }, 0);

/* --------------------------------------------------------------------------
   NAVEGAÇÃO ENTRE VIEWS (abas)
   -------------------------------------------------------------------------- */
function goTo(view) {
  state.view = view;

  $$('[data-view]').forEach((section) => {
    const isTarget = section.id === `view-${view}`;
    section.classList.toggle('hidden', !isTarget);
    if (isTarget) {
      // Reinicia a animação de entrada da view
      section.classList.remove('view');
      void section.offsetWidth;
      section.classList.add('view');
    }
  });

  $$('.nav-btn').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.goto === view);
  });

  if (view === 'cart') renderCart();
  $('#screen').scrollTo({ top: 0 });
}

/* --------------------------------------------------------------------------
   RENDERIZAÇÃO — CHIPS DE CATEGORIA (Home)
   -------------------------------------------------------------------------- */
function renderChips() {
  $('#chip-bar').innerHTML = CATEGORIES.map(
    (cat) => `
      <button class="chip ${state.filter === cat.id ? 'is-active' : ''}" data-filter="${cat.id}">
        ${cat.label}
      </button>`
  ).join('');
}

function setFilter(filterId) {
  state.filter = filterId;
  renderChips();
  renderProducts();
}

/* --------------------------------------------------------------------------
   RENDERIZAÇÃO — VITRINE DE PRODUTOS
   -------------------------------------------------------------------------- */
function getVisibleProducts() {
  let list =
    state.filter === 'todos'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === state.filter);

  const q = state.query.trim().toLowerCase();
  if (q) list = list.filter((p) => p.name.toLowerCase().includes(q));
  return list;
}

/* Ação do card: botão "Adicionar" ou o seletor de quantidade se já no carrinho */
function cardActionHTML(product) {
  const qty = state.cart.get(product.id) || 0;

  if (qty > 0) {
    return `
      <div class="flex items-center justify-between h-10 rounded-full bg-mahal-primary text-mahal-cream overflow-hidden shadow-md shadow-mahal-primary/20">
        <button data-dec="${product.id}" aria-label="Diminuir quantidade"
                class="w-10 h-full flex items-center justify-center transition-all duration-300 hover:bg-mahal-deep active:scale-90">
          <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M5 12h14"/></svg>
        </button>
        <span class="text-sm font-extrabold select-none">${qty}</span>
        <button data-inc="${product.id}" aria-label="Aumentar quantidade"
                class="w-10 h-full flex items-center justify-center transition-all duration-300 hover:bg-mahal-deep active:scale-90">
          <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>`;
  }

  return `
    <button data-add="${product.id}"
            class="w-full h-10 flex items-center justify-center rounded-full bg-mahal-primary text-mahal-cream
                   text-[0.8rem] font-bold tracking-wide transition-all duration-300
                   hover:bg-mahal-deep active:scale-95 shadow-md shadow-mahal-primary/20">
      Adicionar
    </button>`;
}

/* Atualiza a área de ação de um produto (card na vitrine e, se aberto, o detalhe) */
function updateCardAction(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);

  $$(`[data-action-for="${productId}"]`).forEach((holder) => {
    holder.innerHTML = cardActionHTML(product);
  });

  if (state.sheetProduct === productId) {
    const sheetAction = $('#sheet-action');
    if (sheetAction) sheetAction.innerHTML = sheetActionHTML(product);
  }
}

function renderProducts() {
  const visible = getVisibleProducts();
  const label = CATEGORIES.find((c) => c.id === state.filter).label;

  $('#home-title').textContent = state.filter === 'todos' ? 'Nossa Seleção' : label;
  $('#home-count').textContent = `${visible.length} ${visible.length === 1 ? 'produto' : 'produtos'}`;

  if (visible.length === 0) {
    $('#product-grid').innerHTML = `
      <div class="col-span-2 flex flex-col items-center text-center py-14">
        <svg viewBox="0 0 24 24" class="w-14 h-14 text-mahal-accent/40 mb-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>
        </svg>
        <h3 class="font-display text-lg font-semibold text-mahal-primary">Nenhum produto encontrado</h3>
        <p class="text-sm text-mahal-text mt-1 max-w-[16rem]">Tente outro termo de busca ou escolha outra categoria.</p>
      </div>`;
    return;
  }

  $('#product-grid').innerHTML = visible
    .map(
      (p, i) => `
      <article class="product-card bg-white/70 rounded-2xl border border-mahal-accent/15 overflow-hidden
                      flex flex-col shadow-sm" style="animation-delay:${i * 45}ms">
        <div data-detail="${p.id}" class="cursor-pointer">
          <div class="aspect-square p-6" style="background:${p.tint}">
            ${ART[p.art](p.a, p.b)}
          </div>
          <div class="px-3.5 pt-3">
            <h3 class="text-[0.82rem] font-bold text-mahal-text leading-snug min-h-[2.5rem]">${p.name}</h3>
            <p class="text-[0.72rem] text-mahal-text/70 leading-snug line-clamp-2 min-h-[2rem] mt-1">${p.desc}</p>
            <p class="font-display text-lg font-bold text-mahal-accent mt-1.5">${formatBRL(p.price)}</p>
          </div>
        </div>
        <div data-action-for="${p.id}" class="px-3.5 pb-3.5 pt-2.5 mt-auto">
          ${cardActionHTML(p)}
        </div>
      </article>`
    )
    .join('');
}

/* --------------------------------------------------------------------------
   RENDERIZAÇÃO — LISTA DE CATEGORIAS (aba Categorias)
   -------------------------------------------------------------------------- */
function renderCategoryList() {
  $('#category-list').innerHTML = CATEGORIES.filter((c) => c.id !== 'todos')
    .map((cat) => {
      const count = PRODUCTS.filter((p) => p.category === cat.id).length;
      return `
        <button data-category="${cat.id}"
                class="flex items-center gap-4 bg-white/70 rounded-2xl border border-mahal-accent/15 p-4
                       text-left transition-all duration-300 hover:border-mahal-accent/40 active:scale-[0.98] shadow-sm">
          <span class="w-16 h-16 rounded-xl bg-mahal-tint p-2.5 shrink-0">
            ${ART[CATEGORY_ICONS[cat.id]]('#662626', '#825B3E')}
          </span>
          <span class="flex-1">
            <span class="block font-display text-lg font-semibold text-mahal-primary">${cat.label}</span>
            <span class="block text-sm text-mahal-text mt-0.5">${count} ${count === 1 ? 'produto' : 'produtos'}</span>
          </span>
          <svg viewBox="0 0 24 24" class="w-5 h-5 text-mahal-accent shrink-0" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 6 6 6-6 6"/>
          </svg>
        </button>`;
    })
    .join('');
}

/* --------------------------------------------------------------------------
   CARRINHO — MUTAÇÕES DE ESTADO
   -------------------------------------------------------------------------- */
function addToCart(productId) {
  state.cart.set(productId, (state.cart.get(productId) || 0) + 1);
  persistCart();
  updateBadges(true);
  renderCart();
  updateCardAction(productId);
  showToast('Item adicionado ao carrinho com sucesso!');
}

function changeQty(productId, delta) {
  const qty = (state.cart.get(productId) || 0) + delta;
  if (qty <= 0) {
    removeFromCart(productId);
    return;
  }
  state.cart.set(productId, qty);
  persistCart();
  updateBadges(delta > 0);
  renderCart();
  updateCardAction(productId);
}

function removeFromCart(productId) {
  const row = $(`[data-row="${productId}"]`);
  const commit = () => {
    state.cart.delete(productId);
    persistCart();
    updateBadges(false);
    renderCart();
    updateCardAction(productId);
  };
  if (row) {
    row.classList.add('is-leaving');
    setTimeout(commit, 260);
  } else {
    commit();
  }
}

function clearCart() {
  if (state.cart.size === 0) return;
  const ids = [...state.cart.keys()];
  state.cart.clear();
  persistCart();
  updateBadges(false);
  renderCart();
  ids.forEach(updateCardAction);
  showToast('Carrinho esvaziado.');
}

/* --------------------------------------------------------------------------
   CARRINHO — RENDERIZAÇÃO
   -------------------------------------------------------------------------- */
function renderCart() {
  const items = [...state.cart.entries()].map(([id, qty]) => ({
    product: PRODUCTS.find((p) => p.id === id),
    qty,
  }));

  const isEmpty = items.length === 0;
  $('#cart-empty').classList.toggle('hidden', !isEmpty);
  $('#cart-empty').classList.toggle('flex', isEmpty);
  $('#cart-summary').classList.toggle('hidden', isEmpty);
  $('#clear-cart').classList.toggle('hidden', isEmpty);
  $('#clear-cart').classList.toggle('flex', !isEmpty);
  $('#cart-subtitle').textContent = isEmpty
    ? ''
    : `${cartCount()} ${cartCount() === 1 ? 'item selecionado' : 'itens selecionados'}`;

  $('#cart-items').innerHTML = items
    .map(
      ({ product: p, qty }) => `
      <div data-row="${p.id}"
           class="cart-row flex items-center gap-3.5 bg-white/70 rounded-2xl border border-mahal-accent/15 p-3 shadow-sm">
        <span class="w-16 h-16 rounded-xl p-2 shrink-0" style="background:${p.tint}">
          ${ART[p.art](p.a, p.b)}
        </span>

        <div class="flex-1 min-w-0">
          <h4 class="text-[0.8rem] font-bold text-mahal-text leading-snug line-clamp-2">${p.name}</h4>
          <p class="text-sm font-bold text-mahal-accent mt-1">${formatBRL(p.price)}</p>

          <div class="flex items-center gap-3 mt-2">
            <div class="flex items-center rounded-full border border-mahal-accent/30 bg-white/70 overflow-hidden">
              <button data-dec="${p.id}" aria-label="Diminuir quantidade"
                      class="w-8 h-8 flex items-center justify-center text-mahal-primary font-bold
                             transition-all duration-300 hover:bg-mahal-tint active:scale-90">
                <svg viewBox="0 0 24 24" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M5 12h14"/></svg>
              </button>
              <span class="w-7 text-center text-sm font-extrabold text-mahal-primary select-none">${qty}</span>
              <button data-inc="${p.id}" aria-label="Aumentar quantidade"
                      class="w-8 h-8 flex items-center justify-center text-mahal-primary font-bold
                             transition-all duration-300 hover:bg-mahal-tint active:scale-90">
                <svg viewBox="0 0 24 24" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
              </button>
            </div>
            <span class="text-xs text-mahal-text/80 font-semibold ml-auto">${formatBRL(p.price * qty)}</span>
          </div>
        </div>

        <button data-remove="${p.id}" aria-label="Remover ${p.name}"
                class="self-start p-2 -mr-1 rounded-full text-mahal-text/50 transition-all duration-300
                       hover:text-mahal-primary hover:bg-mahal-tint active:scale-90">
          <svg viewBox="0 0 24 24" class="w-[1.1rem] h-[1.1rem]" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 7h16"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            <path d="M6.5 7l.8 12a2 2 0 0 0 2 1.9h5.4a2 2 0 0 0 2-1.9l.8-12"/>
            <path d="M10 11v6M14 11v6"/>
          </svg>
        </button>
      </div>`
    )
    .join('');

  const subtotal = cartSubtotal();
  $('#cart-subtotal').textContent = formatBRL(subtotal);
  $('#cart-total').textContent = formatBRL(subtotal);
}

/* --------------------------------------------------------------------------
   BADGES DO CARRINHO (cabeçalho + bottom nav)
   -------------------------------------------------------------------------- */
function updateBadges(bump = false) {
  const count = cartCount();
  $$('[data-badge]').forEach((badge) => {
    badge.textContent = count > 99 ? '99+' : count;
    badge.classList.toggle('is-visible', count > 0);
    if (bump && count > 0) {
      badge.classList.remove('is-bump');
      void badge.offsetWidth;
      badge.classList.add('is-bump');
    }
  });
}

/* --------------------------------------------------------------------------
   TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
let toastTimer = null;

function showToast(message) {
  const toast = $('#toast');
  $('#toast-msg').textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
}

/* --------------------------------------------------------------------------
   CHECKOUT VIA WHATSAPP (link oficial wa.me da Meta)
   -------------------------------------------------------------------------- */
function buildWhatsAppMessage() {
  const lines = [...state.cart.entries()].map(([id, qty]) => {
    const p = PRODUCTS.find((prod) => prod.id === id);
    return `• ${qty}x ${p.name} (${formatBRL(p.price)})`;
  });

  return [
    '*Mahal Tabacaria - Novo Pedido* \u{1F6D2}',
    '----------------------------------',
    '*Itens do Pedido:*',
    ...lines,
    '',
    '*Resumo Financeiro:*',
    `*Total dos Produtos:* ${formatBRL(cartSubtotal())}`,
    '----------------------------------',
    '_Gostaria de combinar a entrega e a chave Pix para pagamento._',
  ].join('\n');
}

function checkout() {
  if (state.cart.size === 0) return;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage())}`;
  window.open(url, '_blank', 'noopener');
}

/* --------------------------------------------------------------------------
   DETALHE DO PRODUTO (bottom sheet)
   -------------------------------------------------------------------------- */
function sheetActionHTML(product) {
  const qty = state.cart.get(product.id) || 0;

  if (qty > 0) {
    return `
      <div class="flex items-center justify-between h-12 rounded-full bg-mahal-primary text-mahal-cream overflow-hidden shadow-lg shadow-mahal-primary/25">
        <button data-dec="${product.id}" aria-label="Diminuir quantidade"
                class="w-14 h-full flex items-center justify-center transition-all duration-300 hover:bg-mahal-deep active:scale-90">
          <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14"/></svg>
        </button>
        <span class="text-[0.95rem] font-extrabold tracking-wide select-none">${qty} no carrinho</span>
        <button data-inc="${product.id}" aria-label="Aumentar quantidade"
                class="w-14 h-full flex items-center justify-center transition-all duration-300 hover:bg-mahal-deep active:scale-90">
          <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>`;
  }

  return `
    <button data-add="${product.id}"
            class="w-full h-12 flex items-center justify-center rounded-full bg-mahal-primary text-mahal-cream
                   font-bold text-[0.95rem] tracking-wide transition-all duration-300
                   hover:bg-mahal-deep active:scale-[0.97] shadow-lg shadow-mahal-primary/25">
      Adicionar ao carrinho
    </button>`;
}

function openSheet(productId) {
  const p = PRODUCTS.find((prod) => prod.id === productId);
  if (!p) return;
  state.sheetProduct = productId;

  const catLabel = CATEGORIES.find((c) => c.id === p.category).label;

  $('#sheet').innerHTML = `
    <div class="sticky top-0 z-10 bg-mahal-cream/95 backdrop-blur-sm px-5 pt-3 pb-2 flex items-center">
      <span class="mx-auto w-10 h-1.5 rounded-full bg-mahal-accent/30"></span>
      <button id="sheet-close" aria-label="Fechar"
              class="absolute right-3 top-2 w-9 h-9 flex items-center justify-center rounded-full text-mahal-text/70
                     transition-all duration-300 hover:bg-mahal-tint active:scale-90">
        <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <div class="px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-1">
      <div class="aspect-[5/3] rounded-2xl flex items-center justify-center p-8" style="background:${p.tint}">
        <div class="w-40 h-40">${ART[p.art](p.a, p.b)}</div>
      </div>

      <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-mahal-accent mt-5">${catLabel}</p>
      <h3 class="font-display text-[1.35rem] font-semibold text-mahal-primary leading-snug mt-1">${p.name}</h3>
      <p class="font-display text-[1.7rem] font-bold text-mahal-accent mt-2">${formatBRL(p.price)}</p>

      <div class="h-px bg-mahal-accent/15 my-4"></div>

      <p class="text-[0.7rem] font-bold uppercase tracking-wider text-mahal-primary mb-2">Descrição</p>
      <p class="text-[0.92rem] text-mahal-text leading-relaxed">${p.desc}</p>

      <div id="sheet-action" class="mt-7">${sheetActionHTML(p)}</div>
    </div>`;

  $('#sheet').scrollTo({ top: 0 });
  $('#sheet-overlay').classList.add('is-visible');
  $('#sheet').classList.add('is-open');
}

function closeSheet() {
  $('#sheet-overlay').classList.remove('is-visible');
  $('#sheet').classList.remove('is-open');
  state.sheetProduct = null;
}

/* --------------------------------------------------------------------------
   EVENTOS (delegação global)
   -------------------------------------------------------------------------- */
document.addEventListener('click', (event) => {
  const goto = event.target.closest('[data-goto]');
  if (goto) return goTo(goto.dataset.goto);

  const chip = event.target.closest('[data-filter]');
  if (chip) return setFilter(chip.dataset.filter);

  const categoryCard = event.target.closest('[data-category]');
  if (categoryCard) {
    setFilter(categoryCard.dataset.category);
    return goTo('home');
  }

  const add = event.target.closest('[data-add]');
  if (add) return addToCart(Number(add.dataset.add));

  const inc = event.target.closest('[data-inc]');
  if (inc) return changeQty(Number(inc.dataset.inc), 1);

  const dec = event.target.closest('[data-dec]');
  if (dec) return changeQty(Number(dec.dataset.dec), -1);

  const remove = event.target.closest('[data-remove]');
  if (remove) return removeFromCart(Number(remove.dataset.remove));

  if (event.target.closest('#sheet-close')) return closeSheet();
  if (event.target.id === 'sheet-overlay') return closeSheet();

  const detail = event.target.closest('[data-detail]');
  if (detail) return openSheet(Number(detail.dataset.detail));

  if (event.target.closest('#clear-cart')) return clearCart();

  if (event.target.closest('#checkout-btn')) return checkout();

  if (event.target.closest('#about-whatsapp')) {
    const greeting = encodeURIComponent('Olá! Vim pelo app da *Mahal Tabacaria* e gostaria de um atendimento.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${greeting}`, '_blank', 'noopener');
  }
});

/* Busca ao vivo na Home */
$('#search').addEventListener('input', (event) => {
  state.query = event.target.value;
  renderProducts();
});

/* Fecha o detalhe do produto com a tecla Esc */
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && state.sheetProduct !== null) closeSheet();
});

/* --------------------------------------------------------------------------
   INICIALIZAÇÃO
   -------------------------------------------------------------------------- */
restoreCart();
renderChips();
renderProducts();
renderCategoryList();
updateBadges();

// Deep-link inicial: index.html#cart abre direto no carrinho, etc.
const initialView = location.hash.replace('#', '');
goTo(['home', 'categories', 'cart', 'about'].includes(initialView) ? initialView : 'home');
