const products = [
  {
    name: "Aurora Classic",
    brand: "Aurora Lab",
    category: "grau",
    price: 289,
    badge: "Mais vendido",
    material: "Acetato leve",
    use: "Trabalho e leitura",
    colors: ["#d7c6aa", "#f8efe0"],
    shape: "round",
  },
  {
    name: "Vista Urbana",
    brand: "Vogue",
    category: "grau",
    price: 349,
    badge: "Novo",
    material: "Metal fino",
    use: "Rotina digital",
    colors: ["#b8d8d3", "#eef7f4"],
    shape: "square",
  },
  {
    name: "Solar Capri",
    brand: "Ray-Ban",
    category: "sol",
    price: 529,
    badge: "UV400",
    material: "Polarizado",
    use: "Praia e direção",
    colors: ["#efc2a0", "#f8e6d7"],
    shape: "aviator",
  },
  {
    name: "Flex Kids",
    brand: "Kids Flex",
    category: "infantil",
    price: 219,
    badge: "Resistente",
    material: "TR90 flexível",
    use: "Crianças",
    colors: ["#b6d9f2", "#eef6ff"],
    shape: "round",
  },
  {
    name: "Prisma Executive",
    brand: "Armani",
    category: "premium",
    price: 719,
    badge: "Premium",
    material: "Titânio",
    use: "Multifocal",
    colors: ["#d9d1c5", "#faf7f0"],
    shape: "square",
  },
  {
    name: "Oak Sport RX",
    brand: "Oakley",
    category: "sol",
    price: 649,
    badge: "Esportivo",
    material: "Alta aderência",
    use: "Treino e direção",
    colors: ["#b4c5a6", "#edf3e6"],
    shape: "sport",
  },
  {
    name: "Mini Bento",
    brand: "Aurora Lab",
    category: "infantil",
    price: 199,
    badge: "Kids",
    material: "Silicone",
    use: "Uso escolar",
    colors: ["#f3c1bd", "#fff0ef"],
    shape: "round",
  },
  {
    name: "Noir Signature",
    brand: "Tom Ford",
    category: "premium",
    price: 899,
    badge: "Designer",
    material: "Acetato premium",
    use: "Estilo e presença",
    colors: ["#c7bdd5", "#f1edf8"],
    shape: "square",
  },
];

const state = {
  filter: "todos",
  search: "",
  sort: "featured",
};

const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

function frameSvg(shape) {
  if (shape === "aviator") {
    return `
      <svg viewBox="0 0 280 110" aria-hidden="true">
        <path d="M36 34c31-16 63-5 70 10c8 18-10 44-38 44c-31 0-51-35-32-54z" />
        <path d="M244 34c-31-16-63-5-70 10c-8 18 10 44 38 44c31 0 51-35 32-54z" />
        <path d="M106 49c24-10 44-10 68 0M24 38L5 24M256 38l19-14" />
      </svg>`;
  }

  if (shape === "sport") {
    return `
      <svg viewBox="0 0 280 110" aria-hidden="true">
        <path d="M21 45c33-18 82-20 112-5c-7 38-58 55-103 35c-9-4-12-23-9-30z" />
        <path d="M259 45c-33-18-82-20-112-5c7 38 58 55 103 35c9-4 12-23 9-30z" />
        <path d="M132 45c5-8 11-8 16 0M20 48L5 38M260 48l15-10" />
      </svg>`;
  }

  if (shape === "square") {
    return `
      <svg viewBox="0 0 280 110" aria-hidden="true">
        <path d="M28 26h86c12 0 20 9 18 21l-5 29c-2 12-12 21-25 21H44c-13 0-23-9-25-21l-5-29c-2-12 2-21 14-21z" />
        <path d="M252 26h-86c-12 0-20 9-18 21l5 29c2 12 12 21 25 21h58c13 0 23-9 25-21l5-29c2-12-2-21-14-21z" />
        <path d="M132 47c5-8 11-8 16 0M14 39L3 33M266 39l11-6" />
      </svg>`;
  }

  return `
    <svg viewBox="0 0 280 110" aria-hidden="true">
      <circle cx="73" cy="57" r="42" />
      <circle cx="207" cy="57" r="42" />
      <path d="M115 57c16-12 34-12 50 0M31 48L5 37M249 48l26-11" />
    </svg>`;
}

