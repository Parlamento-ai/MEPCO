// ============================================================
// MEPCO DATA - Todas las fuentes están verificadas y citadas
// ============================================================

export interface TimelineEvent {
	date: string;
	law: string;
	title: string;
	description: string;
	source: string;
	sourceUrl: string;
	type: 'creation' | 'modification' | 'crisis' | 'predecessor';
}

export interface FiscalData {
	year: string;
	amount: number; // millones USD, positivo = ingreso fiscal, negativo = costo
	source: string;
	sourceUrl: string;
}

export interface FuelPriceData {
	year: number;
	gasolina93: number | null; // CLP/litro promedio anual
	gasolina97: number | null;
	diesel: number | null;
	source: string;
	sourceUrl: string;
}

export interface OilPriceData {
	year: number;
	wti: number;
	brent: number;
	source: string;
	sourceUrl: string;
}

export interface CountryComparison {
	country: string;
	flag: string;
	mechanism: string;
	type: string;
	autoOrDiscretionary: string;
	maxAdjustment: string;
	fiscalSustainability: string;
	socialTargeting: string;
	rating: 'success' | 'partial' | 'mixed' | 'failed' | 'catastrophic';
	description: string;
	details: string[];
	sources: { name: string; url: string }[];
}

// ============================================================
// LÍNEA DE TIEMPO - EVOLUCIÓN LEGISLATIVA
// ============================================================

export const timeline: TimelineEvent[] = [
	{
		date: '1991',
		law: 'Ley 19.030',
		title: 'Creación del FEPP',
		description:
			'Se crea el Fondo de Estabilización de Precios del Petróleo (FEPP) tras la Crisis del Golfo. Cubría 6 combustibles con bandas de ±12.5% sobre un precio de referencia intermedio.',
		source: 'CNE - FEPP',
		sourceUrl: 'https://www.cne.cl/en/tarificacion/hidrocarburos/fondo-de-estabilizacion-de-precios-del-petroleo-fepp/',
		type: 'predecessor'
	},
	{
		date: '2005',
		law: 'Ley 20.063',
		title: 'Reducción del FEPP',
		description:
			'Se eliminan gasolina, diésel, kerosene y GLP de la cobertura del FEPP, que queda cubriendo solo combustibles industriales.',
		source: 'CNE - FEPP',
		sourceUrl: 'https://www.cne.cl/en/tarificacion/hidrocarburos/fondo-de-estabilizacion-de-precios-del-petroleo-fepp/',
		type: 'predecessor'
	},
	{
		date: 'Febrero 2011',
		law: 'Ley 20.493',
		title: 'Creación del SIPCO',
		description:
			'Se crea el Sistema de Protección al Contribuyente (SIPCO) con bandas de ±12.5%. Cubría gasolina, diésel, GLP y GNC vehicular. Usaba WTI como referencia. El FEPP se restringe solo a kerosene doméstico.',
		source: 'CNE - SIPCO',
		sourceUrl: 'https://www.cne.cl/en/tarificacion/hidrocarburos/sipco/',
		type: 'predecessor'
	},
	{
		date: 'Julio 2014',
		law: 'Ley 20.765',
		title: 'Creación del MEPCO',
		description:
			'Se establece el Mecanismo de Estabilización de Precios de los Combustibles, reemplazando al SIPCO. Bandas reducidas a ±5%. Ajustes semanales. Funciona mediante modificación del componente variable del Impuesto Específico a los Combustibles (IEC).',
		source: 'BCN Ley Chile',
		sourceUrl: 'https://www.bcn.cl/leychile/Navegar?idNorma=1064172',
		type: 'creation'
	},
	{
		date: 'Agosto 2014',
		law: 'DS 1.119 (Hacienda)',
		title: 'Reglamento del MEPCO',
		description:
			'Se publica el reglamento que implementa el MEPCO, detallando los parámetros de cálculo, plazos y procedimientos.',
		source: 'Ministerio de Hacienda',
		sourceUrl: 'https://www.hacienda.cl/areas-de-trabajo/politicas-macroeconomicas/mepco',
		type: 'modification'
	},
	{
		date: 'Abril 2022',
		law: 'Ley 21.443',
		title: 'Aumento del límite del fondo',
		description:
			'Se eleva el límite máximo del fondo a US$1.500 millones (desde US$750M) debido a la crisis energética global.',
		source: 'Microjuris',
		sourceUrl: 'https://aldiachile.microjuris.com/2022/04/22/ley-no-21-443-extiende-la-cobertura-del-mecanismo-de-estabilizacion-de-precios-de-los-combustibles/',
		type: 'modification'
	},
	{
		date: 'Junio 2022',
		law: 'Ley 21.465',
		title: 'Duplicación del límite',
		description:
			'Se duplica el límite a US$3.000 millones por el shock de precios del petróleo causado por la guerra Rusia-Ucrania.',
		source: 'BCN Ley Chile',
		sourceUrl: 'https://www.bcn.cl/leychile/navegar?idNorma=1177303',
		type: 'crisis'
	},
	{
		date: 'Diciembre 2022',
		law: 'Ley 20.794 + DS 1.790',
		title: 'Diferenciación por octanaje',
		description:
			'Se introducen tasas diferenciadas del componente variable del impuesto para gasolinas según nivel de octanaje (93, 95, 97).',
		source: 'Fastcheck',
		sourceUrl: 'https://www.fastcheck.cl/2026/03/23/radiografia-al-mepco-que-es-el-impuesto-especifico-y-como-se-usa-para-estabilizar-el-precio-de-la-bencina/',
		type: 'modification'
	},
	{
		date: 'Enero 2023',
		law: 'Ley 21.537',
		title: 'Reforma de frecuencia y rangos',
		description:
			'Ajustes pasan de semanales a cada 21 días. Rango de baja se amplía de $27 a $36/litro. Se congela precio del diésel hasta abril 2023. Cambios máximos en diésel de 0.25 UTM/m³ cada 21 días hasta abril 2024.',
		source: 'Microjuris',
		sourceUrl: 'https://aldiachile.microjuris.com/2023/01/24/ley-no-21-537-modifica-el-mecanismo-de-estabilizacion-de-precios-de-los-combustibles-para-evitar-fluctuaciones-semanales/',
		type: 'modification'
	},
	{
		date: 'Marzo 2026',
		law: 'DS 103 Exento (Hacienda)',
		title: 'Cambio de ventana de cálculo',
		description:
			'Se cambia la ventana de cálculo del precio de paridad a 4 semanas para todos los combustibles (antes: 21 semanas gasolina, 14 diésel, 37 GLP). Gasolina 93 sube $370/litro y diésel $580/litro.',
		source: 'BioBioChile',
		sourceUrl: 'https://www.biobiochile.cl/noticias/economia/actualidad-economica/2026/03/23/gobierno-cambia-parametro-del-mepco-para-el-calculo-de-precio-de-los-combustibles.shtml',
		type: 'crisis'
	}
];

// ============================================================
// IMPACTO FISCAL ANUAL DEL MEPCO (Millones USD)
// Positivo = Ingreso fiscal | Negativo = Costo fiscal
// ============================================================

export const fiscalData: FiscalData[] = [
	{ year: '2014', amount: 107, source: 'La Tercera / OCEC UDP', sourceUrl: 'https://www.latercera.com/pulso/noticia/costo-fiscal-del-mepco-supera-los-us2000-millones-desde-su-creacion-en-2014/' },
	{ year: '2015', amount: -88, source: 'La Tercera / OCEC UDP', sourceUrl: 'https://www.latercera.com/pulso/noticia/costo-fiscal-del-mepco-supera-los-us2000-millones-desde-su-creacion-en-2014/' },
	{ year: '2016', amount: -79, source: 'La Tercera / OCEC UDP', sourceUrl: 'https://www.latercera.com/pulso/noticia/costo-fiscal-del-mepco-supera-los-us2000-millones-desde-su-creacion-en-2014/' },
	{ year: '2017', amount: -61, source: 'La Tercera / OCEC UDP', sourceUrl: 'https://www.latercera.com/pulso/noticia/costo-fiscal-del-mepco-supera-los-us2000-millones-desde-su-creacion-en-2014/' },
	{ year: '2018', amount: -23, source: 'La Tercera / OCEC UDP', sourceUrl: 'https://www.latercera.com/pulso/noticia/costo-fiscal-del-mepco-supera-los-us2000-millones-desde-su-creacion-en-2014/' },
	{ year: '2019', amount: 102, source: 'La Tercera / OCEC UDP', sourceUrl: 'https://www.latercera.com/pulso/noticia/costo-fiscal-del-mepco-supera-los-us2000-millones-desde-su-creacion-en-2014/' },
	{ year: '2020', amount: 410, source: 'La Tercera / OCEC UDP', sourceUrl: 'https://www.latercera.com/pulso/noticia/costo-fiscal-del-mepco-supera-los-us2000-millones-desde-su-creacion-en-2014/' },
	{ year: '2021', amount: -738, source: 'La Tercera / OCEC UDP', sourceUrl: 'https://www.latercera.com/pulso/noticia/costo-fiscal-del-mepco-supera-los-us2000-millones-desde-su-creacion-en-2014/' },
	{ year: '2022', amount: -2376, source: 'La Tercera / OCEC UDP', sourceUrl: 'https://www.latercera.com/pulso/noticia/costo-fiscal-del-mepco-supera-los-us2000-millones-desde-su-creacion-en-2014/' },
	{ year: '2023', amount: 417, source: 'La Tercera / OCEC UDP', sourceUrl: 'https://www.latercera.com/pulso/noticia/costo-fiscal-del-mepco-supera-los-us2000-millones-desde-su-creacion-en-2014/' },
	{ year: '2024', amount: 72, source: 'La Tercera / OCEC UDP', sourceUrl: 'https://www.latercera.com/pulso/noticia/costo-fiscal-del-mepco-supera-los-us2000-millones-desde-su-creacion-en-2014/' },
	{ year: '2025', amount: 114, source: 'La Tercera / OCEC UDP', sourceUrl: 'https://www.latercera.com/pulso/noticia/costo-fiscal-del-mepco-supera-los-us2000-millones-desde-su-creacion-en-2014/' },
	{ year: '2026*', amount: -140, source: 'La Tercera (ene-mar 19)', sourceUrl: 'https://www.latercera.com/pulso/noticia/costo-fiscal-del-mepco-supera-los-us2000-millones-desde-su-creacion-en-2014/' }
];

// ============================================================
// PRECIOS DE COMBUSTIBLES EN CHILE (CLP/litro)
// ============================================================

