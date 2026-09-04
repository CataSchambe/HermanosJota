/**
 * Hermanos Jota - Módulo de Checkout y Finalización de Compra
 * Conexión dinámica con localStorage (carrito y órdenes), validaciones, cálculo de descuentos y modal.
 */

const ORDENES_STORAGE_KEY = 'hj_ordenes_v1';

// Estado local de la sesión de Checkout
let checkoutItems = [];
let vistaActual = 'checkout'; // 'cart' o 'checkout'
let cuponAplicado = true;      // TALLER10 activo de muestra
let porcentajeCupon = 0.10;
let metodoPagoSeleccionado = 'transfer'; // 'transfer', 'card', 'mp'
let opcionEnvio = 'flete';             // 'flete', 'showroom'

/**
 * Carga los ítems del carrito o asigna muestras de catálogo si está vacío
 */
function inicializarCheckout() {
  const guardados = obtenerCarrito();

  if (guardados && guardados.length > 0) {
    checkoutItems = guardados.map(item => {
      const prod = buscarProductoPorId(item.id);
      return {
        id: item.id,
        nombre: prod ? prod.nombre : 'Pieza de Ebanistería',
        subcategoria: prod ? prod.subcategoria : 'Mobiliario',
        madera: prod ? prod.maderaNombre : 'Madera noble',
        imagen: prod ? prod.imagen : 'assets/logo.jpg',
        precio: prod ? prod.precio : 500000,
        cantidad: item.cantidad
      };
    });
  } else {
    // Si el carrito está vacío, cargamos las dos piezas insignia del mockup
    // para que la experiencia visual de prueba sea inmediata y completa
    checkoutItems = [
      {
        id: 'copacabana',
        nombre: 'Sillón Copacabana',
        subcategoria: 'Colección Litoral',
        madera: 'Madera de Petiribí macizo curado al aceite • Tapizado en lino puro',
        imagen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2Zod-KfBnnysh_hD_Jp3cficff6qCBrH0I9lJNYxNYTU-Y682gHA4LiH17LpwUH0k-4aVHrN6AkJ9mYK4z6zq_ir63rpi7jH2GUjXNmIftxYCwpIl-F-2rZhDAcYcyGk3RcGyhMuEe_cqvHkkfSsBe1fngnqT7phjP-ZxVveVDBiHlPMnlMyRhP6TFMaYpng7lE8Cu0mlB215zYsHnBM-KbJcoRPOD-fnP8rXS4Jh1tgn0ENLDqDpoIAJC8bRgP2Ttw',
        precio: 620000,
        cantidad: 1
      },
      {
        id: 'uspallata',
        nombre: 'Aparador Uspallata',
        subcategoria: 'Ebanistería Andina',
        madera: 'Cuerpo en Laurel misionero macizo • Herrajes forjados a mano en bronce',
        imagen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKEI_6E0A-h1Ri7Uf8OSaRu2P7D2FKvsZChKtmTB2S_81ICq58Sp9jeYROKx6-_tGTZvdkhOG-Q-S8d8c15DYzCpW4CoNrhCsFmOrs7Z6GtjSsi5iyF9yAjVq1C878gnZJ2lRiZCxkgDRs4wS3ARIsbT4axLZT3ddZ-xai9rvVn6POKOayehUyCmh72zrTkSVyoZZJSsh2YqCUoUodOB66Hi0r9nDuMtxgLdJvqkHTsxtiQwfyRqQu3pZt0f6iq07RfA',
        precio: 490000,
        cantidad: 1
      }
    ];

    // Sincronizar también con el carrito global
    guardarCarrito(checkoutItems.map(i => ({ id: i.id, cantidad: i.cantidad })));
  }

  renderizarItemsEnPaneles();
  recalcularTotales();
}

/**
 * Renderiza la lista de ítems en el panel 1 (Revisar Carrito)
 */