function productMatches(product) {
  const inCategory = state.filter === "todos" || product.category === state.filter;
  const query = state.search.trim().toLowerCase();
  const inSearch = [product.name, product.brand, product.material, product.use, product.category]
    .join(" ")
    .toLowerCase()
    .includes(query);

  return inCategory && inSearch;
}

function sortProducts(items) {
  const sorted = [...items];

  if (state.sort === "price-asc") {
    sorted.sort((a, b) => a.price - b.price);
  }

  if (state.sort === "price-desc") {
    sorted.sort((a, b) => b.price - a.price);
  }

  return sorted;
}

function renderProducts() {
  const target = document.querySelector("[data-products]");
  if (!target) return;

  const visibleProducts = sortProducts(products.filter(productMatches));

  if (!visibleProducts.length) {
    target.innerHTML = `
      <div class="empty-state">
        Nenhuma armação encontrada com estes filtros. Tente buscar por marca, material ou categoria.
      </div>`;
    return;
  }

  target.innerHTML = visibleProducts
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-art" style="--art-a: ${product.colors[0]}; --art-b: ${product.colors[1]}">
            <span class="badge">${product.badge}</span>
            ${frameSvg(product.shape)}
          </div>
          <div class="product-info">
            <div>
              <h3>${product.name}</h3>
              <p>${product.brand} • ${product.material}</p>
            </div>
            <div class="product-meta">
              <span>${product.category}</span>
              <span>${product.use}</span>
            </div>
            <div class="price-line">
              <strong>${formatCurrency(product.price)}</strong>
              <button class="mini-btn" type="button" data-interest="${product.name}">Tenho interesse</button>
            </div>
          </div>
        </article>`
    )
    .join("");
}

function initHeader() {
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const navToggle = document.querySelector("[data-nav-toggle]");

  const updateHeader = () => {
    header?.classList.toggle("scrolled", window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  navToggle?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
    header?.classList.toggle("nav-active", Boolean(isOpen));
    document.body.classList.toggle("nav-open", Boolean(isOpen));
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
      header?.classList.remove("nav-active");
      document.body.classList.remove("nav-open");
    });
  });
}

function initCatalog() {
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.filter = button.dataset.filter || "todos";
      document.querySelectorAll("[data-filter]").forEach((item) => {
        item.classList.toggle("active", item === button);
      });
      renderProducts();
    });
  });

  document.querySelector("[data-search]")?.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderProducts();
  });

  document.querySelector("[data-sort]")?.addEventListener("change", (event) => {
    state.sort = event.target.value;
    renderProducts();
  });

  document.querySelector("[data-products]")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-interest]");
    if (!button) return;

    const product = button.dataset.interest;
    const service = document.querySelector('[name="servico"]');
    const note = document.querySelector('[name="observacao"]');

    if (service) service.value = "Óculos de grau";
    if (note) note.value = `Tenho interesse no modelo ${product}.`;

    document.querySelector("#exame")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function initLenses() {
  document.querySelectorAll("[data-lens-card]").forEach((card) => {
    const button = card.querySelector("button");

    button?.addEventListener("click", () => {
      document.querySelectorAll("[data-lens-card]").forEach((item) => {
        const isActive = item === card;
        item.classList.toggle("active", isActive);
        item.querySelector("button")?.setAttribute("aria-expanded", String(isActive));
      });
    });
  });
}

function initFaq() {
  document.querySelector("[data-faq]")?.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    const item = button.closest("article");
    const isOpen = item.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
}

function initForm() {
  const form = document.querySelector("[data-form]");
  const status = document.querySelector("[data-form-status]");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("nome");
    const service = formData.get("servico");
    const period = formData.get("periodo");

    status.textContent = `${name}, sua solicitação de ${service} para o período da ${String(
      period
    ).toLowerCase()} foi registrada. Entraremos em contato pelo telefone informado.`;

    form.reset();
  });
}

initHeader();
initCatalog();
initLenses();
initFaq();
initForm();
renderProducts();
