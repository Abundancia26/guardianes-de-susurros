# Revisión integral · Guardianes de Susurros

**Fecha:** 8 de septiembre de 2026
**Archivos tocados:** `index.html`, `main.js`, `styles.css`, `lang/es.json`, `envios-devoluciones.html`, `README.md`
**Sin tocar:** el bloque `#universo` (la Regla de Oro), la paleta, las tipografías, la estructura de bloques y todos los textos que no entraban en tu lista.

---

## A. CAMBIOS REALIZADOS

### 1 · «El susurro de esta semana»
- Texto sustituido por el tuyo, palabra por palabra.
- Se mantienen la ilustración, el giro de la carta y «✦ pulsa la carta para girarla ✦».
- **El reverso de la carta ya no muestra la Misión, el Susurro ni la Indagación de la carta concreta.** Ahora es una plantilla fija que explica qué es cada una de las tres partes y remata con «La carta de esta semana llega por email». La ilustración sí sigue siendo la de la carta activa.

### 2 · Formulario de la Carta de la Semana
- Introducción, campo, botón y los dos textos de debajo: exactamente los que pediste.
- Se ha eliminado la lista de tres viñetas («La carta completa / Cómo jugarla / El Susurro»).
- El checkbox de privacidad se mantiene.

### 3 y 17 · Los dos CTA
- «Dejar mi nombre» ha desaparecido de todo el proyecto (eran 3 botones).
- Los cinco CTA de venta anticipada dicen **«Quiero entrar en la venta anticipada»**.
- El de la carta semanal sigue diciendo **«Llévate la carta gratis»**. Son dos formularios distintos y no se han mezclado.
- **Cómo se diferencian:** el de venta anticipada va en versalitas y más ancho; el de la carta, en redonda. No he cambiado el dorado de marca en ningún botón.
- «1 y 2 de diciembre» aparece ahora en el hero, en el bloque de compra, en la caja de fechas, en un párrafo destacado sobre el formulario y en las preguntas frecuentes.

### 4 y 21 · La promesa de la carta semanal
- La web dice «Cada semana abrimos una nueva carta» y nada más: ni 49 semanas, ni 49 cartas seguidas, ni duración.
- La sección **no depende de que haya vídeo**: funciona con ilustración y texto. Si una semana no hay ilustración propia, sale la de por defecto.

### 5 y 6 · Testimonios
- Nombres corregidos: **Victòria** (adulta), **Txènia**, **Vicky** (niña), **Anskari**. La edad va debajo del nombre.
- Arquitectura nueva: FOTO (si existe) + NOMBRE + FRASE, y un botón **«Ver testimonio»** que abre el vídeo en una ventana.
- El vídeo **no se reproduce solo y no se carga con la página**: el reproductor se crea al pulsar y se destruye al cerrar. Se cierra con Escape, con la X o pulsando fuera, y el tabulador se queda dentro mientras está abierta.
- Hoy no hay ni retratos ni vídeos, así que se ven solo las frases. En cuanto añadas `imagen:` o `video:` a cada testimonio en `main.js`, aparecen solos.

### 7 · Número de cartas
- **49 cartas** en toda la web: meta descripción, Open Graph, Twitter, datos estructurados, bloque «Cómo funciona», bloque de compra, texto alternativo de la foto y `lang/es.json`. No queda ningún «48».

### 8, 9 y 10 · Preguntas frecuentes
- Eliminada «¿Qué pasa si no nos gusta?» y su respuesta, en la web **y** en los datos estructurados **y** en `lang/es.json` **y** en la página de envíos y devoluciones.
- Añadidas «¿Necesito jugar con otras personas?» y «¿Las cartas se pueden jugar más de una vez?» con tus respuestas exactas.
- Sustituida «¿Puedo jugar solo/a?» (prometía «un ritual completo en el librito») por la nueva, que dice «algunas cartas».
- «¿Cuándo me llega si dejo mi nombre hoy?» → «¿Cuándo me llega si entro hoy en la venta anticipada?».

### 13 · «Mientras llega tu saquito…»
- **Villa Etiqueta eliminada por completo**: sección, textos, CSS y la configuración `villaEtiqueta` de `main.js`.
- En su lugar, tu texto del canal con el botón **«Ver el canal de YouTube»** apuntando a `https://www.youtube.com/@VivamosDespiertos`, que ya estaba en el proyecto. No he inventado ninguna URL.

### 15 · Colaboraciones profesionales
- Era una línea diminuta y gris al final del pie. Ahora es una **sección propia** con su caja, «¿Eres coach, psicólogo o formador?», tu texto y el botón «Hablar sobre colaboraciones».

