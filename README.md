# Hermanos Jota | Ebanistería y Hogar

> **Proyecto Académico:** Trabajo Práctico Integrador — Spring 1-2  
> **Institución:** Instituto Tecnológico de Buenos Aires (ITBA)  
> **Materia:** Desarrollo FullStack  
> **Integrante:** Schamberger Catalina  

---

## 📋 Descripción del Proyecto

**Hermanos Jota** es una tienda de e-commerce y taller de ebanistería de autor con diseño *mid-century modern*. La plataforma está desarrollada 100% del lado del cliente (*frontend puro*), ofreciendo una experiencia inmersiva, accesible y responsiva para explorar piezas en maderas nobles, consultar especificaciones técnicas y simular el proceso de compra completo sin requerir conexión a un backend.

---

## ✨ Funcionalidades Principales

- **Página de Inicio (`index.html`)**:
  - Encabezado con logotipo, navegación accesible y contador del carrito en tiempo real.
  - *Hero Banner* editorial con pieza insignia y llamadas a la acción.
  - Grilla de 4 productos destacados cargados **dinámicamente vía DOM** desde un array de objetos.
  - Bloques de manifiesto del taller, métricas artesanales y pie de página institucional.

- **Catálogo de Productos (`catalogo.html` / `productos.html`)**:
  - Grilla responsiva de tarjetas de productos generadas programáticamente con JavaScript.
  - **Carga asíncrona simulada** (`async/await` con `setTimeout`) con indicador de carga (*spinner*).
  - **Filtros interactivos** por categorías (Living, Comedor, Estudio) y ordenamiento por precio.
  - **Buscador en tiempo real** por nombre, madera o tipo de mueble.
  - Enlaces directos a la ficha técnica individual de cada producto.

- **Detalle de Producto (`producto.html`)**:
  - Fotografía en alta resolución con transición visual suave.
  - **Selector de colección dinámico**: permite alternar entre piezas actualizando instantáneamente título, precio, cuotas, madera, descripción y tabla de especificaciones.
  - Ficha técnica semántica con medidas, tipo de ensamble y años de garantía.
  - Botón **"Añadir a la Bolsa de Compra"** vinculado al producto activo y botón para alternar **Favoritos**.

- **Contacto y Reserva de Citas (`contacto.html`)**:
  - Formulario con campos de Nombre, Email, Mensaje y selección de turnos de visita al taller.
  - **Validación del lado del cliente** en JavaScript (comprobación de campos requeridos y formato de correo con expresiones regulares).
  - **Mensaje de éxito inyectado vía DOM** tras el envío correcto.
  - Resumen lateral sincronizado con los artículos añadidos al carrito.

- **Experiencia de Compra Simulada**:
  - Carrito deslizable (*slide-over drawer*) con actualización de cantidades, cálculo de 6 cuotas sin interés y descuento del 15% por transferencia.
  - Persistencia de datos en el navegador mediante `localStorage`.
  - Flujo de checkout guiado (`checkout.html`) y sección de usuario con historial de órdenes y lista de favoritos (`cuenta.html`).

---

## 🛠️ Tecnologías Utilizadas

- **HTML5 Semántico**:
  - Estructuración rigurosa mediante etiquetas estándar: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<table>`, `<address>`.
  - Código limpio, accesible y correctamente indentado.

- **CSS3 Puro**:
  - Metodología **Mobile First** con diseño 100% responsivo adaptable a móviles, tablets y computadoras de escritorio.
  - Maquetación flexible con **Flexbox** para la distribución de componentes y grillas.
  - Estilos centralizados en archivo externo único ([`css/styles.css`](css/styles.css)) utilizando variables CSS (`:root`) para la paleta de color oficial.

- **JavaScript Vanilla (ES6+)**:
  - Colección de datos gestionada localmente mediante **Arrays de Objetos** ([`js/productos.js`](js/productos.js)).
  - **Manipulación dinámica del DOM** (`document.createElement`, `DocumentFragment`, modificación de nodos y clases).
  - **Asincronía** simulada con `Promises` y sintaxis `async / await`.
  - Manejo de interactividad exclusivamente mediante `addEventListener` (`click`, `input`, `change`, `submit`, `popstate`, `keydown`).
  - Persistencia de estado en cliente con `localStorage`.

- **Control de Versiones**:
  - Git y GitHub para la gestión del repositorio y seguimiento de cambios: [Repositorio Oficial](https://github.com/CataSchambe/HermanosJota).

---

## 📂 Estructura del Repositorio

```text
Hermanos_Jota/
├── index.html           # Página de Inicio (Hero y destacados dinámicos)
├── catalogo.html        # Catálogo de Productos (Grilla, filtros, búsqueda y carga asíncrona)
├── productos.html       # Alias oficial del Catálogo según consigna
├── producto.html        # Detalle de Producto dinámico
├── nosotros.html        # Sobre Nosotros (Manifiesto de taller e historia)
├── contacto.html        # Contacto & Citas (Formulario con validación JS)
├── checkout.html        # Checkout y finalización de orden
├── cuenta.html          # Mi Cuenta (Órdenes de compra y favoritos)
├── assets/
│   └── logo.jpg         # Isotipo oficial de la marca
├── css/
│   └── styles.css       # Hoja de estilos externa única (Mobile First & Flexbox)
├── js/
│   ├── productos.js     # Array de objetos con el catálogo oficial
│   ├── carrito.js       # Lógica del carrito y persistencia en localStorage
│   ├── catalogo.js      # Lógica de carga asíncrona, filtros y renderizado DOM
│   ├── contacto.js      # Validación del formulario y reserva de turnos
│   ├── checkout.js      # Lógica de pasos de pago y generación de órdenes
│   ├── favoritos.js     # Gestión de piezas guardadas en wishlist
│   └── main.js          # Navegación móvil, destacados dinámicos y utilidades
├── .gitignore           # Exclusiones de Git
└── README.md            # Documentación general del proyecto
```
