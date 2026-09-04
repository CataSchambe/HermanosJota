# Hermanos Jota | Mueblería y Hogar — Diseño de Autor

> **Proyecto Académico:** ITBA — Spring 1-2  
> **Tema:** Sitio web e-commerce de ebanistería y mobiliario de autor mid-century modern.  
> **Tecnologías:** HTML5 Semántico, CSS3 Puro (Mobile-First & Flexbox), Vanilla JavaScript (ES6+).

---

## 📋 Descripción del Proyecto

**Hermanos Jota** es un taller y tienda de ebanistería fundado en 1960 en Buenos Aires. El proyecto consiste en el desarrollo integral de una plataforma web moderna, accesible y 100% responsiva que celebra la autenticidad de los materiales nobles (maderas macizas FSC®, cueros curtidos vegetales y herrajes de latón) mediante una experiencia visual editorial de calma visual y alta interactividad.

---

## 🎯 Cumplimiento de Requisitos Pedagógicos y Técnicos

El desarrollo cumple exhaustivamente con cada uno de los 7 requerimientos de la consigna:

### 1. Estructura con HTML5 Semántico
- Implementación rigurosa de etiquetas estructurales obligatorias en las 5 páginas del sitio:
  - `<header>`: Barra de anuncios de cuotas y navegación principal con logotipo y acciones.
  - `<nav>`: Navegación accesible tanto para pantallas de escritorio como para dispositivos móviles (`aria-label`, `aria-current="page"`).
  - `<main>`: Contenedor único y jerárquico del contenido central de cada vista.
  - `<section>`: Delimitación de áreas temáticas (Hero, beneficios, filtros, grilla de catálogo, manifiesto, etc.).
  - `<article>`: Tarjetas de productos independientes (`.product-card`) y pilares conceptuales del taller.
  - `<aside>`: Panel deslizante del carrito de compras (*slide-over drawer*) y resumen lateral de cotización.
  - `<footer>`: Pie de página institucional con newsletter, dirección física (`<address>`) y enlaces legales.
- Código limpio, semántico, altamente accesible y ordenadamente indentado.

### 2. Estilos y Diseño Responsivo con CSS3 (Modelo de Cajas & Flexbox)
- **100% en archivo externo:** Todos los estilos residen en [`css/styles.css`](css/styles.css), sin librerías externas en tiempo de ejecución ni código incrustado en etiquetas `<style>`.
- **Mobile First:** Diseño pensado prioritariamente para pantallas móviles pequeñas (`320px`–`767px`), enriqueciéndose progresivamente en tablet (`768px`) y desktop (`1024px+` y `1280px`).
- **Modelo de Cajas:** Aplicación del reset universal `*, *::before, *::after { box-sizing: border-box; }`, con control preciso de `padding`, `margin`, bordes de ebanistería (`1px solid #DAC1B8`) y sin desbordes horizontales.
- **Flexbox en secciones principales:**
  - Cabecera y barra de navegación (`align-items: center; justify-content: space-between;`).
  - Distribución del Hero y vitrina visual.
  - Grilla de catálogo flexible con ajuste automático (`flex-wrap: wrap; gap: 1.5rem;`).
  - Tarjetas de producto flexibles (`display: flex; flex-direction: column; justify-content: space-between;`).
  - Panel lateral del carrito estructurado en columnas flexibles (`header`, `overflow list`, `footer`).
  - Barras de filtros y chips de categorías.
  - Columnas del pie de página.
- **Variables CSS (`:root`):** Implementación de la paleta oficial (*Siena Tostado* `#A0522D`, *Verde Salvia* `#87A96B`, *Alabastro Cálido* `#F5E6D3` y `#FFF8F3`, *Vara de Oro* `#D4A437`, *Rosa Polvoriento* `#C47A6D`).

