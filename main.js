/* ═══════════════════════════════════════════════════════════════
   GUARDIANES DE SUSURROS — main.js
   ─────────────────────────────────────────────────────────────
   ÍNDICE
   1. CONTENIDO EDITABLE  ← lo único que necesitas tocar a diario
   2. Arranque y utilidades
   3. Universo 3D de apertura (Three.js)        ⛔ NO TOCAR
   4. Coreografía de scroll (GSAP+ScrollTrigger) ⛔ NO TOCAR
   5. Carta de la Semana interactiva
   6. Detalles ambientales (luciérnagas, cabecera)
   7. NUEVO · Animaciones de la landing (bloques 2-12)
   8. NUEVO · Acordeón FAQ
   9. NUEVO · Formulario "Carta de la Semana"
   10. NUEVO · Cursor personalizado
   ═══════════════════════════════════════════════════════════════ */

/* ╔══════════════════════════════════════════════════════════════╗
   ║ ★★★  SITE_CONFIG — EDITA AQUÍ Y TODO FUNCIONA  ★★★            ║
   ║                                                               ║
   ║ Único lugar donde configurar contacto, enlaces y cookies.     ║
   ║ Deja un campo vacío ("") y la web lo gestiona con elegancia   ║
   ║ (nunca enlaces rotos ni correos ficticios).                   ║
   ╚══════════════════════════════════════════════════════════════╝ */
const SITE_CONFIG = {

  /* ── EMAIL_CONTACTO ─────────────────────────────────────────
     Tu correo real. Alimenta: enlace «Contacto» del footer y el
     email visible. Vacío = esos enlaces avisan de que falta
     configurar (no se muestra ningún correo inventado). */
  EMAIL_CONTACTO: "",

  /* ── CONTACT_LINK (enlace B2B «Escríbenos aquí…») ───────────
     Admite CUALQUIER destino; ejemplos:
       "mailto:tucorreo@dominio.com"
       "https://tudominio.com/contacto"        (formulario propio)
       "https://wa.me/34600000000"             (WhatsApp)
       "https://calendly.com/tu-usuario/30min" (Calendly)
     Vacío = usa EMAIL_CONTACTO; si ambos vacíos, avisa. */
  CONTACT_LINK: "",

  /* ── COOKIES / CMP ──────────────────────────────────────────
     La web trae su propio panel de consentimiento (RGPD) que ya
     funciona sin configurar nada. Si prefieres un gestor externo
     (CookieYes, Cookiebot, Complianz…), indica cuál y el enlace
     «Configurar cookies» abrirá SU panel en lugar del propio:
       CMP: ""            → panel propio (por defecto)
       CMP: "cookieyes"   | "cookiebot" | "complianz"
       CMP: "custom" + CMP_ABRIR: función propia */
  COOKIES: {
    CMP: "",
    CMP_ABRIR: null   // ej: () => miGestor.abrirPanel()
  }
};

/* ╔══════════════════════════════════════════════════════════════╗
   ║ 1 · CONTENIDO EDITABLE                                        ║
   ║ Sustituye aquí los placeholders sin tocar el resto del código ║
   ╚══════════════════════════════════════════════════════════════╝ */