function renderizarItemsEnPaneles() {
  const container = document.getElementById('cart-items-container');
  if (!container) return;

  if (checkoutItems.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem;">
        <span class="material-symbols-outlined" style="font-size: 3rem; color: var(--color-siena); margin-bottom: 0.5rem;">chair</span>
        <h4 style="font-family: var(--font-serif); font-size: 1.25rem;">Tu selección está vacía</h4>
        <p style="color: var(--color-text-muted); font-size: 0.875rem; margin: 0.5rem 0 1.5rem;">Explora nuestro catálogo para encargar piezas de autor.</p>
        <a href="catalogo.html" class="btn-primary" style="display: inline-flex;">Ir al Catálogo</a>
      </div>
    `;
    return;
  }

  container.innerHTML = '';
  const fragment = document.createDocumentFragment();

  checkoutItems.forEach(item => {
    const card = document.createElement('article');
    card.className = 'checkout-item-card';
    card.id = `item-${item.id}`;

    card.innerHTML = `
      <div class="checkout-item-thumb">
        <img src="${item.imagen}" alt="${item.nombre}">
      </div>
      <div class="checkout-item-details">
        <div class="checkout-item-header">
          <div>
            <span class="checkout-item-subcat">${item.subcategoria}</span>
            <h3 class="checkout-item-title">${item.nombre}</h3>
            <p class="checkout-item-wood">${item.madera}</p>
          </div>
          <button type="button" class="checkout-item-del" onclick="eliminarItemCheckout('${item.id}')" title="Eliminar pieza">
            <span class="material-symbols-outlined">delete_outline</span>
          </button>
        </div>
        <div class="checkout-item-bottom">
          <div class="checkout-stepper">
            <button type="button" class="stepper-btn" onclick="modificarCantidadCheckout('${item.id}', -1)">−</button>
            <span class="stepper-qty">${item.cantidad}</span>
            <button type="button" class="stepper-btn" onclick="modificarCantidadCheckout('${item.id}', 1)">+</button>
          </div>
          <div class="checkout-item-price-block">
            <span class="checkout-item-unit">Unitario: ${formatearPrecio(item.precio)}</span>
            <span class="checkout-item-subtotal">${formatearPrecio(item.precio * item.cantidad)}</span>
          </div>
        </div>
      </div>
    `;

    fragment.appendChild(card);
  });

  // Ítem 3 de cortesía fija de taller
  const cortesia = document.createElement('article');
  cortesia.className = 'checkout-item-cortesia';
  cortesia.innerHTML = `
    <div class="cortesia-icon-wrap">
      <span class="material-symbols-outlined">card_giftcard</span>
    </div>
    <div class="cortesia-content">
      <div class="cortesia-header">
        <div>
          <span class="cortesia-badge-label">Cortesía de Taller de Bienvenida</span>
          <h4 class="cortesia-title">Almohadón Lino Escandinavo • Mostaza Silvestre</h4>
          <p class="cortesia-desc">Relleno de pluma sintética reciclada y lino lavado a piedra artesanal</p>
        </div>
        <span class="badge-cortesia">Bonificado</span>
      </div>
      <div class="cortesia-bottom">
        <span>Cantidad: 1 unidad de cortesía</span>
        <span class="cortesia-free">$0 ARS</span>
      </div>
    </div>
  `;
  fragment.appendChild(cortesia);

  container.appendChild(fragment);
}

/**
 * Modifica la cantidad de un ítem en el checkout
 */
function modificarCantidadCheckout(id, delta) {
  const item = checkoutItems.find(i => i.id === id);
  if (!item) return;

  item.cantidad = Math.max(1, item.cantidad + delta);
  guardarCarrito(checkoutItems.map(i => ({ id: i.id, cantidad: i.cantidad })));
  renderizarItemsEnPaneles();
  recalcularTotales();
}

/**
 * Elimina un ítem de la selección
 */
function eliminarItemCheckout(id) {
  checkoutItems = checkoutItems.filter(i => i.id !== id);
  guardarCarrito(checkoutItems.map(i => ({ id: i.id, cantidad: i.cantidad })));
  renderizarItemsEnPaneles();
  recalcularTotales();
}

/**
 * Recalcula subtotales, cupón, transferencias y actualiza el DOM
 */
function recalcularTotales() {
  let subtotal = 0;
  let totalPiezas = 0;

  checkoutItems.forEach(i => {
    subtotal += i.precio * i.cantidad;
    totalPiezas += i.cantidad;
  });

  const descuentoCupon = cuponAplicado ? Math.round(subtotal * porcentajeCupon) : 0;
  const baseTrasCupon = subtotal - descuentoCupon;
  const descuentoTransferencia = (metodoPagoSeleccionado === 'transfer') ? Math.round(baseTrasCupon * 0.15) : 0;
  const totalFinal = baseTrasCupon - descuentoTransferencia;
  const cuotaMonto = Math.round(totalFinal / 6);

  // Actualizar resumen lateral
  const countEl = document.getElementById('summary-items-count');
  const subtotalEl = document.getElementById('summary-subtotal');
  const totalEl = document.getElementById('summary-total');
  const cuotasEl = document.getElementById('summary-cuotas');
  const tabCartBtn = document.getElementById('tab-cart-btn');

  if (countEl) countEl.innerText = totalPiezas;
  if (subtotalEl) subtotalEl.innerText = formatearPrecio(subtotal);
  if (totalEl) totalEl.innerText = formatearPrecio(totalFinal).replace(' ARS', '');
  if (tabCartBtn) {
    const spanCount = tabCartBtn.querySelector('.tab-cart-count');
    if (spanCount) spanCount.innerText = `(${totalPiezas})`;
  }

  // Fila del cupón
  const rowCoupon = document.getElementById('summary-coupon-row');
  const discCouponEl = document.getElementById('summary-coupon-discount');
  if (rowCoupon && discCouponEl) {
    if (cuponAplicado && descuentoCupon > 0) {
      rowCoupon.style.display = 'flex';
      discCouponEl.innerText = `-${formatearPrecio(descuentoCupon)}`;
    } else {
      rowCoupon.style.display = 'none';
    }
  }

  // Fila de transferencia
  const rowTransfer = document.getElementById('summary-transfer-row');
  const discTransferEl = document.getElementById('summary-transfer-discount');
  if (rowTransfer && discTransferEl) {
    if (metodoPagoSeleccionado === 'transfer' && descuentoTransferencia > 0) {
      rowTransfer.style.display = 'flex';
      discTransferEl.innerText = `-${formatearPrecio(descuentoTransferencia)}`;
    } else {
      rowTransfer.style.display = 'none';
    }
  }

  // Leyenda de cuotas / ahorro
  if (cuotasEl) {
    if (metodoPagoSeleccionado === 'transfer' && descuentoTransferencia > 0) {
      cuotasEl.innerText = `Ahorro extraordinario de ${formatearPrecio(descuentoTransferencia)} por pago bancario`;
      cuotasEl.style.color = 'var(--color-salvia-dark)';
    } else {
      cuotasEl.innerText = `O 6 cuotas fijas sin recargo de ${formatearPrecio(cuotaMonto)}`;
      cuotasEl.style.color = 'var(--color-text-muted)';
    }
  }

  renderizarCajaMetodoPago();
}

/**
 * Renderiza el bloque dinámico según el método de pago seleccionado
 */
function renderizarCajaMetodoPago() {
  const box = document.getElementById('payment-details-box');
  if (!box) return;

  if (metodoPagoSeleccionado === 'transfer') {
    box.innerHTML = `
      <div class="payment-box-inner">
        <div class="payment-box-heading">
          <span class="material-symbols-outlined text-salvia">savings</span>
          <span class="text-salvia font-semibold">Descuento Directo del 15% Aplicado en esta compra</span>
        </div>
        <div class="payment-bank-grid">
          <div><strong>Banco:</strong> Santander Río Argentina</div>
          <div><strong>Titular:</strong> Hermanos Jota SRL</div>
          <div><strong>CUIT:</strong> 30-71649281-9</div>
          <div><strong>CBU:</strong> 0720194820000039281923</div>
          <div class="grid-col-full"><strong>Alias CBU:</strong> HERMANOS.JOTA.TALLER</div>
        </div>
        <p class="payment-box-note">
          Una vez confirmado el pedido, la reserva de las maderas se mantendrá por 48 horas a la espera de tu comprobante de transferencia.
        </p>
      </div>
    `;
  } else if (metodoPagoSeleccionado === 'card') {
    box.innerHTML = `
      <div class="payment-box-inner">
        <div class="payment-box-heading">
          <span class="material-symbols-outlined text-siena">credit_card</span>
          <span class="text-siena font-semibold">Financiación en Cuotas Fijas de Taller</span>
        </div>
        <div class="payment-card-grid">
          <input type="text" placeholder="Número de Tarjeta (16 dígitos)" value="•••• •••• •••• 4092" class="form-input grid-col-2" readonly>
          <input type="text" placeholder="Venc. (MM/AA)" value="08/28" class="form-input" readonly>
          <input type="text" placeholder="Titular de la tarjeta" value="MARTINA GONZÁLEZ ALSINA" class="form-input grid-col-2" readonly>
          <input type="password" placeholder="CVV" value="884" class="form-input" readonly>
        </div>
        <p class="payment-box-note text-salvia flex-center-gap">
          <span class="material-symbols-outlined" style="font-size: 14px;">lock</span>
          <span>Cifrado seguro 256-bit directo con procesador bancario homologado.</span>
        </p>
      </div>
    `;
  } else {
    box.innerHTML = `
      <div class="payment-box-mp">
        <div>
          <span class="text-oro font-semibold">Integración Mercado Pago</span>
          <p class="payment-box-note" style="margin-top: 0.25rem;">
            Serás redirigido con tu sesión activa o podés abonar escaneando el código QR con cualquier billetera virtual.
          </p>
        </div>
        <span class="material-symbols-outlined text-oro" style="font-size: 3rem;">qr_code_2</span>
      </div>
    `;
  }
}

/**
 * Aplica o remueve el cupón de descuento
 */
function aplicarCupon() {
  const input = document.getElementById('coupon-input');
  const status = document.getElementById('coupon-status');
  if (!input || !status) return;

  const codigo = input.value.trim().toUpperCase();

  if (codigo === 'TALLER10') {
    cuponAplicado = true;
    porcentajeCupon = 0.10;
    status.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px;">check_circle</span><span>Cupón TALLER10 aplicado con éxito (-10% en total de piezas).</span>`;
    status.className = 'coupon-status success';
  } else if (codigo === '') {
    cuponAplicado = false;
    status.innerHTML = '';
  } else {
    cuponAplicado = false;
    status.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px;">error</span><span>Cupón no válido o expirado.</span>`;
    status.className = 'coupon-status error';
  }

  recalcularTotales();
}