export const fuelPrices: FuelPriceData[] = [
	{ year: 2014, gasolina93: 858, gasolina97: 948, diesel: 620, source: 'El Mostrador', sourceUrl: 'https://www.elmostrador.cl/dia/2020/01/23/decima-semana-consecutivas-de-alzas-precio-de-la-bencina-de-93-octanos-alcanza-su-mayor-valor-en-5-anos/' },
	{ year: 2015, gasolina93: 780, gasolina97: 870, diesel: 560, source: 'GlobalPetrolPrices', sourceUrl: 'https://www.globalpetrolprices.com/Chile/gasoline_prices/' },
	{ year: 2016, gasolina93: 708, gasolina97: 800, diesel: 490, source: 'GlobalPetrolPrices', sourceUrl: 'https://www.globalpetrolprices.com/Chile/gasoline_prices/' },
	{ year: 2017, gasolina93: 745, gasolina97: 835, diesel: 520, source: 'GlobalPetrolPrices', sourceUrl: 'https://www.globalpetrolprices.com/Chile/gasoline_prices/' },
	{ year: 2018, gasolina93: 790, gasolina97: 880, diesel: 570, source: 'GlobalPetrolPrices', sourceUrl: 'https://www.globalpetrolprices.com/Chile/gasoline_prices/' },
	{ year: 2019, gasolina93: 810, gasolina97: 900, diesel: 580, source: 'GlobalPetrolPrices', sourceUrl: 'https://www.globalpetrolprices.com/Chile/gasoline_prices/' },
	{ year: 2020, gasolina93: 706, gasolina97: 780, diesel: 500, source: 'La Tercera', sourceUrl: 'https://www.latercera.com/pulso/noticia/bencina-de-93-octanos-queda-al-borde-de-los-700-promedio-en-la-region-metropolitana/CNI6RDUCXZAHPDNU2F5DROBINA/' },
	{ year: 2021, gasolina93: 1025, gasolina97: 1074, diesel: 814, source: 'Emol', sourceUrl: 'https://www.emol.com/noticias/Economia/2022/01/04/1042848/bencinas-2021.html' },
	{ year: 2022, gasolina93: 1164, gasolina97: 1250, diesel: 1100, source: 'La Tercera', sourceUrl: 'https://www.latercera.com/pulso/noticia/consumo-de-combustibles-en-el-pais-cayo-en-2023-por-primera-vez-desde-la-pandemia-por-mayores-precios/YBKNPF3GD5H4BCUT7QFCP5DINE/' },
	{ year: 2023, gasolina93: 1226, gasolina97: 1313, diesel: 1040, source: 'La Tercera', sourceUrl: 'https://www.latercera.com/pulso/noticia/consumo-de-combustibles-en-el-pais-cayo-en-2023-por-primera-vez-desde-la-pandemia-por-mayores-precios/YBKNPF3GD5H4BCUT7QFCP5DINE/' },
	{ year: 2024, gasolina93: 1227, gasolina97: 1310, diesel: 1020, source: 'GlobalPetrolPrices', sourceUrl: 'https://www.globalpetrolprices.com/Chile/gasoline_prices/' },
	{ year: 2025, gasolina93: 1083, gasolina97: 1133, diesel: 831, source: 'OCEC UDP', sourceUrl: 'https://ocec.udp.cl/proyecto/brujula-macroeconomica-n40-operacion-del-mepco-en-el-cuarto-trimestre-2025-e-inicios-de-2026/' }
];

// ============================================================
// PRECIOS INTERNACIONALES DEL PETRÓLEO (USD/barril)
// ============================================================

export const oilPrices: OilPriceData[] = [
	{ year: 2014, wti: 93, brent: 99, source: 'EIA / Statista', sourceUrl: 'https://www.eia.gov/dnav/pet/hist/rwtca.htm' },
	{ year: 2015, wti: 49, brent: 52, source: 'EIA', sourceUrl: 'https://www.eia.gov/dnav/pet/hist/rwtca.htm' },
	{ year: 2016, wti: 43, brent: 44, source: 'EIA', sourceUrl: 'https://www.eia.gov/dnav/pet/hist/rwtca.htm' },
	{ year: 2017, wti: 51, brent: 54, source: 'EIA', sourceUrl: 'https://www.eia.gov/dnav/pet/hist/rwtca.htm' },
	{ year: 2018, wti: 65, brent: 71, source: 'EIA', sourceUrl: 'https://www.eia.gov/dnav/pet/hist/rwtca.htm' },
	{ year: 2019, wti: 57, brent: 64, source: 'EIA', sourceUrl: 'https://www.eia.gov/dnav/pet/hist/rwtca.htm' },
	{ year: 2020, wti: 39, brent: 42, source: 'EIA', sourceUrl: 'https://www.eia.gov/dnav/pet/hist/rwtca.htm' },
	{ year: 2021, wti: 68, brent: 71, source: 'EIA', sourceUrl: 'https://www.eia.gov/dnav/pet/hist/rwtca.htm' },
	{ year: 2022, wti: 95, brent: 99, source: 'EIA', sourceUrl: 'https://www.eia.gov/dnav/pet/hist/rwtca.htm' },
	{ year: 2023, wti: 78, brent: 82, source: 'EIA', sourceUrl: 'https://www.eia.gov/todayinenergy/detail.php?id=64144' },
	{ year: 2024, wti: 77, brent: 80, source: 'EIA', sourceUrl: 'https://www.eia.gov/todayinenergy/detail.php?id=64144' },
	{ year: 2025, wti: 70, brent: 72, source: 'PrecioPetroleo.net', sourceUrl: 'https://www.preciopetroleo.net/' }
];

// ============================================================
// COMPOSICIÓN DEL PRECIO (por cada $100 del precio)
// ============================================================

export const priceComposition = {
	gasolina93: {
		impuestos: 46,
		precioReferencia: 48,
		margenComercial: 6,
		source: 'OCEC UDP - Brújula Macroeconómica N.40',
		sourceUrl: 'https://ocec.udp.cl/proyecto/brujula-macroeconomica-n40-operacion-del-mepco-en-el-cuarto-trimestre-2025-e-inicios-de-2026/'
	},
	diesel: {
		impuestos: 27,
		precioReferencia: 63,
		margenComercial: 10,
		source: 'OCEC UDP - Brújula Macroeconómica N.40',
		sourceUrl: 'https://ocec.udp.cl/proyecto/brujula-macroeconomica-n40-operacion-del-mepco-en-el-cuarto-trimestre-2025-e-inicios-de-2026/'
	}
};

// ============================================================
// COMPONENTES DEL IMPUESTO ESPECÍFICO (UTM/m³)
// ============================================================

export const taxComponents = {
	base: [
		{ fuel: 'Gasolina 93', base: 6.0, unit: 'UTM/m³' },
		{ fuel: 'Gasolina 97', base: 6.0, unit: 'UTM/m³' },
		{ fuel: 'Diésel', base: 1.5, unit: 'UTM/m³' },
		{ fuel: 'GLP vehicular', base: 1.4, unit: 'UTM/m³' },
		{ fuel: 'GNC', base: 1.93, unit: 'UTM/1.000m³' }
	],
	source: 'SII - Impuesto al petróleo',
	sourceUrl: 'https://www.sii.cl/valores_y_fechas/mepco/mepco2025.htm'
};

// ============================================================
// PRECIOS POR REGIÓN (Marzo 2026, pre-shock, CLP/litro)
// ============================================================

export const regionalPrices = {
	data: [
		{ region: 'Arica y Parinacota', oct93: 1266, oct95: 1298, oct97: 1322 },
		{ region: 'Tarapacá', oct93: 1254, oct95: 1286, oct97: 1312 },
		{ region: 'Antofagasta', oct93: 1262, oct95: 1296, oct97: 1323 },
		{ region: 'Atacama', oct93: 1238, oct95: 1269, oct97: 1297 },
		{ region: 'Coquimbo', oct93: 1217, oct95: 1249, oct97: 1276 },
		{ region: 'Valparaíso', oct93: 1201, oct95: 1234, oct97: 1262 },
		{ region: 'Metropolitana', oct93: 1169, oct95: 1210, oct97: 1244 },
		{ region: "O'Higgins", oct93: 1193, oct95: 1224, oct97: 1251 },
		{ region: 'Maule', oct93: 1190, oct95: 1221, oct97: 1248 },
		{ region: 'Ñuble', oct93: 1187, oct95: 1218, oct97: 1245 },
		{ region: 'Biobío', oct93: 1188, oct95: 1220, oct97: 1247 },
		{ region: 'La Araucanía', oct93: 1201, oct95: 1232, oct97: 1259 },
		{ region: 'Los Ríos', oct93: 1209, oct95: 1241, oct97: 1268 },
		{ region: 'Los Lagos', oct93: 1221, oct95: 1253, oct97: 1281 },
		{ region: 'Aysén', oct93: 1290, oct95: 1315, oct97: 1337 },
		{ region: 'Magallanes', oct93: 1215, oct95: 1245, oct97: 1270 }
	],
	source: 'Pauta.cl',
	sourceUrl: 'https://www.pauta.cl/dato-en-pauta/2026/03/24/aumento-de-combustible-revisa-cuanto-costara-llenar-el-estanque-y-los-nuevos-precios-por-region.html'
};

// ============================================================
// VENTANAS DE CÁLCULO DEL PRECIO DE PARIDAD
// ============================================================

export const calculationWindows = {
	before: [
		{ fuel: 'Gasolina 93 y 97', weeks: 21 },
		{ fuel: 'Diésel', weeks: 14 },
		{ fuel: 'GLP', weeks: 37 }
	],
	after: [
		{ fuel: 'Todos los combustibles', weeks: 4 }
	],
	source: 'BioBioChile',
	sourceUrl: 'https://www.biobiochile.cl/noticias/economia/actualidad-economica/2026/03/23/gobierno-cambia-parametro-del-mepco-para-el-calculo-de-precio-de-los-combustibles.shtml'
};

// ============================================================
// COMPARACIÓN INTERNACIONAL
// ============================================================