const CONTENIDO = {

  /* — Cartas que flotan en el universo de apertura —
     Añade o sustituye rutas. Si una imagen falla, se genera
     automáticamente un placeholder de pergamino en su lugar.
     Formato: WebP a 900 px de alto, ratio ~0.637 (el del mazo real).
     El escritorio reparte 19 cartas por el túnel y el móvil 11, así que
     las primeras rutas de la lista son las que siempre se ven. */
  cartasUniverso: [
    /* ▸ Añade aquí más cartas cuando las exportes (ratio ~2:3.1, con su marco).
       Se reparten cíclicamente por el túnel; cuantas más rutas distintas,
       más variado el viaje. */
    "assets/cards/carta-01-el-guardian-de-susurros.webp",      // El Guardián de Susurros
    "assets/cards/carta-02-la-sinfonia-del-jardin.webp",       // La Sinfonía del Jardín
    "assets/cards/carta-03-la-biblioteca-del-silencio.webp",   // La Biblioteca del Silencio
    "assets/cards/carta-04-el-rio-de-la-resistencia.webp",     // El Río de la Resistencia
    "assets/cards/carta-05-el-baile-de-las-manos-torpes.webp", // El Baile de las Manos Torpes
    "assets/cards/carta-06-el-camino-de-los-propositos.webp",  // El Camino de los Propósitos
    "assets/cards/carta-07-el-elogio-prohibido.webp",          // El Elogio Prohibido
    "assets/cards/carta-08-el-mapa-del-artesano.webp",         // El Mapa del Artesano
    "assets/cards/carta-09-la-receta-magica.webp",             // La Receta Mágica
    "assets/cards/carta-10-la-armadura-del-corazon.webp",      // La Armadura del Corazón
    "assets/cards/carta-11-el-don-escondido.webp",             // El Don Escondido
    "assets/cards/carta-12-el-despertar-del-oasis.webp",       // El Despertar del Oasis
    "assets/cards/carta-13-el-traje-del-heroe.webp",           // El Traje del Héroe
    "assets/cards/carta-14-la-torre-de-la-unidad.webp",        // La Torre de la Unidad
    "assets/cards/carta-15-el-minuto-grunon.webp",             // El Minuto Gruñón
    "assets/cards/carta-16-el-juego-de-los-deseos-secretos.webp" // El Juego de los Deseos Secretos
  ],

  /* ═══════════════════════════════════════════════════════════════
     LA CARTA DE LA SEMANA
     ─────────────────────────────────────────────────────────────
     PARA CAMBIAR LA CARTA SOLO TOCAS UNA LÍNEA: la de "activa".
     Pon ahí el id de la carta que quieras y guarda. Nada más.

     Los ids disponibles están abajo, en "banco", uno debajo de otro:
       el-doblaje-inconsciente · la-cadena-de-la-risa
       el-elogio-prohibido · el-refugio-del-corazon
       sigue-al-lider-ciego · la-ola-colectiva
       el-circulo-de-hechizo · el-ciclo-de-la-vida

     Para añadir una carta nueva: copia un bloque entero del banco,
     pégalo debajo y cámbiale el id, el nombre y los tres textos.
     ═══════════════════════════════════════════════════════════════ */
  cartaDeLaSemana: {
    titulo: "La Carta de la Semana",

    /* ▸▸ LA LÍNEA QUE CAMBIAS CADA SEMANA ▸▸ */
    activa: "el-doblaje-inconsciente",

    imagenPorDefecto: "assets/cards/carta-semana-frontal.jpg",

    banco: [

      { id: "el-doblaje-inconsciente",
        nombre: "El Doblaje Inconsciente",
        imagen: "assets/cards/carta-semana-frontal.jpg",
        mision: "La Película Muda. Dos «Actores» inician una escena en idioma inventado. " +
                "El resto, por turnos, sois los «Dobladores» y le ponéis voz a un personaje. " +
                "¡Luego, cambiad los roles!",
        susurro: "Las acciones de los demás son una película muda. Tu mente es la máquina " +
                 "de doblaje que, al instante, le añade una historia. No sufres por la " +
                 "película, sino por el doblaje que te crees.",
        indagacion: "Piensa en un malentendido reciente. El hecho es lo que se dijo o se hizo. " +
                    "Tu «doblaje» es la historia que te contaste. " +
                    "¿Qué te hizo pensar lo peor en ese momento?" },

      { id: "la-cadena-de-la-risa",
        nombre: "La Cadena de la Risa",
        imagen: "",
        mision: "El juego del ja, ja, ja. Tumbados en círculo, con las piernas abiertas y la " +
                "cabeza de cada uno sobre la barriga del anterior. El primero dice «ja», el " +
                "segundo «ja, ja», y así sucesivamente. El reto: dar dos vueltas sin que os " +
                "interrumpa un ataque de risa.",
        susurro: "A veces la sanación más profunda no nace de una conversación seria, sino de " +
                 "una carcajada compartida hasta que te duele la barriga. La risa es el sonido " +
                 "del alma recordando cómo jugar.",
        indagacion: "¿Qué situación de tu vida, que ahora ves muy seria, podría beneficiarse " +
                    "de una buena cadena de risa?" },

      { id: "el-elogio-prohibido",
        nombre: "El Elogio Prohibido",
        imagen: "assets/cards/carta-07-el-elogio-prohibido.webp",
        mision: "El duelo de las caras serias. Por parejas, turnaos para daros un cumplido " +
                "sincero mirándoos a los ojos. Pero hay una regla: no podéis sonreír ni reír, " +
                "ni apartar la mirada, ni dar una excusa. El primero que rompe la seriedad, pierde.",
        /* ▸ ISA: copia aquí el susurro tal cual está en tu carta. Es la única
             de las ocho que no salió leída en la grabación del 28 de junio. */
        susurro: "",
        indagacion: "Si no tuvieras miedo de sentirlo, ¿cuál es el elogio prohibido que tu " +
                    "corazón necesita darse a sí mismo hoy?" },

      { id: "el-refugio-del-corazon",
        nombre: "El Refugio del Corazón",
        imagen: "",
        mision: "El guardián silencioso. Un viajero comparte un pequeño desafío o problema y se " +
                "sienta. La misión del resto es construirle un refugio físico a su alrededor " +
                "usando vuestros cuerpos. Todo en silencio. Luego, cambiad los roles.",
        susurro: "La verdadera compasión no intenta arreglar el dolor: simplemente se sienta a " +
                 "su lado en silencio y susurra «no estás solo en esto». No ofrece soluciones, " +
                 "sino un refugio.",
        indagacion: "Cuando alguien a quien quieres sufre, ¿tu primer impulso es hablar o sostener?" },

      { id: "sigue-al-lider-ciego",
        nombre: "Sigue al Líder Ciego",
        imagen: "",
        mision: "La serpiente viajera. Poneos en fila con las manos en los hombros del de " +
                "delante. Todos cerráis los ojos excepto el último, que será el guía. Su misión " +
                "es conducir a toda la serpiente en un pequeño viaje. Luego, cambiad.",
        susurro: "A veces, para avanzar, solo necesitas confiar en el paso que te precede. Otras, " +
                 "para guiar, debes confiar en tu propia visión. El secreto de la tribu es saber " +
                 "cuándo ser camino y cuándo ser caminante.",
        indagacion: "En tu vida ahora, ¿sientes que te toca ser guía marcando el camino, o parte " +
                    "de la serpiente confiando en el proceso?" },

      { id: "la-ola-colectiva",
        nombre: "La Ola Colectiva",
        imagen: "",
        mision: "El vuelo del guardián. En grupo, sujetad los bordes de una sábana con un objeto " +
                "ligero en el centro. Vuestra misión: moviéndoos como una sola ola, hacedlo volar " +
                "tres veces y luego lanzadlo juntos para encestarlo en una caja.",
        susurro: "Cuando las fuerzas individuales chocan, se anulan. Cuando las intenciones se " +
                 "unen en una sola ola, hasta el objeto más pequeño puede volar. La verdadera " +
                 "fuerza no es la tuya: es la que nace entre vosotros.",
        indagacion: "Piensa en un objetivo de tu tribu. ¿Estáis remando cada uno en una dirección, " +
                    "o moviéndoos como una sola ola?" },

      { id: "el-circulo-de-hechizo",
        nombre: "El Círculo de Hechizo",
        imagen: "",
        mision: "El hechizo del círculo. Uno de vosotros es el hechicero: inventa un hechizo, un " +
                "nombre divertido y su efecto. Por ejemplo: «lanzo la gravedad juguetona, por un " +
                "minuto todos nos movemos como en la luna». Repetid el nombre a la vez para " +
                "lanzarlo, y que cada guardián lance el suyo.",
        susurro: "No esperes a que la magia suceda: la magia espera que tú la convoques. Reúne a " +
                 "tu círculo, nombra tu intención y declárala en voz alta. Tu voz es la varita.",
        indagacion: "Si pudieras lanzar un solo hechizo sobre tu día de mañana, ¿cuál sería su " +
                    "nombre y qué efecto tendría?" },

      { id: "el-ciclo-de-la-vida",
        nombre: "El Ciclo de la Vida",
        imagen: "",
        mision: "El mandala impermanente. Usad objetos naturales o cotidianos para crear juntos un " +
                "hermoso mandala en el suelo. Admiradlo en silencio por un momento. Luego, a una " +
                "señal, deshacedlo suavemente, devolviendo cada pieza a su lugar.",
        susurro: "La belleza no está en aferrarse, sino en honrar el ciclo de crear, admirar y soltar.",
        indagacion: "¿Qué mandala hermoso necesitas crear hoy, sabiendo que también tendrás la " +
                    "fuerza para soltarlo?" }
    ]
  },

  /* — Formulario de la Carta de la Semana —
     ▸ REEMPLAZAR "accion" por tu endpoint (Mailchimp, Brevo, MailerLite, Formspree…).
       Si lo dejas en "", el formulario mostrará el mensaje de éxito sin enviar
       (modo demostración, para que nada se rompa mientras no haya backend). */
  formularioCarta: {
    /* ▸ REEMPLAZAR "accion" por la URL de tu autoresponder
       (MailerLite, Brevo, Mailchimp, ConvertKit, Formspree…).
       "campoEmail" es el name que espera tu plataforma (Mailchimp usa "EMAIL").
       Vacío = modo demostración: muestra el mensaje de éxito sin enviar. */
    accion: "https://assets.mailerlite.com/jsonp/2620952/forms/198022402603484161/subscribe",
    metodo: "POST",
    campoEmail: "fields[email]",
    urlGracias: "",                   // opcional: página de gracias tras suscribirse
    mensajeExito: "✦ Hecho. Revisa tu correo: la carta va de camino.",
    mensajeError: "Algo ha fallado. Prueba de nuevo en un momento."
  },

  /* — Villa Etiqueta (serie de YouTube) — */
  villaEtiqueta: {
    titulo: "Villa Etiqueta",
    descripcion: "Nuestra serie en YouTube: pequeñas historias del universo " +
                 "Vivamos Despiertos para entrenar la mirada antes de jugar.",
    miniatura: "assets/photos/carta-gafas.jpg",   // ▸ REEMPLAZAR por la miniatura real
    enlace: "https://www.youtube.com/@VivamosDespiertos"  // ▸ REEMPLAZAR por el enlace real
  },

  /* — TESTIMONIOS (componente escalable) ─────────────────────────
     Añade, quita o reordena elementos de "items" y el carrusel se adapta
     solo: deslizable con el dedo en móvil, flechas y teclado en escritorio.
     Tres tipos admitidos (mezclables en cualquier orden y cantidad):

       { tipo: "foto",  imagen: "ruta.jpg", respaldo: "ruta-alternativa.jpg",
         alt: "descripción", texto: "«cita»", autor: "— Nombre" }

       { tipo: "video", video: "ruta.mp4", poster: "miniatura.jpg",
         alt: "descripción", texto: "«cita»", autor: "— Nombre" }
         (pensado para vídeo VERTICAL: se encuadra solo dentro de la tarjeta)

       { tipo: "texto", texto: "«cita»", autor: "— Nombre" }

     "autoplay": true hace avanzar el carrusel suavemente cada "intervaloMs"
     (solo cuando hay más testimonios de los que caben; se pausa al tocarlo,
     al enfocarlo o si el visitante prefiere movimiento reducido). */
  testimonios: {
    autoplay: false,
    intervaloMs: 6000,
    /* Citas textuales de la partida grabada el 28 de junio de 2026.
       Cuando subas los retratos a assets/photos/, cambia "texto" por "foto"
       y añade  imagen: "assets/photos/testimonio-<nombre>.jpg"  en cada uno. */
    items: [
      { tipo: "texto",
        texto: "«Vives muy en piloto automático y no nos paramos a pensar. Te pone en situaciones que en el día a día no te las planteas.»",
        autor: "— Victoria" },
      { tipo: "texto",
        texto: "«Un despertar. Básicamente. Es conocerme más y darme cuenta de muchas cosas que no había visto.»",
        autor: "— Adriana" },
      { tipo: "texto",
        texto: "«No me esperaba tantas risas. Me han llenado el corazón, de verdad.»",
        autor: "— Chenia, 15 años" },
      { tipo: "texto",
        texto: "«Un grupo tan dispar, que no nos conocíamos casi, y jugamos como si nos conociéramos de toda la vida.»",
        autor: "— Ans Kari" },
      { tipo: "texto",
        texto: "«Me voy muy feliz, con una sonrisa de oreja a oreja.»",
        autor: "— Quima" },
      { tipo: "texto",
        texto: "«Así aprenden más sobre la familia, se quieren, aprenden a trabajar mejor en equipo.»",
        autor: "— Victoria, 9 años" },
      { tipo: "texto",
        texto: "«Que lo juegue. Y que me invite.»",
        autor: "— Jesús" }
      /* ▸ Cuando exista el vídeo, añádelo el primero:
         { tipo: "video", video: "assets/placeholders/video_testimonios.mp4",
           poster: "assets/photos/testimonio-portada.jpg",
           alt: "Testimonios de la partida del 28 de junio",
           texto: "«Un despertar. Básicamente.»", autor: "— Los que ya han jugado" } */
    ]
  },

  /* — PREVENTA · lista de los primeros guardianes —
     Fechas y bonus que se muestran en el bloque #lista y en el de compra.
     Cuando el juego salga a la venta, pon activa: false y vuelve a poner
     urlCompra con tu pasarela: los botones vuelven a llevar a la compra. */
  preventa: {
    activa: true,
    fechaOnline: "1 de diciembre",
    fechaPresencial: "28 y 29 de diciembre",
    bonus: "3 meses gratis en la comunidad de Vivamos Despiertos"
  },

  /* — Formulario de la lista de espera —
     ▸ REEMPLAZAR "accion" por la URL del formulario embebido de MailerLite.
       Vacío = modo demostración: confirma en pantalla sin enviar nada. */
  formularioLista: {
    accion: "https://assets.mailerlite.com/jsonp/2620952/forms/198022402603484161/subscribe",
    metodo: "POST",
    campoEmail: "fields[email]",
    urlGracias: "",
    mensajeExito: "✦ Ya estás dentro. Te avisamos en cuanto abramos.",
    mensajeError: "Algo ha fallado. Prueba de nuevo en un momento."
  },

  /* — Enlace del botón de compra —
     ▸ REEMPLAZAR por la URL de tu pasarela (Stripe, Shopify, Hotmart…).
       Mientras esté vacía (""), todos los botones de compra llevan al bloque
       "Qué incluye + precio" (#compra) para que la web nunca tenga enlaces rotos. */
  urlCompra: "",

  /* — Contacto: se configura arriba, en SITE_CONFIG.EMAIL_CONTACTO — */
  get emailContacto() { return SITE_CONFIG.EMAIL_CONTACTO; },
  redes: {
    instagram: "https://www.instagram.com/vivamosdespiertos",   // ▸ REEMPLAZAR
    tiktok:    "https://www.tiktok.com/@vivamosdespiertos",     // ▸ REEMPLAZAR
    youtube:   "https://www.youtube.com/@VivamosDespiertos"     // ▸ REEMPLAZAR
  },

  /* — Analítica (solo se carga si el visitante ACEPTA las cookies) — */
  analytics: {
    googleAnalyticsID: ""   // ej: "G-XXXXXXXXXX" · vacío = sin analítica
  }
};

