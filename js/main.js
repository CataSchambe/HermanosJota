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
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
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
        // Remover clase activa de todas las miniaturas
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
});
