<script lang="ts">
	import StatsDashboard from "./components/statsDash/Dashboard.svelte";
	import FileUpload from "./components/FileUpload.svelte";
	import Allocation from "./components/allocFunc/Allocation.svelte";
	import { writable } from "svelte/store";
	import { allocRec } from "./components/allocFunc/allocRecords.svelte";
	import { load_file } from "./components/generalUtils.svelte";

	/*
	0 => upload
	1 => allocation page
	2 => view statistics page
	*/
	const status = writable(0);
	let data: Record<string, any>[]; // marks
	let maxa: Record<string, number>; // maximums
	let allocs = writable(new allocRec()); // allocations

	const set_data = (fc, maxs) => {
		data = fc;
		maxa = maxs;
		// clear the allocations here
		// $allocs.clear();
	};

	// maxa and data are synced
	if (window.localStorage.getItem("data")) {
		const temp: string = window.localStorage.getItem("data");
		const file: File = new File([temp], "test.csv", {
			type: "text/csv",
		});

		load_file(file, set_data, false);

		if (window.localStorage.getItem("allocations")) {
			const stor_allocs: string[][] = JSON.parse(
				window.localStorage.getItem("allocations")
			);
			stor_allocs.forEach((v: string[]) => {
				$allocs.add(v);
			});
			allocs.set($allocs);
		}
		status.set(1);
	}
</script>

<main>
	{#if $status == 0}
		<FileUpload {status} {set_data} />
	{:else if $status == 1}
		<Allocation {status} {maxa} {allocs} />
	{:else}
		<StatsDashboard {status} {data} {maxa} {allocs} />
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