/* ╔══════════════════════════════════════════════════════════════╗
   ║ 2 · ARRANQUE Y UTILIDADES                                     ║
   ╚══════════════════════════════════════════════════════════════╝ */
document.documentElement.classList.add("js");
document.body.classList.add("js");

const $ = (sel) => document.querySelector(sel);
const movilEstrecho = matchMedia("(max-width: 760px)").matches;
const prefiereQuietud = matchMedia("(prefers-reduced-motion: reduce)").matches;


/* ── Qué carta está publicada ahora ──────────────────────────────
   Devuelve la del campo "activa". Si ese id no existe (una errata,
   por ejemplo), enseña la primera del banco en lugar de romperse. */
function cartaPublicada() {
  const c = CONTENIDO.cartaDeLaSemana;
  const banco = c.banco || [];
  if (!banco.length) return null;
  return banco.find((x) => x.id === c.activa) || banco[0];
}

function inyectarContenido() {
  const c = CONTENIDO.cartaDeLaSemana;
  const semana = cartaPublicada();
  const tituloCarta = document.querySelector('[data-edit="cartaTitulo"]');
  if (tituloCarta && c.titulo) tituloCarta.textContent = c.titulo;
  if (semana) {
    const img = $("#carta-img-frontal");
    img.src = semana.imagen || c.imagenPorDefecto;
    img.onerror = () => { img.onerror = null; img.src = c.imagenPorDefecto; };
    img.alt = "Ilustración de la carta «" + semana.nombre + "»";
    $("#carta-mision").textContent = semana.mision;
    /* Si a una carta le falta el susurro, no se enseña un hueco vacío */
    $("#carta-susurro").textContent = semana.susurro ||
      "El susurro de esta carta se revela cuando la tienes en las manos.";
    $("#carta-indagacion").textContent = semana.indagacion;
  }

  const v = CONTENIDO.villaEtiqueta;
  $("#villa-titulo").textContent = v.titulo;
  $("#villa-descripcion").textContent = v.descripcion;
  $("#villa-miniatura").src = v.miniatura;
  $("#villa-enlace").href = v.enlace;
  $("#villa-cta").href = v.enlace;

  /* Botones de compra: si hay pasarela configurada, todos van a ella;
     si no, llevan al bloque de compra (#compra) — nunca un enlace roto. */
  const destinoPago = (CONTENIDO.urlCompra || "").trim();
  document.querySelectorAll("[data-pago], #boton-comprar").forEach((el) => {
    if (destinoPago && destinoPago !== "#") {
      el.href = destinoPago;
      if (/^https?:/i.test(destinoPago)) { el.target = "_blank"; el.rel = "noopener"; }
    } else if (el.id === "boton-comprar") {
      /* Sin pasarela aún: el botón grande lleva al FAQ (garantía y dudas)
         para no dejar un enlace muerto. Configura CONTENIDO.urlCompra. */
      el.href = "#faq";
    }
  });

  /* Redes sociales (footer) — configurables en CONTENIDO.redes */
  const ig = $("#red-instagram"), tk = $("#red-tiktok"), yt = $("#red-youtube");
  if (ig) ig.href = CONTENIDO.redes.instagram;
  if (tk) tk.href = CONTENIDO.redes.tiktok;
  if (yt) yt.href = CONTENIDO.redes.youtube;

  /* ── Contacto (footer) — lee SITE_CONFIG ──
     · «Contacto» y email visible → EMAIL_CONTACTO
     · «Escríbenos aquí…» (B2B)  → CONTACT_LINK (o EMAIL_CONTACTO de respaldo)
     Con la variable vacía, el clic muestra un aviso editable en vez de
     un enlace roto; en cuanto rellenes SITE_CONFIG, todo funciona. */
  const email = (SITE_CONFIG.EMAIL_CONTACTO || "").trim();
  const mailto = email
    ? `mailto:${email}?subject=` +
      encodeURIComponent("Hola desde la web de Guardianes de Susurros")
    : "";

  const contacto = $("#enlace-contacto");
  const visible = $("#email-visible");
  const b2b = $("#enlace-b2b");

  function conectarEnlace(el, destino, avisoSiVacio) {
    if (!el) return;
    if (destino) {
      el.href = destino;
      if (/^https?:/i.test(destino)) { el.target = "_blank"; el.rel = "noopener"; }
      if (destino.startsWith("mailto:") && email) {
        /* respaldo si no hay app de correo: copiamos la dirección */
        el.addEventListener("click", () => {
          try {
            navigator.clipboard.writeText(email);
            mostrarAviso("📋 Email copiado: " + email);
          } catch (_) {}
        });
      }
    } else {
      el.href = "#";
      el.addEventListener("click", (e) => { e.preventDefault(); mostrarAviso(avisoSiVacio); });
    }
  }

  conectarEnlace(contacto, mailto,
    "✏️ Configura EMAIL_CONTACTO en SITE_CONFIG (main.js)");

  const destinoB2B = (SITE_CONFIG.CONTACT_LINK || "").trim() ||
    (email ? `mailto:${email}?subject=` +
      encodeURIComponent("Colaboración profesional · Guardianes de Susurros") : "");
  conectarEnlace(b2b, destinoB2B,
    "✏️ Configura CONTACT_LINK o EMAIL_CONTACTO en SITE_CONFIG (main.js)");

  if (visible) {
    if (email) {
      visible.textContent = email;
      conectarEnlace(visible, mailto, "");
    } else {
      /* sin correo configurado no mostramos ninguno ficticio */
      visible.closest(".pie-email").style.display = "none";
    }
  }
}

