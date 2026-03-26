<script lang="ts">
	import '../app.css';
	let { children } = $props();

	const siteUrl = 'https://chilemepco.netlify.app';
	const title = 'MEPCO Chile | Parlamento.ai';
	const description = 'Documento de investigacion de Parlamento.ai. Como funciona el MEPCO, cuanto ha costado al fisco (US$2.194M), crisis de marzo 2026 y comparacion internacional. Con graficos, tablas y fuentes verificadas.';
	const image = `${siteUrl}/og-image.png`;
</script>

<svelte:head>
	<title>{title}</title>

	<!-- SEO -->
	<meta name="author" content="Parlamento.ai" />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href={siteUrl} />

	<!-- Open Graph / Facebook / WhatsApp / LinkedIn -->
	<meta property="og:type" content="article" />
	<meta property="og:locale" content="es_CL" />
	<meta property="og:site_name" content="Parlamento.ai" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={siteUrl} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="MEPCO Chile: guia completa del mecanismo de estabilizacion de precios de combustibles" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:image:alt" content="MEPCO Chile: guia completa del mecanismo de estabilizacion de precios de combustibles" />
</svelte:head>

{@render children()}
