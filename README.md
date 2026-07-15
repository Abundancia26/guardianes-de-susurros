# Guardianes de Susurros — Web One-Page (v4)

Landing inmersiva de venta para **Guardianes de Susurros** (Vivamos Despiertos).
Apertura 3D con túnel de cartas (intacta desde v1) + landing de conversión de 13 bloques,
navegación, cookies, páginas legales y todo el contenido editable desde un solo lugar.

## Archivos

```
index.html                Estructura y copy (placeholders ▸ ver abajo)
styles.css                Dirección de arte completa (colores en :root, al principio)
main.js                   ① CONTENIDO editable  ② universo 3D (⛔ no tocar)
                          ③ resto de módulos, cada uno en su sección numerada
aviso-legal.html          Plantillas legales — rellena los [CORCHETES]
privacidad.html           y revísalas con tu asesoría antes de publicar
cookies.html
envios-devoluciones.html
assets/branding/          logo-guardianes(.png/-min.png) · logo-vivamos.png (cursor)
assets/cards/             carta-01..04.jpg + carta-semana-frontal.jpg (añade más)
assets/photos/            fotos provisionales ya colocadas
assets/placeholders/      TODO lo que falta por subir (lista abajo)
```

## ✏️ TODO para dejarla 100 % operativa (solo enlaces y archivos)

En `main.js`, objeto **CONTENIDO** (líneas iniciales, cada campo lleva ▸ REEMPLAZAR):

| Campo | Qué poner |
|---|---|
| `urlCompra` | URL de tu pasarela (Stripe Payment Link, Shopify…). Vacía = los botones llevan al bloque de compra, nunca hay enlaces rotos. |
| `formularioCarta.accion` | URL del formulario de tu autoresponder (MailerLite, Brevo, Mailchimp…). `campoEmail` = name del campo (Mailchimp usa "EMAIL"). `urlGracias` = página de gracias opcional. Vacía = modo demo. |
| `emailContacto` | Tu email (alimenta «Contacto» y el enlace B2B del footer). |
| `redes.instagram` / `.tiktok` / `.youtube` | URLs de tus perfiles y canal. |
| `analytics.googleAnalyticsID` | «G-XXXX…». Solo se carga si el visitante ACEPTA cookies. |
| `cartaDeLaSemana` | Título, imagen, misión, susurro e indagación de la carta vigente. |
| `villaEtiqueta` | Título, descripción, miniatura y enlace del episodio. |
| `cartasUniverso` | Rutas de las cartas del túnel 3D (añade las que exportes, ratio ~2:3.1 con marco). |

Archivos por subir a `assets/placeholders/` (mientras no existan, hay respaldo automático):
- `video_hero.mp4` (8-10 s, mudo, bucle) y `video_testimonios.mp4` (45-60 s)
- `tension-fondo.jpg` (escena de mesa con pantallas; se intuye tras el velo verde)
- `paso-1..4-*.jpg` · `publico-*.jpg` (5) · `testimonio-1..4.jpg`
- `producto-flatlay.jpg` · `cierre-atardecer.jpg` (opcional: se funde sobre el fondo mágico)

## Cómo editar sin romper nada

- **Textos:** busca `<!-- PLACEHOLDER_TEXT: NOMBRE -->` en `index.html` y edita el texto
  que hay justo debajo.
- **Imágenes/vídeos:** todos llevan `class="editable-img|editable-video"` y un
  `data-placeholder` único; cambia el `src` o sube el archivo con el nombre esperado.
- **Colores y tipografías:** variables en `:root` al principio de `styles.css`
  (`--pergamino`, `--bosque`, `--dorado`, `--f-display`…). Cambia una variable y
  cambia toda la web.
- **⛔ Regla de Oro:** la apertura (sección `#universo` del HTML, su bloque en CSS y las
  secciones 3-4 de `main.js`) no se toca. Todo lo nuevo vive en módulos aparte.

## Qué hace cada módulo nuevo (main.js)

7 · animaciones de la landing (parallax, staggers) + **snap del túnel**: si te quedas
cerca del inicio o del final del viaje de cartas, la página te acompaña suavemente al
extremo — nunca se queda «a medias». · 8 FAQ acordeón · 9 formulario con envío nativo al
autoresponder · 10 cursor mariposa de Vivamos Despiertos con estela de chispas doradas
(chispa sola si falta el logo; desactivado en táctil y con `prefers-reduced-motion`)
· 11 menú hamburguesa con scroll «encuadrado» (las secciones aterrizan con su titular a la
vista, sin margen muerto) · 12 consentimiento de cookies RGPD/AEPD: Aceptar todas /
Rechazar todas / Configurar (granular), revocable desde «Configurar cookies» en el footer,
y la analítica solo se carga tras activación expresa.

**Cumplimiento UE/España incluido:** banner con las tres opciones a igual prominencia,
panel por categorías, consentimiento revocable (art. 7.3 RGPD), casilla de aceptación de
la política de privacidad en el formulario de captación, y 4 plantillas legales
(rellena los [CORCHETES] y revísalas con tu asesoría). Los enlaces de Contacto y B2B
abren tu app de correo Y copian el email al portapapeles con un aviso, para que
funcionen aunque el visitante no tenga cliente de correo configurado.

## Publicar

Web 100 % estática: sube TODA la carpeta a Netlify, Vercel, cPanel…
Prueba local: `python3 -m http.server` y abre http://localhost:8000
