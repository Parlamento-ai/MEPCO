<script lang="ts">
	import ChartCanvas from '$lib/components/ChartCanvas.svelte';
	import {
		timeline,
		fiscalData,
		fuelPrices,
		oilPrices,
		taxComponents,
		regionalPrices,
		calculationWindows,
		countryComparisons,
		mainSources,
		fiscalDeepDive,
		indonesiaDeepDive,
		governmentAnalysis,
		chileIndonesiaHypothetical
	} from '$lib/data/mepco-data';

	let activeSection = $state('hero');

	const sections = [
		{ id: 'hero', label: 'Inicio' },
		{ id: 'que-es', label: '¿Qué es?' },
		{ id: 'historia', label: 'Historia' },
		{ id: 'crisis', label: 'Crisis 2026' },
		{ id: 'datos', label: 'Datos y Fiscal' },
		{ id: 'internacional', label: 'Internacional' },
		{ id: 'indonesia', label: 'Indonesia' },
		{ id: 'fuentes', label: 'Fuentes' }
	];

	// Chart Data
	const fuelPriceChartData = {
		labels: fuelPrices.map((d) => d.year.toString()),
		datasets: [
			{
				label: 'Gasolina 93 (CLP/L)',
				data: fuelPrices.map((d) => d.gasolina93),
				borderColor: '#BC2C34',
				backgroundColor: 'rgba(188, 44, 52, 0.08)',
				fill: true,
				tension: 0.3
			},
			{
				label: 'Gasolina 97 (CLP/L)',
				data: fuelPrices.map((d) => d.gasolina97),
				borderColor: '#E5636A',
				backgroundColor: 'rgba(229, 99, 106, 0.08)',
				fill: true,
				tension: 0.3
			},
			{
				label: 'Diésel (CLP/L)',
				data: fuelPrices.map((d) => d.diesel),
				borderColor: '#64748B',
				backgroundColor: 'rgba(100, 116, 139, 0.08)',
				fill: true,
				tension: 0.3
			}
		]
	};

	const fuelPriceChartOptions = {
		plugins: {
			title: { display: true, text: 'Evolución de Precios de Combustibles en Chile (CLP/litro)', font: { size: 16, family: 'Host Grotesk', weight: '600' as const } },
			legend: { position: 'bottom' as const, labels: { font: { family: 'Public Sans' } } }
		},
		scales: {
			y: { title: { display: true, text: 'CLP por litro' }, beginAtZero: true }
		}
	};

	const oilPriceChartData = {
		labels: oilPrices.map((d) => d.year.toString()),
		datasets: [
			{
				label: 'WTI (USD/barril)',
				data: oilPrices.map((d) => d.wti),
				borderColor: '#334155',
				backgroundColor: 'rgba(51, 65, 85, 0.08)',
				fill: true,
				tension: 0.3
			},
			{
				label: 'Brent (USD/barril)',
				data: oilPrices.map((d) => d.brent),
				borderColor: '#BC2C34',
				backgroundColor: 'rgba(188, 44, 52, 0.08)',
				fill: true,
				tension: 0.3
			}
		]
	};

	const oilPriceChartOptions = {
		plugins: {
			title: { display: true, text: 'Precios Internacionales del Petróleo (USD/barril)', font: { size: 16 } },
			legend: { position: 'bottom' as const }
		},
		scales: {
			y: { title: { display: true, text: 'USD por barril' }, beginAtZero: true }
		}
	};

	const fiscalChartData = {
		labels: fiscalData.map((d) => d.year),
		datasets: [
			{
				label: 'Impacto Fiscal (Millones USD)',
				data: fiscalData.map((d) => d.amount),
				backgroundColor: fiscalData.map((d) =>
					d.amount >= 0 ? 'rgba(16, 185, 129, 0.8)' : 'rgba(188, 44, 52, 0.8)'
				),
				borderColor: fiscalData.map((d) =>
					d.amount >= 0 ? '#10b981' : '#BC2C34'
				),
				borderWidth: 1
			}
		]
	};

	const fiscalChartOptions = {
		plugins: {
			title: { display: true, text: 'Impacto Fiscal Anual del MEPCO (Millones USD)', font: { size: 16 } },
			subtitle: { display: true, text: 'Positivo = Ingreso fiscal | Negativo = Costo fiscal', font: { size: 12 } },
			legend: { display: false }
		},
		scales: {
			y: { title: { display: true, text: 'Millones USD' } }
		}
	};

	// Regional chart
	const regionalChartData = {
		labels: regionalPrices.data.map(r => r.region),
		datasets: [
			{
				label: '93 Octanos',
				data: regionalPrices.data.map(r => r.oct93),
				backgroundColor: 'rgba(188, 44, 52, 0.8)'
			},
			{
				label: '95 Octanos',
				data: regionalPrices.data.map(r => r.oct95),
				backgroundColor: 'rgba(229, 99, 106, 0.7)'
			},
			{
				label: '97 Octanos',
				data: regionalPrices.data.map(r => r.oct97),
				backgroundColor: 'rgba(100, 116, 139, 0.7)'
			}
		]
	};

	const regionalChartOptions = {
		indexAxis: 'y' as const,
		plugins: {
			title: { display: true, text: 'Precios por Región - Marzo 2026, Pre-Shock (CLP/L)', font: { size: 16 } },
			legend: { position: 'bottom' as const }
		},
		scales: {
			x: { title: { display: true, text: 'CLP por litro' }, min: 1100 }
		}
	};

	// Fiscal: con vs sin Ucrania
	const fiscalWithWithoutData = {
		labels: fiscalData.map(d => d.year),
		datasets: [
			{
				label: 'Balance real',
				data: fiscalData.map(d => d.amount),
				backgroundColor: fiscalData.map(d => d.amount >= 0 ? 'rgba(16, 185, 129, 0.8)' : 'rgba(188, 44, 52, 0.8)'),
				borderWidth: 1
			},
			{
				label: 'Balance SIN guerra Ucrania (2022 = $0)',
				data: fiscalData.map(d => d.year === '2022' ? 0 : d.amount),
				backgroundColor: 'rgba(100, 116, 139, 0.4)',
				borderColor: '#64748B',
				borderWidth: 2
			}
		]
	};

	const fiscalWithWithoutOptions = {
		plugins: {
			title: { display: true, text: '¿Qué pasaría sin la guerra de Ucrania?', font: { size: 16 } },
			subtitle: { display: true, text: 'Azul = balance hipotético sin 2022 | Verde/Rojo = balance real', font: { size: 12 } },
			legend: { position: 'bottom' as const }
		},
		scales: { y: { title: { display: true, text: 'Millones USD' } } }
	};

	// Acumulado con y sin Ucrania
	const cumulativeLabels = fiscalData.map(d => d.year);
	let cumReal = 0;
	const cumulativeReal = fiscalData.map(d => { cumReal += d.amount; return cumReal; });
	let cumNoUkraine = 0;
	const cumulativeNoUkraine = fiscalData.map(d => { cumNoUkraine += (d.year === '2022' ? 0 : d.amount); return cumNoUkraine; });

	const cumulativeChartData = {
		labels: cumulativeLabels,
		datasets: [
			{
				label: 'Acumulado REAL',
				data: cumulativeReal,
				borderColor: '#BC2C34',
				backgroundColor: 'rgba(188, 44, 52, 0.08)',
				fill: true,
				tension: 0.3
			},
			{
				label: 'Acumulado SIN guerra Ucrania',
				data: cumulativeNoUkraine,
				borderColor: '#64748B',
				backgroundColor: 'rgba(100, 116, 139, 0.08)',
				fill: true,
				tension: 0.3,
				borderDash: [5, 5]
			}
		]
	};

	const cumulativeChartOptions = {
		plugins: {
			title: { display: true, text: 'Balance Fiscal Acumulado del MEPCO (Millones USD)', font: { size: 16 } },
			subtitle: { display: true, text: 'Sin la guerra de Ucrania, el MEPCO habría generado SUPERÁVIT de +US$182M', font: { size: 12 } },
			legend: { position: 'bottom' as const }
		},
		scales: { y: { title: { display: true, text: 'Millones USD acumulados' } } }
	};

	// ================================================================
	// DESCOMPOSICIÓN DEL PRECIO DE GASOLINA 93 POR AÑO
	// ================================================================
	// UTM promedio anual (CLP) — Fuente: SII valores y fechas
	const utmByYear: Record<number, number> = {
		2014: 42300, 2015: 43400, 2016: 44700, 2017: 46000, 2018: 47300,
		2019: 48600, 2020: 49900, 2021: 51600, 2022: 54600, 2023: 58500,
		2024: 62000, 2025: 64900
	};
	// Tipo de cambio CLP/USD promedio anual — Fuente: Banco Central de Chile
	const fxByYear: Record<number, number> = {
		2014: 570, 2015: 654, 2016: 677, 2017: 649, 2018: 640,
		2019: 703, 2020: 792, 2021: 760, 2022: 873, 2023: 840,
		2024: 920, 2025: 950
	};

	const priceDecomposition = fuelPrices
		.filter(fp => fp.gasolina93 !== null && fp.year >= 2014 && fp.year <= 2025)
		.map(fp => {
			const price = fp.gasolina93!;
			const utm = utmByYear[fp.year]!;
			const fx = fxByYear[fp.year]!;
			const brent = oilPrices.find(o => o.year === fp.year)?.brent ?? 0;
			const fiscal = fiscalData.find(f => f.year === fp.year.toString());
			const fiscalAmount = fiscal?.amount ?? 0;
			const fiscalIdx = fiscalData.findIndex(f => f.year === fp.year.toString());
			const cumulative = fiscalIdx >= 0 ? cumulativeReal[fiscalIdx] : 0;

			// IVA: 19% sobre el precio base → precio × 19 / 119
			const iva = Math.round(price * 19 / 119);
			const sinIva = Math.round(price * 100 / 119);

			// IEC base (componente fijo): 6.0 UTM/m³ para gasolina 93 → convertido a CLP/litro
			const iecBase = Math.round(6.0 * utm / 1000);

			// Efecto MEPCO estimado por litro de gasolina
			// Gasolina absorbe ~78% del impacto fiscal (ponderado por consumo × tasa IEC vs diésel)
			// Consumo anual de gasolina en Chile: ~7.000 millones de litros
			const mepcoPerLiter = Math.round(fiscalAmount * 0.78 * 1e6 * fx / 7e9);
			// Positivo → MEPCO AUMENTÓ el IEC (sobretasa) → el consumidor pagó más impuesto
			// Negativo → MEPCO REBAJÓ el IEC (subsidio al impuesto) → el consumidor pagó menos

			const iecEfectivo = iecBase + mepcoPerLiter;
			const costoYMargen = sinIva - iecEfectivo;

			// ¿Cuánto se subsidió el impuesto? (solo cuando MEPCO fue negativo)
			const subsidioAlImpuesto = mepcoPerLiter < 0 ? Math.abs(mepcoPerLiter) : 0;
			// ¿Cuánto sobretasa pagó el consumidor? (solo cuando MEPCO fue positivo)
			const sobretasaMepco = mepcoPerLiter > 0 ? mepcoPerLiter : 0;
			// ¿Se subsidió la bencina directamente? (solo si IEC efectivo < 0, tributación negativa)
			const subsidioAlCombustible = iecEfectivo < 0 ? Math.abs(iecEfectivo) : 0;

			let classification: 'surplus' | 'less_collection' | 'effective_subsidy';
			if (fiscalAmount > 0) classification = 'surplus';
			else if (fp.year === 2022) classification = 'effective_subsidy';
			else classification = 'less_collection';

			return {
				year: fp.year, brent, precio: price, costoYMargen, iecBase, mepcoPerLiter,
				iecEfectivo, iva, sinIva, subsidioAlImpuesto, sobretasaMepco, subsidioAlCombustible,
				fiscalAmount, cumulative, classification
			};
		});

	// Gráfico: Composición del precio (stacked bar)
	const decompositionChartData = {
		labels: priceDecomposition.map(d => d.year.toString()),
		datasets: [
			{
				label: 'Combustible + Margen',
				data: priceDecomposition.map(d => d.costoYMargen),
				backgroundColor: 'rgba(100, 116, 139, 0.7)'
			},
			{
				label: 'IEC efectivo (base + MEPCO)',
				data: priceDecomposition.map(d => Math.max(0, d.iecEfectivo)),
				backgroundColor: 'rgba(188, 44, 52, 0.7)'
			},
			{
				label: 'IVA (19%)',
				data: priceDecomposition.map(d => d.iva),
				backgroundColor: 'rgba(203, 213, 225, 0.8)'
			}
		]
	};

	const decompositionChartOptions = {
		plugins: {
			title: { display: true, text: 'Composición del precio de Gasolina 93 por año (CLP/litro)', font: { size: 16 } },
			subtitle: { display: true, text: 'Estimación basada en UTM promedio anual, tipo de cambio Banco Central y datos fiscales MEPCO', font: { size: 11 } },
			legend: { position: 'bottom' as const },
			tooltip: {
				callbacks: {
					afterBody: function(items: any[]) {
						const idx = items[0]?.dataIndex;
						if (idx === undefined) return '';
						const d = priceDecomposition[idx];
						return `\nIEC base: $${d.iecBase}/L\nEfecto MEPCO: ${d.mepcoPerLiter >= 0 ? '+' : ''}$${d.mepcoPerLiter}/L\nPrecio total: $${d.precio}/L`;
					}
				}
			}
		},
		scales: {
			x: { stacked: true },
			y: { stacked: true, title: { display: true, text: 'CLP por litro' }, beginAtZero: true }
		}
	};

	const fiscalCombinedData = {
		labels: fiscalData.map(d => d.year),
		datasets: [
			{
				type: 'bar' as const,
				label: 'Efecto fiscal anual (MM USD)',
				data: fiscalData.map(d => d.amount),
				backgroundColor: fiscalData.map(d => {
					if (d.amount > 0) return 'rgba(16, 185, 129, 0.8)';
					if (d.year === '2022') return 'rgba(188, 44, 52, 0.9)';
					return 'rgba(229, 99, 106, 0.7)';
				}),
				borderColor: fiscalData.map(d => {
					if (d.amount > 0) return '#10b981';
					if (d.year === '2022') return '#BC2C34';
					return '#E5636A';
				}),
				borderWidth: 1,
				order: 2
			},
			{
				type: 'line' as const,
				label: 'Balance acumulado (MM USD)',
				data: cumulativeReal,
				borderColor: '#0F172A',
				backgroundColor: 'rgba(15, 23, 42, 0.05)',
				fill: false,
				tension: 0.3,
				pointRadius: 5,
				pointBackgroundColor: cumulativeReal.map((v: number) => v >= 0 ? '#10b981' : '#BC2C34'),
				pointBorderColor: '#0F172A',
				borderWidth: 2.5,
				order: 1
			}
		]
	};

	const fiscalCombinedOptions = {
		plugins: {
			title: { display: true, text: '¿Subsidio o menor recaudación? Anatomía fiscal del MEPCO', font: { size: 16 } },
			subtitle: { display: true, text: 'Verde = mayor recaudación | Naranja = menor recaudación | Rojo = subsidio efectivo | Línea = acumulado', font: { size: 11 } },
			legend: { position: 'bottom' as const }
		},
		scales: {
			y: { title: { display: true, text: 'Millones USD' } }
		}
	};

	function getRatingColor(rating: string) {
		switch (rating) {
			case 'success': return 'bg-green-100 text-green-800 border-green-300';
			case 'partial': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
			case 'mixed': return 'bg-blue-100 text-blue-800 border-blue-300';
			case 'failed': return 'bg-red-100 text-red-800 border-red-300';
			case 'catastrophic': return 'bg-red-200 text-red-900 border-red-400';
			default: return 'bg-gray-100 text-gray-800 border-gray-300';
		}
	}

	function getRatingLabel(rating: string) {
		switch (rating) {
			case 'success': return 'Exitoso';
			case 'partial': return 'Parcial';
			case 'mixed': return 'Mixto';
			case 'failed': return 'Fallido';
			case 'catastrophic': return 'Catastrófico';
			default: return rating;
		}
	}

	function getTimelineColor(type: string) {
		switch (type) {
			case 'creation': return 'bg-green-500';
			case 'modification': return 'bg-blue-500';
			case 'crisis': return 'bg-red-500';
			case 'predecessor': return 'bg-gray-400';
			default: return 'bg-gray-400';
		}
	}

	let mobileMenuOpen = $state(false);
