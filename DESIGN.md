---
name: Diego Mera Portfolio
description: Portafolio UX/UI en blanco y negro, con el nombre a todo el ancho y un único naranja para agendar.
colors:
  paper: "#ffffff"
  ink: "#0b0b0b"
  ink-2: "#3a3a38"
  soft: "#6b6b68"
  faint: "#b4b4b0"
  tone: "#f1f1ef"
  tone-2: "#e4e4e1"
  signal-orange: "#ff4d00"
  on-ink: "#ffffff"
  on-ink-soft: "#a9a9a5"
  error: "#b3261e"
typography:
  display:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "calc(100cqw * 0.2066)"
    fontWeight: 500
    lineHeight: 0.86
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(48px, 8.4vw, 120px)"
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  headline-section:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(40px, 4.45vw, 64px)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.03em"
  lead:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(24px, 2.2vw, 32px)"
    fontWeight: 400
    lineHeight: 1.18
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "\"ss01\""
rounded:
  none: "0px"
spacing:
  edge-mobile: "20px"
  edge-desktop: "32px"
  section-mobile: "96px"
  section-desktop: "160px"
  nav-mobile: "64px"
  nav-desktop: "76px"
  measure: "38rem"
components:
  button-primary:
    backgroundColor: "{colors.signal-orange}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
    height: "48px"
  button-ink-hover:
    backgroundColor: "{colors.ink-2}"
  button-link:
    textColor: "{colors.ink}"
    height: "44px"
  input:
    backgroundColor: "{colors.tone}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "14px 16px"
  input-hover:
    backgroundColor: "{colors.tone-2}"
  chip:
    backgroundColor: "{colors.tone}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "44px"
  chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
  media-slot:
    backgroundColor: "{colors.tone}"
    rounded: "{rounded.none}"
---

# Design System: Diego Mera Portfolio

## Overview

**Creative North Star: "La firma en grande"**

El nombre es la portada. "Diego Mera" ocupa todo el ancho del contenedor en el hero y vuelve a cerrar la página en el footer, como una firma al pie de un documento. Todo lo demás es blanco, negro y silencio: una sola familia tipográfica, superficies separadas por un paso de tono, esquinas rectas y ningún adorno que compita con el trabajo.

En ese silencio hay una sola voz de color: un naranja señal que aparece donde hay que actuar (agendar la llamada). La densidad es baja y el ritmo generoso: secciones separadas por 96px en móvil y 160px en desktop, titulares de dos líneas como máximo y texto de lectura a 16px con interlineado amplio. La jerarquía se construye con tamaño y peso, nunca con cajas, líneas o sombras.

El movimiento es sobrio y tiene una firma: el nombre sube desde detrás de su propia línea base al cargar. El resto de entradas son desplazamientos cortos con una curva de salida fuerte, y todo es visible sin JavaScript o con movimiento reducido.

**Key Characteristics:**
- El nombre a todo el ancho como identidad (hero y footer).
- Blanco y negro con un único acento naranja para la acción.
- Una sola familia (Host Grotesk 400/500), tracking negativo en tamaños grandes.
- Plano: profundidad por tono, sin sombras ni bordes.
- Esquinas rectas en todo.
- Movimiento CSS breve, con la subida del nombre como firma.

## Colors

Una paleta casi monocroma de blancos cálidos y negros de tinta, interrumpida por un solo naranja de alta energía.

### Primary
- **Naranja señal** (`signal-orange`): el color de la acción. Fondo del botón "Agendar llamada" (siempre con texto en tinta, contraste 6.5:1), del envío del formulario y de la barra móvil para agendar. También marca la selección de texto.

