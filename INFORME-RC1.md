# INFORME — Release Candidate v1.0 · Guardianes de Susurros

> ## ADENDA · Cartas definitivas del hero (última iteración)
>
> **Qué se pidió:** sustituir las 4 cartas provisionales del universo 3D por las
> 16 ilustraciones definitivas, optimizadas, sin tocar diseño, tamaño, posición
> ni animaciones.
>
> **Identificación automática.** Las 16 imágenes son cartas del mazo (todas
> ~583×915, ratio 0.637). Se mapearon por su título y se ordenaron con la carta
> insignia primero:
> `El Guardián de Susurros` · `La Sinfonía del Jardín` · `La Biblioteca del
> Silencio` · `El Río de la Resistencia` · `El Baile de las Manos Torpes` ·
> `El Camino de los Propósitos` · `El Elogio Prohibido` · `El Mapa del Artesano` ·
> `La Receta Mágica` · `La Armadura del Corazón` · `El Don Escondido` ·
> `El Despertar del Oasis` · `El Traje del Héroe` · `La Torre de la Unidad` ·
> `El Minuto Gruñón` · `El Juego de los Deseos Secretos`.
>
> **Optimización (WebP).** Se compararon WebP y JPEG a 720/800/900 px midiendo
> peso y **SSIM** (similitud estructural) contra el original:
>
> | Formato | Alto | Peso medio | SSIM |
> |---|---|---|---|
> | JPEG q85 | 900 px | 136 KB | 0.934 |
> | **WebP q88** | **900 px** | **102 KB** | **0.953** |
>
> WebP gana en las dos columnas: **25 % menos peso y más calidad**. Se eligió
> **900 px / q88** porque coincide con la resolución de las cartas que ya había
> (915 px), así el comportamiento visual es idéntico. Resultado: **16 cartas en
> 1,50 MB** (SSIM mínimo 0.951 → sin pérdida apreciable). Los PNG originales
> sumaban 16 MB.
>
> **Sin cambios de diseño.** El plano 3D mide 2.1×3.28 (ratio 0.640) y las cartas
> nuevas tienen 0.637: **0,5 % de desviación**, imperceptible → ni deformación ni
> cambio de tamaño. Se editó **una única cosa**: el array
> `CONTENIDO.cartasUniverso` de `main.js`. Ni una línea de CSS, ni de HTML, ni del
> motor 3D o sus animaciones.
>
> **Verificación con el motor 3D real.** Como el sandbox no alcanza el CDN, se
> trajo Three.js r128 y GSAP desde npm y se interceptaron las peticiones en la
> prueba (sin tocar el proyecto), sirviendo la web por HTTP:
> - universo 3D activo con WebGL, **16/16 texturas servidas 200**, 0 peticiones
>   fallidas, 0 errores de consola;
> - móvil: 11 texturas (las que reparte el túnel en pantalla estrecha), 0 px de
>   desbordamiento;
> - **animaciones vivas**, medidas comparando fotogramas: flotación orgánica
>   18,9 % del cuadro, viaje de cámara con scroll 36,2 %, parallax de ratón 22,0 %;
> - **geometría idéntica al original** (universo 2880 px, hero 900, testimonios
>   1436, compra 1144, página 15811) y resto de la web intacto (FAQ, carta de la
>   semana, testimonios, enlaces del footer).
>
> **Retirado:** `carta-01.jpg`…`carta-04.jpg` (provisionales, ya huérfanas).
> **Conservado:** `carta-semana-frontal.jpg`, que no pertenece al hero.
>
> *Nota para el futuro:* añadir una carta = añadir una línea a `cartasUniverso`.
> Exportar a WebP 900 px q88 mantiene la coherencia del conjunto.

---


Revisión profesional previa al lanzamiento. Diseño, copy, animaciones y experiencia
intactos; verificado con comparación de geometría contra la versión original
(altura de todos los bloques y de la página completa: idénticas al píxel).

---

## 1 · Problemas encontrados y corregidos

**SEO / GEO**
- `canonical` apuntaba a un dominio antiguo → ahora `https://guardianesdesusurros.com/`.
- Faltaban `og:url`, `og:site_name`, `og:locale`, `og:image:alt`, Twitter Cards,
  `robots`, favicon y sitemap → añadidos. `og:image` en URL absoluta y marcado
  `▸ REEMPLAZAR` para la imagen definitiva (1200×630).
- JSON-LD: solo existía `Product` → ampliado a un `@graph` con **Organization,
  Brand, WebSite, Product** (precio 49 €, audiencia 8+, vendedor) **y FAQPage**
  con las 5 preguntas reales de la web, palabra por palabra. HTML semántico +
  datos estructurados = legible para buscadores y motores de IA.
- Creados `robots.txt` y `sitemap.xml` (solo la portada: las páginas legales llevan
  `noindex` deliberado y un sitemap no debe listar URLs noindex).
- Páginas legales: añadidos `canonical`, `meta description` y favicon,
  **respetando su `noindex` original**.
- Favicons generados desde el logotipo oficial (32, 192 y apple-touch 180).

**Accesibilidad**
- El título decorativo de la apertura era un `<h2>` anterior al `<h1>` (orden de
  encabezados roto) → ahora es un `<p>`; CSS y GSAP lo seleccionan por clase, así
  que el aspecto y la animación son idénticos.
- Añadido enlace «Saltar al contenido» (invisible salvo con foco de teclado).
- Auditoría del resto: 0 imágenes sin `alt`, 0 botones/enlaces sin nombre accesible,
  un único `h1`, `lang="es"`, formulario con etiqueta y consentimiento RGPD,
  `focus-visible` y `prefers-reduced-motion` ya correctos. Sin más cambios.

