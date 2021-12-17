<script lang="ts">
	import DChart from "./components/DChart.svelte";
	import { writable } from "svelte/store";
	import FileUpload from "./components/FileUpload.svelte";
	import Allocation from "./components/Allocation.svelte";

	/*
		0 => no upload
		1 => allocation page
		2 => view statistics page
	*/
	const status = writable(1);
	let data: Record<string, any>[]; // marks
	let maxa: Record<string, number>; // maximums
	let alloc: Record<string, Record<string, any>>; // allocation

	function set_data(fc, maxs) {
		data = fc;
		maxa = maxs;
	}

	function set_alloc() {
		// TODO
	}
</script>

<main>
	{#if $status == 0}
		<FileUpload {status} {set_data} />
	{:else if $status == 1}
		<Allocation {status} {maxa} />
	{:else}
		<h1>Here are the statistics.</h1>
		<DChart />
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