### Neutral
- **Papel** (`paper`): fondo de todas las páginas y de la navegación fija.
- **Tinta** (`ink`): texto, footer, botón secundario, chip seleccionado y anillo de foco.
- **Tinta segunda** (`ink-2`): hover del botón tinta y segunda etapa de la barra de proceso.
- **Gris lectura** (`soft`): texto secundario y casos atenuados en la lista de trabajo (5.3:1 sobre papel).
- **Gris tenue** (`faint`): solo elementos deshabilitados o decorativos; nunca texto de lectura.
- **Tono** (`tone`): superficies de imagen, campos, chips sin seleccionar y avisos. También el fondo recoloreado de las Lotties de los casos.
- **Tono segundo** (`tone-2`): hover de campos y chips, y etapas claras de la barra de proceso.
- **Sobre tinta** (`on-ink`, `on-ink-soft`): texto principal y secundario sobre fondos de tinta.
- **Error** (`error`): mensajes y contorno de validación.

### Named Rules
**The One Signal Rule.** El naranja señal solo aparece en la acción de agendar (botón primario, envío del formulario, barra móvil). Única excepción documentada: la tercera etapa de la barra de "Proceso" de la home. Fuera de eso, cualquier naranja es un error.

**The Ink-On-Signal Rule.** Sobre naranja el texto es siempre tinta, nunca blanco.

## Typography

**Display Font:** Host Grotesk (con ui-sans-serif, system-ui)
**Body Font:** Host Grotesk (misma familia)

**Character:** Una grotesca contemporánea en dos pesos (400 y 500), con el conjunto estilístico `ss01` activo. El tracking se cierra a medida que el tamaño crece, de modo que los titulares se leen compactos y firmes.

### Hierarchy
- **Display** (500, 20.66% del ancho del contenedor, 0.86): el nombre a todo el ancho en hero y footer. Su tamaño se calcula para que "Diego Mera" llene exactamente su contenedor.
- **Headline** (500, clamp(48px, 8.4vw, 120px), 0.95): h1 de páginas internas y casos.
- **Headline de sección** (500, clamp(40px, 4.45vw, 64px), 1): títulos de sección; también los enlaces del menú móvil.
- **Lead** (400, clamp(24px, 2.2vw, 32px), 1.18): enunciados, nombres de casos en la lista y el primer párrafo de cada sección de un caso.
- **Title** (500, 24px, 1.25): subtítulos y nombres de etapas.
- **Body** (400, 16px, 1.6): texto corrido, con un ancho máximo de lectura de 38rem.

### Named Rules
**The Five Sizes Rule.** Cada página usa como máximo estos cinco tamaños más el cuerpo. No se crean tamaños intermedios.

**The Two Lines Rule.** Ningún titular pasa de dos líneas; los h1–h3 usan `text-wrap: balance`.

## Layout

Margen exterior de 20px en móvil y 32px desde 768px. La separación entre secciones es de 96px en móvil y 160px en desktop. La navegación fija mide 64px / 76px y el scroll a anclas la respeta.

En desktop la composición se apoya en una rejilla de 12 columnas con 32px de separación. En los casos, el titular de cada sección ocupa las columnas 1–4 y su contenido las 5–11, alineados arriba, y las imágenes van a todo el ancho. La lista de trabajo usa 8 columnas para los casos y 4 para una vista previa fija (sticky) que muestra el caso bajo el cursor. En móvil todo pasa a una columna y las vistas previas van encima de cada caso.

Breakpoint único: `md` = 768px. Diseño de referencia: 393px en móvil y 1440px en desktop.

## Elevation & Depth

El sistema es plano. No hay sombras en reposo ni en hover. La profundidad se transmite por tono: papel, luego `tone`, luego `tone-2`, y tinta para lo que debe destacar con fuerza. Las únicas capas reales son la navegación fija, el menú móvil y la barra móvil para agendar, todas en papel opaco y sin sombra.

### Named Rules
**The Tone-Not-Line Rule.** Las superficies se separan con un paso de tono, nunca con bordes, líneas divisorias ni sombras.

## Shapes

Esquinas rectas en todo: botones, campos, chips, imágenes y bloques. No hay radios, pastillas ni círculos de interfaz. La forma recurrente es el rectángulo lleno de tono o de tinta; las imágenes se recortan con proporciones fijas (16:10 en móvil, 4:3 en la vista previa de trabajo y 4:5 en el retrato).