/* Pequeño aviso flotante reutilizable */
function mostrarAviso(texto) {
  let aviso = $("#aviso-flotante");
  if (!aviso) {
    aviso = document.createElement("div");
    aviso.id = "aviso-flotante";
    document.body.appendChild(aviso);
  }
  aviso.textContent = texto;
  aviso.classList.add("visible");
  clearTimeout(aviso._t);
  aviso._t = setTimeout(() => aviso.classList.remove("visible"), 3200);
}

window.addEventListener("DOMContentLoaded", () => {
  inyectarContenido();
  renderizarTestimonios();   /* antes de la coreografía: así las tarjetas nuevas
                                conservan exactamente las mismas animaciones */

  const soportaWebGL = (() => {
    try {
      const c = document.createElement("canvas");
      return !!(window.WebGLRenderingContext &&
        (c.getContext("webgl") || c.getContext("experimental-webgl")));
    } catch (e) { return false; }
  })();

  const usarUniverso = soportaWebGL && !prefiereQuietud && window.THREE;

  if (usarUniverso) {
    iniciarUniverso();
  } else {
    document.body.classList.add("sin-universo");
  }

  iniciarCoreografia(usarUniverso);
  iniciarCartaSemana();
  iniciarLuciernagas();
  iniciarCabecera();

  /* — Nuevas capas de la landing (no tocan la apertura) — */
  iniciarAnimacionesLanding();
  iniciarFAQ();
  iniciarFormularioCarta();
  iniciarFormularioLista();
  iniciarCursor();
  iniciarNavegacion();
  iniciarTestimonios();
  iniciarCookies();
});

/* ╔══════════════════════════════════════════════════════════════╗
   ║ 3 · UNIVERSO 3D DE APERTURA — Three.js          ⛔ NO TOCAR   ║
   ╚══════════════════════════════════════════════════════════════╝ */
let universo = null; // { progreso, fundido } — expuesto a ScrollTrigger

function texturaPlaceholder(indice) {
  /* Genera una carta de pergamino procedural por si falta una imagen */
  const cv = document.createElement("canvas");
  cv.width = 360; cv.height = 562;
  const ctx = cv.getContext("2d");
  const deg = ctx.createLinearGradient(0, 0, 0, 562);
  deg.addColorStop(0, "#F2E8D2"); deg.addColorStop(1, "#DECDA8");
  ctx.fillStyle = deg; ctx.fillRect(0, 0, 360, 562);
  ctx.strokeStyle = "#A98B53"; ctx.lineWidth = 5;
  ctx.strokeRect(14, 14, 332, 534);
  ctx.fillStyle = "#6B4F35";
  ctx.font = "italic 600 40px Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText("✦", 180, 270);
  ctx.font = "italic 500 22px Georgia, serif";
  ctx.fillText("Carta " + (indice + 1), 180, 320);
  const tx = new THREE.CanvasTexture(cv);
  return tx;
}

