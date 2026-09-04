/**
 * HERMANOS JOTA - MUEBLERÍA Y HOGAR
 * Colección Oficial de Productos (Array de Objetos)
 * 
 * Requisito Técnico: Gestión de colecciones de datos mediante Arrays de Objetos.
 * Cada objeto contiene información completa: identificador, denominación,
 * categoría, valores numéricos de precio, madera, etiquetas de certificación y descripción.
 */

const PRODUCTOS = [
  {
    id: "uspallata",
    nombre: "Aparador Uspallata",
    categoria: "estudio",
    subcategoria: "Almacenamiento / Credenza",
    precio: 490000,
    madera: "nogal",
    maderaNombre: "Nogal macizo FSC®",
    materialDetalle: "Esterillado natural francés y herrajes en latón macizo cepillado.",
    descripcion: "Aparador de líneas puras construido en nogal macizo seleccionado con puertas en esterilla vienesa tejida a mano y sobre de mármol sutil.",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuATxqErtvTsdhAQpefAV5FyeTkmH-PpVKgfvfDaIZGwRx2DyUi9E1rfGa5N1fBYewv964axAaLpagZSMOfUUwMpsD4gVlesTK5KAMj1TytE0i_g6nRACIKSwVt_UYizc_VNTPxhmNj_I8SqcwIwNb7NyTuxjwM3k5lG454kGwQfd7xhdVPqxIdvkgqyC_nRYbo6GCPt3kLTMsd4lcj1JPFPMOWTfwh9r6O9Yd13yov-CKljC_RUxFHrH7CMseQs7yFqUw",
    badge: "Maderas FSC®",
    badgeTipo: "salvia",
    destacado: true,
    cuotas: 6,
    cuotaMonto: 81666,
    garantia: "10 años estructural",
    medidas: "180 x 50 x 75 cm",
    stock: 4
  },
  {
    id: "recoleta",
    nombre: "Biblioteca Recoleta",
    categoria: "estudio",
    subcategoria: "Estructuras / Módulos",
    precio: 540000,
    madera: "roble",
    maderaNombre: "Roble natural macizo",
    materialDetalle: "Estructura tubular con nudos de latón torneado y estantes continuos en roble natural.",
    descripcion: "Módulo librero arquitectónico de proporción áurea con ensambles de forja en latón satinado y estantes macizos de roble.",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwXMJ8JZuNrAzBfamw1n-e5O-HXgrQjT0WUVBuQVBqoNh52EfG4PkeafI8qvTq-0czXoKpvHrIzB5j5WEQzCMszyHhNS28Z1ODn9PRx6QayVVYJFXKWtuX-eSx0Qt-vFq8Vkn3I41svnBa3C2773AvlTn9HAiKzhdn-Neomhv2OJedusiOa9SGSlMkVA6Ed3woSVsUzljATKocLgm0RC9_PHzWbSjMMPI4Hax1MYUoDsH1WIWAoeWhNYjie0zBq3Czeg",
    badge: "Roble & Latón",
    badgeTipo: "oro",
    destacado: false,
    cuotas: 6,
    cuotaMonto: 90000,
    garantia: "10 años estructural",
    medidas: "120 x 38 x 200 cm",
    stock: 3
  },
  {
    id: "mendoza",
    nombre: "Butaca Mendoza",
    categoria: "living",
    subcategoria: "Living / Sillones Táctiles",
    precio: 285000,
    madera: "guatambu",
    maderaNombre: "Guatambú macizo encerado",
    materialDetalle: "Tapizada en bouclé aterciopelado Dusty Rose sobre estructura de guatambú macizo encerado.",
    descripcion: "Asiento de perfil orgánico envolvente tapizado en bouclé Dusty Rose de tacto ultra suave sobre patas de guatambú torneado a mano.",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKzGNjpjivhg1Up1u081uMI-9DzvUZEFTbSJC9c_MEouL-Al-XyWFkVHjCUJTe-sZuRZdbfnOy5Kp_yRp0sPrWv-VzKxn9glZUVDgr48QRTvgRLCqdYMB9xSMNg7sagYnJdbpI3iTK3j1FNKfyzRrMBxm-gjlmeG1MJgu3akLB4MKgw13zvkaRNoI1QsEmzQCABwyFR5CSlV7fU3lewla1M3H80uCZrzme4cLendbBWIh2r_T_Uzx9rdsAYzpad56Tsg",
    badge: "Dusty Rose Bouclé",
    badgeTipo: "rosa",
    destacado: true,
    cuotas: 6,
    cuotaMonto: 47500,
    garantia: "5 años estructura y tapizado",
    medidas: "78 x 82 x 74 cm",
    stock: 5
  },
  {
    id: "copacabana",
    nombre: "Sillón Copacabana",
    categoria: "living",
    subcategoria: "Poltronas de Autor",
    precio: 620000,
    madera: "cuero",
    maderaNombre: "Roble macizo & Cuero Curtido",
    materialDetalle: "Cuero curtido anilina vegetal en tono cognac con apoyabrazos esculpidos a mano y base reforzada.",
    descripcion: "Pieza insignia de Hermanos Jota inspirada en la arquitectura carioca de los años 60. Cuero curtido vegetal que envejece con pátina noble y base de rotación 360° fluida.",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhUcFqLvst-HSS0l0ORr8SjojX2OsdQfbTUadtABTHn_L0GzSEv4Nb89qKFnHl9BOglJq7wnxsk59TSpc1b6Pm89ItOkq9c0RqUGpOE7XQDhYJZVNis1GThzTVJ9tgwziylrmTVCezqPNRJkf1AR9LLVYwst0jEotHCJBGka7WOLe3ZaBKc6AcYtO5UAx3haFRBqjEm1nQ0h5ljNUMTVnSwwAc41G3Twz6R2n04felLbQmKT9SJ-CrsliUy7mKBP5nMg",
    badge: "Cuero Genuino Cognac",
    badgeTipo: "siena",
    destacado: true,
    cuotas: 6,
    cuotaMonto: 103333,
    garantia: "10 años estructural",
    medidas: "86 x 84 x 80 cm",
    stock: 2
  },
  {
    id: "araucaria",
    nombre: "Mesa de Centro Araucaria",
    categoria: "living",
    subcategoria: "Living / Mesas Bajas",
    precio: 210000,
    madera: "nogal",
    maderaNombre: "Nogal macizo entrelazado",
    materialDetalle: "Sobre orgánico de cristal templado biselado montado en base tridimensional de nogal entrelazado.",
    descripcion: "Encastre escultural de tres piezas en nogal que sostiene un sobre elíptico en cristal templado de alta resistencia y cantos pulidos al diamante.",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6KPkT6MrXr5CuQ7JrTVhva7qBsz3YZipRM9g7ETgp7zEdsCO9j_luAFBg4BX5mMakgBU6pBOpM0zlzPBE_OLLE-nyEKaF8ZNf1aRaItAD-CHpEQXB1GnhH_wdNTkDT1qtq5CyJYrrcwnk1-7mWeb2EfOSOXzcPambplNoRtNif6Qbt8OcQFvyOIDkZhjh6kT-UjTFg2WnV47AhNwZLH3z7F9A2_kYCAV_uB5zMMYn6SPdcE_h_cFrworWjIhFvITS_w",
    badge: "Cristal Templado & Nogal",
    badgeTipo: "oro",
    destacado: false,
    cuotas: 6,
    cuotaMonto: 35000,
    garantia: "5 años de taller",
    medidas: "110 x 65 x 42 cm",
    stock: 6
  },
  {
    id: "aconcagua",
    nombre: "Mesa de Noche Aconcagua",
    categoria: "estudio",
    subcategoria: "Dormitorio / Mesas de Luz",
    precio: 135000,
    madera: "roble",
    maderaNombre: "Roble macizo FSC®",
    materialDetalle: "Roble macizo FSC con cajón oculto de cierre neumático y nicho abierto para libros.",
    descripcion: "Mesa de noche compacta con frente biselado sin tirador aparente, guías invisibles amortiguadas y estante inferior ventilado para lecturas nocturnas.",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZrhAsO0oA4zpJ_xq2MYwYr9a-4Usb_ziDroHsoLW_7uCFSW8TUOH2cMI_JwB9hszjhbu3xg2QZeyRh-fBMc9_0RYdbVdX21pUsvpZK_gpyFm_KSJnyFUx5yw9cQyVmeO9RMCskaudoUSbmk0SX7PauBTuLbpPTC7ZtPC-Z5TuNEym-hBJGW3Kx0L2rnxv_sE93LWU61FMDeHgGaNkju2gMzcWCEoYXRh_LbJ_CAW0av6WBprTQ2PLYEUgK6VP8eVVcA",
    badge: "Roble Macizo FSC®",
    badgeTipo: "salvia",
    destacado: false,
    cuotas: 6,
    cuotaMonto: 22500,
    garantia: "5 años estructural",
    medidas: "48 x 40 x 55 cm",
    stock: 8
  },
  {
    id: "patagonia",
    nombre: "Sofá Patagonia",
    categoria: "living",
    subcategoria: "Living / Confort Familiar",
    precio: 680000,
    madera: "paraiso",
    maderaNombre: "Paraíso macizo y Lino",
    materialDetalle: "Tapizado en lino natural Alabastro Cálido / Salvia sobre base corrida en madera de zócalo cálido.",
    descripcion: "Sofá de tres cuerpos con almohadones rellenos de vellón siliconado y plumas recuperadas. Tapicería desenfundable en lino orgánico pesado de máxima durabilidad.",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCX36Eczn8QyRgxLw4qIyZFSWhrIcY-MZq1v9cyKseJB7_inib3Sp11klf3Ghum-mKl3iHHMx3xtbuC1i2d-0lnR5dOwVdaYLqFw3sJJwV5zWTc1yS_6pcVc1ip37a0VQMoIFIb26Bw9A0ux3CZ1LYdwNeLVGeJZnQG4f8Jk486de6DQqzLOOn6dsOTJGHazduYdmIp_IWLroD_9fZcSFAfIhSMlTcwEBA5AajCSsW3Ygnzgy6F1HmQg3efB_Q36jHMFQ",
    badge: "Lino Verde Salvia",
    badgeTipo: "salvia",
    destacado: true,
    cuotas: 6,
    cuotaMonto: 113333,
    garantia: "10 años en armazón",
    medidas: "220 x 95 x 82 cm",
    stock: 2
  },
  {
    id: "pampa",
    nombre: "Mesa Comedor Pampa",
    categoria: "comedor",
    subcategoria: "Comedor / Encuentro",
    precio: 780000,
    madera: "roble",
    maderaNombre: "Roble Seleccionado FSC®",
    materialDetalle: "Roble macizo continuo con patas esculturales en ángulo y terminación hidrorrepelente mate.",
    descripcion: "Mesa principal para 8 a 10 comensales elaborada con tablones continuos de roble de 2 pulgadas de espesor y acabado con cera de abeja y aceite de lino.",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWlPsaEZ5hwAX0o2Xg-qC-WocLXs5i5cp9D1j3CrtsbUgCllRrGKZFff19NukjXT3jirpVUTyVpkw-QIAs-xhKvicxeHtxDdSEnya4r0icxSfeIhpSo4dTNjUm8Qs7Xt20JTzkbT-mGYSciZpDBIJkm1TnvmIrPY-7_JApsnVbMLh4kRWo-MMnSU1Xp9CAubhgjG9oEEz2IMqfGy2qNptCDt4EqWfrfE_B8O0fEXHHkcfG0_C3x0EZFOKykcmYmEDeIQ",
    badge: "Roble Seleccionado FSC®",
    badgeTipo: "salvia",
    destacado: true,
    cuotas: 6,
    cuotaMonto: 130000,
    garantia: "10 años estructural",
    medidas: "240 x 100 x 76 cm",
    stock: 3
  },
  {
    id: "cordoba",
    nombre: "Sillas Córdoba",
    categoria: "comedor",
    subcategoria: "Asientos / Comedor",
    precio: 148000,
    madera: "nogal",
    maderaNombre: "Nogal macizo curvado al vapor",
    materialDetalle: "Contrachapado de nogal con espaldar curvado y asiento tapizado en lino texturado Verde Salvia.",
    descripcion: "Silla ergonómica de comedor con respaldo anatómico moldeado y asiento de alta densidad revestido en lino resistente a manchas y roce continuo.",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuATvCTyL3j14gjkrwQrNtlV6FzSzusj4iVphvJnF4svplGYjYkji4xbWIZ7GVkksgHPci7TweayFODblWY5sGC0cD3i4pFZsbHiEyZxNZjp4OSv1e14hShGYegmizOZmgxK5d4bHswp-vyk4lZA5AXuK7mt2O-I5hyMniS3ZD50Hm7Sdhn85gjSSYFAu3VGJ9dQtnxxLSHIncxPn4gk-2LpVy_7ttdT_xsLSzIUXAKY60QB8ukbZQ4Z1xh7deZ3bB4Mvg",
    badge: "Nogal & Verde Salvia",
    badgeTipo: "salvia",
    destacado: false,
    cuotas: 6,
    cuotaMonto: 24666,
    garantia: "5 años de taller",
    medidas: "52 x 54 x 82 cm",
    stock: 12
  },
  {
    id: "costa",
    nombre: "Escritorio Costa",
    categoria: "estudio",
    subcategoria: "Home Office / Estudio",
    precio: 315000,
    madera: "bambu",
    maderaNombre: "Bambú laminado y Roble",
    materialDetalle: "Bambú laminado ultrarresistente con organizador embutido en cuero, cajonera y pasacables.",
    descripcion: "Estación de trabajo minimalista pensada para arquitectos y creadores. Superficie antirrayas, ranura para tableta y cajón con gavetas divisorias en nogal.",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyWMWhsVQKx7vZLaZj-Gcbo5Qd1ReJ1xfFCS8yhWlrZ_AxY_jItwM6XJiKyrFtB392j5-oLjF5n2iJ_bItjudPO3pRrQyAC6W3FDvleGZmCrbmjQCcbdZVDxZzEIJai4lfgHHj5VPRP9pJ39fhlR04gX7NpTcrxIeslJprTMSmeQ-_RK1Pl6gS9JcpaVFTDHkuLwTIh4auHJ3ito2K9E1rCqo4JMXz0tZp-kEMCLb9dcyR_wttkP0oB15g_-XIUsp15Q",
    badge: "Bambú Sustentable",
    badgeTipo: "salvia",
    destacado: false,
    cuotas: 6,
    cuotaMonto: 52500,
    garantia: "5 años estructural",
    medidas: "140 x 65 x 75 cm",
    stock: 4
  },
  {
    id: "belgrano",
    nombre: "Silla de Trabajo Belgrano",
    categoria: "estudio",
    subcategoria: "Estudio / Ergonómico",
    precio: 260000,
    madera: "guatambu",
    maderaNombre: "Guatambú torneado & Metal",
    materialDetalle: "Mecanismo sincronizado con base en madera torneada, soporte lumbar regulable y tapizado sustentable.",
    descripcion: "Silla giratoria de oficina que une la calidez de la madera noble argentina con la ergonomía postural contemporánea para jornadas creativas exigentes.",
    imagen: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxzQxzBr6Sm-y9W2J2_Ggecu2i68BOFHvh-gL-2hCbjhKgtwz1oxl4fqLR8O1aNRhj8RIzAnw8YOLSOofzccUr92tL_AGooLXcq21KDHEb1NasUJI0-SsVYjlvg-3BDS-KW2kUMDlJPR2P1h1NdLqsgWQ8BgJyA4P6IJlhOjs8iG142Vx-x2SCFpqMFUv1Z1WsRQXAkhaJSaRrrbcRpQEONNuu0Z49NP5ejiYX36LVX7-CnShjUYxEQ8p43tXDD44lhw",
    badge: "Ergonomía & Madera FSC®",
    badgeTipo: "salvia",
    destacado: false,
    cuotas: 6,
    cuotaMonto: 43333,
    garantia: "5 años mecanismo y madera",
    medidas: "60 x 60 x 92-102 cm",
    stock: 7
  }
];

/**
 * Función auxiliar para formatear montos en pesos argentinos (ARS)
 * @param {number} valor 
 * @returns {string} Ejemplo: "$490.000 ARS"
 */
function formatearPrecio(valor) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  }).format(valor) + ' ARS';
}

/**
 * Obtener un producto por su ID único
 * @param {string} id 
 * @returns {Object|null}
 */
function buscarProductoPorId(id) {
  return PRODUCTOS.find(p => p.id === id) || null;
}
