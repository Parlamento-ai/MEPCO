<script lang="ts">
	import '../app.css';
	let { children } = $props();

	const siteUrl = 'https://chilemepco.netlify.app';
	const title = 'MEPCO Chile — ¿Subsidio o menor recaudación? Guía completa con datos';
	const description = 'Todo sobre el MEPCO: cómo funciona, cuánto ha costado al fisco (US$2.194M), qué pasó en 2022 con la guerra de Ucrania, por qué subió la bencina en 2026 y comparación con 8 países. Con gráficos, tablas y fuentes verificadas.';
	const image = `${siteUrl}/og-image.png`;
</script>

<svelte:head>
	<title>MEPCO Chile - Guía Completa del Mecanismo de Estabilización de Precios de Combustibles</title>

	<!-- SEO -->
	<meta name="author" content="MEPCO Chile" />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href={siteUrl} />

	<!-- Open Graph / Facebook / WhatsApp / LinkedIn -->
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="es_CL" />
	<meta property="og:site_name" content="MEPCO Chile" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={siteUrl} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="MEPCO Chile — Guía completa del mecanismo de estabilización de precios de combustibles" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:image:alt" content="MEPCO Chile — Guía completa del mecanismo de estabilización de precios de combustibles" />
</svelte:head>

{@render children()}