export const countryComparisons: CountryComparison[] = [
	{
		country: 'Chile',
		flag: '🇨🇱',
		mechanism: 'MEPCO',
		type: 'Ajuste tributario',
		autoOrDiscretionary: 'Automático (reglas)',
		maxAdjustment: '2.4% por ciclo',
		fiscalSustainability: 'Moderada',
		socialTargeting: 'No (universal)',
		rating: 'success',
		description: 'Modifica el componente variable del Impuesto Específico a los Combustibles (IEC). Cuando el precio internacional sube, el impuesto baja; cuando baja, el impuesto sube.',
		details: [
			'Costo fiscal acumulado (2014-2026): US$2.194 millones',
			'Excluyendo 2022 (guerra Rusia-Ucrania), el sistema ha generado ingresos netos para el fisco',
			'Máximo alza: 2.4% por ciclo de ajuste',
			'Crisis marzo 2026: costo semanal de ~US$200 millones'
		],
		sources: [
			{ name: 'Ministerio de Hacienda', url: 'https://www.hacienda.cl/areas-de-trabajo/politicas-macroeconomicas/mepco' },
			{ name: 'La Tercera - Costo fiscal', url: 'https://www.latercera.com/pulso/noticia/costo-fiscal-del-mepco-supera-los-us2000-millones-desde-su-creacion-en-2014/' }
		]
	},
	{
		country: 'Colombia',
		flag: '🇨🇴',
		mechanism: 'FEPC',
		type: 'Fondo de subsidio directo',
		autoOrDiscretionary: 'Semiautomático',
		maxAdjustment: '3% mensual (gasolina)',
		fiscalSustainability: 'Pobre',
		socialTargeting: 'No (50% va al 10% más rico)',
		rating: 'partial',
		description: 'Fondo que paga la diferencia entre precio internacional y precio regulado. Administrado por el Ministerio de Hacienda y Crédito Público.',
		details: [
			'Gasto acumulado 2022-2025: COP 79.6 billones (~US$19.180 millones), equivalente a 4.39% del PIB',
			'El déficit fiscal central llegó a 6.7% del PIB en 2024 (mayor en 30 años excluyendo pandemia)',
			'El diésel representa ~85% del problema del déficit',
			'El gobierno tuvo que suspender su regla fiscal por tres años'
		],
		sources: [
			{ name: 'Finance Colombia', url: 'https://www.financecolombia.com/gasoline-diesel-prices-in-colombia-looking-at-the-fepc-and-the-future-of-subsidies/' },
			{ name: 'Colombia One', url: 'https://colombiaone.com/2025/02/03/colombia-fuel-price-hike/' }
		]
	},
	{
		country: 'Perú',
		flag: '🇵🇪',
		mechanism: 'FEPC',
		type: 'Bandas de precio con fondo',
		autoOrDiscretionary: 'Semiautomático',
		maxAdjustment: '5% bimensual',
		fiscalSustainability: 'Pobre (colapsando)',
		socialTargeting: 'Parcial',
		rating: 'partial',
		description: 'Sistema de bandas con techo y piso. Cuando el precio internacional supera el techo, el fondo subsidia la diferencia.',
		details: [
			'Deuda acumulada: ~S/1.000 millones',
			'En 2025, tres empresas que representan 65% del mercado (Petroperú, Repsol, Pluspetrol) se retiraron del mecanismo',
			'Subsidios fiscales llegaron a 1.4% del PIB en 2008',
			'El gobierno trabaja en reestructuración del sistema'
		],
		sources: [
			{ name: 'IPE - FEPC', url: 'https://www.ipe.org.pe/portal/fondo-de-estabilizacion-de-los-precios-de-los-combustibles/' },
			{ name: 'El Comercio', url: 'https://elcomercio.pe/economia/peru/el-fondo-de-estabilizacion-de-precios-de-los-combustibles-se-desintegra-las-razones-y-si-es-que-impactara-en-los-precios-noticia/' }
		]
	},
	{
		country: 'México',
		flag: '🇲🇽',
		mechanism: 'IEPS Variable',
		type: 'Ajuste tributario',
		autoOrDiscretionary: 'Discrecional semanal',
		maxAdjustment: 'Hasta ~100% reducción',
		fiscalSustainability: 'Moderada-Pobre',
		socialTargeting: 'No (universal)',
		rating: 'success',
		description: 'Similar al MEPCO chileno. Usa estímulos fiscales (descuentos al IEPS) para reducir el impuesto cuando los precios internacionales suben.',
		details: [
			'Muy similar conceptualmente al MEPCO de Chile',
			'En 2022, la recaudación del IEPS resultó en pérdida neta de MX$88.590 millones',
			'El FMI lo ha criticado como "mayormente no focalizado"',
			'Marzo 2026: estímulo de 24% en Magna, 7.5% en Premium, 62% en Diésel'
		],
		sources: [
			{ name: 'El Financiero', url: 'https://www.elfinanciero.com.mx/economia/2026/03/21/precio-de-la-gasolina-como-quedan-los-estimulos-fiscales-a-los-combustibles/' },
			{ name: 'Mexico Business News', url: 'https://mexicobusiness.news/oilandgas/news/fuel-subsidies-cost-government-mx8859-billion' }
		]
	},
	{
		country: 'Europa (2022)',
		flag: '🇪🇺',
		mechanism: 'Rebajas temporales de impuestos',
		type: 'Recortes impositivos de emergencia',
		autoOrDiscretionary: 'Emergencia/temporal',
		maxAdjustment: 'Variable por país',
		fiscalSustainability: 'Buena (temporal)',
		socialTargeting: 'No (universal)',
		rating: 'success',
		description: 'Múltiples países europeos aplicaron recortes temporales de impuestos a combustibles tras la invasión de Ucrania. Francia: €0.15/L; España: €0.20/L; Alemania: recorte de impuesto especial.',
		details: [
			'Pass-through a consumidores del 101% en Suecia (consumidores recibieron más que el recorte completo)',
			'Las medidas fueron temporales y acotadas fiscalmente',
			'Un estudio de Nature Energy encontró que los recortes parcialmente beneficiaron a Rusia al sostener la demanda',
			'La naturaleza temporal fue clave para la sostenibilidad fiscal'
		],
		sources: [
			{ name: 'Euronews', url: 'https://www.euronews.com/green/2022/03/16/from-tax-cuts-to-speed-limits-how-european-governments-are-trying-to-are-trying-to-cut-fue' },
			{ name: 'Nature Energy', url: 'https://www.nature.com/articles/s41560-022-01122-6' },
			{ name: 'ScienceDirect - Pass-through', url: 'https://www.sciencedirect.com/science/article/abs/pii/S0301421523004184' }
		]
	},
	{
		country: 'Indonesia (2014)',
		flag: '🇮🇩',
		mechanism: 'Reforma gradual + transferencias',
		type: 'Eliminación gradual + protección social',
		autoOrDiscretionary: 'Semiautomático (suspendido)',
		maxAdjustment: '34% (puntual 2014)',
		fiscalSustainability: 'Buena',
		socialTargeting: 'Sí (transferencias directas)',
		rating: 'success',
		description: 'Modelo de referencia mundial. Jokowi subió precios 34% y eliminó subsidio a gasolina en 2015, redirigiendo los ahorros a programas sociales. Ahorro: US$15.600 millones.',
		details: [
			'Considerado el "estándar de oro" para reforma de subsidios',
			'Ahorros de IDR 211 billones (US$15.600 millones) = 10% del gasto total del gobierno',
			'Recursos redirigidos a salud (Kartu Sehat), educación (Kartu Pintar) e infraestructura',
			'Aprovechó precios bajos del petróleo para minimizar el impacto',
			'Post-2017: ajustes automáticos suspendidos; subsidios subieron a 2.8% del PIB en 2022'
		],
		sources: [
			{ name: 'World Bank - Indonesia Reforms', url: 'https://documents1.worldbank.org/curated/en/099748505212431959/pdf/IDU1e31e5e531f16114baa1b62c1b3201c9c2e68.pdf' },
			{ name: 'IISD - Indonesia Action Plan', url: 'https://www.iisd.org/publications/report/indonesias-fuel-subsidies-action-plan-reform' }
		]
	},
	{
		country: 'Uruguay',
		flag: '🇺🇾',
		mechanism: 'PPI + precio administrado',
		type: 'Precio fijado por gobierno',
		autoOrDiscretionary: 'Discrecional',
		maxAdjustment: 'N/A (administrativo)',
		fiscalSustainability: 'Moderada (sobreprecio)',
		socialTargeting: 'No',
		rating: 'partial',
		description: 'ANCAP (monopolio estatal) fija precios usando el Precio de Paridad de Importación (PPI). No tiene fondo de estabilización automático, aunque lo ha propuesto citando el MEPCO chileno como modelo.',
		details: [
			'Sobreprecio estimado de US$88 millones entre marzo-diciembre 2025',
			'ANCAP propuso un fondo tipo MEPCO, rechazado en 2021, reconsiderado en 2025-2026',
			'Sistema discrecional = precios influidos políticamente',
			'URSEA calcula el PPI de referencia'
		],
		sources: [
			{ name: 'El Observador - Fondo estabilización', url: 'https://www.elobservador.com.uy/economia-y-empresas/combustibles-fondo-estabilizar-precios-nafta-y-gasoil-vuelve-la-agenda-del-gobierno-n6000744' },
			{ name: 'El Observador - Sobreprecio', url: 'https://www.elobservador.com.uy/economia-y-empresas/combustibles-los-uruguayos-pagaron-un-sobreprecio-us-88-millones-marzo-y-diciembre-2025-n6031031' }
		]
	},
	{
		country: 'Venezuela',
		flag: '🇻🇪',
		mechanism: 'Gasolina casi gratuita',
		type: 'Subsidio total',
		autoOrDiscretionary: 'Discrecional',
		maxAdjustment: 'N/A',
		fiscalSustainability: 'Catastrófica',
		socialTargeting: 'Inverso (beneficia a quienes tienen auto)',
		rating: 'catastrophic',
		description: 'Durante décadas mantuvo la gasolina más barata del mundo. El subsidio costaba ~US$26.000 millones anuales. PDVSA colapsó: producción cayó de 2.6M a 527K barriles/día.',
		details: [
			'Precio: US$0.10 por los primeros 120 litros/mes (requiere "Carnet de la Patria")',
			'~18.000 empleados experimentados de PDVSA despedidos y reemplazados por leales políticos',
			'Refinerías operando al 20% de capacidad',
			'Gasolina barata masivamente contrabandeada a Colombia y Brasil',
			'Escasez crónica: colas de días para cargar combustible a pesar de tener las mayores reservas del mundo'
		],
		sources: [
			{ name: 'Wikipedia - Fuel Shortages in Venezuela', url: 'https://en.wikipedia.org/wiki/Fuel_shortages_in_Venezuela' },
			{ name: 'CFR - Venezuela Rise and Fall', url: 'https://www.cfr.org/backgrounders/venezuela-crisis' }
		]
	},
	{
		country: 'Nigeria (2023)',
		flag: '🇳🇬',
		mechanism: 'Eliminación abrupta de subsidio',
		type: 'Shock de precio',
		autoOrDiscretionary: 'Puntual',
		maxAdjustment: '165-181% de un día para otro',
		fiscalSustainability: 'Mejoró, pero costo social devastador',
		socialTargeting: 'Ninguna implementada',
		rating: 'failed',
		description: 'El presidente Tinubu eliminó todos los subsidios de golpe el 31 de mayo de 2023. Precio subió de N185 a N617/litro instantáneamente.',
		details: [
			'Costos de transporte subieron ~300%',
			'Banco Mundial proyectó que 4 de cada 10 nigerianos caerían bajo la línea de pobreza a fines de 2024',
			'73% de encuestados dijo que la eliminación aumentó sus gastos',
			'Sin transferencias monetarias ni redes de protección social previas o simultáneas'
		],
		sources: [
			{ name: 'The Conversation', url: 'https://theconversation.com/nigerias-fuel-subsidy-removal-was-too-sudden-why-a-gradual-approach-would-have-been-better-222224' },
			{ name: 'Al Jazeera', url: 'https://www.aljazeera.com/news/2023/5/31/nigeria-fuel-subsidy-cut-spiralling-costs-all-you-need-to-know' }
		]
	},
	{
		country: 'Ecuador (2019)',
		flag: '🇪🇨',
		mechanism: 'Eliminación abrupta de subsidio (3 intentos)',
		type: 'Shock de precio',
		autoOrDiscretionary: 'Puntual',
		maxAdjustment: '25-100%+ de un día para otro',
		fiscalSustainability: 'N/A (revertido cada vez)',
		socialTargeting: 'Ninguna entregada',
		rating: 'failed',
		description: 'Tres intentos de eliminar subsidios (2019, 2022, 2025), los tres generaron protestas masivas y fueron revertidos.',
		details: [
			'2019: Gasolina +25%, diésel duplicado. 12 días de protestas violentas, 7 muertos, gobierno huyó de Quito',
			'2022: Nuevo intento casi derrocó al presidente Lasso',
			'2025: Eliminación del subsidio al diésel generó nuevo "Paro Nacional"',
			'Expertos: faltó gradualidad, compensación y consulta'
		],
		sources: [
			{ name: 'NPR', url: 'https://www.npr.org/2019/10/14/770104729/ecuador-reaches-fuel-subsidy-deal-to-end-violent-protests' },
			{ name: 'IISD', url: 'https://www.iisd.org/articles/lesson-ecuador-fossil-fuel-subsidies' }
		]
	},
	{
		country: 'Irán (2019)',
		flag: '🇮🇷',
		mechanism: 'Alza abrupta de precios',
		type: 'Shock de precio',
		autoOrDiscretionary: 'Puntual',
		maxAdjustment: '50-300% overnight',
		fiscalSustainability: 'N/A (protestas)',
		socialTargeting: 'Prometida pero no entregada previamente',
		rating: 'failed',
		description: 'Alza de 50% en primeros 60 litros y 300% en exceso, anunciada a medianoche sin aviso previo. Generó las protestas más violentas desde la Revolución de 1979.',
		details: [
			'Protestas en más de 100 ciudades en horas',
			'Entre 304 y 1.500 muertos (Amnistía Internacional / Reuters)',
			'7.000 detenidos',
			'Apagón total de internet por 6 días',
			'El gobierno no volvió a subir precios por 6 años'
		],
		sources: [
			{ name: 'Wikipedia - 2019 Iranian Protests', url: 'https://en.wikipedia.org/wiki/2019%E2%80%932020_Iranian_protests' },
			{ name: 'Human Rights Watch', url: 'https://www.hrw.org/news/2020/11/17/iran-no-justice-bloody-2019-crackdown' }
		]
	},
	{
		country: 'Argentina',
		flag: '🇦🇷',
		mechanism: 'Congelamiento de precios',
		type: 'Control rígido de precios',
		autoOrDiscretionary: 'Discrecional',
		maxAdjustment: '0% (congelamiento)',
		fiscalSustainability: 'Pobre (genera desabastecimiento)',
		socialTargeting: 'No',
		rating: 'failed',
		description: 'Precio fijo del petróleo doméstico en US$56/barril (vs US$86 internacional) y congelamiento de precios al consumidor.',
		details: [
			'"La escasez de combustible más aguda en años" con estaciones vacías y colas de horas',
			'Empresas vendían en bomba por debajo del precio de compra',
			'120.000 m³ de combustible importado varado en el mar por falta de dólares',
			'Cuando el control se rompió, alzas de 7.6-9.6% en un solo día'
		],
		sources: [
			{ name: 'OilPrice.com', url: 'https://oilprice.com/Energy/Gas-Prices/Argentinas-Energy-Crisis-Escalates-As-Fuel-Prices-Skyrocket.html' },
			{ name: 'Real Instituto Elcano', url: 'https://www.realinstitutoelcano.org/en/analyses/unravelling-argentinas-economic-maze-raising-prices-to-stop-inflation/' }
		]
	}
];