### 3. Lógica de Programación Dinámica en JavaScript
- Carrito de compras reactivo en memoria con persistencia en el navegador (`localStorage`).
- Cálculo en tiempo real de subtotales, bonificación del 15% por transferencia bancaria y desglose de 6 cuotas fijas sin interés.
- Filtros combinados por categoría y búsqueda textual en vivo.
- Algoritmos de ordenamiento por destacados, menor precio y mayor precio.
- Sistema de notificaciones emergentes animadas (*Toast notifications*).
- Galería interactiva con conmutación de imágenes y vista detallada dinámica basada en parámetros de URL (`?id=...`).

### 4. Manipulación del DOM
- Renderizado programático de tarjetas de productos mediante la creación y ensamblaje de nodos del DOM (`document.createElement`, `classList`, atributos y fragmentos `DocumentFragment`).
- Actualización reactiva de contadores y badges numéricos en la cabecera.
- Modificación dinámica de la lista del carrito al sumar, restar unidades o eliminar piezas, incluyendo el estado vacío (*empty state*).
- Ocultamiento y aparición fluida de bloques del formulario de reserva según la opción seleccionada.

### 5. Arrays de Objetos
- En [`js/productos.js`](js/productos.js) se gestiona la colección completa `PRODUCTOS`, un array de 11 objetos que representan las piezas auténticas del catálogo oficial de Hermanos Jota con todos sus atributos:
  - `id`, `nombre`, `categoria`, `subcategoria`, `precio`, `madera`, `maderaNombre`, `materialDetalle`, `descripcion`, `imagen`, `badge`, `badgeTipo`, `destacado`, `cuotas`, `cuotaMonto`, `garantia`, `medidas`, `stock`.

### 6. Carga Asíncrona Simulada (setTimeout / async-await)
- En [`js/catalogo.js`](js/catalogo.js), la función `inicializarCatalogo()` invoca a `simularPeticionCatalogo()`, la cual retorna una `Promise` que resuelve a los 750 milisegundos simulando una llamada a una API o base de datos.
- Durante la espera asíncrona, el DOM muestra un indicador visual de carga (*spinner animado con mensaje editorial*) antes de renderizar la grilla con transiciones suaves.

### 7. Interacción del Usuario mediante Eventos (addEventListener)
- Cero atributos de eventos en línea (`onclick="..."` en HTML); toda la interactividad está vinculada mediante `addEventListener`:
  - Eventos de clic (`click`): añadir al carrito, abrir/cerrar drawer, filtros de categoría, selector de miniaturas, botones de cantidad (+ / -), vaciar carrito.
  - Eventos de entrada (`input`): búsqueda instantánea en catálogo y sincronización con el contador de caracteres (`0 / 400`) en el textarea.
  - Eventos de cambio (`change`): selector de ordenamiento por precio y desplegable de motivo de consulta.
  - Eventos de teclado (`keydown`): cierre del carrito de compras al presionar la tecla `Escape`.
  - Eventos de formulario (`submit`): validación antes del envío en la reserva de citas y suscripción al newsletter.

---

## 📂 Estructura del Proyecto

```text
Hermanos_Jota/
│
├── index.html           # Página de Inicio: Hero, piezas destacadas, métricas y manifiesto
├── catalogo.html        # Catálogo Oficial: Carga asíncrona, filtros interactivos y búsqueda
├── producto.html        # Detalle de Producto: Galería interactiva, dimensiones y ficha técnica
├── nosotros.html        # Sobre Nosotros: Historia de Juan José y Carla, 3 pilares y Programa Herencia Viva
├── contacto.html        # Contacto & Citas: Formulario validado, turnos para Showroom y resumen en vivo
│
├── css/
│   └── styles.css       # Hoja de estilos externa única, 100% responsiva (Mobile First & Flexbox)
│
├── js/
│   ├── productos.js     # Colección de datos (Array de objetos con 11 piezas y utilidades)
│   ├── carrito.js       # Lógica integral del carrito de compras (localStorage, drawer y badges)
│   ├── catalogo.js      # Lógica de catálogo (Promise asíncrona, render DOM, filtros y orden)
│   ├── contacto.js      # Validación de formulario, reserva de citas y contador de caracteres
│   └── main.js          # Navegación móvil, conmutador de fotos y utilidades globales
│
├── .gitignore           # Exclusiones para Visual Studio, Git y archivos de sistema
└── README.md            # Documentación exhaustiva del proyecto
```

