document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-booking-form');
  if (!form) return; // Solo ejecutar en la página de contacto

  const nameInput = document.getElementById('client-name');
  const emailInput = document.getElementById('client-email');
  const phoneInput = document.getElementById('client-phone');
  const topicSelect = document.getElementById('consultation-topic');
  const notesTextarea = document.getElementById('client-notes');
  const charCounter = document.getElementById('char-counter');
  const bookingRow = document.getElementById('booking-slot-row');
  const feedbackSuccess = document.getElementById('feedback-success');
  const successNameEl = document.getElementById('success-client-name');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');

  // 1. Contador de caracteres en tiempo real
  if (notesTextarea && charCounter) {
    notesTextarea.addEventListener('input', () => {
      const len = notesTextarea.value.length;
      charCounter.textContent = `${len} / 400`;
      if (len >= 380) {
        charCounter.classList.add('char-limit-near');
      } else {
        charCounter.classList.remove('char-limit-near');
      }
    });
  }

  // 2. Control dinámico de bloques según motivo de consulta
  if (topicSelect && bookingRow) {
    topicSelect.addEventListener('change', () => {
      const val = topicSelect.value;
      if (val === 'showroom') {
        bookingRow.style.display = 'block';
      } else {
        bookingRow.style.display = 'none';
      }
    });
  }

  // 3. Renderizar resumen lateral de la selección del carrito
  function renderizarResumenConsulta() {
    const container = document.getElementById('contact-cart-summary');
    const headline = document.getElementById('cart-headline');
    if (!container) return;

    const items = obtenerCarrito();
    const { totalCantidad, subtotal } = calcularTotales(items);

    if (headline) {
      headline.textContent = `Tu Selección de Taller (${totalCantidad} ${totalCantidad === 1 ? 'Ítem' : 'Ítems'})`;
    }

    if (items.length === 0) {
      container.innerHTML = `
        <div class="summary-empty">
          <span class="material-symbols-outlined text-muted">chair</span>
          <p class="summary-empty-text">No has seleccionado piezas aún. Puedes consultar por mobiliario a medida o visitar nuestro taller.</p>
          <a href="catalogo.html" class="btn-link">Ver catálogo de piezas &rarr;</a>
        </div>
      `;
      return;
    }

    container.innerHTML = '';
    const list = document.createElement('div');
    list.className = 'summary-list';

    items.forEach(item => {
      const prod = buscarProductoPorId(item.id);
      if (!prod) return;

      const row = document.createElement('div');
      row.className = 'summary-item-row';
      row.innerHTML = `
        <img src="${prod.imagen}" alt="${prod.nombre}" class="summary-item-thumb">
        <div class="summary-item-details">
          <h4 class="summary-item-name">${prod.nombre} (x${item.cantidad})</h4>
          <p class="summary-item-wood">${prod.maderaNombre}</p>
        </div>
        <span class="summary-item-price">${formatearPrecio(prod.precio * item.cantidad)}</span>
      `;
      list.appendChild(row);
    });

    const totalRow = document.createElement('div');
    totalRow.className = 'summary-total-row';
    totalRow.innerHTML = `
      <div class="summary-total-line">
        <span>Presupuesto Estimado</span>
        <strong>${formatearPrecio(subtotal)}</strong>
      </div>
      <p class="summary-installments">Financiación en 6 cuotas sin interés de ${formatearPrecio(Math.round(subtotal / 6))}</p>
    `;
    list.appendChild(totalRow);

    container.appendChild(list);
  }

  renderizarResumenConsulta();

  // 4. Validación y Envío del Formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let esValido = true;

    // Validación de Nombre
    if (!nameInput.value.trim()) {
      if (nameError) nameError.style.display = 'block';
      nameInput.classList.add('input-error');
      esValido = false;
    } else {
      if (nameError) nameError.style.display = 'none';
      nameInput.classList.remove('input-error');
    }

    // Validación de Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      if (emailError) emailError.style.display = 'block';
      emailInput.classList.add('input-error');
      esValido = false;
    } else {
      if (emailError) emailError.style.display = 'none';
      emailInput.classList.remove('input-error');
    }

    if (!esValido) {
      mostrarToast('FORMULARIO INCOMPLETO', 'Por favor revisa los campos requeridos marcados en rojo.', 'error');
      return;
    }

    // Proceso de éxito
    const nombreCliente = nameInput.value.trim();
    if (successNameEl) successNameEl.textContent = nombreCliente;

    if (feedbackSuccess) {
      feedbackSuccess.style.display = 'block';
      feedbackSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    mostrarToast('CITA REGISTRADA', `Gracias ${nombreCliente}, tu solicitud fue enviada con éxito al taller.`);

    // Resetear formulario
    form.reset();
    if (charCounter) charCounter.textContent = '0 / 400';
  });
});