// ============================================================
// FUENTES PRINCIPALES
// ============================================================

export const mainSources = [
	{ category: 'Fuentes Oficiales del Gobierno', sources: [
		{ name: 'CNE - Mecanismo MEPCO', url: 'https://www.cne.cl/en/tarificacion/hidrocarburos/mecanismo-de-estabilizacion-de-precios-de-los-combustibles-mepco/' },
		{ name: 'Ministerio de Hacienda - MEPCO', url: 'https://www.hacienda.cl/areas-de-trabajo/politicas-macroeconomicas/mepco' },
		{ name: 'BCN Ley Chile - Ley 20.765', url: 'https://www.bcn.cl/leychile/Navegar?idNorma=1064172' },
		{ name: 'SII - Componentes base y variable 2025', url: 'https://www.sii.cl/valores_y_fechas/mepco/mepco2025.htm' },
		{ name: 'ENAP - Estructura de Precios', url: 'https://www.enap.cl/estructura-de-precios' },
		{ name: 'ENAP - Tabla de Precios Paridad Histórico', url: 'https://www.enap.cl/tabla-de-precios-de-paridad-historico' },
		{ name: 'CNE - FEPP', url: 'https://www.cne.cl/en/tarificacion/hidrocarburos/fondo-de-estabilizacion-de-precios-del-petroleo-fepp/' },
		{ name: 'CNE - SIPCO', url: 'https://www.cne.cl/en/tarificacion/hidrocarburos/sipco/' },
		{ name: 'BCN - Ley 21.465', url: 'https://www.bcn.cl/leychile/navegar?idNorma=1177303' }
	]},
	{ category: 'Modificaciones Legales', sources: [
		{ name: 'Microjuris - Ley 21.537', url: 'https://aldiachile.microjuris.com/2023/01/24/ley-no-21-537-modifica-el-mecanismo-de-estabilizacion-de-precios-de-los-combustibles-para-evitar-fluctuaciones-semanales/' },
		{ name: 'Microjuris - Ley 21.443', url: 'https://aldiachile.microjuris.com/2022/04/22/ley-no-21-443-extiende-la-cobertura-del-mecanismo-de-estabilizacion-de-precios-de-los-combustibles/' }
	]},
	{ category: 'Análisis y Reportes', sources: [
		{ name: 'La Tercera - Costo fiscal del MEPCO', url: 'https://www.latercera.com/pulso/noticia/costo-fiscal-del-mepco-supera-los-us2000-millones-desde-su-creacion-en-2014/' },
		{ name: 'OCEC UDP - Brújula Macroeconómica N.40', url: 'https://ocec.udp.cl/proyecto/brujula-macroeconomica-n40-operacion-del-mepco-en-el-cuarto-trimestre-2025-e-inicios-de-2026/' },
		{ name: 'Fastcheck - Radiografía al MEPCO', url: 'https://www.fastcheck.cl/2026/03/23/radiografia-al-mepco-que-es-el-impuesto-especifico-y-como-se-usa-para-estabilizar-el-precio-de-la-bencina/' },
		{ name: 'Fastcheck - Shock de precios', url: 'https://www.fastcheck.cl/2026/03/24/este-jueves-chile-vivira-el-mayor-shock-de-precios-en-combustibles-en-36-anos/' },
		{ name: 'UAH - MEPCO amortiguador', url: 'https://fen.uahurtado.cl/2026/noticias/mepco-en-chile-el-amortiguador-de-la-bencina-que-hoy-cuesta-millones-al-mes/' }
	]},
	{ category: 'Situación Actual (Marzo 2026)', sources: [
		{ name: 'Cooperativa - Alzas de $370 y $580', url: 'https://www.cooperativa.cl/noticias/pais/consumidores/combustibles/cambios-al-mepco-bencinas-subiran-370-pesos-y-diesel-tendra-alza-de-580/2026-03-23/203943.html' },
		{ name: 'BioBioChile - Cambio de parámetro', url: 'https://www.biobiochile.cl/noticias/economia/actualidad-economica/2026/03/23/gobierno-cambia-parametro-del-mepco-para-el-calculo-de-precio-de-los-combustibles.shtml' },
		{ name: 'Emol - Implicancias del decreto', url: 'https://www.emol.com/noticias/Economia/2026/03/23/1195109/ajuste-al-mepco.html' },
		{ name: 'Bloomberg Línea - Cambio parámetros', url: 'https://www.bloomberglinea.com/latinoamerica/chile/precio-de-los-combustibles-en-chile-el-gobierno-cambia-parametros-al-mepco/' },
		{ name: 'Mala Espina Check - Decreto MEPCO', url: 'https://www.malaespinacheck.cl/pais/2026/03/23/que-cambios-establece-el-decreto-que-el-gobierno-ingreso-por-el-mepco/' },
		{ name: 'Radio U. Chile - Debate constitucional', url: 'https://radio.uchile.cl/2026/03/22/choque-por-mepco-entre-defensa-oficialista-al-decreto-y-advertencia-opositora-ante-el-tribunal-constitucional/' }
	]},
	{ category: 'Datos de Precios', sources: [
		{ name: 'GlobalPetrolPrices - Chile Gasolina', url: 'https://www.globalpetrolprices.com/Chile/gasoline_prices/' },
		{ name: 'GlobalPetrolPrices - Chile Diésel', url: 'https://www.globalpetrolprices.com/Chile/diesel_prices/' },
		{ name: 'EIA - Precios WTI', url: 'https://www.eia.gov/dnav/pet/hist/rwtca.htm' },
		{ name: 'EIA - Precios Brent', url: 'https://www.eia.gov/dnav/pet/hist/rbrtem.htm' },
		{ name: 'Pauta.cl - Precios por región', url: 'https://www.pauta.cl/dato-en-pauta/2026/03/24/aumento-de-combustible-revisa-cuanto-costara-llenar-el-estanque-y-los-nuevos-precios-por-region.html' }
	]},
	{ category: 'Comparación Internacional', sources: [
		{ name: 'Finance Colombia - FEPC', url: 'https://www.financecolombia.com/gasoline-diesel-prices-in-colombia-looking-at-the-fepc-and-the-future-of-subsidies/' },
		{ name: 'IPE Perú - FEPC', url: 'https://www.ipe.org.pe/portal/fondo-de-estabilizacion-de-los-precios-de-los-combustibles/' },
		{ name: 'El Financiero - IEPS México', url: 'https://www.elfinanciero.com.mx/economia/2026/03/21/precio-de-la-gasolina-como-quedan-los-estimulos-fiscales-a-los-combustibles/' },
		{ name: 'World Bank - Indonesia Reforms', url: 'https://documents1.worldbank.org/curated/en/099748505212431959/pdf/IDU1e31e5e531f16114baa1b62c1b3201c9c2e68.pdf' },
		{ name: 'IMF - Automatic Fuel Pricing', url: 'https://www.elibrary.imf.org/view/journals/005/2012/003/article-A001-en.xml' },
		{ name: 'IDB - Fuel Price Stabilization', url: 'https://publications.iadb.org/en/proposed-fuel-price-stabilization-mechanism-through-use-financial-derivatives' }
	]},
	{ category: 'Casos Fallidos', sources: [
		{ name: 'CFR - Venezuela Petrostate', url: 'https://www.cfr.org/backgrounders/venezuela-crisis' },
		{ name: 'The Conversation - Nigeria', url: 'https://theconversation.com/nigerias-fuel-subsidy-removal-was-too-sudden-why-a-gradual-approach-would-have-been-better-222224' },
		{ name: 'NPR - Ecuador 2019', url: 'https://www.npr.org/2019/10/14/770104729/ecuador-reaches-fuel-subsidy-deal-to-end-violent-protests' },
		{ name: 'Wikipedia - Iran Protests 2019', url: 'https://en.wikipedia.org/wiki/2019%E2%80%932020_Iranian_protests' },
		{ name: 'OilPrice - Argentina', url: 'https://oilprice.com/Energy/Gas-Prices/Argentinas-Energy-Crisis-Escalates-As-Fuel-Prices-Skyrocket.html' }
	]},
	{ category: 'Análisis Fiscal Detallado', sources: [
		{ name: 'La Tercera - Costo fiscal US$2.000M', url: 'https://www.latercera.com/pulso/noticia/costo-fiscal-del-mepco-supera-los-us2000-millones-desde-su-creacion-en-2014/' },
		{ name: 'PuraNoticia - Estudio OCEC', url: 'https://puranoticia.pnt.cl/negocios/estudio-revela-el-costo-fiscal-del-mepco-supera-los-us-2-000-millones' },
		{ name: 'Emol - Quiroz US$200M semanales', url: 'https://www.emol.com/noticias/Economia/2026/03/19/1194747/quiroz-ajuste-mepco.html' },
		{ name: 'FEN UAH - MEPCO amortiguador', url: 'https://fen.uahurtado.cl/2026/noticias/mepco-en-chile-el-amortiguador-de-la-bencina-que-hoy-cuesta-millones-al-mes/' },
		{ name: 'OCEC UDP - Brújula N.12 (2022)', url: 'https://ocec.udp.cl/proyecto/brujula-macroeconomica-no12-operacion-del-mepco-en-el-ano-2022-y-propuesta-de-cambio-para-el-ano-2023/' },
		{ name: 'Reporte Minero - Costo US$3.000M', url: 'https://www.reporteminero.cl/noticia/noticias/2026/03/mepco-cambios-chile-costo-3000-millones-petroleo' },
		{ name: 'La Tercera - Gobierno inyecta US$1.500M (2022)', url: 'https://www.latercera.com/pulso/noticia/gobierno-inyecta-us1500-millones-al-mepco-para-seguir-estabilizando-los-precios-de-los-combustibles/PNPQEFYUKJHNRJU43BORRSTGEM/' },
		{ name: 'Emol - Recaudación IEC 2022', url: 'https://www.emol.com/noticias/Economia/2022/07/24/1067763/economistas-recaudacion-impuesto-especifico-combustibles.html' },
		{ name: 'MOP - Hospital La Serena US$271M', url: 'https://www.mop.gob.cl/mop-iniciara-construccion-del-nuevo-hospital-de-la-serena-con-una-inversion-de-us271-millones/' }
	]},
	{ category: 'Caso Indonesia (Detalle)', sources: [
		{ name: 'World Bank - Indonesia Fuel Reforms', url: 'https://documents1.worldbank.org/curated/en/099748505212431959/pdf/IDU1e31e5e531f16114baa1b62c1b3201c9c2e68.pdf' },
		{ name: 'IISD - Indonesia Subsidy Action Plan', url: 'https://www.iisd.org/publications/report/indonesias-fuel-subsidies-action-plan-reform' },
		{ name: 'Cambridge - Fossil Fuel Reform Indonesia', url: 'https://www.cambridge.org/core/books/politics-of-fossil-fuel-subsidies-and-their-reform/fossil-fuel-subsidy-reform-in-indonesia/69E6706F3ABFB80052B20E3772404138' },
		{ name: 'Climate Change News - Indonesia lessons', url: 'https://www.climatechangenews.com/2016/06/14/lessons-from-indonesias-fuel-subsidy-bonfire/' },
		{ name: 'Tandfonline - Indonesia policy dilemmas', url: 'https://www.tandfonline.com/doi/full/10.1080/15487733.2021.2002024' }
	]}
];