</script>

<!-- NAVEGACIÓN FIJA -->
<nav class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
	<div class="max-w-7xl mx-auto px-4">
		<div class="flex items-center justify-between h-14">
			<a href="#hero" class="flex items-center gap-2">
				<img src="https://parlamento.ai/brand/logo-orb-and-name.svg" alt="Parlamento.ai" class="h-7" />
			</a>

			<button
				class="lg:hidden text-slate-700 p-2"
				aria-label="Abrir menú de navegación"
				onclick={() => mobileMenuOpen = !mobileMenuOpen}
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
				</svg>
			</button>

			<div class="hidden lg:flex items-center gap-1">
				{#each sections as section}
					<a
						href="#{section.id}"
						class="px-3 py-1.5 text-sm font-medium rounded-md transition-colors {activeSection === section.id ? 'bg-cherry-500 text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}"
					>
						{section.label}
					</a>
				{/each}
			</div>
		</div>

		{#if mobileMenuOpen}
			<div class="lg:hidden pb-4 grid grid-cols-3 gap-1">
				{#each sections as section}
					<a
						href="#{section.id}"
						onclick={() => mobileMenuOpen = false}
						class="px-3 py-2 text-sm font-medium rounded-md text-center transition-colors {activeSection === section.id ? 'bg-cherry-500 text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}"
					>
						{section.label}
					</a>
				{/each}
			</div>
		{/if}
	</div>
</nav>

<main class="bg-white" style="font-family: 'Public Sans', system-ui, sans-serif;">

<!-- ==================== HERO / COVER ==================== -->
<section id="hero" class="relative min-h-screen flex flex-col pt-14">
	<!-- Cherry top bar (PDF cover style) -->
	<div class="h-1.5 bg-cherry-500"></div>

	<div class="flex-1 flex items-center justify-center px-6 py-16">
		<div class="max-w-4xl mx-auto">
			<!-- Parlamento.ai logo + label -->
			<div class="flex items-center gap-3 mb-10">
				<img src="https://parlamento.ai/brand/orb.svg" alt="" class="w-10 h-10" />
				<div>
					<div class="text-sm font-semibold text-slate-500 tracking-wider uppercase">Documento de Investigacion</div>
					<div class="text-sm text-slate-400">parlamento.ai</div>
				</div>
			</div>

			<!-- Category label -->
			<div class="inline-flex items-center gap-2 bg-cherry-50 border border-cherry-200 rounded-md px-3 py-1.5 mb-6">
				<div class="w-2 h-2 bg-cherry-500 rounded-full"></div>
				<span class="text-cherry-600 text-xs font-semibold uppercase tracking-wider">Actualizado: Marzo 2026</span>
			</div>

			<!-- Title (Host Grotesk) -->
			<h1 class="text-5xl md:text-6xl font-bold text-slate-900 mb-4 leading-tight" style="font-family: 'Host Grotesk', sans-serif;">
				MEPCO
			</h1>
			<p class="text-xl md:text-2xl text-cherry-500 font-semibold mb-4" style="font-family: 'Host Grotesk', sans-serif;">
				Mecanismo de Estabilizacion de Precios de los Combustibles
			</p>
			<p class="text-lg text-slate-500 max-w-3xl mb-12">
				Guia completa con historia, datos, graficos y comparacion internacional.
				Todo respaldado por fuentes oficiales verificables.
			</p>

			<!-- Key stats grid -->
			<div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mb-12">
				<div class="border border-slate-200 rounded-md p-4">
					<div class="text-3xl font-bold text-cherry-500" style="font-family: 'Host Grotesk', sans-serif;">2014</div>
					<div class="text-sm text-slate-700">Ano de creacion</div>
					<div class="text-xs text-slate-400 mt-1">Ley 20.765</div>
				</div>
				<div class="border border-slate-200 rounded-md p-4">
					<div class="text-3xl font-bold text-cherry-500" style="font-family: 'Host Grotesk', sans-serif;">-$2.194M</div>
					<div class="text-sm text-slate-700">Costo fiscal acumulado</div>
					<div class="text-xs text-slate-400 mt-1">USD (2014-2026)</div>
				</div>
				<div class="border border-slate-200 rounded-md p-4">
					<div class="text-3xl font-bold text-slate-900" style="font-family: 'Host Grotesk', sans-serif;">2.4%</div>
					<div class="text-sm text-slate-700">Alza maxima/ciclo</div>
					<div class="text-xs text-slate-400 mt-1">Del precio mayorista</div>
				</div>
				<div class="border border-slate-200 rounded-md p-4">
					<div class="text-3xl font-bold text-slate-900" style="font-family: 'Host Grotesk', sans-serif;">4</div>
					<div class="text-sm text-slate-700">Combustibles cubiertos</div>
					<div class="text-xs text-slate-400 mt-1">Gasolina, Diesel, GLP, GNC</div>
				</div>
			</div>

			<a href="#que-es" class="inline-flex items-center gap-2 bg-cherry-500 hover:bg-cherry-600 active:bg-cherry-700 text-white px-6 py-2.5 rounded-md font-medium transition-colors">
				Explorar documento
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
				</svg>
			</a>
		</div>
	</div>
</section>

<!-- ==================== ¿QUÉ ES EL MEPCO? ==================== -->
<section id="que-es" class="py-20 bg-white">
	<div class="max-w-6xl mx-auto px-6">
		<h2 class="text-4xl font-bold text-slate-900 font-title mb-2">¿Qué es el MEPCO?</h2>
		<div class="w-16 h-1 bg-cherry-500 rounded-full mb-8"></div>

		<div class="grid md:grid-cols-2 gap-8 mb-12">
			<div>
				<p class="text-lg text-slate-700 mb-4">
					El <strong>MEPCO</strong> (Mecanismo de Estabilización de Precios de los Combustibles) es un sistema creado por la
					<strong>Ley N° 20.765</strong>, publicada el <strong>9 de julio de 2014</strong>, que busca suavizar el impacto de
					las variaciones del precio internacional del petróleo en los precios que pagan los consumidores chilenos.
				</p>
				<p class="text-lg text-slate-700 mb-4">
					<strong>No fija precios</strong>. Opera mediante la modificación del <strong>componente variable</strong> del
					Impuesto Específico a los Combustibles (IEC, Ley 18.502). Cuando los precios internacionales suben, el impuesto
					baja (funcionando como subsidio); cuando bajan, el impuesto sube (recuperando recursos fiscales).
				</p>
				<p class="text-sm text-slate-500 mt-4">
					Fuente: <a href="https://www.bcn.cl/leychile/Navegar?idNorma=1064172" target="_blank" rel="noopener" class="text-cherry-500 hover:text-cherry-600 hover:underline">BCN Ley Chile - Ley 20.765</a> |
					<a href="https://www.hacienda.cl/areas-de-trabajo/politicas-macroeconomicas/mepco" target="_blank" rel="noopener" class="text-cherry-500 hover:text-cherry-600 hover:underline">Ministerio de Hacienda</a>
				</p>
			</div>
			<div class="bg-gradient-to-br from-cherry-50 to-cherry-50 rounded-md p-6 border border-cherry-200">
				<h3 class="text-lg font-bold text-slate-900 mb-4">Principio fundamental</h3>
				<div class="space-y-4">
					<div class="flex items-start gap-3">
						<div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
							<svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
						</div>
						<div>
							<div class="font-semibold text-slate-900">Precio internacional SUBE</div>
							<div class="text-slate-600">El impuesto BAJA (subsidio al consumidor)</div>
							<div class="text-sm text-red-600">El Estado deja de recaudar</div>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
							<svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
						</div>
						<div>
							<div class="font-semibold text-slate-900">Precio internacional BAJA</div>
							<div class="text-slate-600">El impuesto SUBE (el Estado recupera)</div>
							<div class="text-sm text-green-600">Se recomponen recursos fiscales</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Proceso de determinación en 2 etapas -->
		<h3 class="text-2xl font-bold text-slate-900 mb-6">Proceso de Determinación en 2 Etapas</h3>
		<div class="bg-slate-50 rounded-md p-8 border border-slate-200 mb-12">
			<div class="grid md:grid-cols-2 gap-8">
				<div class="bg-white rounded-md p-6 border-2 border-blue-300">
					<div class="inline-flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-bold mb-4">
						ETAPA 1
					</div>
					<h4 class="font-bold text-lg text-blue-900 mb-3">CNE - Comisión Nacional de Energía</h4>
					<ol class="space-y-3 text-slate-700">
						<li class="flex items-start gap-2">
							<span class="bg-blue-100 text-blue-700 font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
							<span>Calcula el <strong>Precio de Paridad de Importación</strong> basado en cotizaciones de la Costa del Golfo de EE.UU. (USGC)</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="bg-blue-100 text-blue-700 font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
							<span>Calcula el <strong>Precio de Referencia</strong> usando crudo Brent + diferencial de refinación + transporte + seguros</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="bg-blue-100 text-blue-700 font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
							<span>Define la <strong>banda de ±5%</strong> alrededor del precio de referencia intermedio</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="bg-blue-100 text-blue-700 font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
							<span>Si el precio de paridad cae <strong>fuera de la banda</strong>, se activa/ajusta el componente variable</span>
						</li>
					</ol>
				</div>
				<div class="bg-white rounded-md p-6 border-2 border-cherry-200">
					<div class="inline-flex items-center gap-2 bg-cherry-500 text-white px-3 py-1 rounded-md text-sm font-bold mb-4">
						ETAPA 2
					</div>
					<h4 class="font-bold text-lg text-cherry-900 mb-3">Ministerio de Hacienda</h4>
					<ol class="space-y-3 text-slate-700">
						<li class="flex items-start gap-2">
							<span class="bg-cherry-100 text-cherry-700 font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">5</span>
							<span>Recibe el informe de la CNE con el componente variable calculado</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="bg-cherry-100 text-cherry-700 font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">6</span>
							<span>Realiza determinaciones adicionales y verifica parámetros</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="bg-cherry-100 text-cherry-700 font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">7</span>
							<span>Publica el <strong>componente variable definitivo por decreto</strong> "por orden del Presidente"</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="bg-cherry-100 text-cherry-700 font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">8</span>
							<span>El nuevo componente entra en vigencia en el siguiente período</span>
						</li>
					</ol>
				</div>
			</div>
			<p class="text-sm text-slate-500 mt-4 text-center">
				Fuentes: <a href="https://www.cne.cl/en/tarificacion/hidrocarburos/mecanismo-de-estabilizacion-de-precios-de-los-combustibles-mepco/" target="_blank" rel="noopener" class="text-cherry-500 hover:text-cherry-600 hover:underline">CNE</a> |
				<a href="https://www.biobiochile.cl/noticias/bbcl-explica/bbcl-explica-notas/2026/03/23/que-es-el-mepco-y-como-ayuda-a-estabilizar-el-precio-de-los-combustibles-en-chile.shtml" target="_blank" rel="noopener" class="text-cherry-500 hover:text-cherry-600 hover:underline">BioBioChile</a>
			</p>
		</div>

		<!-- Parámetros clave -->
		<h3 class="text-2xl font-bold text-slate-900 mb-6">Parámetros Clave</h3>
		<div class="grid md:grid-cols-3 gap-6 mb-12">
			<div class="bg-amber-50 rounded-md p-6 border border-amber-200">
				<div class="text-3xl font-bold text-amber-700 mb-2">2.4%</div>
				<div class="font-semibold text-slate-900">Alza máxima por ciclo</div>
				<div class="text-sm text-slate-600 mt-2">Del precio mayorista. Ej: a $1.300 mayorista, el alza máxima es ~$30/litro</div>
			</div>
			<div class="bg-green-50 rounded-md p-6 border border-green-200">
				<div class="text-3xl font-bold text-green-700 mb-2">$36/L</div>
				<div class="font-semibold text-slate-900">Baja máxima por ciclo</div>
				<div class="text-sm text-slate-600 mt-2">Ampliado desde $27/L por la reforma de 2023 (Ley 21.537)</div>
			</div>
			<div class="bg-blue-50 rounded-md p-6 border border-blue-200">
				<div class="text-3xl font-bold text-blue-700 mb-2">21 días</div>
				<div class="font-semibold text-slate-900">Frecuencia de ajuste</div>
				<div class="text-sm text-slate-600 mt-2">Desde 2023, antes era semanal. Cambio por Ley 21.537</div>
			</div>
		</div>

		<!-- Combustibles cubiertos -->
		<h3 class="text-2xl font-bold text-slate-900 mb-6">Combustibles Cubiertos</h3>
		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each [
				{ name: 'Gasolina Automotriz', detail: '93, 95 y 97 octanos (diferenciados desde 2022)', icon: '&#9981;', color: 'orange' },
				{ name: 'Petróleo Diésel', detail: 'Para vehículos y transporte de carga', icon: '&#128666;', color: 'blue' },
				{ name: 'GLP Vehicular', detail: 'Gas Licuado de Petróleo para uso vehicular', icon: '&#128663;', color: 'green' },
				{ name: 'GNC Vehicular', detail: 'Gas Natural Comprimido para uso vehicular', icon: '&#9978;', color: 'purple' }
			] as fuel}
				<div class="bg-white rounded-md p-6 shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow">
					<div class="text-4xl mb-4">{@html fuel.icon}</div>
					<h3 class="text-lg font-bold text-slate-900 mb-2">{fuel.name}</h3>
					<p class="text-sm text-slate-600">{fuel.detail}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ==================== HISTORIA Y EVOLUCIÓN ==================== -->
<section id="historia" class="py-20 bg-slate-50">
	<div class="max-w-6xl mx-auto px-6">
		<h2 class="text-4xl font-bold text-slate-900 font-title mb-2">Historia y Evolución</h2>
		<div class="w-16 h-1 bg-cherry-500 rounded-full mb-4"></div>
		<p class="text-slate-600 mb-12 max-w-3xl">Desde el FEPP de 1991 hasta las modificaciones de marzo 2026, el sistema de estabilización ha evolucionado significativamente.</p>

		<!-- Leyenda -->
		<div class="flex flex-wrap gap-4 mb-8">
			{#each [
				{ label: 'Predecesor', color: 'bg-gray-400' },
				{ label: 'Creación', color: 'bg-green-500' },
				{ label: 'Modificación', color: 'bg-blue-500' },
				{ label: 'Crisis', color: 'bg-red-500' }
			] as item}
				<div class="flex items-center gap-2">
					<div class="w-3 h-3 rounded-full {item.color}"></div>
					<span class="text-sm text-slate-600">{item.label}</span>
				</div>
			{/each}
		</div>

		<!-- Timeline -->
		<div class="relative">
			<div class="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-slate-300"></div>

			{#each timeline as event, i}
				<div class="relative pl-12 md:pl-20 pb-10">
					<div class="absolute left-2.5 md:left-6.5 top-1 w-4 h-4 rounded-full {getTimelineColor(event.type)} ring-4 ring-white"></div>

					<div class="bg-white rounded-md p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
						<div class="flex flex-wrap items-center gap-3 mb-3">
							<span class="text-sm font-bold text-cherry-600 bg-cherry-50 px-3 py-1 rounded-md">{event.date}</span>
							<span class="text-sm font-mono text-slate-500 bg-slate-100 px-3 py-1 rounded-md">{event.law}</span>
						</div>
						<h3 class="text-xl font-bold text-slate-900 mb-2">{event.title}</h3>
						<p class="text-slate-600">{event.description}</p>
						<p class="text-sm text-slate-400 mt-3">
							Fuente: <a href={event.sourceUrl} target="_blank" rel="noopener" class="text-cherry-500 hover:text-cherry-600 hover:underline">{event.source}</a>
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ==================== LA CRISIS DE MARZO 2026 ==================== -->
<section id="crisis" class="py-20 bg-slate-900 text-white">
	<div class="max-w-6xl mx-auto px-6">
		<h2 class="text-4xl font-bold mb-2">La Crisis de Marzo 2026</h2>
		<div class="w-16 h-1 bg-cherry-400 mb-8 rounded-full"></div>

		<!-- Legal basis -->
		<div class="grid md:grid-cols-2 gap-8 mb-12">
			<div>
				<h3 class="text-xl font-bold text-slate-200 mb-4">Base Legal</h3>
				<div class="bg-slate-800 rounded-md p-6 text-slate-200 font-mono text-sm leading-relaxed mb-4 border border-slate-700">
					<div class="text-cherry-400 mb-2">// Ley 20.765, Art. 2, inciso 7°</div>
					"El número de semanas para el cálculo del precio de paridad de importación de los combustibles" se determinará <span class="text-green-400 font-bold">mediante reglamento</span>, sin requerir aprobación del Congreso.
				</div>
				<p class="text-slate-300 mb-4">
					Esto significa que el <strong class="text-white">Poder Ejecutivo</strong>, específicamente el Ministerio de Hacienda, puede modificar
					la ventana de cálculo del precio de paridad por <strong class="text-white">decreto supremo</strong>,
					sin necesidad de pasar por el Congreso.
				</p>
				<p class="text-sm text-slate-400">
					Fuente: <a href="https://www.bcn.cl/leychile/Navegar?idNorma=1064172" target="_blank" rel="noopener" class="text-cherry-300 hover:underline">BCN - Ley 20.765</a> |
					<a href="https://www.emol.com/noticias/Economia/2026/03/23/1195109/ajuste-al-mepco.html" target="_blank" rel="noopener" class="text-cherry-300 hover:underline">Emol</a>
				</p>
			</div>

			<div>
				<h3 class="text-xl font-bold text-slate-200 mb-4">DS 103 Exento (23 de marzo 2026)</h3>
				<div class="bg-cherry-500/20 rounded-md p-6 border border-cherry-400/30">
					<div class="flex items-center gap-2 mb-4">
						<div class="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
						<span class="font-bold text-cherry-200">Mayor shock de precios en 36 años de democracia</span>
					</div>
					<ul class="space-y-3 text-slate-200">
						<li class="flex items-start gap-2">
							<span class="text-cherry-400 font-bold">1.</span>
							<span>Firmado por el Ministro de Hacienda Jorge Quiroz Castro, por orden del Presidente José Antonio Kast.</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-cherry-400 font-bold">2.</span>
							<span>Cambió la ventana de cálculo de 21/14/37 semanas a <strong class="text-white">4 semanas para todos los combustibles</strong>.</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-cherry-400 font-bold">3.</span>
							<span>Resultado: <strong class="text-white">Gasolina 93 +$370/L, Diésel +$580/L</strong>.</span>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<!-- Price impact -->
		<h3 class="text-2xl font-bold mb-6">Impacto en Precios (desde 26 de marzo 2026)</h3>
		<div class="grid md:grid-cols-3 gap-6 mb-12">
			{#each governmentAnalysis.measures.decree.result as r}
				<div class="bg-white/10 rounded-md p-4 text-center">
					<div class="text-sm text-slate-400">{r.fuel}</div>
					<div class="flex items-center justify-center gap-2 my-2">
						<span class="text-slate-300">${r.before.toLocaleString('es-CL')}</span>
						<span class="text-cherry-400">&#8594;</span>
						<span class="text-cherry-300 font-bold">${r.after.toLocaleString('es-CL')}</span>
					</div>
					<div class="bg-cherry-500 text-white px-2 py-1 rounded-md text-xs font-medium inline-block">+${r.diff}/L ({r.pct}%)</div>
				</div>
			{/each}
		</div>

		<!-- Crisis stats -->
		<div class="grid md:grid-cols-3 gap-6 mb-12">
			<div class="bg-white/10 backdrop-blur rounded-md p-6 border border-white/10">
				<div class="text-sm text-red-300 uppercase font-bold mb-2">Crisis del Petróleo</div>
				<p class="text-slate-200">
					Crisis en Medio Oriente disparó precios del petróleo ~34% en una semana, descrito como
					el alza más pronunciada desde 1985.
				</p>
				<p class="text-xs text-slate-400 mt-3">
					Fuente: <a href="https://www.fastcheck.cl/2026/03/24/este-jueves-chile-vivira-el-mayor-shock-de-precios-en-combustibles-en-36-anos/" target="_blank" rel="noopener" class="text-cherry-300 hover:underline">Fastcheck</a>
				</p>
			</div>
			<div class="bg-white/10 backdrop-blur rounded-md p-6 border border-white/10">
				<div class="text-sm text-red-300 uppercase font-bold mb-2">Costo Fiscal Semanal</div>
				<div class="text-4xl font-black text-red-400 my-2">~US$200M</div>
				<p class="text-slate-300 text-sm">por semana en subsidio MEPCO durante la crisis.</p>
				<p class="text-xs text-slate-400 mt-3">
					Fuente: <a href="https://www.redimin.cl/mepco-en-alerta-hacienda-advierte-gasto-de-us200-millones-semanales-y-acelera-ajuste-por-crisis-del-petroleo/" target="_blank" rel="noopener" class="text-cherry-300 hover:underline">Redimin</a>
				</p>
			</div>
			<div class="bg-white/10 backdrop-blur rounded-md p-6 border border-white/10">
				<div class="text-sm text-red-300 uppercase font-bold mb-2">Si se absorbe todo</div>
				<div class="text-4xl font-black text-red-400 my-2">US$4.000M</div>
				<p class="text-slate-300 text-sm">costo proyectado total si el Estado absorbe toda la subida.</p>
				<p class="text-xs text-slate-400 mt-3">
					Fuente: <a href="https://www.df.cl/economia-y-politica/macro/370-por-litro-en-gasolina-de-93-y-580-en-diesel-combustibles-anotaran" target="_blank" rel="noopener" class="text-cherry-300 hover:underline">Diario Financiero</a>
				</p>
			</div>
		</div>

		<!-- Compensatory measures -->
		<h3 class="text-xl font-bold text-slate-200 mb-4">"Plan Chile Sale Adelante" - Medidas compensatorias</h3>
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
			{#each governmentAnalysis.measures.compensatory as m, i}
				<div class="bg-white/5 rounded-md p-4 border border-white/10">
					<div class="flex items-center gap-2 mb-2">
						<div class="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">{i + 1}</div>
						<h4 class="font-semibold text-white text-sm">{m.name}</h4>
					</div>
					<p class="text-xs text-slate-400">{m.detail}</p>
				</div>
			{/each}
		</div>
		<p class="text-sm text-slate-400 mb-12">
			Fuentes: {#each governmentAnalysis.measures.compensatorySources as s, i}{#if i > 0} | {/if}<a href={s.url} target="_blank" rel="noopener" class="text-cherry-300 hover:underline">{s.name}</a>{/each}
		</p>

		<!-- Iran/oil context callout -->
		<div class="bg-white/5 rounded-md p-6 border border-white/10 mb-8">
			<h3 class="text-lg font-bold text-red-300 mb-3">Contexto: La Guerra en Irán y el Estrecho de Ormuz</h3>
			<p class="text-slate-300 text-sm mb-4">
				{governmentAnalysis.iranContext.hormuzFacts} Tras los ataques aéreos de EE.UU.-Israel sobre Irán en febrero 2026, el IRGC cerró parcialmente el Estrecho de Ormuz, reduciendo el tráfico de tanqueros un 70%. El Brent superó US$100/barril por primera vez en 4 años y alcanzó ~US$126 en futuros.
			</p>
			<h4 class="font-bold text-red-300 mb-3 text-sm">Proyecciones de Precio del Petróleo</h4>
			<div class="grid md:grid-cols-3 gap-4">
				{#each governmentAnalysis.iranContext.forecasts as f}
					<div class="bg-white/10 rounded-md p-4">
						<div class="font-bold text-white text-sm mb-2">{f.source}</div>
						<p class="text-xs text-slate-300">{f.forecast}</p>
						<a href={f.url} target="_blank" rel="noopener" class="text-xs text-cherry-300 hover:underline mt-2 inline-block">Fuente</a>
					</div>
				{/each}
			</div>
		</div>

		<!-- Constitutional debate + Q4 context -->
		<div class="grid md:grid-cols-2 gap-6">
			<div class="bg-white/5 rounded-md p-6 border border-white/10">
				<h3 class="font-bold text-amber-300 mb-2">Debate Constitucional</h3>
				<p class="text-sm text-slate-300 mb-2">
					La oposición cuestionó la constitucionalidad del decreto. El senador Diego Ibáñez advirtió que evaluarían
					"presentar un requerimiento al Tribunal Constitucional" si el decreto excede los límites legales del Ejecutivo.
				</p>
				<p class="text-sm text-slate-300">
					El oficialismo defendió la medida: "las crisis se enfrentan con herramientas de crisis".
				</p>
				<p class="text-sm text-slate-500 mt-2">
					Fuentes:
					<a href="https://radio.uchile.cl/2026/03/22/choque-por-mepco-entre-defensa-oficialista-al-decreto-y-advertencia-opositora-ante-el-tribunal-constitucional/" target="_blank" rel="noopener" class="text-cherry-300 hover:underline">Radio U. Chile</a> |
					<a href="https://www.malaespinacheck.cl/pais/2026/03/23/que-cambios-establece-el-decreto-que-el-gobierno-ingreso-por-el-mepco/" target="_blank" rel="noopener" class="text-cherry-300 hover:underline">Mala Espina Check</a>
				</p>
			</div>
			<div class="bg-white/5 rounded-md p-6 border border-white/10">
				<h3 class="text-lg font-bold text-slate-200 mb-3">Contexto: Q4 2025</h3>
				<p class="text-slate-300 text-sm">
					Antes de la crisis, los precios venían en baja: Gasolina 93 cayó 4.6% en 2025, Gasolina 97 -5.6%,
					Diésel -3.3%, impulsados por una caída de 14.7% en el Brent. El MEPCO estaba generando ingresos para el fisco
					(US$114M en 2025 completo).
				</p>
				<p class="text-sm text-slate-500 mt-2">
					Fuente: <a href="https://ocec.udp.cl/proyecto/brujula-macroeconomica-n40-operacion-del-mepco-en-el-cuarto-trimestre-2025-e-inicios-de-2026/" target="_blank" rel="noopener" class="text-cherry-300 hover:underline">OCEC UDP - Brújula Macroeconómica N.40</a>
				</p>
			</div>
		</div>
	</div>
</section>

<!-- ==================== DATOS Y FISCALIDAD ==================== -->
<section id="datos" class="py-20 bg-white">
	<div class="max-w-6xl mx-auto px-6">
		<h2 class="text-4xl font-bold text-slate-900 font-title mb-2">Datos y Fiscalidad</h2>
		<div class="w-16 h-1 bg-cherry-500 rounded-full mb-8"></div>

		<!-- Gráfico: Precios de Combustibles -->
		<div class="bg-white rounded-md p-6 shadow-sm border border-slate-200 mb-8">
			<ChartCanvas type="line" data={fuelPriceChartData} options={fuelPriceChartOptions} height="450px" />
			<p class="text-sm text-slate-500 mt-4">
				Fuentes:
				<a href="https://www.globalpetrolprices.com/Chile/gasoline_prices/" target="_blank" rel="noopener" class="text-cherry-500 hover:text-cherry-600 hover:underline">GlobalPetrolPrices</a> |
				<a href="https://www.latercera.com/pulso/noticia/consumo-de-combustibles-en-el-pais-cayo-en-2023-por-primera-vez-desde-la-pandemia-por-mayores-precios/YBKNPF3GD5H4BCUT7QFCP5DINE/" target="_blank" rel="noopener" class="text-cherry-500 hover:text-cherry-600 hover:underline">La Tercera</a> |
				<a href="https://www.emol.com/noticias/Economia/2022/01/04/1042848/bencinas-2021.html" target="_blank" rel="noopener" class="text-cherry-500 hover:text-cherry-600 hover:underline">Emol</a>
			</p>
		</div>

		<!-- Gráfico: Precios del Petróleo -->
		<div class="bg-white rounded-md p-6 shadow-sm border border-slate-200 mb-8">
			<ChartCanvas type="line" data={oilPriceChartData} options={oilPriceChartOptions} height="400px" />
			<p class="text-sm text-slate-500 mt-4">
				Fuente: <a href="https://www.eia.gov/dnav/pet/hist/rwtca.htm" target="_blank" rel="noopener" class="text-cherry-500 hover:text-cherry-600 hover:underline">U.S. Energy Information Administration (EIA)</a>
			</p>
		</div>

		<!-- Gráfico: Impacto Fiscal -->
		<div class="bg-white rounded-md p-6 shadow-sm border border-slate-200 mb-8">
			<ChartCanvas type="bar" data={fiscalChartData} options={fiscalChartOptions} height="400px" />
			<div class="mt-4 bg-red-50 rounded-lg p-4 border border-red-200">
				<p class="text-sm text-red-800">
					<strong>Costo fiscal acumulado (jul 2014 - mar 2026): US$2.194 millones.</strong>
					Excluyendo el shock de 2022 (guerra Rusia-Ucrania), el sistema ha generado ingresos netos para el fisco.
				</p>
			</div>
			<p class="text-sm text-slate-500 mt-3">
				Fuente: <a href="https://www.latercera.com/pulso/noticia/costo-fiscal-del-mepco-supera-los-us2000-millones-desde-su-creacion-en-2014/" target="_blank" rel="noopener" class="text-cherry-500 hover:text-cherry-600 hover:underline">La Tercera - OCEC UDP</a>
			</p>
		</div>

		<!-- Tabla de impacto fiscal -->
		<h3 class="text-2xl font-bold text-slate-900 mt-12 mb-6">Tabla: Impacto Fiscal Anual (Millones USD)</h3>
		<div class="overflow-x-auto">
			<table class="w-full bg-white rounded-md overflow-hidden shadow-sm border border-slate-200">
				<thead class="bg-slate-800 text-white">
					<tr>
						<th class="px-4 py-3 text-left text-sm">Año</th>
						<th class="px-4 py-3 text-center text-sm">Monto (M USD)</th>
						<th class="px-4 py-3 text-center text-sm">Efecto</th>
						<th class="px-4 py-3 text-left text-sm">Contexto</th>
					</tr>
				</thead>
				<tbody>
					{#each fiscalData as fd, i}
						<tr class="{i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-slate-50 transition-colors">
							<td class="px-4 py-2 font-bold text-slate-900">{fd.year}</td>
							<td class="px-4 py-2 text-center font-mono {fd.amount >= 0 ? 'text-green-700' : 'text-red-700'} font-bold">
								{fd.amount >= 0 ? '+' : ''}{fd.amount.toLocaleString('es-CL')}
							</td>
							<td class="px-4 py-2 text-center">
								<span class="px-2 py-1 rounded-md text-xs font-medium {fd.amount >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
									{fd.amount >= 0 ? 'Ingreso' : 'Costo'}
								</span>
							</td>
							<td class="px-4 py-2 text-sm text-slate-600">
								{#if fd.year === '2020'}COVID-19 - caída petróleo
								{:else if fd.year === '2022'}Guerra Rusia-Ucrania
								{:else if fd.year === '2021'}Recuperación post-COVID
								{:else if fd.year === '2014'}Inicio del MEPCO (jul-dic)
								{:else if fd.year === '2026*'}Crisis Medio Oriente (ene-mar 19)
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<!-- Precios por región -->
		<h3 class="text-2xl font-bold text-slate-900 mt-12 mb-4">Precios por Región</h3>
		<p class="text-slate-600 mb-8">Precios de bencinas por región de Chile, marzo 2026 (antes del shock de precios del 26 de marzo).</p>

		<div class="bg-white rounded-md p-6 shadow-sm border border-slate-200 mb-8">
			<ChartCanvas type="bar" data={regionalChartData} options={regionalChartOptions} height="600px" />
		</div>

		<div class="overflow-x-auto">
			<table class="w-full bg-white rounded-md overflow-hidden shadow-sm border border-slate-200">
				<thead class="bg-slate-800 text-white">
					<tr>
						<th class="px-4 py-3 text-left text-sm">Región</th>
						<th class="px-4 py-3 text-center text-sm">93 Oct</th>
						<th class="px-4 py-3 text-center text-sm">95 Oct</th>
						<th class="px-4 py-3 text-center text-sm">97 Oct</th>
					</tr>
				</thead>
				<tbody>
					{#each regionalPrices.data as rp, i}
						<tr class="{i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-slate-50 transition-colors">
							<td class="px-4 py-2 font-medium text-slate-900">{rp.region}</td>
							<td class="px-4 py-2 text-center font-mono text-cherry-700">${rp.oct93.toLocaleString('es-CL')}</td>
							<td class="px-4 py-2 text-center font-mono text-red-700">${rp.oct95.toLocaleString('es-CL')}</td>
							<td class="px-4 py-2 text-center font-mono text-purple-700">${rp.oct97.toLocaleString('es-CL')}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<p class="text-sm text-slate-500 mt-3">
			Fuente: <a href={regionalPrices.sourceUrl} target="_blank" rel="noopener" class="text-cherry-500 hover:text-cherry-600 hover:underline">{regionalPrices.source}</a>
		</p>
	</div>
</section>

<!-- ==================== ANÁLISIS FISCAL DETALLADO ==================== -->
<section id="datos-fiscal" class="py-20 bg-slate-50">
	<div class="max-w-6xl mx-auto px-6">
		<h2 class="text-4xl font-bold text-slate-900 font-title mb-2">Análisis Fiscal en Profundidad</h2>
		<div class="w-16 h-1 bg-cherry-500 rounded-full mb-4"></div>
		<p class="text-slate-600 mb-8">El MEPCO ha acumulado un costo fiscal de US$2.194 millones. Pero la historia cambia radicalmente si se separa el efecto de la guerra de Ucrania.</p>

		<!-- Hallazgo clave -->
		<div class="bg-cherry-500 rounded-md p-8 text-white mb-12">
			<div class="flex flex-col md:flex-row items-center gap-8">
				<div class="flex-1">
					<h3 class="text-2xl font-bold mb-3">El hallazgo clave</h3>
					<p class="text-lg text-blue-100 mb-4">
						Si se excluye el año 2022 (guerra Rusia-Ucrania), el MEPCO habría sido <strong class="text-white">SUPERAVITARIO</strong>
						en <strong class="text-white">+US$182 millones</strong> para el fisco. Todo el déficit acumulado se explica por un solo evento geopolítico.
					</p>
					<p class="text-sm text-blue-200">
						Fuente: Cálculo basado en datos del economista Juan Ortiz, OCEC-UDP, vía
						<a href="https://www.latercera.com/pulso/noticia/costo-fiscal-del-mepco-supera-los-us2000-millones-desde-su-creacion-en-2014/" target="_blank" rel="noopener" class="text-white underline">La Tercera</a>
					</p>
				</div>
				<div class="flex-shrink-0 text-center">
					<div class="bg-white/20 rounded-md p-6">
						<div class="text-sm text-blue-200">Con Ucrania</div>
						<div class="text-3xl font-black text-red-300">-US$2.194M</div>
						<div class="text-2xl text-blue-200 my-2">vs</div>
						<div class="text-sm text-blue-200">Sin Ucrania</div>
						<div class="text-3xl font-black text-green-300">+US$182M</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Gráficos comparativos -->
		<div class="grid lg:grid-cols-1 gap-8 mb-12">
			<div class="bg-white rounded-md p-6 shadow-sm border border-slate-200">
				<ChartCanvas type="bar" data={fiscalWithWithoutData} options={fiscalWithWithoutOptions} height="400px" />
			</div>
			<div class="bg-white rounded-md p-6 shadow-sm border border-slate-200">
				<ChartCanvas type="line" data={cumulativeChartData} options={cumulativeChartOptions} height="400px" />
			</div>
		</div>

		<!-- ¿Subsidio o menor recaudación? - Análisis detallado -->
		<div class="mt-12 mb-12" id="subsidio-impuesto">
			<h3 class="text-2xl font-bold text-slate-900 mb-4">¿El MEPCO subsidia la bencina o subsidia el impuesto?</h3>
			<div class="bg-amber-50 rounded-md p-6 border border-amber-200 mb-8">
				<p class="text-slate-800 mb-3">
					<strong>Respuesta corta:</strong> El MEPCO no subsidia el precio de la bencina. Opera exclusivamente sobre
					el <strong>componente variable del Impuesto Específico a los Combustibles (IEC)</strong>.
					En la mayoría de los años, el Estado simplemente <em>recaudó menos impuesto</em> — o incluso más.
				</p>
				<p class="text-slate-800">
					<strong>La excepción:</strong> En 2022, el componente variable se hizo tan negativo que
					<strong>superó al componente base del IEC</strong>, generando una <em>tributación efectiva negativa</em>
					por litro. Solo entonces el MEPCO dejó de ser una "rebaja de impuesto" y se convirtió en un subsidio directo al precio.
				</p>
			</div>

			<!-- Gráfico combinado: barras fiscales + línea acumulada -->
			<div class="bg-white rounded-md p-6 shadow-sm border border-slate-200 mb-8">
				<ChartCanvas type="bar" data={fiscalCombinedData} options={fiscalCombinedOptions} height="450px" />
				<div class="flex flex-wrap gap-4 mt-4 text-sm justify-center">
					<span class="flex items-center gap-2">
						<span class="w-4 h-4 rounded bg-emerald-500 inline-block"></span>
						Mayor recaudación (Estado ganó)
					</span>
					<span class="flex items-center gap-2">
						<span class="w-4 h-4 rounded bg-cherry-500 inline-block"></span>
						Menor recaudación (rebaja del IEC)
					</span>
					<span class="flex items-center gap-2">
						<span class="w-4 h-4 rounded bg-red-600 inline-block"></span>
						Subsidio efectivo (superó al impuesto)
					</span>
				</div>
			</div>

			<!-- Gráfico: Composición del precio (stacked bar) -->
			<div class="bg-white rounded-md p-6 shadow-sm border border-slate-200 mb-8">
				<ChartCanvas type="bar" data={decompositionChartData} options={decompositionChartOptions} height="450px" />
				<p class="text-xs text-slate-500 mt-3">
					El IEC efectivo = IEC base (fijo, en UTM/m³) + componente variable MEPCO. Cuando el MEPCO reduce el IEC, la barra naranja se achica.
					En 2020 (petróleo barato), el MEPCO <em>aumentó</em> el IEC y el Estado recaudó más.
				</p>
			</div>

			<!-- Tabla detallada: descomposición del precio por litro -->
			<h4 class="text-xl font-bold text-slate-900 mb-2">Descomposición del precio de Gasolina 93 (CLP/litro)</h4>
			<p class="text-sm text-slate-500 mb-4">
				Estimación por año. IEC base calculado con UTM promedio anual (SII). Efecto MEPCO estimado a partir del impacto fiscal (OCEC-UDP),
				ponderado por consumo y tipo de cambio (BCCh). Los valores son promedios anuales aproximados.
			</p>
			<div class="overflow-x-auto mb-8">
				<table class="w-full bg-white rounded-md overflow-hidden shadow-sm border border-slate-200 text-sm">
					<thead>
						<tr class="bg-slate-800 text-white">
							<th class="px-3 py-3 text-left font-semibold">Año</th>
							<th class="px-3 py-3 text-right font-semibold">Brent<br/><span class="font-normal text-slate-300">USD/bbl</span></th>
							<th class="px-3 py-3 text-right font-semibold bg-slate-700">Precio<br/><span class="font-normal text-slate-300">CLP/L</span></th>
							<th class="px-3 py-3 text-right font-semibold text-blue-200">Combustible<br/>+ Margen</th>
							<th class="px-3 py-3 text-right font-semibold text-amber-200">IEC base<br/><span class="font-normal text-slate-300">(fijo)</span></th>
							<th class="px-3 py-3 text-right font-semibold text-amber-200">Efecto<br/>MEPCO</th>
							<th class="px-3 py-3 text-right font-semibold text-amber-200">IEC<br/>efectivo</th>
							<th class="px-3 py-3 text-right font-semibold text-purple-200">IVA<br/><span class="font-normal text-slate-300">(19%)</span></th>
							<th class="px-3 py-3 text-right font-semibold">Subsidio<br/>al IEC</th>
							<th class="px-3 py-3 text-right font-semibold">Subsidio a<br/>la bencina</th>
							<th class="px-3 py-3 text-right font-semibold">Fiscal<br/><span class="font-normal text-slate-300">MM USD</span></th>
						</tr>
					</thead>
					<tbody>
						{#each priceDecomposition as row}
							<tr class="border-b border-slate-100 hover:bg-slate-50/80 {row.classification === 'effective_subsidy' ? 'bg-red-50' : row.classification === 'surplus' ? 'bg-green-50/30' : ''}">
								<td class="px-3 py-2.5 font-bold text-slate-900">{row.year}</td>
								<td class="px-3 py-2.5 text-right font-mono text-slate-600">{row.brent}</td>
								<td class="px-3 py-2.5 text-right font-mono font-bold bg-slate-50">${row.precio.toLocaleString('es-CL')}</td>
								<td class="px-3 py-2.5 text-right font-mono text-blue-700">${row.costoYMargen.toLocaleString('es-CL')}</td>
								<td class="px-3 py-2.5 text-right font-mono text-amber-700">${row.iecBase.toLocaleString('es-CL')}</td>
								<td class="px-3 py-2.5 text-right font-mono font-bold {row.mepcoPerLiter > 0 ? 'text-red-600' : row.mepcoPerLiter < 0 ? 'text-green-700' : 'text-slate-400'}">
									{#if row.mepcoPerLiter > 0}
										+${row.mepcoPerLiter.toLocaleString('es-CL')}
									{:else if row.mepcoPerLiter < 0}
										-${Math.abs(row.mepcoPerLiter).toLocaleString('es-CL')}
									{:else}
										$0
									{/if}
								</td>
								<td class="px-3 py-2.5 text-right font-mono font-bold {row.iecEfectivo < 0 ? 'text-red-700 bg-red-50' : 'text-amber-800'}">
									${row.iecEfectivo.toLocaleString('es-CL')}
								</td>
								<td class="px-3 py-2.5 text-right font-mono text-purple-700">${row.iva.toLocaleString('es-CL')}</td>
								<td class="px-3 py-2.5 text-right font-mono {row.subsidioAlImpuesto > 0 ? 'text-cherry-700 font-bold' : 'text-slate-300'}">
									{row.subsidioAlImpuesto > 0 ? '$' + row.subsidioAlImpuesto.toLocaleString('es-CL') : '—'}
								</td>
								<td class="px-3 py-2.5 text-right font-mono {row.subsidioAlCombustible > 0 ? 'text-red-700 font-bold' : 'text-slate-300'}">
									{row.subsidioAlCombustible > 0 ? '$' + row.subsidioAlCombustible.toLocaleString('es-CL') : '—'}
								</td>
								<td class="px-3 py-2.5 text-right font-mono font-bold {row.fiscalAmount >= 0 ? 'text-green-700' : 'text-red-700'}">
									{row.fiscalAmount >= 0 ? '+' : ''}{row.fiscalAmount.toLocaleString('es-CL')}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<!-- Leyenda de la tabla -->
			<div class="grid md:grid-cols-2 gap-4 mb-8 text-sm">
				<div class="bg-slate-50 rounded-lg p-4 border border-slate-200">
					<h5 class="font-bold text-slate-800 mb-2">Cómo leer la tabla</h5>
					<ul class="space-y-1.5 text-slate-600">
						<li><strong class="text-blue-700">Combustible + Margen</strong> = precio de paridad de importación + margen de distribución y retail</li>
						<li><strong class="text-amber-700">IEC base</strong> = componente fijo del Impuesto Específico (6,0 UTM/m³ para gasolina 93)</li>
						<li><strong>Efecto MEPCO</strong> = componente variable del IEC. <span class="text-red-600">Rojo (+) = sobretasa</span>, <span class="text-green-700">verde (-) = rebaja</span></li>
						<li><strong class="text-amber-800">IEC efectivo</strong> = IEC base + efecto MEPCO = lo que realmente se cobra de impuesto específico</li>
						<li><strong class="text-purple-700">IVA</strong> = 19% sobre la suma de todo lo anterior</li>
					</ul>
				</div>
				<div class="bg-slate-50 rounded-lg p-4 border border-slate-200">
					<h5 class="font-bold text-slate-800 mb-2">Columnas de subsidio</h5>
					<ul class="space-y-1.5 text-slate-600">
						<li><strong class="text-cherry-700">Subsidio al IEC</strong> = cuánto se rebajó el impuesto por litro (= |efecto MEPCO| cuando es negativo)</li>
						<li><strong class="text-red-700">Subsidio a la bencina</strong> = cuánto pagó el Estado <em>por encima</em> del impuesto. Solo aparece cuando el IEC efectivo es negativo (tributación negativa)</li>
						<li>"—" = no hubo subsidio ese año; el MEPCO <em>aumentó</em> el impuesto</li>
					</ul>
				</div>
			</div>

			<!-- Contadores por categoría -->
			<div class="grid md:grid-cols-3 gap-4 mb-8">
				<div class="bg-green-50 rounded-md p-5 border border-green-200 text-center">
					<div class="text-3xl font-black text-green-700">{priceDecomposition.filter(r => r.classification === 'surplus').length}</div>
					<div class="text-sm text-green-800 mt-1">años donde el Estado <strong>recaudó más</strong> gracias al MEPCO</div>
					<div class="text-xs text-green-600 mt-2">El MEPCO fue positivo: el consumidor pagó sobretasa</div>
				</div>
				<div class="bg-cherry-50 rounded-md p-5 border border-cherry-200 text-center">
					<div class="text-3xl font-black text-cherry-700">{priceDecomposition.filter(r => r.classification === 'less_collection').length}</div>
					<div class="text-sm text-cherry-800 mt-1">años donde el Estado <strong>solo recaudó menos</strong></div>
					<div class="text-xs text-cherry-600 mt-2">El MEPCO fue negativo: se rebajó el IEC, pero el impuesto siguió existiendo</div>
				</div>
				<div class="bg-red-50 rounded-md p-5 border border-red-200 text-center">
					<div class="text-3xl font-black text-red-700">{priceDecomposition.filter(r => r.classification === 'effective_subsidy').length}</div>
					<div class="text-sm text-red-800 mt-1">año donde el MEPCO <strong>subsidió la bencina</strong></div>
					<div class="text-xs text-red-600 mt-2">El subsidio superó al IEC base: tributación efectiva negativa en meses peak</div>
				</div>
			</div>

			<!-- Dato clave: julio 2022 -->
			<div class="bg-slate-900 rounded-md p-6 text-white mb-8">
				<h5 class="font-bold text-lg mb-3">Julio 2022: el único momento donde se subsidió la bencina</h5>
				<div class="grid md:grid-cols-2 gap-6">
					<div>
						<div class="text-sm text-slate-400 mb-1">Gasolina 93</div>
						<div class="flex items-center gap-3">
							<div class="text-center">
								<div class="text-xs text-amber-400">IEC base</div>
								<div class="text-2xl font-mono font-bold text-amber-300">$349/L</div>
							</div>
							<div class="text-slate-500">vs</div>
							<div class="text-center">
								<div class="text-xs text-red-400">Subsidio MEPCO</div>
								<div class="text-2xl font-mono font-bold text-red-400">$371/L</div>
							</div>
							<div class="text-slate-500">=</div>
							<div class="text-center">
								<div class="text-xs text-red-300">IEC efectivo</div>
								<div class="text-2xl font-mono font-bold text-red-300">-$22/L</div>
							</div>
						</div>
					</div>
					<div>
						<div class="text-sm text-slate-400 mb-1">Diésel</div>
						<div class="flex items-center gap-3">
							<div class="text-center">
								<div class="text-xs text-amber-400">IEC base</div>
								<div class="text-2xl font-mono font-bold text-amber-300">$87/L</div>
							</div>
							<div class="text-slate-500">vs</div>
							<div class="text-center">
								<div class="text-xs text-red-400">Subsidio MEPCO</div>
								<div class="text-2xl font-mono font-bold text-red-400">$375/L</div>
							</div>
							<div class="text-slate-500">=</div>
							<div class="text-center">
								<div class="text-xs text-red-300">IEC efectivo</div>
								<div class="text-2xl font-mono font-bold text-red-300">-$288/L</div>
							</div>
						</div>
					</div>
				</div>
				<p class="text-sm text-slate-400 mt-4">
					Fuente: <a href="https://www.emol.com/noticias/Economia/2022/07/24/1067763/economistas-recaudacion-impuesto-especifico-combustibles.html" target="_blank" rel="noopener" class="text-cherry-300 hover:underline">Emol - Recaudación IEC 2022</a>.
					Estos son datos reales del peak de la crisis, no estimaciones.
				</p>
			</div>

			<!-- Conclusión -->
			<div class="bg-slate-50 rounded-md p-6 border border-slate-200">
				<h4 class="font-bold text-slate-900 mb-3">Conclusión: ¿perdió plata o recaudó menos?</h4>
				<p class="text-slate-700 mb-2">
					<strong>En 11 de 12 años, el MEPCO no ha subsidiado la bencina.</strong> Ha sido un mecanismo de ajuste impositivo:
					en años de precios bajos, el Estado recauda más IEC (columna "Efecto MEPCO" en rojo); en años de precios altos, recauda menos (en verde).
					Excluyendo 2022, el balance neto es <strong class="text-green-700">superavitario en +US$182M</strong> para el fisco.
				</p>
				<p class="text-slate-700 mb-2">
					<strong>Solo en 2022</strong>, durante los meses peak de la guerra de Ucrania, el subsidio por litro superó al impuesto base,
					generando tributación efectiva negativa. Ese único evento explica <strong>el 108% del déficit total acumulado</strong>.
					En promedio anual, incluso en 2022 el IEC efectivo fue positivo (~$97/L); la tributación negativa fue un fenómeno de meses específicos.
				</p>
				<p class="text-slate-600 text-sm mt-3">
					Fuentes de la tabla: precios de combustibles (GlobalPetrolPrices, La Tercera, Emol); UTM (SII); tipo de cambio (Banco Central de Chile);
					impacto fiscal (OCEC-UDP vía La Tercera); IEC base (Ley 18.502, 6,0 UTM/m³); datos julio 2022 (Emol).
				</p>
			</div>
		</div>

		<!-- Desglose superávit vs déficit -->
		<h3 class="text-2xl font-bold text-slate-900 mb-6">Desglose: Años de superávit vs. años de déficit (sin 2022)</h3>
		<div class="grid md:grid-cols-2 gap-6 mb-12">
			<div class="bg-green-50 rounded-md p-6 border border-green-200">
				<h4 class="font-bold text-green-800 mb-4 flex items-center gap-2">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
					Años de superávit (el Estado ganó)
				</h4>
				<div class="space-y-2">
					{#each fiscalDeepDive.withoutUkraine.surplusYears.years as year, i}
						<div class="flex justify-between items-center py-1 border-b border-green-100 last:border-0">
							<span class="text-slate-700">{year}</span>
							<span class="font-bold font-mono text-green-700">+US${fiscalDeepDive.withoutUkraine.surplusYears.amounts[i]}M</span>
						</div>
					{/each}
					<div class="flex justify-between items-center pt-2 border-t-2 border-green-300">
						<span class="font-bold text-green-900">TOTAL</span>
						<span class="font-black font-mono text-green-700 text-lg">+US${fiscalDeepDive.withoutUkraine.surplusYears.total.toLocaleString('es-CL')}M</span>
					</div>
				</div>
			</div>
			<div class="bg-red-50 rounded-md p-6 border border-red-200">
				<h4 class="font-bold text-red-800 mb-4 flex items-center gap-2">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
					Años de déficit (el Estado perdió, sin 2022)
				</h4>
				<div class="space-y-2">
					{#each fiscalDeepDive.withoutUkraine.deficitYears.years as year, i}
						<div class="flex justify-between items-center py-1 border-b border-red-100 last:border-0">
							<span class="text-slate-700">{year}</span>
							<span class="font-bold font-mono text-red-700">US${fiscalDeepDive.withoutUkraine.deficitYears.amounts[i]}M</span>
						</div>
					{/each}
					<div class="flex justify-between items-center pt-2 border-t-2 border-red-300">
						<span class="font-bold text-red-900">TOTAL</span>
						<span class="font-black font-mono text-red-700 text-lg">US${fiscalDeepDive.withoutUkraine.deficitYears.total.toLocaleString('es-CL')}M</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Detalle crisis 2022 -->
		<h3 class="text-2xl font-bold text-slate-900 mb-6">Anatomía de la Crisis 2022: US$2.376 Millones en un Año</h3>
		<div class="bg-slate-900 rounded-md p-8 text-white mb-12">
			<div class="relative">
				<div class="absolute left-4 top-0 bottom-0 w-0.5 bg-red-500/30"></div>
				{#each fiscalDeepDive.ukraine2022Detail.timelineEvents as event}
					<div class="relative pl-10 pb-6 last:pb-0">
						<div class="absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full bg-red-500 ring-2 ring-red-500/30"></div>
						<div class="text-xs font-mono text-red-400 mb-1">{event.date}</div>
						<div class="text-slate-200">{event.event}</div>
					</div>
				{/each}
			</div>
			<p class="text-sm text-slate-400 mt-6">
				Fuentes:
				<a href="https://www.emol.com/noticias/Economia/2022/07/24/1067763/economistas-recaudacion-impuesto-especifico-combustibles.html" target="_blank" rel="noopener" class="text-cherry-300 hover:underline">Emol</a> |
				<a href="https://www.latercera.com/pulso/noticia/gobierno-inyecta-us1500-millones-al-mepco-para-seguir-estabilizando-los-precios-de-los-combustibles/PNPQEFYUKJHNRJU43BORRSTGEM/" target="_blank" rel="noopener" class="text-cherry-300 hover:underline">La Tercera</a>
			</p>
		</div>

		<!-- Escala del costo -->
		<h3 class="text-2xl font-bold text-slate-900 mb-6">¿Cuánto son US$2.194 millones? Comparaciones de escala</h3>
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
			{#each fiscalDeepDive.scaleComparisons as comp}
				<div class="bg-slate-50 rounded-md p-5 border border-slate-200 hover:shadow-md transition-shadow">
					<div class="text-lg font-bold text-cherry-600 mb-1">{comp.equivalent}</div>
					<div class="text-sm font-semibold text-slate-900 mb-2">{comp.item}</div>
					<div class="text-xs text-slate-600">{comp.detail}</div>
					<a href={comp.sourceUrl} target="_blank" rel="noopener" class="text-xs text-cherry-500 hover:text-cherry-600 hover:underline mt-2 inline-block">Fuente</a>
				</div>
			{/each}
		</div>

		<!-- Costos marzo 2026 -->
		<h3 class="text-2xl font-bold text-slate-900 mb-6">Costos en la Crisis Actual (Marzo 2026)</h3>
		<div class="grid md:grid-cols-4 gap-4">
			<div class="bg-red-50 rounded-md p-5 border border-red-200 text-center">
				<div class="text-sm text-red-600 uppercase font-bold">Por semana</div>
				<div class="text-2xl font-black text-red-700 my-1">US$140-200M</div>
				<a href="https://www.emol.com/noticias/Economia/2026/03/19/1194747/quiroz-ajuste-mepco.html" target="_blank" rel="noopener" class="text-xs text-cherry-500 hover:text-cherry-600 hover:underline">Emol / Redimin</a>
			</div>
			<div class="bg-red-50 rounded-md p-5 border border-red-200 text-center">
				<div class="text-sm text-red-600 uppercase font-bold">Por mes</div>
				<div class="text-2xl font-black text-red-700 my-1">~US$500M</div>
				<a href="https://fen.uahurtado.cl/2026/noticias/mepco-en-chile-el-amortiguador-de-la-bencina-que-hoy-cuesta-millones-al-mes/" target="_blank" rel="noopener" class="text-xs text-cherry-500 hover:text-cherry-600 hover:underline">FEN UAH</a>
			</div>
			<div class="bg-red-50 rounded-md p-5 border border-red-200 text-center">
				<div class="text-sm text-red-600 uppercase font-bold">Q1 2026 proyectado</div>
				<div class="text-2xl font-black text-red-700 my-1">~US$1.600M</div>
				<a href="https://www.fastcheck.cl/2026/03/24/este-jueves-chile-vivira-el-mayor-shock-de-precios-en-combustibles-en-36-anos/" target="_blank" rel="noopener" class="text-xs text-cherry-500 hover:text-cherry-600 hover:underline">Fastcheck</a>
			</div>
			<div class="bg-red-50 rounded-md p-5 border border-red-200 text-center">
				<div class="text-sm text-red-600 uppercase font-bold">Anualizado (si sigue)</div>
				<div class="text-2xl font-black text-red-700 my-1">~US$3.000M</div>
				<a href="https://www.reporteminero.cl/noticia/noticias/2026/03/mepco-cambios-chile-costo-3000-millones-petroleo" target="_blank" rel="noopener" class="text-xs text-cherry-500 hover:text-cherry-600 hover:underline">Reporte Minero</a>
			</div>
		</div>
	</div>
</section>

<!-- ==================== COMPARACIÓN INTERNACIONAL ==================== -->
<section id="internacional" class="py-20 bg-white">
	<div class="max-w-6xl mx-auto px-6">
		<h2 class="text-4xl font-bold text-slate-900 font-title mb-2">Comparación Internacional</h2>
		<div class="w-16 h-1 bg-cherry-500 rounded-full mb-4"></div>
		<p class="text-slate-600 mb-8">Mecanismos de estabilización de combustibles alrededor del mundo: éxitos, fracasos y lecciones.</p>

		<!-- Resumen visual -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
			<div class="bg-green-50 rounded-md p-4 border border-green-200 text-center">
				<div class="text-3xl font-bold text-green-700">3</div>
				<div class="text-sm text-green-800">Exitosos</div>
			</div>
			<div class="bg-yellow-50 rounded-md p-4 border border-yellow-200 text-center">
				<div class="text-3xl font-bold text-yellow-700">3</div>
				<div class="text-sm text-yellow-800">Parciales</div>
			</div>
			<div class="bg-red-50 rounded-md p-4 border border-red-200 text-center">
				<div class="text-3xl font-bold text-red-700">1</div>
				<div class="text-sm text-red-800">Fallido</div>
			</div>
			<div class="bg-red-100 rounded-md p-4 border border-red-300 text-center">
				<div class="text-3xl font-bold text-red-900">1</div>
				<div class="text-sm text-red-900">Catastrófico</div>
			</div>
		</div>

		<!-- Cards de países -->
		<div class="space-y-6">
			{#each countryComparisons as country}
				<div class="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
					<div class="p-6">
						<div class="flex flex-wrap items-center gap-3 mb-4">
							<span class="text-3xl">{country.flag}</span>
							<h3 class="text-xl font-bold text-slate-900">{country.country}</h3>
							<span class="px-3 py-1 rounded-md text-sm font-medium border {getRatingColor(country.rating)}">
								{getRatingLabel(country.rating)}
							</span>
							<span class="px-3 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
								{country.mechanism}
							</span>
						</div>

						<p class="text-slate-700 mb-4">{country.description}</p>

						<div class="grid md:grid-cols-2 gap-4 mb-4">
							<div class="space-y-2">
								{#each [
									{ label: 'Tipo', value: country.type },
									{ label: 'Auto/Discrecional', value: country.autoOrDiscretionary },
									{ label: 'Ajuste máximo', value: country.maxAdjustment }
								] as item}
									<div class="flex gap-2 text-sm">
										<span class="text-slate-500 font-medium min-w-[120px]">{item.label}:</span>
										<span class="text-slate-700">{item.value}</span>
									</div>
								{/each}
							</div>
							<div class="space-y-2">
								{#each [
									{ label: 'Sostenibilidad', value: country.fiscalSustainability },
									{ label: 'Focalización', value: country.socialTargeting }
								] as item}
									<div class="flex gap-2 text-sm">
										<span class="text-slate-500 font-medium min-w-[120px]">{item.label}:</span>
										<span class="text-slate-700">{item.value}</span>
									</div>
								{/each}
							</div>
						</div>

						<ul class="space-y-1 mb-4">
							{#each country.details as detail}
								<li class="text-sm text-slate-600 flex items-start gap-2">
									<span class="text-cherry-500 mt-1">&#8226;</span>
									<span>{detail}</span>
								</li>
							{/each}
						</ul>

						<div class="flex flex-wrap gap-2">
							{#each country.sources as src}
								<a href={src.url} target="_blank" rel="noopener" class="text-xs text-cherry-500 hover:text-cherry-600 hover:underline bg-cherry-50 px-2 py-1 rounded">
									{src.name}
								</a>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Lecciones clave -->
		<div class="mt-12 bg-slate-900 rounded-md p-8 text-white">
			<h3 class="text-2xl font-bold mb-6">Lecciones Clave de la Experiencia Internacional</h3>
			<div class="grid md:grid-cols-2 gap-6">
				{#each [
					{ num: '1', title: 'Mecanismos automáticos > discrecionales', desc: 'Chile (MEPCO), México (IEPS) y Europa funcionan mejor porque siguen reglas predecibles, no decisiones políticas.' },
					{ num: '2', title: 'Ajustes graduales son críticos', desc: 'El tope de 2.4% de Chile previene los shocks que causaron desastres en Nigeria, Ecuador, Irán y Argentina.' },
					{ num: '3', title: 'La sostenibilidad fiscal es el talón de Aquiles', desc: 'Colombia (US$19B de déficit) y Perú (colapsando) muestran que incluso buenos diseños acumulan déficits insostenibles.' },
					{ num: '4', title: 'Los subsidios universales son regresivos', desc: 'El FMI y la evidencia de Colombia muestran que los subsidios no focalizados benefician desproporcionadamente a los más ricos.' },
					{ num: '5', title: 'Indonesia 2014 es el estándar de oro', desc: 'Aprovechar precios bajos + redes de protección social simultáneas + comunicación clara = reforma exitosa.' },
					{ num: '6', title: 'Venezuela es la advertencia máxima', desc: 'Subsidios ilimitados sin disciplina fiscal llevan al colapso industrial y desabastecimiento.' }
				] as lesson}
					<div class="flex items-start gap-3">
						<div class="w-8 h-8 rounded-full bg-cherry-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
							{lesson.num}
						</div>
						<div>
							<div class="font-bold text-cherry-300">{lesson.title}</div>
							<div class="text-sm text-slate-300">{lesson.desc}</div>
						</div>
					</div>
				{/each}
			</div>
			<p class="text-sm text-slate-400 mt-6">
				Fuentes:
				<a href="https://www.elibrary.imf.org/view/journals/005/2012/003/article-A001-en.xml" target="_blank" rel="noopener" class="text-cherry-300 hover:underline">IMF - Automatic Fuel Pricing</a> |
				<a href="https://publications.iadb.org/en/proposed-fuel-price-stabilization-mechanism-through-use-financial-derivatives" target="_blank" rel="noopener" class="text-cherry-300 hover:underline">BID - Estabilización de Precios</a>
			</p>
		</div>
	</div>
</section>

<!-- ==================== CASO INDONESIA ==================== -->
<section id="indonesia" class="py-20 bg-slate-900 text-white">
	<div class="max-w-6xl mx-auto px-6">
		<h2 class="text-4xl font-bold mb-2">Caso Indonesia: El Estándar de Oro</h2>
		<div class="w-20 h-1 bg-emerald-400 mb-4"></div>
		<p class="text-slate-300 mb-8">La reforma de combustibles de Indonesia en 2014-2015 es considerada por el Banco Mundial, el FMI y el IISD como el mejor ejemplo mundial de cómo reformar subsidios a combustibles.</p>

		<!-- Antes de la reforma -->
		<div class="bg-white/10 backdrop-blur rounded-md p-8 border border-white/10 mb-8">
			<h3 class="text-2xl font-bold text-emerald-300 mb-4">Antes de la Reforma: El Problema</h3>
			<div class="grid md:grid-cols-3 gap-6 mb-6">
				<div class="text-center">
					<div class="text-4xl font-black text-red-400">{indonesiaDeepDive.preReform.subsidyCostGDP}%</div>
					<div class="text-sm text-slate-300">del PIB en subsidios a combustibles (2014)</div>
				</div>
				<div class="text-center">
					<div class="text-4xl font-black text-red-400">US$21.000M</div>
					<div class="text-sm text-slate-300">costo total de subsidios energéticos</div>
				</div>
				<div class="text-center">
					<div class="text-4xl font-black text-red-400">14 intentos</div>
					<div class="text-sm text-slate-300">de reforma previos (desde 1998)</div>
				</div>
			</div>
			<div class="bg-red-500/20 rounded-md p-4 border border-red-400/30">
				<p class="text-sm text-red-200">
					<strong>Fracaso de 1998:</strong> {indonesiaDeepDive.preReform.priorFailure1998}
				</p>
			</div>
			<p class="text-sm text-slate-400 mt-4">
				Fuente: <a href={indonesiaDeepDive.preReform.sourceUrl} target="_blank" rel="noopener" class="text-emerald-400 hover:underline">{indonesiaDeepDive.preReform.source}</a>
			</p>
		</div>

		<!-- Timeline de la reforma -->
		<h3 class="text-2xl font-bold text-emerald-300 mb-6">Cronología de la Reforma (2014-2015)</h3>
		<div class="relative mb-12">
			<div class="absolute left-4 top-0 bottom-0 w-0.5 bg-emerald-500/30"></div>
			{#each indonesiaDeepDive.reform.timeline as event}
				<div class="relative pl-12 pb-6 last:pb-0">
					<div class="absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full ring-2 {event.type === 'price' ? 'bg-red-500 ring-red-500/30' : event.type === 'social' ? 'bg-emerald-500 ring-emerald-500/30' : event.type === 'fiscal' ? 'bg-blue-500 ring-blue-500/30' : 'bg-yellow-500 ring-yellow-500/30'}"></div>
					<div class="bg-white/5 rounded-lg p-4 border border-white/10">
						<span class="text-xs font-mono {event.type === 'price' ? 'text-red-400' : event.type === 'social' ? 'text-emerald-400' : event.type === 'fiscal' ? 'text-blue-400' : 'text-yellow-400'}">{event.date}</span>
						<p class="text-slate-200 mt-1">{event.event}</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- Programas de protección social -->
		<h3 class="text-2xl font-bold text-emerald-300 mb-6">La Clave: Protección Social SIMULTÁNEA</h3>
		<div class="bg-emerald-500/10 rounded-md p-6 border border-emerald-400/30 mb-8">
			<p class="text-lg text-emerald-200 font-semibold mb-6">
				"{indonesiaDeepDive.reform.socialProtection.keyDesign}"
			</p>
			<div class="grid md:grid-cols-3 gap-6">
				{#each indonesiaDeepDive.reform.socialProtection.programs as program}
					<div class="bg-white/10 rounded-md p-5">
						<h4 class="font-bold text-white text-lg mb-2">{program.name}</h4>
						<div class="text-emerald-300 font-semibold mb-2">{program.beneficiaries}</div>
						<div class="text-sm text-slate-300 mb-2">{program.description}</div>
						<div class="text-xs text-emerald-400 font-mono">{program.value}</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Resultados fiscales -->
		<div class="grid md:grid-cols-2 gap-8 mb-8">
			<div class="bg-white/10 rounded-md p-6 border border-white/10">
				<h3 class="text-xl font-bold text-emerald-300 mb-4">Ahorro Fiscal</h3>
				<div class="text-center mb-4">
					<div class="text-5xl font-black text-emerald-400">US$15.600M</div>
					<div class="text-slate-300">ahorrados en subsidios</div>
					<div class="text-emerald-200 font-semibold mt-1">{indonesiaDeepDive.reform.fiscalSavings.percentOfBudget}% del gasto total del gobierno</div>
				</div>
				<h4 class="font-bold text-slate-200 mb-3">Redirigidos a:</h4>
				<ul class="space-y-2">
					{#each indonesiaDeepDive.reform.fiscalSavings.reallocation as item}
						<li class="flex items-start gap-2">
							<span class="text-emerald-400 mt-1">&#8226;</span>
							<div>
								<span class="text-white font-semibold">{item.sector}:</span>
								<span class="text-slate-300 text-sm"> {item.description}</span>
							</div>
						</li>
					{/each}
				</ul>
			</div>
			<div class="bg-white/10 rounded-md p-6 border border-white/10">
				<h3 class="text-xl font-bold text-emerald-300 mb-4">Factores de Éxito</h3>
				<ul class="space-y-4">
					{#each indonesiaDeepDive.reform.successFactors as factor, i}
						<li class="flex items-start gap-3">
							<div class="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
								{i + 1}
							</div>
							<span class="text-slate-200">{factor}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Advertencia: post-reforma -->
		<div class="bg-amber-50 rounded-md p-6 border border-amber-200">
			<h3 class="font-bold text-amber-300 mb-2">Advertencia: Lo que pasó después (2017+)</h3>
			<p class="text-slate-300">{indonesiaDeepDive.postReform.description}</p>
			<p class="text-amber-200 mt-3 font-semibold text-sm">{indonesiaDeepDive.postReform.lesson}</p>
			<p class="text-sm text-slate-400 mt-2">
				Fuente: <a href={indonesiaDeepDive.postReform.sourceUrl} target="_blank" rel="noopener" class="text-emerald-400 hover:underline">{indonesiaDeepDive.postReform.source}</a>
			</p>
		</div>

		<p class="text-sm text-slate-400 mt-6">
			Fuentes principales:
			<a href="https://documents1.worldbank.org/curated/en/099748505212431959/pdf/IDU1e31e5e531f16114baa1b62c1b3201c9c2e68.pdf" target="_blank" rel="noopener" class="text-emerald-400 hover:underline">World Bank</a> |
			<a href="https://www.iisd.org/publications/report/indonesias-fuel-subsidies-action-plan-reform" target="_blank" rel="noopener" class="text-emerald-400 hover:underline">IISD</a> |
			<a href="https://www.cambridge.org/core/books/politics-of-fossil-fuel-subsidies-and-their-reform/fossil-fuel-subsidy-reform-in-indonesia/69E6706F3ABFB80052B20E3772404138" target="_blank" rel="noopener" class="text-emerald-400 hover:underline">Cambridge</a>
		</p>
		<!-- Aplicación a Chile: Indonesia 2014 vs Chile 2026 -->
		<h3 class="text-2xl font-bold text-emerald-300 mt-16 mb-4">¿Y si Chile aplicara el modelo Indonesia?</h3>
		<p class="text-slate-400 text-sm mb-8">{chileIndonesiaHypothetical.disclaimer}</p>

		<h4 class="text-xl font-bold text-emerald-300 mb-4">Indonesia 2014 vs Chile 2026</h4>
		<div class="overflow-x-auto mb-12">
			<table class="w-full rounded-md overflow-hidden">
				<thead class="bg-white/10">
					<tr>
						{#each chileIndonesiaHypothetical.comparison.headers as h}
							<th class="px-4 py-3 text-left text-sm text-slate-300">{h}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each chileIndonesiaHypothetical.comparison.rows as row, i}
						<tr class="{i % 2 === 0 ? 'bg-white/5' : 'bg-transparent'}">
							<td class="px-4 py-2 text-sm font-semibold text-slate-200">{row[0]}</td>
							<td class="px-4 py-2 text-sm text-emerald-300">{row[1]}</td>
							<td class="px-4 py-2 text-sm text-blue-300">{row[2]}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<!-- Regresividad -->
		<h3 class="text-xl font-bold text-emerald-300 mb-4">El problema de fondo: el MEPCO es regresivo</h3>
		<div class="grid md:grid-cols-3 gap-6 mb-12">
			<div class="bg-white/10 rounded-md p-6 text-center">
				<div class="text-sm text-slate-400">Quintil más pobre (Q1)</div>
				<div class="text-3xl font-black text-red-400">${chileIndonesiaHypothetical.regressivity.q1Benefit.toLocaleString('es-CL')}/mes</div>
				<div class="text-xs text-slate-400">beneficio del subsidio MEPCO</div>
				<div class="text-slate-500 mt-2">{chileIndonesiaHypothetical.regressivity.vehiclesQ1} autos/100 hogares</div>
			</div>
			<div class="bg-white/10 rounded-md p-6 text-center flex flex-col items-center justify-center">
				<div class="text-5xl font-black text-cherry-400">{chileIndonesiaHypothetical.regressivity.ratio}x</div>
				<div class="text-sm text-slate-300">más beneficio para los ricos</div>
			</div>
			<div class="bg-white/10 rounded-md p-6 text-center">
				<div class="text-sm text-slate-400">Quintil más rico (Q5)</div>
				<div class="text-3xl font-black text-emerald-400">${chileIndonesiaHypothetical.regressivity.q5Benefit.toLocaleString('es-CL')}/mes</div>
				<div class="text-xs text-slate-400">beneficio del subsidio MEPCO</div>
				<div class="text-slate-500 mt-2">{chileIndonesiaHypothetical.regressivity.vehiclesQ5} autos/100 hogares</div>
			</div>
		</div>
		<p class="text-sm text-slate-400 mb-12">
			Fuente: <a href={chileIndonesiaHypothetical.regressivity.source.url} target="_blank" rel="noopener" class="text-emerald-400 hover:underline">{chileIndonesiaHypothetical.regressivity.source.name}</a>
		</p>

		<!-- Matemática fiscal -->
		<div class="bg-emerald-500/10 rounded-md p-8 border border-emerald-400/30 mb-12">
			<h3 class="text-xl font-bold text-emerald-300 mb-4">La matemática fiscal</h3>
			<div class="grid md:grid-cols-2 gap-8">
				<div>
					<h4 class="font-semibold text-red-300 mb-3">Costo actual (MEPCO universal)</h4>
					<div class="text-4xl font-black text-red-400 mb-1">~US${(chileIndonesiaHypothetical.hypotheticalPlan.fiscalMath.currentMepcoCost / 1000).toFixed(0)}.000M/año</div>
					<p class="text-sm text-slate-400">Al ritmo de marzo 2026. El 80% beneficia al 20% más rico.</p>
				</div>
				<div>
					<h4 class="font-semibold text-emerald-300 mb-3">Costo alternativo (modelo Indonesia)</h4>
					<div class="space-y-2 text-sm">
						<div class="flex justify-between text-slate-200">
							<span>Transferencia al 40% más pobre (3.6M hogares × $55.000/mes)</span>
							<span class="font-mono text-emerald-300">US$2.400M</span>
						</div>
						<div class="flex justify-between text-slate-200">
							<span>MEPCO solo para transporte público + kerosene</span>
							<span class="font-mono text-emerald-300">US$800M</span>
						</div>
						<div class="flex justify-between text-white font-bold pt-2 border-t border-emerald-500/30">
							<span>Total alternativo</span>
							<span class="font-mono text-emerald-400">US$3.200M</span>
						</div>
						<div class="flex justify-between text-emerald-300 font-bold">
							<span>Ahorro neto vs MEPCO actual</span>
							<span class="font-mono">~US$2.800M/año</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Factibilidad -->
		<h3 class="text-2xl font-bold text-emerald-300 mb-6">¿Es factible?</h3>
		<div class="grid md:grid-cols-2 gap-8 mb-8">
			<div class="bg-emerald-500/10 rounded-md p-6 border border-emerald-400/30">
				<h4 class="font-bold text-emerald-300 mb-4">A favor</h4>
				<ul class="space-y-3">
					{#each chileIndonesiaHypothetical.feasibility.favorable as f}
						<li class="flex items-start gap-2">
							<span class="text-emerald-400 flex-shrink-0 mt-0.5">&#10003;</span>
							<div>
								<span class="text-white font-semibold text-sm">{f.factor}</span>
								<p class="text-xs text-slate-400">{f.detail}</p>
							</div>
						</li>
					{/each}
				</ul>
			</div>
			<div class="bg-red-500/10 rounded-md p-6 border border-red-400/30">
				<h4 class="font-bold text-red-300 mb-4">En contra</h4>
				<ul class="space-y-3">
					{#each chileIndonesiaHypothetical.feasibility.desfavorable as f}
						<li class="flex items-start gap-2">
							<span class="text-red-400 flex-shrink-0 mt-0.5">&#10007;</span>
							<div>
								<span class="text-white font-semibold text-sm">{f.factor}</span>
								<p class="text-xs text-slate-400">{f.detail}</p>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Veredicto -->
		<div class="bg-white/10 rounded-md p-8 border border-white/20">
			<h3 class="text-xl font-bold text-white mb-4">Veredicto</h3>
			<p class="text-slate-200 leading-relaxed">{chileIndonesiaHypothetical.verdict}</p>
		</div>

		<div class="flex flex-wrap gap-2 mt-6">
			{#each chileIndonesiaHypothetical.feasibility.sources as s}
				<a href={s.url} target="_blank" rel="noopener" class="text-xs text-emerald-400 hover:underline bg-white/5 px-2 py-1 rounded">{s.name}</a>
			{/each}
			{#each chileIndonesiaHypothetical.comparison.sources as s}
				<a href={s.url} target="_blank" rel="noopener" class="text-xs text-emerald-400 hover:underline bg-white/5 px-2 py-1 rounded">{s.name}</a>
			{/each}
		</div>
	</div>
</section>

<!-- ==================== FUENTES ==================== -->
<section id="fuentes" class="py-20 bg-white">
	<div class="max-w-6xl mx-auto px-6">
		<h2 class="text-4xl font-bold text-slate-900 font-title mb-2">Fuentes y Referencias</h2>
		<div class="w-16 h-1 bg-cherry-500 rounded-full mb-4"></div>
		<p class="text-slate-600 mb-8">Todas las fuentes utilizadas en esta página, organizadas por categoría. Cada dato presentado tiene su fuente verificable.</p>

		<div class="space-y-8">
			{#each mainSources as category}
				<div>
					<h3 class="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
						<div class="w-2 h-2 bg-cherry-500 rounded-full"></div>
						{category.category}
					</h3>
					<div class="grid md:grid-cols-2 gap-2">
						{#each category.sources as src}
							<a
								href={src.url}
								target="_blank"
								rel="noopener"
								class="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-cherry-50 hover:border-cherry-200 transition-colors group"
							>
								<svg class="w-4 h-4 text-slate-400 group-hover:text-cherry-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
								</svg>
								<span class="text-sm text-slate-700 group-hover:text-cherry-700">{src.name}</span>
							</a>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ==================== FOOTER ==================== -->
<footer class="bg-white border-t border-slate-200 py-10">
	<div class="max-w-6xl mx-auto px-6">
		<div class="flex flex-col md:flex-row items-center justify-between gap-6">
			<div class="flex items-center gap-3">
				<img src="https://parlamento.ai/brand/logo-orb-and-name.svg" alt="Parlamento.ai" class="h-6" />
			</div>
			<div class="text-center md:text-right">
				<p class="text-sm text-slate-700 mb-1">
					Documento de investigacion. Fuentes oficiales verificables.
				</p>
				<p class="text-xs text-slate-400">
					Ultima actualizacion: Marzo 2026. Este sitio es informativo y no representa posicion oficial de ninguna institucion.
				</p>
			</div>
		</div>
		<div class="mt-6 pt-6 border-t border-slate-100 text-center">
			<p class="text-xs text-slate-400">Asistente inteligente de monitoreo legislativo</p>
		</div>
	</div>
</footer>

</main>

<style>
	:global(html) {
		scroll-behavior: smooth;
		scroll-padding-top: 3.5rem;
	}
	:global(body) {
		font-family: 'Public Sans', system-ui, sans-serif;
	}
</style>