### 16 · Promesas suavizadas
| Antes | Ahora |
|---|---|
| «Pero sí va a arreglar tu sobremesa» | «Pero puede cambiarte la sobremesa» |
| «te ayuda a disfrutar del presente» | «te propone disfrutar del presente» |
| «Te despierta en el presente» | «Te invita a despertar en el presente» |
| «El ruido se calla: la mente para…» | «Bajar el ruido: una invitación a soltar…» |
| «La verdad sale sola… ya no da miedo» | «Bajar la guardia… puede dar menos miedo» |
| «Empatía real: descubres… Y eso os une» | «Mirar de otra manera: puedes descubrir…» |
| «dejáis de hablar en superficie» | «una invitación a dejar la superficie» |
| «Aquí nacen las conversaciones de verdad» | «Aquí pueden nacer…» |
| «Te escribiremos dos o tres veces. Ni una más» | «Te escribiremos pocas veces antes de diciembre, y solo de esto» |

### 20 · Identidad visual
- Sin rediseño. Mismos colores, tipografías y estructura. No he metido iconografía genérica.
- Los emojis que había en las insignias del bloque de compra (📦 🔒 🎁 💚) se han dejado como estaban: eran tuyos, no míos.

---

## B. PROBLEMAS TÉCNICOS CORREGIDOS

1. **El acordeón de preguntas frecuentes (tu punto 12) — encontrada la causa exacta.**
   Las dos primeras preguntas tenían la respuesta suelta y las otras cinco envuelta en `.faq-respuesta`. El código daba por hecho que todas la tenían. Al abrir una de las dos primeras y pulsar después cualquier otra, saltaba un error de JavaScript **a mitad del clic**, y ese error dejaba muerto el resto del acordeón hasta recargar la página. Eso era exactamente lo que veías.
   Arreglado en tres capas: todas las respuestas van ya envueltas igual; las funciones toleran que falte el cuerpo; y si la animación no termina, hay un plazo de seguridad que la cierra igual. **Probado: 7 de 7 preguntas abren al primer clic, en escritorio, tablet y móvil, sin recargar.**

2. **Casilla de privacidad descolocada.** La regla del campo de email alcanzaba también al checkbox y lo estiraba, dejando un hueco enorme entre la casilla y su texto. Corregido en los dos formularios.

3. **Cuatro recursos que daban 404** en cada visita: `video_hero.mp4`, `video_testimonios.mp4`, `tension-fondo.jpg` y `cierre-atardecer.jpg`. Los vídeos se montan ahora solo si hay archivo (si no, el hueco no se pinta); las dos fotos están comentadas con instrucciones para descomentarlas cuando existan.

4. **Testimonios inventados en el código.** Las cuatro reseñas de «María y Carlos», «Grupo de Bilbao», «Laura» y «Ana» seguían en el HTML como respaldo por si fallaba el JavaScript. Sustituidas por las siete personas y frases reales del 28 de junio.

5. **Tipografía de las respuestas** (tu punto 11): fijadas familia, tamaño, peso, interlineado, espaciado, color y estilo de enlaces. Sin tipografías nuevas.

6. **Sin errores de JavaScript propios y sin desbordamiento horizontal** en 1440, 820 y 390 px.

---

## C. ENLACES CORREGIDOS

- `#villa-etiqueta` → `#canal-youtube`, con el enlace real del canal en la miniatura y en el botón (antes los dos eran `href="#"`).
- «Configurar cookies» del pie: era un `<a href="#">`; ahora es un `<button>` (que es lo que realmente hace: abrir el panel).
- «Contacto», el email del pie y el botón de colaboraciones: ya no llevan `href="#"`. El destino lo pone `main.js`; mientras no haya correo configurado, se ocultan en vez de quedarse muertos.
- **No queda ni un solo `href="#"` en la web** (comprobado en las tres resoluciones).
- Los `index.html#pie` de las cuatro páginas legales **son correctos** y se han dejado: `#pie` existe. Comprobada la ida y la vuelta.
- Instagram, TikTok, YouTube, política de privacidad, aviso legal, cookies y envíos: todos apuntan a destinos que existen. Ningún recurso local da 404.

---

## D. TEXTOS ELIMINADOS O MODIFICADOS

**Eliminados por completo del proyecto:**
- «Dejar mi nombre» (3 sitios) · «Chenia» · «Ans Kari» · «Victoria» para la adulta
- «48 cartas» (8 sitios) · «Villa Etiqueta» (5 sitios)
- «estudio completo» · «te devolvemos el dinero. Sin preguntas» (4 sitios, incluida la página de envíos)
- La FAQ «¿Qué pasa si no nos gusta?» y la sección «Garantía primera partida» de envíos y devoluciones
- La lista de tres viñetas del formulario de la carta
- La Misión, el Susurro y la Indagación de «El Doblaje Inconsciente» del reverso de la carta