/**
 * Conmuta entre las vistas 'cart' y 'checkout'
 */
function cambiarVistaCheckout(target) {
  vistaActual = target;
  const cartBtn = document.getElementById('tab-cart-btn');
  const checkoutBtn = document.getElementById('tab-checkout-btn');
  const cartPanel = document.getElementById('cart-panel');
  const checkoutPanel = document.getElementById('checkout-panel');
  const ctaText = document.getElementById('cta-button-text');

  if (target === 'cart') {
    if (cartBtn) cartBtn.classList.add('active');
    if (checkoutBtn) checkoutBtn.classList.remove('active');
    if (cartPanel) cartPanel.style.display = 'flex';
    if (checkoutPanel) checkoutPanel.style.display = 'none';
    if (ctaText) ctaText.innerText = 'Ir al Checkout de Despacho';
  } else {
    if (checkoutBtn) checkoutBtn.classList.add('active');
    if (cartBtn) cartBtn.classList.remove('active');
    if (cartPanel) cartPanel.style.display = 'none';
    if (checkoutPanel) checkoutPanel.style.display = 'flex';
    if (ctaText) ctaText.innerText = 'FINALIZAR PEDIDO Y GENERAR ORDEN';
  }
}

/**
 * Selecciona la modalidad de entrega
 */