---

## 💻 Cómo Trabajar el Proyecto en Visual Studio / VS Code

### Opción 1: Visual Studio Code
1. Abre **Visual Studio Code**.
2. Ve a **Archivo** > **Abrir carpeta...** y selecciona la carpeta `Hermanos_Jota`.
3. Instala la extensión **Live Server** (creada por *Ritwick Dey*) desde la pestaña de extensiones (`Ctrl + Shift + X`).
4. Haz clic derecho sobre el archivo [`index.html`](index.html) y selecciona **"Open with Live Server"** (o presiona `Alt + L, Alt + O`).
5. El sitio se abrirá automáticamente en tu navegador predeterminado en `http://127.0.0.1:5500/index.html`.

### Opción 2: Visual Studio (IDE Tradicional)
1. Abre **Visual Studio**.
2. Selecciona **Archivo** > **Abrir** > **Carpeta de sitios web** o **Abrir carpeta local**.
3. Selecciona la carpeta `Hermanos_Jota`.
4. Haz clic derecho sobre `index.html` y elige **"Ver en el explorador"** (`Ctrl + Shift + W`).

---

## 🚀 Cómo Subir el Proyecto a GitHub

Abre una terminal (PowerShell o Git Bash) en la raíz del proyecto (`c:\Users\santi\Documents\ITBA_CATA\SPRING_1-2\Hermanos_Jota`) y ejecuta los siguientes comandos:

```bash
# 1. Inicializar el repositorio Git local
git init

# 2. Agregar todos los archivos al área de preparación (staging)
git add .

# 3. Realizar el primer commit
git commit -m "feat: entrega final proyecto Hermanos Jota - Mueblería y Hogar"

# 4. Cambiar la rama principal a 'main'
git branch -M main

# 5. Vincular con tu repositorio remoto de GitHub (reemplaza con tu URL real)
git remote add origin https://github.com/TU-USUARIO/Hermanos_Jota.git

# 6. Subir los archivos a GitHub
git push -u origin main
```

> **Nota:** El archivo `.gitignore` ya está configurado para evitar subir archivos temporales de Visual Studio (`.vs/`, `.vscode/`), logs o archivos ocultos del sistema operativo (`.DS_Store`, `Thumbs.db`).

---

## 🎨 Guía de Estilo y Paleta Oficial

| Muestra | Color | Código HEX | Rol en el Diseño |
| :---: | :--- | :---: | :--- |
| 🟫 | **Siena Tostado** | `#A0522D` | Color primario de marca, títulos y botones principales |
| 🟩 | **Verde Salvia** | `#87A96B` | Sustentabilidad, maderas certificadas FSC® e insignias |
| 🟨 | **Vara de Oro** | `#D4A437` | Acentos premium, estrellas y piezas de autor |
| 🌸 | **Rosa Polvoriento** | `#C47A6D` | Acento suave, bouclé aterciopelado y favoritos |
| 📜 | **Alabastro Cálido** | `#F5E6D3` | Fondos de tarjetas, chips de filtros y secciones |
| ⚪ | **Alabastro Superficie** | `#FFF8F3` | Fondo base de lectura del sitio |

- **Tipografía de Encabezados:** *Playfair Display* (Serif, mayúsculas, tracking amplio).
- **Tipografía de Cuerpo y Botones:** *Inter* (Sans-serif, altura de línea 1.6 para lectura cómoda).

---

## 👥 Créditos y Autoría
- **Institución:** Instituto Tecnológico de Buenos Aires (ITBA)
- **Materia:** Desarrollo Web / Spring 1-2
- **Proyecto:** Hermanos Jota — Ebanistería y Hogar