// ============================================================
// ANÁLISIS FISCAL DETALLADO
// ============================================================

export const fiscalDeepDive = {
	// Balance acumulado excluyendo 2022
	withoutUkraine: {
		totalWithUkraine: -2194, // millones USD
		ukraine2022Cost: -2376,
		totalWithoutUkraine: 182, // SUPERÁVIT
		surplusYears: {
			years: ['2014', '2019', '2020', '2023', '2024', '2025', 'Ene-Feb 2026'],
			amounts: [107, 102, 410, 417, 72, 114, 90],
			total: 1312
		},
		deficitYears: {
			years: ['2015', '2016', '2017', '2018', '2021', 'Mar 1-19 2026'],
			amounts: [-88, -79, -61, -23, -738, -140],
			total: -1129
		},
		source: 'Cálculo basado en datos OCEC-UDP, vía La Tercera',
		sourceUrl: 'https://www.latercera.com/pulso/noticia/costo-fiscal-del-mepco-supera-los-us2000-millones-desde-su-creacion-en-2014/'
	},

	// Detalle crisis 2022
	ukraine2022Detail: {
		timelineEvents: [
			{ date: '24 feb 2022', event: 'Rusia invade Ucrania. Brent en ~US$97/barril' },
			{ date: '7 mar 2022', event: 'Brent toca US$137/barril (+43% en 11 días)' },
			{ date: 'Mar-Jun 2022', event: 'Brent sostenido sobre US$100/barril por ~4 meses' },
			{ date: 'Abr 2022', event: 'Ley 21.443: límite del fondo sube de US$750M a US$1.500M' },
			{ date: '31 may 2022', event: 'Ley 21.465: límite duplicado a US$3.000M' },
			{ date: 'Jul 2022', event: 'Subsidio MEPCO supera al impuesto: $371/L subsidio vs $349/L IEC en gasolina' },
			{ date: 'Jul 2022', event: 'Diésel: subsidio de $375/L excede impuesto de $87/L → tributación efectiva negativa' }
		],
		weeklyCostMid2022: 80, // millones USD/semana
		q1TaxCollection: 298479, // millones CLP, peor trimestre en una década
		totalCost: -2376,
		sources: [
			{ name: 'Emol - Recaudación IEC 2022', url: 'https://www.emol.com/noticias/Economia/2022/07/24/1067763/economistas-recaudacion-impuesto-especifico-combustibles.html' },
			{ name: 'La Tercera - Inyección US$1.500M', url: 'https://www.latercera.com/pulso/noticia/gobierno-inyecta-us1500-millones-al-mepco-para-seguir-estabilizando-los-precios-de-los-combustibles/PNPQEFYUKJHNRJU43BORRSTGEM/' }
		]
	},

	// Costos actuales marzo 2026
	march2026Crisis: {
		weeklyCost: { min: 140, max: 200, unit: 'millones USD/semana' },
		monthlyCost: 500, // millones USD/mes
		q1Projected: -1600, // millones USD (Fastcheck)
		annualizedIfUnchecked: 3000, // millones USD si se mantiene sin ajuste
		oilPriceJump: { from: 72, to: 104, unit: 'USD/barril Brent' },
		sources: [
			{ name: 'Redimin - US$140M semanales', url: 'https://www.redimin.cl/combustibles-en-chile-comision-aprueba-medidas-paliativas-con-bono-y-abre-debate-por-costo-fiscal-de-us140-millones-semanales/' },
			{ name: 'Emol - Quiroz US$200M', url: 'https://www.emol.com/noticias/Economia/2026/03/19/1194747/quiroz-ajuste-mepco.html' },
			{ name: 'FEN UAH - US$500M/mes', url: 'https://fen.uahurtado.cl/2026/noticias/mepco-en-chile-el-amortiguador-de-la-bencina-que-hoy-cuesta-millones-al-mes/' },
			{ name: 'Fastcheck - Q1 US$1.600M', url: 'https://www.fastcheck.cl/2026/03/24/este-jueves-chile-vivira-el-mayor-shock-de-precios-en-combustibles-en-36-anos/' },
			{ name: 'Reporte Minero - US$3.000M anualizados', url: 'https://www.reporteminero.cl/noticia/noticias/2026/03/mepco-cambios-chile-costo-3000-millones-petroleo' }
		]
	},

	// Comparaciones de escala
	scaleComparisons: [
		{ item: 'Hospitales de alta complejidad', equivalent: '8 a 22 hospitales', detail: 'Costo unitario: US$100-271M (Hosp. La Serena: US$271M, Hosp. Antofagasta: US$100M)', sourceUrl: 'https://www.mop.gob.cl/mop-iniciara-construccion-del-nuevo-hospital-de-la-serena-con-una-inversion-de-us271-millones/' },
		{ item: 'Listas de espera de cáncer', equivalent: 'Resolver TODAS las listas de espera de cáncer', detail: '"Con US$200M [1 semana de MEPCO] se pueden resolver todas las listas de espera de cáncer en Chile en 90 días" — Min. Quiroz', sourceUrl: 'https://www.latercera.com/pulso/noticia/como-el-alza-del-petroleo-enredo-a-la-moneda-y-el-inicio-de-quiroz-en-hacienda/' },
		{ item: 'Viviendas sociales', equivalent: '~74.000 viviendas sociales', detail: 'US$2.376M (costo 2022) equivale a ~74.000 viviendas sociales o Línea 7 del Metro', sourceUrl: 'https://ocec.udp.cl/proyecto/brujula-macroeconomica-no12-operacion-del-mepco-en-el-ano-2022-y-propuesta-de-cambio-para-el-ano-2023/' },
		{ item: 'Recorte austeridad educación', equivalent: '~3.8x el recorte presupuestario a Educación 2026', detail: 'El recorte de 3% a educación = US$574M. El costo acumulado MEPCO = 3.8 veces eso.', sourceUrl: 'https://www.accioneducar.cl/analisis-inicial-al-presupuesto-nacional-en-educacion-2026/' },
		{ item: 'Porcentaje del PIB', equivalent: '~0.63% del PIB anual', detail: 'PIB Chile ~US$347.000M. Solo 2022 = 0.79% del PIB de ese año.', sourceUrl: 'https://datos.bancomundial.org/indicador/NY.GDP.MKTP.CD?locations=CL' },
		{ item: 'Presupuesto nacional', equivalent: '~2.5% del presupuesto anual', detail: 'Presupuesto 2026: ~US$86-90.000M. Costo acumulado MEPCO = 2.5% de un año completo.', sourceUrl: 'https://www.dipres.gob.cl/598/w3-article-393844.html' }
	]
};