## Components

### Buttons
Directos y sólidos; el cambio de estado es un cambio de color completo, no un efecto.
- **Shape:** rectos (0px), altura mínima de 48px y padding de 12px 24px, peso 500.
- **Primary:** fondo naranja señal con texto en tinta. Solo para agendar.
- **Hover / Focus:** el primario pasa a tinta con texto blanco; transición de 150ms. Al presionar baja 1px. El foco es un contorno de tinta de 2px con 3px de separación.
- **Ink:** fondo tinta y texto blanco; hover a tinta segunda. Acción secundaria (WhatsApp, email).
- **Link:** texto subrayado (1px, separación 5px) que engrosa a 2px en hover; altura mínima de 44px. Hay una variante inversa sobre tinta.

### Chips
- **Style:** rectángulos de 44px de alto con padding horizontal de 16px, fondo tono y texto tinta en peso 500. Son radios con forma de chip en el formulario de contacto.
- **State:** seleccionado en tinta con texto blanco; hover a tono segundo; el foco de teclado se muestra en el chip completo.

### Cards / Containers
- **Corner Style:** rectas (0px).
- **Background:** tono para imágenes y avisos; tinta para el footer.
- **Shadow Strategy:** ninguna (ver Elevation & Depth).
- **Border:** ninguno.
- **Internal Padding:** 16px en avisos; los bloques de imagen no llevan padding.

### Inputs / Fields
- **Style:** fondo tono sin borde, esquinas rectas, padding de 14px 16px, placeholder en gris lectura.
- **Focus:** contorno interior de tinta de 2px; hover a tono segundo.
- **Error / Disabled:** contorno interior de error de 2px con el mensaje debajo en color error; deshabilitado al 60% de opacidad.

### Navigation
- **Style:** barra fija en papel con el logo DM y el nombre a la izquierda, enlaces en el centro y la acción de agendar a la derecha.
- **States:** el hover subraya el enlace; la página actual va en peso 500 y subrayada.
- **Mobile:** un botón de texto subrayado abre un menú a pantalla completa con enlaces al tamaño de los títulos de sección y el botón de agendar a todo el ancho. Abajo hay una barra fija con "Agendar" (naranja) y un acceso secundario en tono.

### Lista de trabajo (signature)
Los casos se listan como filas de texto (nombre a tamaño lead, tipo y año) sin tarjetas ni miniaturas en desktop. Al pasar el cursor, las demás filas se atenúan a gris lectura y una vista previa fija 4:3 a la derecha muestra el caso activo con su descripción.

### Barra de proceso (signature)
Cinco bloques rectos en fila que van de tinta a tono (tinta, tinta segunda, naranja señal, tono segundo, tono). Cada uno se descubre de izquierda a derecha al entrar en pantalla.

## Do's and Don'ts

### Do:
- **Do** reservar el naranja señal para agendar, con texto en tinta encima.
- **Do** separar superficies con `tone` (#f1f1ef) y `tone-2` (#e4e4e1) en lugar de bordes.
- **Do** usar solo Host Grotesk en 400 y 500, con los cinco tamaños de la escala.
- **Do** mantener esquinas rectas en todo elemento.
- **Do** respetar los objetivos táctiles de 44px o más y el foco visible de tinta (2px, separación 3px).
- **Do** usar entradas cortas con `cubic-bezier(0.22, 1, 0.36, 1)` y dejar todo visible sin JavaScript o con movimiento reducido.

### Don't:
- **Don't** usar el naranja en fondos decorativos, iconos, enlaces o titulares (la barra de proceso es la única excepción).
- **Don't** poner texto blanco sobre naranja.
- **Don't** usar sombras, gradientes, bordes ni líneas divisorias.
- **Don't** usar eyebrows, tipografía monoespaciada ni numeración tipo 01/02.
- **Don't** escribir titulares de más de dos líneas.
- **Don't** usar `faint` (#b4b4b0) para texto de lectura.
- **Don't** redondear esquinas ni usar formas de pastilla.
