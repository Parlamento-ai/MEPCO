<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Chart, registerables } from 'chart.js';

	Chart.register(...registerables);

	let {
		type,
		data,
		options = {},
		height = '400px'
	}: {
		type: string;
		data: any;
		options?: any;
		height?: string;
	} = $props();

	let canvas: HTMLCanvasElement;
	let chart: Chart | null = null;

	onMount(() => {
		chart = new Chart(canvas, {
			type: type as any,
			data,
			options: {
				responsive: true,
				maintainAspectRatio: false,
				...options
			}
		});
	});

	onDestroy(() => {
		chart?.destroy();
	});
</script>

<div style="height: {height}; position: relative;">
	<canvas bind:this={canvas}></canvas>
</div>