// ============================================================
// CASO INDONESIA - ESTUDIO DETALLADO
// ============================================================

export const indonesiaDeepDive = {
	preReform: {
		subsidyCostGDP: 3.4, // % del PIB en 2014
		totalSubsidyCost: 21, // mil millones USD en 2014
		priorFailure1998: 'En 1998, alzas de precios exigidas por el FMI durante la Crisis Asiática provocaron protestas violentas que contribuyeron a la caída del presidente Suharto.',
		partialReform2005: 'En 2005, se subieron precios con transferencias compensatorias parciales. Funcionó parcialmente pero fue insuficiente.',
		source: 'World Bank - Indonesia Fuel Subsidies Reforms',
		sourceUrl: 'https://documents1.worldbank.org/curated/en/099748505212431959/pdf/IDU1e31e5e531f16114baa1b62c1b3201c9c2e68.pdf'
	},
	reform: {
		timeline: [
			{ date: 'Oct 2014', event: 'Joko Widodo (Jokowi) asume la presidencia con mandato reformista', type: 'political' },
			{ date: 'Nov 2014', event: 'Primera alza: precios suben 34% (gasolina de Rp 6.500 a Rp 8.500/litro, diésel de Rp 5.500 a Rp 7.500)', type: 'price' },
			{ date: 'Nov 2014', event: 'Simultáneamente se lanzan tres programas de protección social (tarjetas Sehat, Pintar y Sejahtera)', type: 'social' },
			{ date: '1 Ene 2015', event: 'Se ELIMINA completamente el subsidio a la gasolina. Diésel mantiene subsidio fijo máximo de Rp 1.000/litro', type: 'price' },
			{ date: 'Ene 2015', event: 'Precio gasolina baja a Rp 7.600 por caída del petróleo mundial (Brent cae a US$50-60)', type: 'price' },
			{ date: '2015', event: 'Se implementa ajuste automático mensual de precios de combustibles', type: 'policy' },
			{ date: '2015', event: 'Ahorro fiscal redirigido: IDR 211 billones (US$15.600M) a infraestructura, salud, educación', type: 'fiscal' }
		],
		fiscalSavings: {
			totalSavings: 15600, // millones USD
			percentOfBudget: 10, // % del gasto total del gobierno
			currency: 'IDR 211 billones',
			reallocation: [
				{ sector: 'Infraestructura', description: 'Carreteras, puertos, irrigación' },
				{ sector: 'Salud (Kartu Indonesia Sehat)', description: 'Tarjeta de salud para ~86 millones de personas de bajos ingresos' },
				{ sector: 'Educación (Kartu Indonesia Pintar)', description: 'Tarjeta de educación para ~20 millones de estudiantes' },
				{ sector: 'Ahorro familiar (Simpanan Keluarga Sejahtera)', description: 'Transferencias directas para ~15 millones de familias vulnerables' },
				{ sector: 'Transferencias regionales', description: 'Fondos a gobiernos locales para desarrollo' }
			]
		},
		socialProtection: {
			programs: [
				{ name: 'Kartu Indonesia Sehat', beneficiaries: '86 millones de personas', value: 'Acceso gratuito a servicios de salud', description: 'Tarjeta de salud para el 40% más pobre. Cubre hospitalización, atención primaria, medicamentos.' },
				{ name: 'Kartu Indonesia Pintar', beneficiaries: '20 millones de estudiantes', value: 'Rp 225.000-500.000/semestre según nivel', description: 'Becas escolares para familias de bajos ingresos, desde primaria hasta universidad.' },
				{ name: 'Simpanan Keluarga Sejahtera', beneficiaries: '15 millones de familias', value: 'Rp 200.000/mes', description: 'Transferencia directa mensual a familias en pobreza extrema.' }
			],
			keyDesign: 'Los programas se lanzaron SIMULTÁNEAMENTE con el alza de precios, no después. Los beneficiarios recibieron las tarjetas antes o al mismo tiempo que subió el precio.'
		},
		successFactors: [
			'Timing perfecto: aprovechó la caída global del petróleo (Brent cayó de ~US$110 a ~US$50)',
			'Protección social SIMULTÁNEA: no después, sino al mismo tiempo que el alza',
			'Comunicación clara: Jokowi explicó que "el dinero de los subsidios irá a los pobres, no a los ricos"',
			'Mandato electoral fresco: recién electo, capital político alto',
			'Reforma permanente + ajustes automáticos: no fue una medida temporal'
		],
		source: 'World Bank, IISD, Cambridge University Press',
		sourceUrl: 'https://documents1.worldbank.org/curated/en/099748505212431959/pdf/IDU1e31e5e531f16114baa1b62c1b3201c9c2e68.pdf'
	},
	postReform: {
		description: 'A partir de 2017, el gobierno suspendió los ajustes automáticos de precios bajo presión política. En 2022, los subsidios energéticos volvieron a subir a 2.8% del PIB. Pertamax (gasolina premium) fue congelada antes de elecciones.',
		subsidyReturn2022: 2.8, // % del PIB
		lesson: 'Incluso reformas exitosas pueden revertirse si no hay compromiso institucional a largo plazo. La presión política eventualmente erosionó los ajustes automáticos.',
		source: 'Tandfonline - Navigating Policy Dilemmas',
		sourceUrl: 'https://www.tandfonline.com/doi/full/10.1080/15487733.2021.2002024'
	}
};

// ============================================================
// ESTIMACIÓN DE RECUPERACIÓN FISCAL (SIMULACIÓN IA)
// ============================================================
// ADVERTENCIA: Las siguientes son estimaciones realizadas con
// inteligencia artificial basadas en datos históricos reales.
// NO son proyecciones oficiales de ninguna institución.
// ============================================================

export const recoveryEstimation = {
	disclaimer: 'IMPORTANTE: Las siguientes son estimaciones realizadas con inteligencia artificial, basadas en datos históricos reales del MEPCO. NO son proyecciones oficiales de ninguna institución gubernamental ni académica. Los escenarios son ilustrativos y dependen de supuestos que pueden no cumplirse.',

	// Datos base para la estimación
	baseData: {
		currentDeficit: -2194, // millones USD acumulado a mar 2026
		projectedQ12026: -1600, // millones USD estimado Q1 2026 completo (Fastcheck)
		potentialTotalDeficit: -3794, // si se suma Q1 2026 al acumulado pre-2026
		normalYearsAvgSurplus: 97, // millones USD promedio en años sin crisis
		goodYearsAvgSurplus: 223, // promedio 2019, 2020, 2023-2025
		postUkraineRecovery: { years: 3, recovered: 603 }, // 2023+2024+2025
		annualRecoveryRate2023_2025: 201, // promedio anual post-2022
		chileGDP: 347000, // millones USD (2025 est.)
		source: 'Cálculo propio basado en datos OCEC-UDP / La Tercera / Fastcheck',
		sourceUrl: 'https://www.latercera.com/pulso/noticia/costo-fiscal-del-mepco-supera-los-us2000-millones-desde-su-creacion-en-2014/'
	},

	scenarios: [
		{
			name: 'Escenario Conservador',
			emoji: '🐢',
			description: 'Recuperación al ritmo promedio histórico de años normales (~US$97M/año). Sin reformas, ajustes graduales mínimos.',
			annualSurplus: 97,
			yearsToRecoverCurrent: 23, // 2194 / 97
			yearsToRecoverWorst: 39, // 3794 / 97
			assumptions: [
				'Petróleo se estabiliza entre US$70-85/barril',
				'Sin crisis geopolíticas adicionales',
				'Ventana de cálculo vuelve a parámetros anteriores',
				'Ajustes de 2.4% máximo por ciclo (21 días)',
				'Sin reformas estructurales al MEPCO'
			],
			color: '#f59e0b'
		},
		{
			name: 'Escenario Moderado',
			emoji: '🚶',
			description: 'Recuperación al ritmo post-Ucrania (~US$201M/año promedio 2023-2025). Ajustes graduales con ventana de cálculo intermedia.',
			annualSurplus: 201,
			yearsToRecoverCurrent: 11, // 2194 / 201
			yearsToRecoverWorst: 19, // 3794 / 201
			assumptions: [
				'Petróleo baja a US$65-75/barril',
				'Ventana de cálculo en 8-12 semanas (intermedia)',
				'Alza máxima se mantiene en 2.4% por ciclo',
				'Economía chilena crece ~2-3% anual',
				'Consumo de combustibles estable o creciente'
			],
			color: '#3b82f6'
		},
		{
			name: 'Escenario Optimista',
			emoji: '🏃',
			description: 'Recuperación acelerada tipo 2020 o 2023 (~US$400M/año). Caída fuerte del petróleo + ventana corta que permite recaudar más.',
			annualSurplus: 400,
			yearsToRecoverCurrent: 6, // 2194 / 400
			yearsToRecoverWorst: 10, // 3794 / 400
			assumptions: [
				'Petróleo cae bajo US$60/barril (como en 2020)',
				'Ventana de cálculo se mantiene en 4 semanas',
				'El componente variable genera recaudación neta alta',
				'Consumo de combustibles se mantiene estable',
				'Sin nuevos shocks geopolíticos'
			],
			color: '#10b981'
		},
		{
			name: 'Escenario Gradual Suave',
			emoji: '🧘',
			description: 'Alternativa al shock del gobierno: alzas de ~1% cada 21 días en vez del 34% de golpe. Más lento pero sin shock social.',
			annualSurplus: 150,
			yearsToRecoverCurrent: 15, // 2194 / 150
			yearsToRecoverWorst: 25, // 3794 / 150
			assumptions: [
				'Ajustes de ~1% cada 21 días (~$13/litro)',
				'Ventana de cálculo de 10-12 semanas',
				'Mayor costo fiscal a corto plazo, menor impacto social',
				'Petróleo en rango US$75-90/barril',
				'Sin eliminación del mecanismo'
			],
			color: '#8b5cf6'
		}
	],

	// Datos para graficar la simulación
	projectionData: {
		years: [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045],
		conservative: [-3794, -3697, -3600, -3503, -3406, -3309, -3212, -3115, -3018, -2921, -2824, -2727, -2630, -2533, -2436, -2339, -2242, -2145, -2048, -1951],
		moderate: [-3794, -3593, -3392, -3191, -2990, -2789, -2588, -2387, -2186, -1985, -1784, -1583, -1382, -1181, -980, -779, -578, -377, -176, 25],
		optimistic: [-3794, -3394, -2994, -2594, -2194, -1794, -1394, -994, -594, -194, 206, 606, 1006, 1406, 1806, 2206, 2606, 3006, 3406, 3806],
		gradual: [-3794, -3644, -3494, -3344, -3194, -3044, -2894, -2744, -2594, -2444, -2294, -2144, -1994, -1844, -1694, -1544, -1394, -1244, -1094, -944]
	},

	alternativeApproach: {
		title: '¿Y si el gobierno hubiera sido más gradual en marzo 2026?',
		description: 'En vez del alza de +$370/litro de un día para otro (DS 103 Exento), una alternativa habría sido:',
		steps: [
			{ action: 'Semana 1-3: Cambiar ventana a 12 semanas (no 4)', impact: 'Alza de ~$80-100/litro en gasolina. Impacto fiscal: ~US$100M/semana (vs US$200M)' },
			{ action: 'Semana 4-6: Reducir ventana a 8 semanas', impact: 'Alza adicional de ~$60-80/litro. Total acumulado: ~$160-180/litro' },
			{ action: 'Semana 7-12: Reducir ventana a 6 semanas', impact: 'Ajuste final gradual hasta alcanzar equilibrio. Total: ~$250-300/litro' },
			{ action: 'Mes 4+: Evaluar y ajustar según precio del petróleo', impact: 'Si el petróleo baja, los consumidores ven alivio más rápido' }
		],
		tradeoff: 'Esta alternativa habría costado ~US$400-600M adicionales al fisco en 3 meses, pero habría evitado el shock del 34% de un día. El debate es si el fisco puede permitirse esa diferencia a cambio de estabilidad social.',
		note: 'Esta es una estimación ilustrativa. No considera factores como elasticidad de demanda, tipo de cambio, ni decisiones políticas.',
		source: 'Estimación propia basada en datos históricos del MEPCO',
		sourceUrl: 'https://www.latercera.com/pulso/noticia/costo-fiscal-del-mepco-supera-los-us2000-millones-desde-su-creacion-en-2014/'
	}
};

