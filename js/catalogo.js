let estadoCatalogo = {
  productos: [],
  categoriaActiva: 'all',
  busqueda: '',
  orden: 'featured',
  cargando: false
};

/**
 * Simulación de petición asíncrona con async / await y setTimeout
 * Emula una llamada a API o backend con latencia de red realista y manejo de Promise.
 * @param {number} delayMs - Tiempo de espera en milisegundos (por defecto 700ms)
 * @returns {Promise<Array>}
 */
async function simularPeticionCatalogo(delayMs = 700) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Verificamos que el array de productos exista
      if (typeof PRODUCTOS !== 'undefined' && Array.isArray(PRODUCTOS)) {
        resolve([...PRODUCTOS]);
      } else {
        reject(new Error('No se pudo cargar la colección de productos.'));
      }
    }, delayMs);
  });
}

/**
 * Renderiza el estado de carga (Spinner / Skeleton Loader) en el DOM
 */
function mostrarLoader() {
  const contenedor = document.getElementById('catalog-grid');
  if (!contenedor) return;

  contenedor.innerHTML = `
    <div class="catalog-loader" role="status" aria-live="polite">
      <div class="spinner"></div>
      <p class="loader-text">Cargando colección de ebanistería...</p>
      <span class="loader-sub">Consultando piezas vivas y maderas nobles</span>
    </div>
  `;
}

/**
 * Crea el elemento HTML (DOM) para una tarjeta de producto
 * @param {Object} producto 
 * @returns {HTMLElement} <article class="product-card">
 */
function crearTarjetaProducto(producto) {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.setAttribute('data-id', producto.id);
  card.setAttribute('data-category', producto.categoria);
  card.setAttribute('data-price', producto.precio);
  card.setAttribute('data-wood', producto.madera);

  // Badge de certificación según tipo
  const badgeClase = `badge-${producto.badgeTipo || 'salvia'}`;

  card.innerHTML = `
    <div class="product-card-media">
      <img 
        src="${producto.imagen}" 
        alt="${producto.nombre} en ${producto.maderaNombre}" 
        class="product-card-img" 
        loading="lazy"
      >
      <span class="product-badge ${badgeClase}">${producto.badge}</span>
      <button class="btn-wishlist" type="button" aria-label="Guardar ${producto.nombre} en favoritos" data-id="${producto.id}">
        <span class="material-symbols-outlined">favorite</span>
      </button>
    </div>
    
    <div class="product-card-body">
      <div class="product-card-meta">
        <span class="product-subcat">${producto.subcategoria}</span>
        <h3 class="product-title">${producto.nombre}</h3>
        <p class="product-desc">${producto.descripcion}</p>
      </div>
      
      <div class="product-card-pricing">
        <div class="price-block">
          <span class="price-amount">${formatearPrecio(producto.precio)}</span>
          <span class="price-installments">6 cuotas sin interés de <strong>${formatearPrecio(producto.cuotaMonto)}</strong></span>
        </div>
        
        <div class="product-card-actions">
          <button 
            type="button" 
            class="btn-primary btn-add-dynamic" 
            data-id="${producto.id}"
            aria-label="Añadir ${producto.nombre} al pedido"
          >
            <span class="material-symbols-outlined">add_shopping_cart</span>
            Añadir
          </button>
          <a 
            href="producto.html?id=${producto.id}" 
            class="btn-secondary btn-detail"
            aria-label="Ver detalles de ${producto.nombre}"
          >
            Ver Detalle
          </a>
        </div>
      </div>
    </div>
  `;

  // Asignar oyentes de eventos a la tarjeta creada
  const addBtn = card.querySelector('.btn-add-dynamic');
  if (addBtn) {
    addBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      agregarAlCarrito(producto.id, 1);
      setTimeout(abrirDrawerCarrito, 350);
    });
  }

  const wishlistBtn = card.querySelector('.btn-wishlist');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      wishlistBtn.classList.toggle('active');
      const icono = wishlistBtn.querySelector('.material-symbols-outlined');
      if (wishlistBtn.classList.contains('active')) {
        icono.style.fontVariationSettings = "'FILL' 1";
        mostrarToast('FAVORITOS', `${producto.nombre} se guardó en tu lista de deseos.`);
      } else {
        icono.style.fontVariationSettings = "'FILL' 0";
      }
    });
  }

  return card;
}

/**
 * Filtra y ordena la lista de productos según el estado actual
 * @returns {Array} Lista filtrada y ordenada
 */