**Código / recursos**
- `assets/placeholders/` estaba **vacío**: 16 imágenes y 2 vídeos daban 404 en cada
  visita (los `onerror` lo disimulaban). Rellenados los 14 placeholders de foto con
  copias exactas de sus propios fallbacks → **mismos píxeles en pantalla, 14
  peticiones fallidas menos**; el flujo de trabajo se mantiene (basta sobrescribir
  el archivo con el material definitivo).
- Sin IDs duplicados, sin anclas rotas, sin funciones muertas (el candidato
  `seguir` es el bucle interno del cursor, en uso).

**Responsive**
- Verificado a 390 / 768 / 1440 px: 0 px de desbordamiento horizontal en los tres.
  Sin problemas reales de maquetación → sin cambios.

## 2 · Componente de testimonios escalable (punto 4 del encargo)

- Los testimonios ahora viven en `main.js → CONTENIDO.testimonios.items` y admiten
  tres tipos mezclables: **foto**, **vídeo vertical** (se encuadra solo dentro de la
  tarjeta, misma altura de retícula) y **solo texto**. Añadir uno = añadir un objeto;
  el componente no se toca.
- Mismas tarjetas, mismas clases, misma identidad; con los 4 testimonios actuales el
  bloque mide **exactamente lo mismo que antes (1436 px, verificado)** y las flechas
  ni siquiera existen (solo aparecen cuando hay más testimonios de los que caben).
- Deslizable con el dedo en móvil (scroll-snap nativo), navegable con teclado
  (⟵ ⟶ Inicio Fin sobre la pista enfocable), `autoplay` suave opcional
  (`autoplay: true`, se pausa al tocar/enfocar y respeta movimiento reducido).
- Probado con 7 testimonios en caliente: renderiza, desliza, flechas y teclado OK.
- El HTML conserva las 4 tarjetas como respaldo sin JavaScript.

## 3 · Preparación multiidioma (punto 5)

Sin tocar la versión en español:
- `hreflang` es + x-default publicados; plantilla comentada para en/it/fr/de.
- `lang/es.json`: textos fuente para el traductor, con claves alineadas con los
  comentarios `PLACEHOLDER_TEXT` del HTML.
- Selector de idioma preparado y desactivado (bloque comentado en la cabecera +
  CSS comentado), listo para activar con el segundo idioma.
- `docs/I18N.md`: guía paso a paso (estrategia de carpeta por idioma, la más
  robusta para una web estática artesanal) y hueco documentado en `sitemap.xml`.

## 4 · Qué decidí NO modificar (y por qué)

- **`tension-fondo.jpg` y `cierre-atardecer.jpg`**: sus `onerror` los ocultan a
  propósito mientras no exista el material; crear archivos los haría visibles y
  cambiaría el aspecto actual. Quedan como 2 peticiones 404 documentadas que
  desaparecerán al subir las fotos definitivas.
- **Los 2 vídeos placeholder** (`video_hero.mp4`, `video_testimonios.mp4`): el
  `<source>` es el mecanismo de sustitución documentado («sube el archivo y
  funciona»); se muestran sus pósteres. Mismo caso que el anterior.
- **`noindex` de las páginas legales**: decisión de proyecto razonable; respetada.
- **Contraste del texto legal del footer** (~4:1, justo en el límite AA para texto
  pequeño): corregirlo implica tocar el diseño → documentado, no aplicado.
- **Duplicidad benigna**: dos bloques `prefers-reduced-motion` en CSS (el segundo
  es del interludio del logo, aditivo). Funcionan bien juntos; fusionarlos sería
  refactorizar sin necesidad.
- No se ha refactorizado nada más: el universo 3D, la coreografía de scroll, el
  cursor, las luciérnagas y el resto del código quedan sin tocar.

## 5 · Verificación final

- Sintaxis JS ✓ · JSON-LD válido (5 nodos) ✓ · IDs y anclas ✓
- Alturas de bloques y de página completa: **idénticas al original** ✓
- Overflow horizontal 390/768/1440: 0 px ✓
- FAQ, carta de la semana, formulario, cookies, navegación: funcionando ✓
- Consola limpia salvo los 4 recursos pendientes de material documentados arriba ✓
- El bloque del universo 3D y su coreografía no se han modificado (los CDN están
  bloqueados en el entorno de pruebas; al no haberse tocado ese código ni sus
  selectores, su comportamiento es por construcción el mismo).

## 6 · Mejoras futuras recomendadas (no implementadas)

1. Convertir las fotos a **WebP/AVIF** con `<picture>` (~40-60 % menos peso).
2. **Autoalojar las tipografías** (woff2) para eliminar la dependencia de Google
   Fonts y mejorar el primer render y la privacidad (RGPD estricto).
3. Añadir `width`/`height` explícitos a las imágenes para blindar el CLS.
4. Subir ligeramente el contraste del texto legal del footer (AA holgado).
5. Página **404 personalizada** con la estética de la marca.
6. Al tener los vídeos definitivos: `preload="none"` + póster optimizado, y
   subtítulos (`<track>`) en el vídeo de testimonios para accesibilidad plena.
7. `Cache-Control` largos para `assets/` en el hosting y compresión brotli.
8. Cuando exista la pasarela de pago: añadir `shippingDetails` y
   `hasMerchantReturnPolicy` al `Offer` del JSON-LD (rich results de producto).

---

**Archivos modificados:** `index.html`, `styles.css`, `main.js`, `aviso-legal.html`,
`privacidad.html`, `cookies.html`, `envios-devoluciones.html`.
**Archivos nuevos:** `robots.txt`, `sitemap.xml`, `lang/es.json`, `docs/I18N.md`,
`assets/branding/favicon-32.png`, `favicon-192.png`, `apple-touch-icon.png`,
14 imágenes provisionales en `assets/placeholders/`, y este informe.