// ============================================================
// ANÁLISIS DE LAS MEDIDAS DEL GOBIERNO
// ============================================================

export const governmentAnalysis = {
	measures: {
		decree: {
			name: 'DS 103 Exento',
			date: '23 de marzo de 2026',
			signedBy: 'Ministro Jorge Quiroz Castro, por orden del Presidente José Antonio Kast',
			change: 'Ventana de cálculo de 21/14/37 semanas → 4 semanas para todos los combustibles',
			result: [
				{ fuel: 'Gasolina 93', before: 1083, after: 1453, diff: 370, pct: 34.2 },
				{ fuel: 'Gasolina 97', before: 1133, after: 1503, diff: 370, pct: 32.7 },
				{ fuel: 'Diésel', before: 831, after: 1411, diff: 580, pct: 69.8 }
			],
			context: 'Mayor shock de precios de combustibles en los 36 años de democracia chilena. Solo comparable con la Guerra del Golfo de 1991 (+33%).',
			justification: '"No vamos a esperar a que la fortuna dé vuelta las cosas mientras gastamos US$200 millones por semana" — Min. Quiroz',
			sources: [
				{ name: 'Cooperativa', url: 'https://www.cooperativa.cl/noticias/pais/consumidores/combustibles/cambios-al-mepco-bencinas-subiran-370-pesos-y-diesel-tendra-alza-de-580/2026-03-23/203943.html' },
				{ name: 'Fastcheck', url: 'https://www.fastcheck.cl/2026/03/24/este-jueves-chile-vivira-el-mayor-shock-de-precios-en-combustibles-en-36-anos/' },
				{ name: 'Mala Espina Check', url: 'https://www.malaespinacheck.cl/pais/2026/03/23/que-cambios-establece-el-decreto-que-el-gobierno-ingreso-por-el-mepco/' }
			]
		},
		compensatory: [
			{ name: 'Congelamiento tarifa transporte público (Santiago)', detail: 'RED/Metro congelado hasta 31 dic 2026' },
			{ name: 'Apoyo transporte público regional', detail: 'Recursos para contener alzas en regiones' },
			{ name: 'Congelamiento precio kerosene', detail: 'Precio congelado a niveles de febrero 2026. Proyecto para subir FEPP de US$5M a US$60M' },
			{ name: 'Subsidio taxis y colectivos', detail: '$100.000/mes por vehículo por 6 meses (abril-septiembre)' },
			{ name: 'Bono furgón escolar', detail: '$100.000/mes por 6 meses' },
			{ name: 'Crédito BancoEstado vehículos eléctricos', detail: 'Línea preferencial para taxis/colectivos eléctricos' }
		],
		compensatorySources: [
			{ name: 'Gob.cl - Plan Chile Sale Adelante', url: 'https://www.gob.cl/noticias/plan-chile-sale-adelante-medidas-apoyo-concreto-familias-alza-combustible/' },
			{ name: 'La Tercera', url: 'https://www.latercera.com/pulso/noticia/gobierno-anuncia-historicas-alzas-de-bencina-y-diesel-por-guerra-en-iran-y-activa-plan-de-medidas-paliativas/' }
		]
	},

	inflationImpact: [
		{ economist: 'Carlos Smith (CIES-UDD)', withMepco: '~2.5% anual', withoutMepco: '~4% anual' },
		{ economist: 'Valentina Apablaza (OCEC-UDP)', withMepco: '2.5% anual', withoutMepco: '~4% anual' },
		{ economist: 'Rodrigo Montero (U. Autónoma)', withMepco: '3.6-3.7% anual', withoutMepco: 'N/A' }
	],
	inflationSource: { name: 'Emol', url: 'https://www.emol.com/noticias/Economia/2026/03/20/1194818/inflacion-combustibles-mepco.html' },

	alternatives: [
		{ name: 'Ajuste gradual acelerado', proponent: 'Juan Ortiz, OCEC-UDP', description: 'Duplicar el ajuste semanal de $30 a $60/litro, sin cambiar ventana. Reduce presión fiscal gradualmente sin shock.', sourceUrl: 'https://www.emol.com/noticias/Economia/2026/03/20/1194823/ajuste-al-mepco-debate.html' },
		{ name: 'Ampliar banda de precios', proponent: 'Varios economistas', description: 'Hacer la banda más ancha que ±5%, reduciendo costo fiscal pero manteniendo cierto amortiguamiento.', sourceUrl: 'https://www.cooperativa.cl/noticias/pais/consumidores/combustibles/caja-de-pandora-y-tenia-que-pasar-economistas-se-enfrentan-por/2026-03-19/112943.html' },
		{ name: 'MEPCO selectivo', proponent: 'Carlos J. García, FEN UAH', description: 'Eliminar MEPCO para vehículos particulares, preservarlo para transporte público y kerosene.', sourceUrl: 'https://fen.uahurtado.cl/2026/noticias/mepco-en-chile-el-amortiguador-de-la-bencina-que-hoy-cuesta-millones-al-mes/' },
		{ name: 'Impuesto a grandes consumidores', proponent: 'Diputado Carlos Bianchi (PPD)', description: 'Extender el IEC a minería, forestal, aéreo y marítimo. Generaría >US$3.500M en ingresos adicionales.', sourceUrl: 'https://radio.uchile.cl/2026/03/23/oficialismo-y-oposicion-chocan-por-cambios-al-mepco-gobierno-prepara-anuncio-mientras-ppd-presenta-propuesta-alternativa/' },
		{ name: 'Ventana intermedia (8-12 semanas)', proponent: 'Estimación propia', description: 'En vez de saltar a 4 semanas, usar 8-12 semanas. Transmite precios más rápido que antes pero sin shock extremo.', sourceUrl: '' }
	],

	fiscalCapacity: {
		fees: { balance: 3913, unit: 'millones USD (enero 2026)', feesWithdrawal2024: 2407 },
		frp: { balance: 9946, unit: 'millones USD (agosto 2025)' },
		totalSovereignFunds: 13809,
		debtToGDP: { current: 41.7, projected2026: 43.2, anchor: 45, headroom: 1.8 },
		fiscalDeficit: { pct2024: -2.9, pct2025: -2.2, target2026: -1.1, projected2026: -2.7 },
		availableResources: 40, // millones USD heredados a fin de 2025
		canAfford200MWeek: false,
		analysis: 'A US$200M/semana, el FEES se agotaría en ~5 meses. El gobierno heredó solo US$40M en recursos disponibles. La deuda está a solo 1.8 puntos del ancla de 45% del PIB.',
		sources: [
			{ name: 'Hacienda - Fondos Soberanos', url: 'https://www.hacienda.cl/areas-de-trabajo/finanzas-internacionales/fondos-soberanos' },
			{ name: 'CIPER Chile', url: 'https://www.ciperchile.cl/2025/10/10/presupuesto-2026-sin-margen-urge-profundizar-la-responsabilidad-fiscal/' },
			{ name: 'CEPChile', url: 'https://www.cepchile.cl/investigacion/presupuesto-2026-y-desafios-fiscales-para-el-proximo-gobierno/' }
		]
	},

	iranContext: {
		timeline: [
			{ date: '28 feb 2026', event: 'EE.UU.-Israel lanzan ataques aéreos sobre Irán ("Operación Epic Fury")' },
			{ date: '1-2 mar', event: 'Irán responde con misiles. IRGC prohíbe tránsito por Estrecho de Ormuz. Tráfico de tanqueros cae 70%' },
			{ date: '8 mar', event: 'Brent supera US$100/barril por primera vez en 4 años' },
			{ date: '12 mar', event: 'Pérdidas de producción llegan a 10 millones de barriles/día' },
			{ date: '19 mar', event: 'Crudo Dubai toca récord de US$166/barril' },
			{ date: '22 mar', event: 'Brent en futuros alcanza ~US$126/barril' }
		],
		hormuzFacts: 'El Estrecho de Ormuz transporta normalmente el 20% del suministro global de petróleo y 20% del GNL mundial.',
		forecasts: [
			{ source: 'Goldman Sachs', forecast: 'Brent promedio 2026: US$85. Si disrupción dura 2 meses: Q4 podría llegar a US$93. Escenario extremo: superar máximos de 2008.', url: 'https://www.goldmansachs.com/insights/articles/how-will-the-iran-conflict-impact-oil-prices' },
			{ source: 'Allianz', forecast: 'Si acuerdo EE.UU.-Irán en 4 semanas: Brent toca US$85, termina 2026 en ~US$70. Conflicto prolongado: Brent a US$100.', url: 'https://www.allianz.com/content/dam/onemarketing/azcom/Allianz_com/economic-research/publications/specials/en/2026/march/2026_03_03_IranScenarios.pdf' },
			{ source: 'Dallas Fed', forecast: 'WTI promedio Q2 2026: US$98/barril. PIB global real cae 2.9 puntos porcentuales en Q2.', url: 'https://www.dallasfed.org/research/economics/2026/0320' }
		],
		sourceWiki: 'https://en.wikipedia.org/wiki/2026_Strait_of_Hormuz_crisis'
	},

	otherCountries: [
		{ country: 'México', flag: '🇲🇽', response: 'Reactivó subsidio al IEPS: 24% en Magna, 62% en Diésel. Absorbe costo fiscalmente. Expertos advierten gasolina podría llegar a 30 pesos/litro.', sourceUrl: 'https://www.elfinanciero.com.mx/economia/2026/03/21/precio-de-la-gasolina-como-quedan-los-estimulos-fiscales-a-los-combustibles/' },
		{ country: 'Colombia', flag: '🇨🇴', response: 'Petro: "Si es necesario que suba la gasolina, subirá". Subsidio diésel solo para transporte de carga. Recomienda migrar a vehículos eléctricos.', sourceUrl: 'https://www.infobae.com/colombia/2026/03/24/petro-admitio-posible-alza-en-la-gasolina-y-propuso-migrar-a-energia-electrica-ante-presion-fiscal-por-combustibles-si-es-necesario-subira/' },
		{ country: 'Perú', flag: '🇵🇪', response: 'Crisis dual: shock petrolero + rotura gasoducto Camisea. Gasolina premium salta de S/17 a S/23. Gobierno describe como "peor crisis energética en 20 años".', sourceUrl: 'https://larepublica.pe/economia/2026/03/20/crisis-de-combustible-continua-a-nivel-nacional-el-petroleo-y-la-gasolina-mantienen-precios-elevados-hnews-1780980' },
		{ country: 'Bolivia', flag: '🇧🇴', response: 'Eliminó subsidios completamente en dic 2025. Gasolina +86%, Diésel +160%. Protestas y bloqueos. Ahorro: ~US$400M en 5 semanas.', sourceUrl: 'https://dfsud.com/america/no-solo-chile-colombia-ecuador-y-bolivia-entre-los-paises-que-han' }
	]
};

