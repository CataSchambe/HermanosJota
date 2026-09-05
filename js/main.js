document.addEventListener('DOMContentLoaded', () => {
  // 1. Menú móvil (Hamburguesa)
  const mobileToggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (mobileToggleBtn && mobileNav) {
    mobileToggleBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('active');
      if (isOpen) {
        mobileNav.classList.remove('active');
        mobileToggleBtn.setAttribute('aria-expanded', 'false');
      } else {
        mobileNav.classList.add('active');
        mobileToggleBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // Cerrar al hacer clic en un enlace del menú móvil
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileToggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Destacar enlace activo según la página actual
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html') || (currentPath === 'productos.html' && href === 'catalogo.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // 3. Conmutador de galería en página de detalle de producto (producto.html)
  const mainProductImg = document.getElementById('main-product-img');
  const thumbBtns = document.querySelectorAll('.thumb-btn');

  if (mainProductImg && thumbBtns.length > 0) {
    thumbBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const prodId = btn.getAttribute('data-product-id');
        if (prodId && typeof window.cargarDetalleProducto === 'function') {
          window.cargarDetalleProducto(prodId);
          return;
        }

        // Fallback para miniaturas de fotografías simples sin ID de producto
        thumbBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const newSrc = btn.getAttribute('data-img');
        const newAlt = btn.getAttribute('data-alt');

        if (newSrc) {
          mainProductImg.style.opacity = '0.4';
          setTimeout(() => {
            mainProductImg.src = newSrc;
            if (newAlt) mainProductImg.alt = newAlt;
            mainProductImg.style.opacity = '1';
          }, 150);
        }
      });
    });
  }

  // 4. Suscripción al Newsletter en el pie de página
  const newsletterForm = document.getElementById('footer-newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value.trim()) {
        mostrarToast('SUSCRIPCIÓN CONFIRMADA', `Te enviaremos novedades de ebanistería a ${input.value.trim()}`);
        input.value = '';
      }
    });
  }

  // 5. Carga dinámica de 3-4 productos destacados en la Página de Inicio (index.html)
  const featuredGrid = document.getElementById('featured-products-grid');
  if (featuredGrid && typeof PRODUCTOS !== 'undefined') {
    const destacados = PRODUCTOS.filter(p => p.destacado).slice(0, 4);
    featuredGrid.innerHTML = '';
    
    destacados.forEach(prod => {
      const card = document.createElement('article');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="product-card-media">
          <img src="${prod.imagen}" alt="${prod.nombre} en ${prod.maderaNombre}" class="product-card-img" loading="lazy">
          <span class="product-badge badge-${prod.badgeTipo}">${prod.badge}</span>
        </div>
        <div class="product-card-body">
          <div class="product-card-meta">
            <span class="product-subcat">${prod.subcategoria}</span>
            <h3 class="product-title">${prod.nombre}</h3>
            <p class="product-desc">${prod.descripcion}</p>
          </div>
          <div class="product-card-pricing">
            <div class="price-block">
              <span class="price-amount">${formatearPrecio(prod.precio)}</span>
              <span class="price-installments">6 cuotas sin interés de <strong>${formatearPrecio(prod.cuotaMonto)}</strong></span>
            </div>
            <div class="product-card-actions">
              <button type="button" class="btn-primary btn-add-cart" data-id="${prod.id}">
                <span class="material-symbols-outlined">add_shopping_cart</span> Añadir
              </button>
              <a href="producto.html?id=${prod.id}" class="btn-secondary">Detalle</a>
            </div>
          </div>
        </div>
      `;

      // Evento de añadir al carrito
      const btnAdd = card.querySelector('.btn-add-cart');
      if (btnAdd) {
        btnAdd.addEventListener('click', (e) => {
          e.preventDefault();
          if (typeof agregarAlCarrito === 'function') {
            agregarAlCarrito(prod.id, 1);
            if (typeof abrirDrawerCarrito === 'function') {
              setTimeout(abrirDrawerCarrito, 350);
            }
          }
        });
      }

      featuredGrid.appendChild(card);
    });
  }
});