function iniciarUniverso() {
  const lienzo = $("#lienzo-universo");
  const renderer = new THREE.WebGLRenderer({ canvas: lienzo, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(devicePixelRatio, movilEstrecho ? 1.5 : 2));
  renderer.setSize(innerWidth, innerHeight);
  renderer.setClearColor(0x0e1b14, 1);

  const escena = new THREE.Scene();
  escena.fog = new THREE.FogExp2(0x0e1b14, 0.034);

  const camara = new THREE.PerspectiveCamera(46, innerWidth / innerHeight, 0.1, 120);
  camara.position.set(0, 0, 14);

  /* — Cartas flotantes — */
  const cargador = new THREE.TextureLoader();
  const numCartas = movilEstrecho ? 11 : 19;
  const rutas = CONTENIDO.cartasUniverso;
  const cartas = [];
  const geo = new THREE.PlaneGeometry(2.1, 3.28, 8, 12);

  for (let i = 0; i < numCartas; i++) {
    const ruta = rutas[i % rutas.length];
    const material = new THREE.MeshBasicMaterial({
      map: texturaPlaceholder(i),
      side: THREE.DoubleSide,
      transparent: true
    });
    cargador.load(ruta, (tx) => {
      tx.minFilter = THREE.LinearFilter;
      material.map = tx;
      material.needsUpdate = true;
    });

    const malla = new THREE.Mesh(geo, material);

    /* Distribución en espiral suelta que se abre hacia el fondo */
    const t = i / numCartas;
    const angulo = t * Math.PI * 5 + (i % 2) * 0.8;
    const radio = 2.6 + t * 4.2 + Math.sin(i * 7.3) * 1.1;
    malla.position.set(
      Math.cos(angulo) * radio,
      Math.sin(angulo * 0.85) * (1.6 + t * 2.0),
      6 - t * 52 + Math.sin(i * 3.1) * 2.5
    );
    malla.rotation.set(
      (Math.random() - 0.5) * 0.45,
      (Math.random() - 0.5) * 0.9,
      (Math.random() - 0.5) * 0.3
    );

    malla.userData = {
      base: malla.position.clone(),
      rotBase: malla.rotation.clone(),
      fase: Math.random() * Math.PI * 2,
      vaiven: 0.25 + Math.random() * 0.35,
      ritmo: 0.4 + Math.random() * 0.5
    };
    escena.add(malla);
    cartas.push(malla);
  }

  /* — Polvo dorado (luciérnagas del bosque) — */
  const nPuntos = movilEstrecho ? 140 : 320;
  const posiciones = new Float32Array(nPuntos * 3);
  for (let i = 0; i < nPuntos; i++) {
    posiciones[i * 3] = (Math.random() - 0.5) * 34;
    posiciones[i * 3 + 1] = (Math.random() - 0.5) * 22;
    posiciones[i * 3 + 2] = 10 - Math.random() * 70;
  }
  const geoPuntos = new THREE.BufferGeometry();
  geoPuntos.setAttribute("position", new THREE.BufferAttribute(posiciones, 3));
  const puntos = new THREE.Points(geoPuntos, new THREE.PointsMaterial({
    color: 0xe3c98d, size: 0.085, transparent: true, opacity: 0.65,
    blending: THREE.AdditiveBlending, depthWrite: false
  }));
  escena.add(puntos);

  /* — Parallax de ratón — */
  const raton = { x: 0, y: 0, sx: 0, sy: 0 };
  if (!movilEstrecho) {
    addEventListener("pointermove", (e) => {
      raton.x = (e.clientX / innerWidth - 0.5) * 2;
      raton.y = (e.clientY / innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  addEventListener("resize", () => {
    camara.aspect = innerWidth / innerHeight;
    camara.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });

  universo = { progreso: 0, fundido: 1 };

  const reloj = new THREE.Clock();
  let activo = true;

  function cuadro() {
    requestAnimationFrame(cuadro);
    if (!activo && universo.fundido <= 0.01) return; // pausa al salir de la apertura

    const t = reloj.getElapsedTime();

    /* La cámara viaja por el túnel de cartas según el scroll */
    const z = 14 - universo.progreso * 58;
    raton.sx += (raton.x - raton.sx) * 0.04;
    raton.sy += (raton.y - raton.sy) * 0.04;
    camara.position.set(raton.sx * 1.3, -raton.sy * 0.9, z);
    camara.rotation.set(-raton.sy * 0.05, -raton.sx * 0.07, 0);

    /* Vaivén orgánico de cada carta */
    for (const c of cartas) {
      const u = c.userData;
      c.position.y = u.base.y + Math.sin(t * u.ritmo + u.fase) * u.vaiven;
      c.position.x = u.base.x + Math.cos(t * u.ritmo * 0.7 + u.fase) * u.vaiven * 0.6;
      c.rotation.y = u.rotBase.y + Math.sin(t * 0.3 + u.fase) * 0.12;
      c.rotation.z = u.rotBase.z + Math.cos(t * 0.22 + u.fase) * 0.05;
      c.material.opacity = universo.fundido;
    }
    puntos.rotation.y = t * 0.012;
    puntos.material.opacity = 0.65 * universo.fundido;

    renderer.render(escena, camara);
  }
  cuadro();

  /* El renderizado se relaja cuando la apertura queda atrás */
  new IntersectionObserver(([e]) => { activo = e.isIntersecting; },
    { threshold: 0 }).observe($("#universo"));
}

/* ╔══════════════════════════════════════════════════════════════╗
   ║ 4 · COREOGRAFÍA DE SCROLL — GSAP + ScrollTrigger  ⛔ NO TOCAR ║
   ╚══════════════════════════════════════════════════════════════╝ */
function iniciarCoreografia(conUniverso) {
  if (!window.gsap || !window.ScrollTrigger) {
    /* Salvaguarda: sin GSAP, todo el contenido debe ser visible igualmente */
    document.querySelectorAll(".revela, .revela-foto, .revela-carta")
      .forEach((el) => { el.style.opacity = 1; });
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  /* — Entrada del título de apertura — */
  gsap.from(".overlay-titulo .linea > span", {
    yPercent: 115, duration: 1.4, stagger: 0.14, ease: "power4.out", delay: 0.9
  });
  gsap.from(".overlay-marca, .overlay-sub, .overlay-scroll", {
    opacity: 0, y: 18, duration: 1.2, stagger: 0.15, ease: "power2.out", delay: 1.5
  });

  /* — Viaje por el universo: el scroll empuja la cámara — */
  if (conUniverso) {
    ScrollTrigger.create({
      trigger: "#universo",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.8,
      onUpdate: (st) => {
        if (!universo) return;
        universo.progreso = st.progress;
        /* fundir el lienzo en el último tramo, cuando aparece la landing */
        universo.fundido = gsap.utils.clamp(0, 1, (1 - st.progress) * 4);
      }
    });
  }

  /* El título y la pista de scroll se disuelven al empezar a viajar */
  gsap.to(".universo-overlay, .overlay-scroll", {
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: "#universo",
      start: "top top",
      end: conUniverso ? "20% top" : "40% top",
      scrub: true
    }
  });

  /* — Revelados generales — */
  gsap.utils.toArray(".revela").forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 36 },
      {
        opacity: 1, y: 0, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 86%" }
      });
  });

  gsap.utils.toArray(".revela-foto").forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 50, rotate: -3, scale: 0.96 },
      {
        opacity: 1, y: 0, rotate: 0, scale: 1, duration: 1.4, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" }
      });
  });

  /* — Parallax suave en las fotos editoriales — */
  gsap.utils.toArray(".solucion-foto img, .tribu-foto img, .compra-foto img").forEach((img) => {
    gsap.fromTo(img, { y: -16 }, {
      y: 16, ease: "none",
      scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: 1.2 }
    });
  });

  /* — Entrada teatral de la Carta de la Semana — */
  gsap.fromTo(".revela-carta",
    { opacity: 0, y: 110, rotateX: 18, scale: 0.86 },
    {
      opacity: 1, y: 0, rotateX: 0, scale: 1,
      duration: 1.6, ease: "power3.out",
      scrollTrigger: { trigger: "#carta-semana", start: "top 62%" }
    });
}

/* ╔══════════════════════════════════════════════════════════════╗
   ║ 5 · CARTA DE LA SEMANA — giro 3D                              ║
   ╚══════════════════════════════════════════════════════════════╝ */
function iniciarCartaSemana() {
  const carta = $("#carta-interactiva");
  carta.addEventListener("click", () => {
    const girada = carta.classList.toggle("girada");
    carta.setAttribute("aria-pressed", girada);
  });

  /* Inclinación sutil que sigue al puntero (solo escritorio, cara frontal) */
  if (!movilEstrecho && !prefiereQuietud) {
    const escenario = $(".escenario-carta");
    escenario.addEventListener("pointermove", (e) => {
      if (carta.classList.contains("girada")) return;
      const r = carta.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      carta.style.transform =
        `rotateY(${px * 16}deg) rotateX(${-py * 12}deg) translateY(-4px)`;
    });
    escenario.addEventListener("pointerleave", () => {
      if (!carta.classList.contains("girada")) carta.style.transform = "";
    });
    carta.addEventListener("click", () => { carta.style.transform = ""; });
  }
}

/* ╔══════════════════════════════════════════════════════════════╗
   ║ 6 · DETALLES AMBIENTALES                                      ║
   ╚══════════════════════════════════════════════════════════════╝ */
function iniciarLuciernagas() {
  if (prefiereQuietud) return;
  sembrarLuciernagas($("#luciernagas"), movilEstrecho ? 9 : 16);
  sembrarLuciernagas($("#luciernagas-cierre"), movilEstrecho ? 12 : 22);
}

function sembrarLuciernagas(nido, n) {
  if (!nido) return;
  for (let i = 0; i < n; i++) {
    const luz = document.createElement("span");
    luz.className = "luciernaga";
    luz.style.left = Math.random() * 100 + "%";
    luz.style.top = Math.random() * 100 + "%";
    luz.style.setProperty("--dur", 7 + Math.random() * 8 + "s");
    luz.style.setProperty("--ret", Math.random() * -14 + "s");
    luz.style.setProperty("--dx", (Math.random() - 0.5) * 90 + "px");
    luz.style.setProperty("--dy", -30 - Math.random() * 70 + "px");
    luz.style.setProperty("--op", 0.35 + Math.random() * 0.45);
    nido.appendChild(luz);
  }
}

