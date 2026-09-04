const STORAGE_KEY = 'hj_carrito_v1';

/**
 * Obtiene los items del carrito desde localStorage
 * @returns {Array<{id: string, cantidad: number}>}
 */
function obtenerCarrito() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Error al leer el carrito de localStorage', err);
    return [];
  }
}

/**
 * Guarda los items en localStorage y sincroniza la UI
 * @param {Array} items 
 */
function guardarCarrito(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Error al guardar en localStorage', err);
  }
  actualizarBadges();
  renderizarDrawerCarrito();
}

/**
 * Agrega un producto al carrito por su ID
 * @param {string} id - ID del producto
 * @param {number} cantidad - Cantidad a sumar (por defecto 1)
 */
function agregarAlCarrito(id, cantidad = 1) {
  const producto = buscarProductoPorId(id);
  if (!producto) {
    console.error(`Producto con id "${id}" no encontrado.`);
    return;
  }

  const items = obtenerCarrito();
  const index = items.findIndex(item => item.id === id);

  if (index !== -1) {
    items[index].cantidad += cantidad;
  } else {
    items.push({ id, cantidad });
  }

  guardarCarrito(items);
  mostrarToast('PIEZA AÑADIDA AL PEDIDO', `${producto.nombre} se sumó a tu selección.`);
}

/**
 * Modifica la cantidad de un ítem (+1 o -1)
 * @param {string} id 
 * @param {number} delta 
 */
function modificarCantidad(id, delta) {
  let items = obtenerCarrito();
  const index = items.findIndex(item => item.id === id);
  if (index === -1) return;

  items[index].cantidad += delta;
  if (items[index].cantidad <= 0) {
    items.splice(index, 1);
  }
  guardarCarrito(items);
}

/**
 * Elimina una pieza completa del carrito
 * @param {string} id 
 */
function eliminarDelCarrito(id) {
  const producto = buscarProductoPorId(id);
  const items = obtenerCarrito().filter(item => item.id !== id);
  guardarCarrito(items);
  if (producto) {
    mostrarToast('PIEZA REMOVIDA', `${producto.nombre} fue eliminada del pedido.`);
  }
}

/**
 * Vacía completamente el carrito
 */
function vaciarCarrito() {
  guardarCarrito([]);
  mostrarToast('CARRITO VACÍO', 'Se vació tu selección de piezas.');
}

/**
 * Calcula el resumen económico del carrito
 * @param {Array} items 
 * @returns {Object}
 */
function calcularTotales(items) {
  let totalCantidad = 0;
  let subtotal = 0;

  items.forEach(item => {
    const prod = buscarProductoPorId(item.id);
    if (prod) {
      totalCantidad += item.cantidad;
      subtotal += prod.precio * item.cantidad;
    }
  });

  const descuentoTransferencia = Math.round(subtotal * 0.15);
  const totalConDescuento = subtotal - descuentoTransferencia;
  const cuota6 = subtotal > 0 ? Math.round(subtotal / 6) : 0;

  return {
    totalCantidad,
    subtotal,
    descuentoTransferencia,
    totalConDescuento,
    cuota6
  };
}

/**
 * Actualiza los contadores visibles en la barra de navegación y en el drawer
 */
function actualizarBadges() {
  const items = obtenerCarrito();
  const { totalCantidad } = calcularTotales(items);
  
  const badges = document.querySelectorAll('.cart-count-badge');
  badges.forEach(badge => {
    badge.textContent = totalCantidad;
    if (totalCantidad > 0) {
      badge.classList.remove('badge-hidden');
    } else {
      badge.classList.add('badge-hidden');
    }
  });

  const drawerCount = document.getElementById('drawer-count');
  if (drawerCount) {
    drawerCount.textContent = `${totalCantidad} ${totalCantidad === 1 ? 'pieza' : 'piezas'}`;
  }
}

/**
 * Renderiza dinámicamente el contenido del drawer del carrito manipulando el DOM
 */
