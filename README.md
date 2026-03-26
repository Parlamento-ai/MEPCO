# MEPCO Chile — Guia Completa

**[https://chilemepco.netlify.app](https://chilemepco.netlify.app/)**

Guia interactiva sobre el Mecanismo de Estabilizacion de Precios de los Combustibles (MEPCO) en Chile. Historia, funcionamiento, datos fiscales, graficos, comparacion internacional y analisis de la crisis de marzo 2026.

## Aviso importante

**Este proyecto fue creado integramente con asistencia de inteligencia artificial (Claude, Anthropic).** Tanto el codigo como la recopilacion y estructuracion de datos fueron generados con IA.

Si bien se hizo un esfuerzo riguroso por verificar cada dato e incluir la fuente original de cada cifra, **toda la informacion debe ser corroborada por el lector antes de citarla o utilizarla como referencia**. Es posible que existan errores, aproximaciones o datos desactualizados.

Las estimaciones marcadas como tales (descomposicion del precio por litro, proyecciones de recuperacion fiscal) son calculos ilustrativos basados en datos publicos, no proyecciones oficiales de ninguna institucion.

## Que contiene

El sitio esta organizado en 16 secciones:

| Seccion | Contenido |
|---|---|
| Que es | Definicion del MEPCO y como opera sobre el IEC |
| Historia | Linea de tiempo legislativa: FEPP (1991) → SIPCO (2011) → MEPCO (2014) → crisis 2026 |
| Como funciona | Actores (CNE, Hacienda, ENAP, SII), bandas de precio, ventanas de calculo |
| Combustibles | Componentes base y variable del IEC por tipo de combustible |
| Graficos | Precios historicos de combustibles, petroleo, impacto fiscal, composicion del precio |
| Regiones | Precios por region (marzo 2026, pre-shock) |
| Gobierno | Decreto DS 103, medidas compensatorias, alternativas propuestas |
| Actualidad | Contexto de la crisis de marzo 2026 |
| Internacional | Comparacion con 12 paises (Colombia, Peru, Mexico, Indonesia, Venezuela, Nigeria, Ecuador, etc.) |
| Costo Fiscal | Analisis fiscal detallado, balance con/sin guerra de Ucrania, descomposicion del precio |
| Indonesia | Estudio de caso: reforma de subsidios de Jokowi (2014-2015) |
| Simulacion | Escenarios de recuperacion fiscal (estimaciones IA) |
| Analisis | Evaluacion de las medidas del gobierno y alternativas |
| Modelo Indonesia | Analisis de aplicabilidad del modelo indonesio a Chile |
| Fuentes | Indice completo de fuentes |

## Fuentes

El proyecto referencia **mas de 100 URLs** de fuentes verificables, organizadas en 9 categorias:

- **Fuentes oficiales**: CNE, SII, ENAP, BCN Ley Chile, Hacienda, Gob.cl
- **Legislacion**: Leyes 19.030, 20.063, 20.493, 20.765, 20.794, 21.443, 21.465
- **Analisis y reportes**: OCEC-UDP, La Tercera, Fastcheck, FEN UAH, Emol
- **Datos de precios**: GlobalPetrolPrices, EIA (petroleo), Pauta.cl (regiones)
- **Comparacion internacional**: World Bank, IISD, Finance Colombia, IPE Peru, El Financiero (Mexico), Euronews, Nature Energy
- **Casos fallidos**: CFR (Venezuela), The Conversation (Nigeria), NPR (Ecuador), HRW (Iran)
- **Analisis fiscal**: OCEC-UDP Brujula Macroeconomica, DIPRES, CIPER Chile, CEPChile
- **Caso Indonesia**: World Bank, Cambridge University Press, Tandfonline, Climate Change News

Cada dato en el sitio incluye un enlace a su fuente original.

## Cifras clave

| Dato | Valor | Fuente |
|---|---|---|
| Costo fiscal acumulado (2014-2026) | US$2.194 millones | OCEC-UDP via La Tercera |
| Balance sin guerra de Ucrania | +US$182 millones (superavit) | Calculo basado en OCEC-UDP |
| Costo solo 2022 | US$2.376 millones | OCEC-UDP via La Tercera |
| Peak julio 2022 (gasolina) | Subsidio $371/L vs IEC $349/L | Emol |
| Alza marzo 2026 (gasolina 93) | +$370/litro | Cooperativa, BioBioChile |
| Paises comparados | 12 | Multiples fuentes |

## Stack tecnico

- [SvelteKit](https://kit.svelte.dev/) 2 + [Svelte](https://svelte.dev/) 5
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Chart.js](https://www.chartjs.org/) 4
- TypeScript
- Desplegado en [Netlify](https://www.netlify.com/)

## Desarrollo local

```sh
# Instalar dependencias
yarn install

# Servidor de desarrollo
yarn dev

# Build de produccion
yarn build

# Preview del build
yarn preview
```

## Estructura del proyecto

```
src/
  lib/
    data/
      mepco-data.ts      # Todos los datos con fuentes citadas
    components/
      ChartCanvas.svelte  # Componente wrapper de Chart.js
  routes/
    +layout.svelte        # Layout con metadata OG/Twitter
    +page.svelte          # Pagina principal (toda la app)
static/
  og-image.png            # Imagen para redes sociales (1200x630)
```

## Licencia

Este proyecto es de uso publico e informativo. Los datos provienen de fuentes publicas citadas en el sitio. El codigo fuente esta disponible tal cual, sin garantias.

---

*Proyecto generado con inteligencia artificial. Verificar toda la informacion antes de citar.*