function iniciarCabecera() {
  const cabecera = $("#cabecera");
  const ancla = $("#hero");
  new IntersectionObserver(([e]) => {
    /* La cabecera aparece cuando el hero de la landing entra en escena */
    cabecera.classList.toggle("oculta", e.boundingClientRect.top > innerHeight * 0.4);
  }, { threshold: [0, 0.2, 0.6, 1] }).observe(ancla);

  addEventListener("scroll", () => {
    const r = ancla.getBoundingClientRect();
    cabecera.classList.toggle("oculta", r.top > innerHeight * 0.35);
  }, { passive: true });
}

/* ╔══════════════════════════════════════════════════════════════╗
   ║ 7 · ANIMACIONES DE LA LANDING — bloques 2-12 (nuevo)          ║
   ║ Capa aparte: no modifica la coreografía original.             ║
   ╚══════════════════════════════════════════════════════════════╝ */
function iniciarAnimacionesLanding() {
  if (!window.gsap || !window.ScrollTrigger || prefiereQuietud) return;

  /* El viaje de cartas nunca se queda "a medias" en los extremos:
     cerca del inicio vuelve suavemente a 0; cerca del final, culmina.
     (Trigger ADICIONAL: no modifica la coreografía original). */
  if (!document.body.classList.contains("sin-universo")) {
    ScrollTrigger.create({
      trigger: "#universo",
      start: "top top",
      end: "bottom bottom",
      snap: {
        snapTo: (v) => (v < 0.14 ? 0 : v > 0.86 ? 1 : v),
        duration: { min: 0.25, max: 0.9 },
        delay: 0.08,
        ease: "power2.inOut"
      }
    });
  }

  /* ── INTERLUDIO DEL LOGO ──
     La última carta se desvanece hacia el 75 % del viaje; el tramo final
     (75 %→100 %) es el fondo verde limpio. Ahí el logo respira como marca
     de agua: fade-in suave → pausa (~1 s al ritmo del snap) → fade-out,
     desapareciendo justo antes de que entre el Hero. Va ligado al scroll
     (scrub), así jamás tapa contenido ni parece pantalla de carga. */
  const interludio = document.getElementById("interludio-logo");
  if (interludio && !document.body.classList.contains("sin-universo")) {
    ajustarOpacidadInterludio(interludio);
    gsap.timeline({
      scrollTrigger: {
        trigger: "#universo",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6
      }
    })
    .set(interludio, { autoAlpha: 0 }, 0)
    .to(interludio, { autoAlpha: 1, scale: 1, duration: 0.07, ease: "power2.out" }, 0.78)
    .to(interludio, { autoAlpha: 1, duration: 0.10 }, 0.85)   /* pausa visual */
    .to(interludio, { autoAlpha: 0, scale: 1.02, duration: 0.045, ease: "power2.in" }, 0.95);
  }

  /* Parallax en las fotos de los bloques nuevos */
  gsap.utils.toArray(
    ".paso-foto img, .publico-foto img, .testimonio-foto img, .cierre-media img"
  ).forEach((img) => {
    gsap.fromTo(img, { y: -14 }, {
      y: 14, ease: "none",
      scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: 1.2 }
    });
  });

  /* Stagger sutil en mallas de tarjetas (pasos, beneficios, públicos) */
  [".pasos-galeria", ".beneficios-malla", ".publicos-malla", ".testimonios-malla"].forEach((sel) => {
    const malla = document.querySelector(sel);
    if (!malla) return;
    gsap.fromTo(malla.children,
      { opacity: 0, y: 42 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: malla, start: "top 82%" }
      });
    /* Evitar doble animación: estos hijos ya no necesitan la clase .revela */
    [...malla.children].forEach((el) => el.classList.remove("revela"));
  });

  /* El cierre emocional respira: leve zoom de la foto de fondo */
  const cierreImg = document.querySelector(".cierre-media img");
  if (cierreImg) {
    gsap.fromTo(cierreImg, { scale: 1.08 }, {
      scale: 1, ease: "none",
      scrollTrigger: { trigger: "#cierre", start: "top bottom", end: "bottom top", scrub: 1.5 }
    });
  }
}

/* Marca de agua elegante: calcula la opacidad máxima del logo según la
   luminancia del fondo real (leído de la paleta CSS, sin colores nuevos).
   Fondo oscuro → algo más de presencia; fondo claro → más sutil. */
function ajustarOpacidadInterludio(el) {
  const fondo = getComputedStyle(document.body).backgroundColor;
  const m = fondo.match(/\d+(\.\d+)?/g);
  let luminancia = 0.1; /* respaldo: bosque-noche */
  if (m && m.length >= 3) {
    const [r, g, b] = m.map(Number);
    luminancia = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  }
  /* luminancia 0 (negro) → 0.34 · luminancia 1 (blanco) → 0.16 */
  const opacidad = (0.34 - luminancia * 0.18).toFixed(2);
  el.style.setProperty("--interludio-opacidad", opacidad);
}

/* ╔══════════════════════════════════════════════════════════════╗
   ║ 8 · ACORDEÓN FAQ — despliegue suave + rotación del icono      ║
   ╚══════════════════════════════════════════════════════════════╝ */
function iniciarFAQ() {
  const items = document.querySelectorAll(".faq-item");
  items.forEach((item) => {
    const summary = item.querySelector("summary");
    const respuesta = item.querySelector(".faq-respuesta");
    if (!summary || !respuesta) return;

    summary.addEventListener("click", (e) => {
      e.preventDefault();

      /* Cerrar los demás (comportamiento acordeón) */
      items.forEach((otro) => {
        if (otro !== item && otro.open) cerrar(otro);
      });

      item.open ? cerrar(item) : abrir(item);
    });

    function abrir(el) {
      const cuerpo = el.querySelector(".faq-respuesta");
      el.open = true;
      el.classList.add("abierta");
      if (prefiereQuietud) { cuerpo.style.height = "auto"; return; }
      cuerpo.style.height = "0px";
      cuerpo.style.overflow = "hidden";
      requestAnimationFrame(() => {
        cuerpo.style.transition = "height 0.45s cubic-bezier(.22,1,.36,1)";
        cuerpo.style.height = cuerpo.scrollHeight + "px";
        cuerpo.addEventListener("transitionend", function fin() {
          cuerpo.style.height = "auto";
          cuerpo.removeEventListener("transitionend", fin);
        });
      });
    }

    function cerrar(el) {
      const cuerpo = el.querySelector(".faq-respuesta");
      el.classList.remove("abierta");
      if (prefiereQuietud) { el.open = false; return; }
      cuerpo.style.overflow = "hidden";
      cuerpo.style.height = cuerpo.scrollHeight + "px";
      requestAnimationFrame(() => {
        cuerpo.style.transition = "height 0.4s cubic-bezier(.22,1,.36,1)";
        cuerpo.style.height = "0px";
        cuerpo.addEventListener("transitionend", function fin() {
          el.open = false;
          cuerpo.style.height = "";
          cuerpo.removeEventListener("transitionend", fin);
        });
      });
    }
  });
}


/* ── Envío a MailerLite sin salir de la página ──────────────────
   Manda el email por detrás y muestra TU mensaje de éxito, en vez de
   saltar a una pantalla de MailerLite. Usado por los dos formularios. */
function enviarAMailerLite(cfg, email) {
  const datos = new FormData();
  datos.append(cfg.campoEmail || "fields[email]", email);
  datos.append("ml-submit", "1");
  datos.append("anticsrf", "true");
  return fetch(cfg.accion, { method: "POST", mode: "no-cors", body: datos });
}