// ============================================================
// ESCENARIO HIPOTÉTICO: CHILE APLICA EL MODELO INDONESIA
// ============================================================

export const chileIndonesiaHypothetical = {
	disclaimer: 'IMPORTANTE: Este es un ejercicio hipotético de inteligencia artificial. Los cálculos se basan en datos reales pero los escenarios son especulativos. No representan propuestas oficiales de ninguna institución.',

	comparison: {
		headers: ['Métrica', 'Indonesia (2014)', 'Chile (2026)'],
		rows: [
			['Población', '252 millones', '19.9 millones'],
			['PIB nominal', 'US$856.000M', 'US$347.000M'],
			['PIB per cápita', 'US$3.400', 'US$17.181'],
			['Costo subsidio combustible', 'US$22.100M/año (3.4% PIB)', '~US$6.000M/año al ritmo actual (~1.7% PIB)'],
			['Vehículos/1.000 hab.', '87 (mayormente motos)', '278'],
			['% subsidio al quintil más rico', '70% al top 40%', '80% del IEC al top 20%'],
			['Infraestructura de transferencias', 'Creada desde cero', 'RSH: 85.6% de la población (17.1M personas)'],
			['Precio petróleo al reformar', 'Cayendo (US$110→US$50)', 'Subiendo (US$72→US$126)']
		],
		sources: [
			{ name: 'World Bank - Indonesia', url: 'https://documents1.worldbank.org/curated/en/099748505212431959/pdf/IDU1e31e5e531f16114baa1b62c1b3201c9c2e68.pdf' },
			{ name: 'El Libero - Regresividad MEPCO', url: 'https://ellibero.cl/actualidad/la-linea-de-defensa-del-gobierno-para-enfrentar-las-criticas-por-el-alza-de-los-combustibles/' }
		]
	},

	regressivity: {
		q1Benefit: 4500, // pesos/mes al quintil 1
		q5Benefit: 30000, // pesos/mes al quintil 5
		ratio: 6.7, // veces más beneficia al rico
		vehiclesQ1: 13, // por 100 hogares
		vehiclesQ5: 93, // por 100 hogares
		source: { name: 'El Libero / FEN UAH', url: 'https://ellibero.cl/actualidad/la-linea-de-defensa-del-gobierno-para-enfrentar-las-criticas-por-el-alza-de-los-combustibles/' }
	},

	hypotheticalPlan: {
		title: '¿Cómo se vería el "modelo Indonesia" aplicado a Chile?',
		steps: [
			{
				phase: 'Fase 1: Preparación (mes 1-2)',
				actions: [
					'Usar el Registro Social de Hogares (17.1M personas, 85.6% cobertura) para identificar hogares vulnerables',
					'Diseñar transferencia directa mensual al 40% más pobre (~3.6 millones de hogares)',
					'Preparar congelamiento de tarifas de transporte público',
					'Comunicar claramente: "el dinero del subsidio irá directamente a los hogares que más lo necesitan"'
				]
			},
			{
				phase: 'Fase 2: Implementación simultánea (mes 3)',
				actions: [
					'Eliminar MEPCO para vehículos particulares',
					'Mantener MEPCO para transporte público, kerosene y GLP doméstico',
					'Activar transferencia directa: ~$55.000/mes por hogar del 40% más pobre',
					'Congelar tarifas RED/Metro por 12 meses'
				]
			},
			{
				phase: 'Fase 3: Estabilización (mes 4-12)',
				actions: [
					'Monitorear impacto inflacionario y ajustar transferencias si es necesario',
					'Redirigir ahorros fiscales a infraestructura de transporte público',
					'Evaluar ampliación de flota eléctrica (Chile ya tiene 2.480 buses eléctricos)',
					'Revisar el Impuesto Específico: ¿debe eliminarse o transformarse?'
				]
			}
		],
		fiscalMath: {
			currentMepcoCost: 6000, // millones USD/año al ritmo actual
			transferCost40Pct: 2400, // millones USD/año (3.6M hogares × $55.000/mes × 12)
			publicTransitMepco: 800, // millones USD/año estimado mantener MEPCO para transporte público
			totalAlternativeCost: 3200, // transferencia + transporte público
			savings: 2800, // vs costo MEPCO actual
			savingsNote: 'Ahorro neto estimado: ~US$2.800M/año vs mantener MEPCO a tasas actuales'
		}
	},

	feasibility: {
		favorable: [
			{ factor: 'Infraestructura social probada', detail: 'Chile entregó transferencias a 8M de hogares durante la pandemia via RSH. Indonesia tuvo que crear el sistema desde cero.' },
			{ factor: 'MEPCO es extremadamente regresivo', detail: 'El quintil más rico recibe 6.7× más beneficio. Eliminar MEPCO y transferir directo es progresivo.' },
			{ factor: 'El ahorro fiscal es enorme', detail: 'Con US$2.400M en transferencias directas se cubre al 40% más pobre. El MEPCO cuesta US$6.000M y beneficia mayormente a ricos.' },
			{ factor: 'Transporte público dominante', detail: '51% de chilenos usa transporte público. Proteger tarifas del RED/Metro cubre a la mayoría vulnerable.' },
			{ factor: 'Flota eléctrica líder', detail: '2.480 buses eléctricos en Santiago (mayor flota fuera de China). La transición ya comenzó.' }
		],
		desfavorable: [
			{ factor: 'Timing es el opuesto al de Indonesia', detail: 'Jokowi reformó cuando el petróleo CAÍA (US$110→$50). Chile enfrenta precios en ALZA (US$72→$126). El shock sería mucho más severo.' },
			{ factor: 'Riesgo inflacionario alto', detail: 'Eliminar MEPCO podría llevar inflación de 2.5% a 4%+, forzando alzas de tasas del Banco Central.' },
			{ factor: 'Capital político insuficiente', detail: 'Jokowi acababa de ser electo con mandato reformista. El gobierno actual ya enfrenta oposición fuerte.' },
			{ factor: 'Impacto en regiones extremas', detail: 'Regiones como Aysén y Arica ya pagan $100-130/L más que Santiago. Sin MEPCO, la brecha se ampliaría.' },
			{ factor: 'Diesel afecta cadena productiva', detail: 'El alza de diésel (+69.8%) impacta transporte de carga, agricultura, pesca. Efecto cascada en precios de alimentos.' }
		],
		sources: [
			{ name: 'Registro Social de Hogares', url: 'https://www.registrosocial.gob.cl/' },
			{ name: 'Gob.cl - Transferencias pandemia', url: 'https://www.gob.cl/noticias/en-pandemia-el-gobierno-ha-entregado-mas-de-24-billones-de-pesos-en-transferencias-directas/' },
			{ name: 'AIM Chile - Transporte', url: 'https://aimchile.cl/radiografia-al-uso-de-medios-de-transporte-de-los-chilenos/' },
			{ name: 'DTPM - RED Movilidad', url: 'https://www.dtpm.cl/index.php/128-destacados-home/1118-red-movilidad-cierra-el-2024-con-mas-de-200-nuevos-buses-electricos-y-un-10-de-conductoras' }
		]
	},

	verdict: 'El modelo Indonesia es técnicamente viable en Chile gracias a la infraestructura del RSH y la experiencia de las transferencias pandémicas. Sin embargo, el timing es terrible: Indonesia reformó con petróleo bajando y capital político alto. Chile enfrenta petróleo en máximos históricos, guerra en Medio Oriente, y un gobierno con oposición activa. La versión más realista sería un "Indonesia gradual": mantener MEPCO pero reducido, complementar con transferencias focalizadas al 40% más pobre, y proteger transporte público. Esta ruta intermedia ahorraría ~US$2.800M/año vs el escenario actual.'
};