function procesarProductos() {
  let resultado = [...estadoCatalogo.productos];

  // 1. Filtro por categoría
  if (estadoCatalogo.categoriaActiva !== 'all') {
    resultado = resultado.filter(p => p.categoria === estadoCatalogo.categoriaActiva);
  }

  // 2. Filtro por búsqueda de texto
  const q = estadoCatalogo.busqueda.toLowerCase().trim();
  if (q) {
    resultado = resultado.filter(p => 
      p.nombre.toLowerCase().includes(q) ||
      p.maderaNombre.toLowerCase().includes(q) ||
      p.descripcion.toLowerCase().includes(q) ||
      p.subcategoria.toLowerCase().includes(q)
    );
  }

  // 3. Ordenamiento
  if (estadoCatalogo.orden === 'price-asc') {
    resultado.sort((a, b) => a.precio - b.precio);
  } else if (estadoCatalogo.orden === 'price-desc') {
    resultado.sort((a, b) => b.precio - a.precio);
  } else if (estadoCatalogo.orden === 'featured') {
    resultado.sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0));
  }

  return resultado;
}

/**
 * Renderiza los productos procesados en el contenedor de la grilla
 */
function renderizarCatalogo() {
  const contenedor = document.getElementById('catalog-grid');
  const contadorBadge = document.getElementById('counter-badge');
  const emptyState = document.getElementById('catalog-empty-state');
  if (!contenedor) return;

  const listaFiltrada = procesarProductos();

  // Actualizar contador
  if (contadorBadge) {
    contadorBadge.textContent = `${listaFiltrada.length} ${listaFiltrada.length === 1 ? 'PIEZA DE COLECCIÓN' : 'PIEZAS DE COLECCIÓN'}`;
  }

  // Si no hay coincidencias, mostrar empty state
  if (listaFiltrada.length === 0) {
    contenedor.innerHTML = '';
    if (emptyState) emptyState.style.display = 'flex';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  // Usar DocumentFragment para inserción eficiente en el DOM
  contenedor.innerHTML = '';
  const fragment = document.createDocumentFragment();

  listaFiltrada.forEach(prod => {
    const cardNode = crearTarjetaProducto(prod);
    fragment.appendChild(cardNode);
  });

  contenedor.appendChild(fragment);
}

/**
 * Inicialización asíncrona del catálogo al cargar la página
 */
async function inicializarCatalogo() {
  mostrarLoader();
  estadoCatalogo.cargando = true;

  try {
    // Llamada con simulación asíncrona
    const productosObtenidos = await simularPeticionCatalogo(750);
    estadoCatalogo.productos = productosObtenidos;
    estadoCatalogo.cargando = false;
    renderizarCatalogo();
  } catch (error) {
    console.error('Error al inicializar catálogo:', error);
    estadoCatalogo.cargando = false;
    const contenedor = document.getElementById('catalog-grid');
    if (contenedor) {
      contenedor.innerHTML = `
        <div class="catalog-error">
          <span class="material-symbols-outlined error-icon">error</span>
          <p>Ocurrió un error al cargar el catálogo de piezas.</p>
          <button class="btn-primary" onclick="inicializarCatalogo()">Reintentar</button>
        </div>
      `;
    }
  }
}

/**
 * Configuración de oyentes de eventos interactivos
 */
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('catalog-grid');
  if (!grid) return; // Solo ejecutar si estamos en la página del catálogo

  inicializarCatalogo();

  // 1. Filtros por Chips de categoría
  const chips = document.querySelectorAll('.chip-filter');
  chips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      estadoCatalogo.categoriaActiva = chip.getAttribute('data-category') || 'all';
      renderizarCatalogo();
    });
  });

  // 2. Campo de búsqueda en vivo
  const searchInput = document.getElementById('catalog-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      estadoCatalogo.busqueda = e.target.value;
      renderizarCatalogo();
    });
  }

  // Conexión con el buscador del header si existe
  const headerSearch = document.getElementById('header-quick-search');
  if (headerSearch) {
    headerSearch.addEventListener('input', (e) => {
      if (searchInput) {
        searchInput.value = e.target.value;
      }
      estadoCatalogo.busqueda = e.target.value;
      renderizarCatalogo();
    });
  }

  // 3. Dropdown de ordenamiento
  const sortDropdown = document.getElementById('sort-dropdown');
  if (sortDropdown) {
    sortDropdown.addEventListener('change', (e) => {
      estadoCatalogo.orden = e.target.value;
      renderizarCatalogo();
    });
  }

  // 4. Botón de restablecer filtros en el empty state
  const resetBtn = document.getElementById('reset-filters-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      estadoCatalogo.busqueda = '';
      estadoCatalogo.categoriaActiva = 'all';
      estadoCatalogo.orden = 'featured';

      if (searchInput) searchInput.value = '';
      if (headerSearch) headerSearch.value = '';
      if (sortDropdown) sortDropdown.value = 'featured';

      chips.forEach((c, idx) => {
        if (idx === 0) c.classList.add('active');
        else c.classList.remove('active');
      });

      renderizarCatalogo();
    });
  }
});