function exitoCaptacion(form, mensaje, textoOriginal, cfg) {
  form.reset();
  mensaje.textContent = cfg.mensajeExito;
  mensaje.classList.add("captacion-exito");
  setTimeout(() => {
    mensaje.textContent = textoOriginal;
    mensaje.classList.remove("captacion-exito");
  }, 8000);
  if (cfg.urlGracias) setTimeout(() => { location.href = cfg.urlGracias; }, 1200);
}

/* ╔══════════════════════════════════════════════════════════════╗
   ║ 9 · FORMULARIO "CARTA DE LA SEMANA"                           ║
   ╚══════════════════════════════════════════════════════════════╝ */
function iniciarFormularioCarta() {
  const form = $("#form-carta");
  if (!form) return;
  const mensaje = $("#form-carta-mensaje");
  const textoOriginal = mensaje.textContent;
  const cfg = CONTENIDO.formularioCarta;

  form.addEventListener("submit", (e) => {
    const email = form.email.value.trim();
    const consentimiento = $("#consentimiento-carta");

    if (consentimiento && !consentimiento.checked) {
      e.preventDefault();
      mensaje.textContent = "Marca la casilla de privacidad para poder enviarte la carta.";
      mensaje.classList.add("captacion-error");
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.preventDefault();
      mensaje.textContent = "Escribe un email válido para recibir la carta.";
      mensaje.classList.add("captacion-error");
      return;
    }
    mensaje.classList.remove("captacion-error");

    e.preventDefault();
    if (cfg.accion) enviarAMailerLite(cfg, email).catch(() => {});
    exitoCaptacion(form, mensaje, textoOriginal, cfg);
  });
}

/* ╔══════════════════════════════════════════════════════════════╗
   ║ 9-bis · FORMULARIO "LISTA DE LOS PRIMEROS GUARDIANES"          ║
   ╚══════════════════════════════════════════════════════════════╝ */
function iniciarFormularioLista() {
  const form = $("#form-lista");
  if (!form) return;
  const mensaje = $("#form-lista-mensaje");
  const textoOriginal = mensaje ? mensaje.textContent : "";
  const cfg = CONTENIDO.formularioLista || {};

  form.addEventListener("submit", (e) => {
    const email = form.email.value.trim();
    const consentimiento = $("#consentimiento-lista");

    if (consentimiento && !consentimiento.checked) {
      e.preventDefault();
      mensaje.textContent = "Marca la casilla de privacidad para poder avisarte.";
      mensaje.classList.add("captacion-error");
      return;
    }
    if (!email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false) {
      e.preventDefault();
      mensaje.textContent = "Escribe un email válido para guardarte la plaza.";
      mensaje.classList.add("captacion-error");
      return;
    }
    mensaje.classList.remove("captacion-error");

    e.preventDefault();
    if (cfg.accion) enviarAMailerLite(cfg, email).catch(() => {});
    exitoCaptacion(form, mensaje, textoOriginal, cfg);
  });
}

/* ╔══════════════════════════════════════════════════════════════╗
   ║ 10 · CURSOR PERSONALIZADO — sutil, solo escritorio            ║
   ╚══════════════════════════════════════════════════════════════╝ */
function iniciarCursor() {
  const cursor = $("#cursor");
  if (!cursor || movilEstrecho || prefiereQuietud ||
      !matchMedia("(pointer: fine)").matches) {
    if (cursor) cursor.remove();
    return;
  }

  document.body.classList.add("con-cursor");
  let x = innerWidth / 2, y = innerHeight / 2, sx = x, sy = y, ultimoX = x;

  addEventListener("pointermove", (e) => {
    x = e.clientX; y = e.clientY;
    cursor.classList.add("visible");
  }, { passive: true });

  /* Estela de chispas doradas tras la mariposa */
  let ultimaChispa = 0;
  function soltarChispa(cx, cy) {
    const ahora = performance.now();
    if (ahora - ultimaChispa < 90) return;
    ultimaChispa = ahora;
    const ch = document.createElement("span");
    ch.className = "estela-chispa";
    ch.style.left = cx + "px";
    ch.style.top = cy + "px";
    ch.style.setProperty("--dx", (Math.random() - 0.5) * 26 + "px");
    document.body.appendChild(ch);
    setTimeout(() => ch.remove(), 900);
  }

  (function seguir() {
    const dx = x - sx;
    sx += dx * 0.16;
    sy += (y - sy) * 0.16;
    /* La mariposa se inclina hacia donde vuela */
    const inclinacion = Math.max(-16, Math.min(16, dx * 0.35));
    cursor.style.transform = `translate(${sx}px, ${sy}px) rotate(${inclinacion}deg)`;
    if (Math.abs(dx) + Math.abs(y - sy) > 3) soltarChispa(sx, sy + 10);
    ultimoX = sx;
    requestAnimationFrame(seguir);
  })();

  const interactivos = "a, button, summary, input, .carta3d";
  document.addEventListener("pointerover", (e) => {
    cursor.classList.toggle("activo", !!e.target.closest(interactivos));
  }, { passive: true });
  document.addEventListener("pointerdown", () => cursor.classList.add("pulsa"));
  document.addEventListener("pointerup", () => cursor.classList.remove("pulsa"));
  document.addEventListener("mouseleave", () => cursor.classList.remove("visible"));
}

/* ╔══════════════════════════════════════════════════════════════╗
   ║ 11 · NAVEGACIÓN — menú hamburguesa y anclas suaves            ║
   ╚══════════════════════════════════════════════════════════════╝ */
function iniciarNavegacion() {
  const burger = $("#nav-burger");
  const nav = $("#nav-principal");
  if (!burger || !nav) return;

  burger.addEventListener("click", () => {
    const abierto = document.body.classList.toggle("nav-abierta");
    burger.setAttribute("aria-expanded", abierto);
    burger.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
  });

  /* El panel se cierra al elegir una sección */
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      document.body.classList.remove("nav-abierta");
      burger.setAttribute("aria-expanded", "false");
    })
  );

  /* Scroll encuadrado: en lugar de aterrizar en el borde superior de la sección
     (que muestra mucho padding), llevamos el TITULAR a ~110 px de la parte alta,
     de modo que el contenido queda centrado en pantalla. */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href").slice(1);
      if (!id) return;
      const seccion = document.getElementById(id);
      if (!seccion || !seccion.classList.contains("bloque")) return; /* resto: nativo */
      e.preventDefault();
      const titular = seccion.querySelector("h1, h2") || seccion;
      const y = titular.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: Math.max(0, y), behavior: prefiereQuietud ? "auto" : "smooth" });
      history.replaceState(null, "", "#" + id);
    });
  });
}

/* ╔══════════════════════════════════════════════════════════════╗
   ║ 12 · COOKIES — consentimiento y carga condicional de analítica║
   ╚══════════════════════════════════════════════════════════════╝ */
/* ╔══════════════════════════════════════════════════════════════╗
   ║ 11B · TESTIMONIOS — componente escalable                      ║
   ║ Renderiza CONTENIDO.testimonios.items con las mismas clases   ║
   ║ y estilos de las tarjetas existentes. Gesto táctil nativo     ║
   ║ (scroll-snap), flechas y teclado en escritorio, autoplay      ║
   ║ opcional. Admite cualquier cantidad de testimonios.           ║
   ╚══════════════════════════════════════════════════════════════╝ */