function renderizarDrawerCarrito() {
  const container = document.getElementById('cart-items-list');
  const footerElement = document.getElementById('cart-drawer-footer');
  if (!container) return;

  const items = obtenerCarrito();
  const { totalCantidad, subtotal, descuentoTransferencia, totalConDescuento, cuota6 } = calcularTotales(items);

  // Si el carrito está vacío, mostrar mensaje de estado vacío
  if (items.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-state">
        <span class="material-symbols-outlined empty-icon">chair</span>
        <h4 class="empty-title">Tu selección está vacía</h4>
        <p class="empty-desc">Aún no has agregado piezas a tu carrito de autor. Explora nuestro catálogo de maderas nobles.</p>
        <a href="catalogo.html" class="btn-primary" style="margin-top: 1rem;" onclick="cerrarDrawerCarrito()">Explorar Catálogo</a>
      </div>
    `;
    if (footerElement) footerElement.style.display = 'none';
    return;
  }

  if (footerElement) footerElement.style.display = 'block';

  // Vaciar lista actual para regenerar de manera limpia
  container.innerHTML = '';

  // Construir cada elemento mediante createElement y fragmento para rendimiento
  const fragment = document.createDocumentFragment();

  items.forEach(item => {
    const prod = buscarProductoPorId(item.id);
    if (!prod) return;

    const card = document.createElement('article');
    card.className = 'cart-item-card';

    card.innerHTML = `
      <div class="cart-item-img-wrap">
        <img src="${prod.imagen}" alt="${prod.nombre}" class="cart-item-img">
      </div>
      <div class="cart-item-info">
        <div class="cart-item-top">
          <div>
            <span class="cart-item-badge">${prod.badge}</span>
            <h4 class="cart-item-title">${prod.nombre}</h4>
            <p class="cart-item-sub">${prod.maderaNombre}</p>
          </div>
          <button class="cart-item-remove" data-id="${prod.id}" aria-label="Eliminar ${prod.nombre}">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
        <div class="cart-item-bottom">
          <div class="cart-qty-control">
            <button class="cart-qty-btn btn-minus" data-id="${prod.id}" aria-label="Disminuir cantidad">-</button>
            <span class="cart-qty-value">${item.cantidad}</span>
            <button class="cart-qty-btn btn-plus" data-id="${prod.id}" aria-label="Aumentar cantidad">+</button>
          </div>
          <div class="cart-item-price-wrap">
            <span class="cart-item-price">${formatearPrecio(prod.precio * item.cantidad)}</span>
          </div>
        </div>
      </div>
    `;

    fragment.appendChild(card);
  });

  container.appendChild(fragment);

  // Actualizar totales en el footer del carrito
  const subtotalEl = document.getElementById('cart-subtotal-val');
  const descEl = document.getElementById('cart-discount-val');
  const totalEl = document.getElementById('cart-total-val');
  const cuotasEl = document.getElementById('cart-cuotas-text');

  if (subtotalEl) subtotalEl.textContent = formatearPrecio(subtotal);
  if (descEl) descEl.textContent = `-${formatearPrecio(descuentoTransferencia)}`;
  if (totalEl) totalEl.textContent = formatearPrecio(totalConDescuento);
  if (cuotasEl) {
    cuotasEl.textContent = `o hasta 6 cuotas fijas sin interés de ${formatearPrecio(cuota6)} con todas las tarjetas`;
  }

  // Asignar eventos a los botones dinámicos del carrito mediante addEventListener
  container.querySelectorAll('.btn-minus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      modificarCantidad(id, -1);
    });
  });

  container.querySelectorAll('.btn-plus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      modificarCantidad(id, 1);
    });
  });

  container.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      eliminarDelCarrito(id);
    });
  });
}

/**
 * Control del Drawer (Abrir / Cerrar)
 */
function abrirDrawerCarrito() {
  const drawer = document.getElementById('cart-drawer');
  if (!drawer) return;
  drawer.classList.add('active');
  document.body.style.overflow = 'hidden';
  renderizarDrawerCarrito();
}

function cerrarDrawerCarrito() {
  const drawer = document.getElementById('cart-drawer');
  if (!drawer) return;
  drawer.classList.remove('active');
  document.body.style.overflow = '';
}

/**
 * Notificación Toast emergente
 * @param {string} titulo 
 * @param {string} mensaje
 * @param {'success'|'error'} estado
 */
function mostrarToast(titulo, mensaje, estado = 'success') {
  const toast = document.getElementById('toast-notification');
  const toastTitle = document.getElementById('toast-title');
  const toastMsg = document.getElementById('toast-subtitle');
  const toastIcon = toast?.querySelector('.toast-icon');
  if (!toast) return;

  if (toastTitle) toastTitle.textContent = titulo;
  if (toastMsg) toastMsg.textContent = mensaje;
  toast.classList.toggle('toast-error', estado === 'error');
  if (toastIcon) toastIcon.textContent = estado === 'error' ? 'error' : 'check_circle';

  toast.classList.add('visible');

  // Limpiar timer previo si existía
  if (window._toastTimer) clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.classList.remove('visible');
  }, 3200);
}

/**
 * Inicialización de oyentes de eventos globales del carrito
 */
document.addEventListener('DOMContentLoaded', () => {
  actualizarBadges();

  // Botón de abrir carrito en el header
  const openBtns = document.querySelectorAll('.btn-open-cart');
  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      abrirDrawerCarrito();
    });
  });

  // Botón de cerrar carrito en el drawer
  const closeBtn = document.getElementById('cart-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', cerrarDrawerCarrito);
  }

  // Backdrop del carrito
  const backdrop = document.getElementById('cart-backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', cerrarDrawerCarrito);
  }

  // Botón de vaciar carrito
  const clearBtn = document.getElementById('clear-cart-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', vaciarCarrito);
  }

  // Botón de continuar comprando
  const continueBtn = document.getElementById('continue-shopping-btn');
  if (continueBtn) {
    continueBtn.addEventListener('click', cerrarDrawerCarrito);
  }

  // Cerrar con la tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      cerrarDrawerCarrito();
    }
  });

  // Delegación de eventos para botones de compra directos en HTML estático
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      if (id) {
        agregarAlCarrito(id, 1);
        setTimeout(abrirDrawerCarrito, 350);
      }
    });
  });
});