**Modificados:** los de la tabla del punto 16, más «Deja aquí tu nombre» → «Deja aquí tu email», «Dejar tu nombre no te compromete» → «Dejar tu email…», «hoy solo se deja el nombre» → «hoy solo se deja el email», y «1 dic · Se abre el saquito» → «1 y 2 dic · Venta anticipada, por internet».

---

## E. LO QUE NO HE PODIDO COMPLETAR (te toca a ti)

### 🔴 1. No hay ningún correo de contacto en el proyecto
Es lo más importante de esta lista. `SITE_CONFIG.EMAIL_CONTACTO` está vacío y **no existe ninguna dirección en ningún archivo**, así que no podía inventarme una. Consecuencia: **hoy la web no ofrece ninguna vía de contacto** — el enlace «Contacto» del pie, el email del pie y el botón de colaboraciones están ocultos.

Se arregla con una línea, en `main.js`, arriba del todo:
```js
EMAIL_CONTACTO: "info@vivamosdespiertos.com",
```
Los tres vuelven a aparecer solos. (Es tu tarea pendiente de crear el correo del dominio.)

### 🟠 2. Los dos formularios siguen yendo a la misma lista de MailerLite
`formularioCarta.accion` y `formularioLista.accion` apuntan al mismo formulario (`198022402603484161`). Quien se apunte a la venta anticipada recibirá también la carta semanal, y al revés. Pásame el número del segundo formulario (o cámbialo tú: es solo el número largo de esa dirección, en `main.js`).

### 🟡 3. Sin material gráfico todavía
No he generado ni inventado nada. Faltan y están esperando ruta:
- Los 7 retratos de los testimonios → `imagen:` en cada testimonio
- Los vídeos de los testimonios → `video:` en cada testimonio (activa el botón «Ver testimonio»)
- El vídeo de 60 s → `videoTestimonios.archivo`
- El bucle del hero → `videoHero.archivo`
- `tension-fondo.jpg` y `cierre-atardecer.jpg` → subirlos y descomentar dos líneas
- Las 4 plantillas legales siguen con `[CORCHETES]` sin rellenar

---

## F. CONTRADICCIONES QUE HE ENCONTRADO

1. **Lo de la carta concreta.** Me pediste mantener la interacción de girar la carta y, a la vez, que la Misión, el Susurro y la Indagación de «El Doblaje Inconsciente» no aparezcan en esa sección. Eran justo lo que se veía al girarla. He resuelto así: se gira igual, pero el reverso es ahora una plantilla genérica. **Si prefieres que vuelva a mostrar el contenido de la carta activa, dímelo y lo devuelvo en un minuto.**

2. **Dominio.** La web vive en `guardianes-de-susurros.vercel.app`, pero el enlace canónico, los datos estructurados y las imágenes para compartir apuntan a `guardianesdesusurros.com`. No lo he tocado porque imagino que ese dominio es el plan. Si no lo vas a comprar, hay que cambiarlo antes de publicar o Google indexará una dirección que no existe.

3. **«¿Puedo jugar solo/a?»** decía que en el librito hay «un ritual completo para jugar en solitario», y tu punto 9 pide justo lo contrario: no afirmar que todas las cartas funcionan igual en solitario. Por eso la he sustituido en lugar de dejar las dos.

4. **Las tres menciones a «1 y 2 de diciembre»** en el mismo bloque (caja de fechas, párrafo destacado y FAQ) son un poco redundantes. Lo he dejado así porque tu punto 3 pedía que la referencia estuviera «claramente visible», pero se puede quitar el párrafo del medio si te chirría.

5. **`CONTENIDO.preventa`** era una configuración que no leía nadie y que además tenía «1 de diciembre» a secas. La he quitado para que no te confunda: las fechas están en el HTML.

6. **El botón de cabecera en móvil.** «Quiero entrar en la venta anticipada» no cabe en 390 px sin romper el logo. En pantallas estrechas se enseña «Venta anticipada» (mismo botón, misma sección). Si prefieres el texto largo siempre, se cambia en una línea del CSS.

---

## Cómo comprobarlo

Todo esto está probado con un navegador real en 1440 × 900, 820 × 1180 y 390 × 844:
las 7 preguntas abriendo y cerrando seguidas, la carta girando, los dos formularios
(avisando sin marcar privacidad y confirmando al enviar), cero recursos rotos,
cero errores de JavaScript, cero enlaces vacíos y cero desbordamiento horizontal.
