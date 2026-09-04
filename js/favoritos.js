/**
 * Hermanos Jota - Módulo de Favoritos (Wishlist)
 * Gestión y persistencia de artículos guardados mediante localStorage
 */

const FAVORITOS_STORAGE_KEY = 'hj_favoritos_v1';

/**
 * Obtiene el listado de IDs de productos en favoritos
 * @returns {Array<string>} Array de IDs
 */
function obtenerFavoritos() {
  try {
    const raw = localStorage.getItem(FAVORITOS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : ['copacabana', 'araucaria']; // 2 de muestra por defecto
  } catch (e) {
    console.warn('Error al leer favoritos:', e);
    return ['copacabana', 'araucaria'];
  }
}

/**
 * Guarda el listado en localStorage
 * @param {Array<string>} lista 
 */
function guardarFavoritos(lista) {
  try {
    localStorage.setItem(FAVORITOS_STORAGE_KEY, JSON.stringify(lista));
  } catch (e) {
    console.error('Error al guardar favoritos:', e);
  }
  actualizarBadgesFavoritos();
}

/**
 * Verifica si un producto está marcado como favorito
 * @param {string} id 
 * @returns {boolean}
 */
function esFavorito(id) {
  const lista = obtenerFavoritos();
  return lista.includes(id);
}

/**
 * Agrega o quita un producto de favoritos
 * @param {string} id 
 * @returns {boolean} Nuevo estado (true si se agregó, false si se quitó)
 */
function alternarFavorito(id) {
  const lista = obtenerFavoritos();
  const index = lista.indexOf(id);
  let agregado = false;

  if (index > -1) {
    lista.splice(index, 1);
    agregado = false;
  } else {
    lista.push(id);
    agregado = true;
  }

  guardarFavoritos(lista);

  // Buscar datos del producto para el toast
  if (typeof buscarProductoPorId === 'function') {
    const prod = buscarProductoPorId(id);
    const nombre = prod ? prod.nombre : 'Pieza';
    if (typeof mostrarToast === 'function') {
      if (agregado) {
        mostrarToast('FAVORITOS GUARDADOS', `${nombre} se sumó a tus piezas guardadas.`);
      } else {
        mostrarToast('FAVORITOS', `${nombre} se quitó de tus guardados.`);
      }
    }
  }

  // Si estamos en la página de cuenta, re-renderizar la grilla de favoritos
  if (typeof renderizarGrillaFavoritos === 'function') {
    renderizarGrillaFavoritos();
  }

  return agregado;
}

/**
 * Actualiza contadores visuales de favoritos en la interfaz
 */
function actualizarBadgesFavoritos() {
  const count = obtenerFavoritos().length;
  document.querySelectorAll('.fav-count-badge').forEach(badge => {
    badge.textContent = count;
    if (count > 0) {
      badge.classList.remove('badge-hidden');
    } else {
      badge.classList.add('badge-hidden');
    }
  });
}

// Inicializar al cargar el documento
document.addEventListener('DOMContentLoaded', () => {
  actualizarBadgesFavoritos();
});