function seleccionarDespacho(modo) {
  opcionEnvio = modo;
  const addressBlock = document.getElementById('address-block');
  if (!addressBlock) return;

  if (modo === 'showroom') {
    addressBlock.classList.add('is-disabled');
  } else {
    addressBlock.classList.remove('is-disabled');
  }
}

/**
 * Selecciona el método de pago
 */
function seleccionarPago(metodo) {
  metodoPagoSeleccionado = metodo;
  ['transfer', 'card', 'mp'].forEach(opt => {
    const el = document.getElementById(`pay-opt-${opt}`);
    if (el) {
      if (opt === metodo) {
        el.classList.add('selected');
      } else {
        el.classList.remove('selected');
      }
    }
  });

  recalcularTotales();
}

/**
 * Maneja el botón principal de compra / checkout
 */
function ejecutarAccionPrincipal() {
  if (vistaActual === 'cart') {
    cambiarVistaCheckout('checkout');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  } else {
    confirmarOrdenCompra();
  }
}

/**
 * Confirma el pedido, genera la orden, la almacena en localStorage y abre el modal
 */
function confirmarOrdenCompra() {
  const nombreInput = document.getElementById('input-name');
  const dniInput = document.getElementById('input-dni');
  const emailInput = document.getElementById('input-email');
  const phoneInput = document.getElementById('input-phone');
  const addrInput = document.getElementById('input-address');

  const nombre = nombreInput ? nombreInput.value.trim() : 'Martina González Alsina';
  const dni = dniInput ? dniInput.value.trim() : '27-38491024-4';
  const email = emailInput ? emailInput.value.trim() : 'martina.alsina@arquitectura.com.ar';
  const telefono = phoneInput ? phoneInput.value.trim() : '+54 9 11 5823-9012';
  const direccion = (opcionEnvio === 'flete') 
    ? (addrInput ? addrInput.value.trim() : 'Av. Montes de Oca 1240, Piso 4to B, CABA')
    : 'Retiro en Showroom & Taller San Cristóbal (Av. San Juan 2847)';

  const totalTexto = document.getElementById('summary-total') 
    ? document.getElementById('summary-total').innerText + ' ARS' 
    : '$849.150 ARS';

  const numeroOrden = `#HJ-${Math.floor(8000 + Math.random() * 1999)}`;
  const fechaHoy = new Date().toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Guardar en la colección de órdenes en localStorage
  const nuevaOrden = {
    id: numeroOrden,
    fecha: fechaHoy,
    cliente: nombre,
    email: email,
    telefono: telefono,
    dni: dni,
    direccion: direccion,
    metodoEnvio: opcionEnvio === 'flete' ? 'Flete Especial Guante Blanco' : 'Retiro en Taller San Cristóbal',
    metodoPago: metodoPagoSeleccionado === 'transfer' 
      ? 'Transferencia Bancaria Directa (-15% Bonificado)' 
      : (metodoPagoSeleccionado === 'card' ? 'Tarjeta de Crédito (6 Cuotas Fijas)' : 'Mercado Pago Inmediato'),
    piezas: checkoutItems.map(i => ({ nombre: i.nombre, cantidad: i.cantidad, precio: i.precio })),
    total: totalTexto,
    estado: 'En Producción en Taller'
  };

  guardarNuevaOrden(nuevaOrden);

  // Vaciar el carrito de compra porque ya fue convertida en orden
  guardarCarrito([]);

  // Poblar el modal de confirmación
  const modal = document.getElementById('order-success-modal');
  if (modal) {
    const numEl = document.getElementById('modal-order-number');
    const nameEl = document.getElementById('modal-customer-name');
    const addrEl = document.getElementById('modal-customer-address');
    const payEl = document.getElementById('modal-payment-type');
    const totalEl = document.getElementById('modal-final-total');
    const dateEl = document.getElementById('modal-order-date');

    if (numEl) numEl.innerText = `Orden Oficial ${numeroOrden}`;
    if (nameEl) nameEl.innerText = nombre;
    if (addrEl) addrEl.innerText = direccion;
    if (payEl) payEl.innerText = nuevaOrden.metodoPago;
    if (totalEl) totalEl.innerText = totalTexto;
    if (dateEl) dateEl.innerText = fechaHoy;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Guarda una orden en localStorage
 */
function guardarNuevaOrden(orden) {
  try {
    const raw = localStorage.getItem(ORDENES_STORAGE_KEY);
    const lista = raw ? JSON.parse(raw) : [];
    lista.unshift(orden); // Agregar al principio
    localStorage.setItem(ORDENES_STORAGE_KEY, JSON.stringify(lista));
  } catch (e) {
    console.error('Error al guardar la orden:', e);
  }
}

/**
 * Cierra el modal de confirmación y redirige a la cuenta
 */
function cerrarModalExito() {
  const modal = document.getElementById('order-success-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
  window.location.href = 'cuenta.html';
}

// Inicialización automática
document.addEventListener('DOMContentLoaded', () => {
  inicializarCheckout();
});