function renderizarTestimonios() {
  const pista = $("#testimonios-pista");
  const conf = CONTENIDO.testimonios;
  if (!pista || !conf || !Array.isArray(conf.items) || !conf.items.length) return;

  const escapa = (t) => String(t ?? "").replace(/[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  pista.innerHTML = conf.items.map((it, i) => {
    let medio = "";
    if (it.tipo === "foto" && it.imagen) {
      const respaldo = it.respaldo
        ? ` onerror="this.src='${escapa(it.respaldo)}'"` : "";
      medio = `<img src="${escapa(it.imagen)}" alt="${escapa(it.alt || "")}"
                 class="editable-img" data-placeholder="IMAGEN_TESTIMONIO_${i + 1}"
                 loading="lazy"${respaldo}>`;
    } else if (it.tipo === "video" && it.video) {
      medio = `<video src="${escapa(it.video)}"${it.poster ? ` poster="${escapa(it.poster)}"` : ""}
                 controls playsinline preload="metadata"
                 aria-label="${escapa(it.alt || "Vídeo de testimonio")}"></video>`;
    }
    const cita = it.texto ? `<blockquote>${escapa(it.texto)}</blockquote>` : "";
    const autor = it.autor ? `<cite>${escapa(it.autor)}</cite>` : "";
    return `<figure class="testimonio-foto revela">${medio}
      <figcaption>${cita}${autor}</figcaption></figure>`;
  }).join("");
}

function iniciarTestimonios() {
  const pista = $("#testimonios-pista");
  if (!pista) return;
  const anterior = $("#testimonios-anterior");
  const siguiente = $("#testimonios-siguiente");
  const conf = CONTENIDO.testimonios || {};

  const pasoTarjeta = () => {
    const tarjeta = pista.querySelector(".testimonio-foto");
    if (!tarjeta) return pista.clientWidth;
    const gap = parseFloat(getComputedStyle(pista).columnGap) || 0;
    return tarjeta.getBoundingClientRect().width + gap;
  };
  const desplazar = (dir) =>
    pista.scrollBy({ left: dir * pasoTarjeta(), behavior: prefiereQuietud ? "auto" : "smooth" });

  /* Flechas: solo existen cuando hay más testimonios de los que caben */
  function actualizarFlechas() {
    const hayOverflow = pista.scrollWidth > pista.clientWidth + 4;
    if (anterior) anterior.hidden = !hayOverflow;
    if (siguiente) siguiente.hidden = !hayOverflow;
    if (!hayOverflow) return;
    const max = pista.scrollWidth - pista.clientWidth - 4;
    if (anterior) anterior.disabled = pista.scrollLeft <= 4;
    if (siguiente) siguiente.disabled = pista.scrollLeft >= max;
  }
  if (anterior) anterior.addEventListener("click", () => desplazar(-1));
  if (siguiente) siguiente.addEventListener("click", () => desplazar(1));
  pista.addEventListener("scroll", actualizarFlechas, { passive: true });
  addEventListener("resize", actualizarFlechas);
  actualizarFlechas();

  /* Teclado: la pista es enfocable; flechas ⟵ ⟶ / Inicio / Fin */
  pista.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); desplazar(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); desplazar(-1); }
    else if (e.key === "Home") { e.preventDefault(); pista.scrollTo({ left: 0, behavior: "smooth" }); }
    else if (e.key === "End") { e.preventDefault(); pista.scrollTo({ left: pista.scrollWidth, behavior: "smooth" }); }
  });

  /* Autoplay suave opcional (CONTENIDO.testimonios.autoplay) */
  if (conf.autoplay && !prefiereQuietud) {
    const intervalo = Math.max(2500, conf.intervaloMs || 6000);
    let pausado = false;
    ["pointerenter", "pointerdown", "focusin", "touchstart"].forEach((ev) =>
      pista.addEventListener(ev, () => { pausado = true; }, { passive: true }));
    pista.addEventListener("pointerleave", () => { pausado = false; });
    setInterval(() => {
      if (pausado || document.hidden) return;
      if (pista.scrollWidth <= pista.clientWidth + 4) return;
      const max = pista.scrollWidth - pista.clientWidth - 4;
      if (pista.scrollLeft >= max) pista.scrollTo({ left: 0, behavior: "smooth" });
      else desplazar(1);
    }, intervalo);
  }
}

function iniciarCookies() {
  const banner = $("#cookies-banner");
  if (!banner) return;

  const CLAVE = "gds-cookies-v2";
  const leer = () => {
    try { return JSON.parse(localStorage.getItem(CLAVE)); } catch (_) { return null; }
  };
  const guardar = (prefs) => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify({ ...prefs, fecha: new Date().toISOString() }));
    } catch (_) {}
  };

  let analiticaCargada = false;
  function cargarAnalitica() {
    if (analiticaCargada) return;
    const id = (CONTENIDO.analytics.googleAnalyticsID || "").trim();
    if (!id) return;
    analiticaCargada = true;
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag("js", new Date());
    gtag("config", id, { anonymize_ip: true });
  }

  const panel = $("#cookies-panel");
  const checkAnaliticas = $("#cookies-check-analiticas");
  const btnConfigurar = $("#cookies-configurar");
  const btnGuardar = $("#cookies-guardar");

  function mostrar() {
    const prefs = leer();
    if (checkAnaliticas) checkAnaliticas.checked = !!(prefs && prefs.analiticas);
    panel.hidden = true;
    btnGuardar.hidden = true;
    btnConfigurar.hidden = false;
    banner.hidden = false;
    requestAnimationFrame(() => banner.classList.add("visible"));
  }
  function cerrar() {
    banner.classList.remove("visible");
    setTimeout(() => { banner.hidden = true; }, 500);
  }
  function decidir(analiticas) {
    guardar({ esenciales: true, analiticas });
    if (analiticas) cargarAnalitica();
    cerrar();
    mostrarAviso(analiticas
      ? "✔ Preferencias guardadas: analíticas activadas."
      : "✔ Preferencias guardadas: solo cookies esenciales.");
  }

  $("#cookies-aceptar").addEventListener("click", () => decidir(true));
  $("#cookies-rechazar").addEventListener("click", () => decidir(false));
  btnConfigurar.addEventListener("click", () => {
    panel.hidden = false;
    btnConfigurar.hidden = true;
    btnGuardar.hidden = false;
  });
  btnGuardar.addEventListener("click", () => decidir(!!checkAnaliticas.checked));

  /* ── abrirConfiguracionCookies() — función ÚNICA de apertura ──
     Si SITE_CONFIG.COOKIES.CMP está configurado, delega en el gestor
     externo; si no, abre el panel propio directamente en modo
     configuración. El consentimiento siempre es revocable (RGPD 7.3). */
  function abrirConfiguracionCookies() {
    const { CMP, CMP_ABRIR } = SITE_CONFIG.COOKIES;
    switch ((CMP || "").toLowerCase()) {
      case "cookieyes":
        if (window.revisitCkyConsent) return window.revisitCkyConsent();
        break;
      case "cookiebot":
        if (window.Cookiebot) return window.Cookiebot.renew();
        break;
      case "complianz":
        if (window.cmplz_show_banner) return window.cmplz_show_banner();
        break;
      case "custom":
        if (typeof CMP_ABRIR === "function") return CMP_ABRIR();
        break;
    }
    /* Panel propio, abierto ya en la vista de configuración */
    mostrar();
    panel.hidden = false;
    btnConfigurar.hidden = true;
    btnGuardar.hidden = false;
  }
  window.abrirConfiguracionCookies = abrirConfiguracionCookies; /* accesible para CMPs */

  const reabrir = $("#cookies-reabrir");
  if (reabrir) reabrir.addEventListener("click", (e) => {
    e.preventDefault();
    abrirConfiguracionCookies();
  });

  /* Primera visita → banner. Visitas posteriores → aplicar lo elegido. */
  const prefs = leer();
  if (!prefs) { mostrar(); return; }
  if (prefs.analiticas) cargarAnalitica();
}
