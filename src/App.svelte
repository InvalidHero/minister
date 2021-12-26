<script lang="ts">
	import StatsDashboard from "./components/statsDash/Dashboard.svelte";
	import FileUpload from "./components/FileUpload.svelte";
	import Allocation from "./components/allocFunc/Allocation.svelte";
	import { writable } from "svelte/store";
	import { allocRec } from "./components/allocFunc/allocRecords.svelte";
	import { load_file } from "./components/generalUtils.svelte";
	import TopAppBar, {
		Row,
		Section,
		Title,
		AutoAdjust,
		TopAppBarComponentDev,
	} from "@smui/top-app-bar";
	import IconButton from "@smui/icon-button";
	import Card, { Content } from "@smui/card";
	import Instruct from "./components/instructions.svelte";
	import SvelteMarkdown from "svelte-markdown";
	/*
	0 => upload
	1 => allocation page
	2 => view statistics page
	*/
	const status = writable(0);
	let data: Record<string, any>[]; // marks
	let maxa: Record<string, number>; // maximums
	let allocs = writable(new allocRec()); // allocations
	let topAppBar: TopAppBarComponentDev;

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

<TopAppBar bind:this={topAppBar} variant="standard">
	<Row>
		<Section toolbar>
			{#if $status == 0}
				<div>
					<IconButton
						aria-label="home"
						class="material-icons"
						disabled>home</IconButton
					>
				</div>
			{:else if $status == 1}
				<div>
					<IconButton
						aria-label="allocation_back"
						class="material-icons"
						on:click={() => {
							// allocation back button
							status.set($status - 1);
							$allocs.clear(); // clear allocations

							window.localStorage.removeItem("data");
							window.localStorage.removeItem("allocations");
							// TODO: add a proper prompt menu
						}}>arrow_back</IconButton
					>
				</div>
			{:else}
				<div>
					<IconButton
						aria-label="dash_back"
						class="material-icons"
						on:click={() => {
							status.set($status - 1);
						}}>arrow_back</IconButton
					>
				</div>
			{/if}
			<Title>
				<div>
					<img
						class="appbar-logo"
						src="pixel_computer.png"
						alt={""}
					/>
				</div>
			</Title>
			<p class="web-title">Minotaur :D</p>
		</Section>

		{#if $status == 1}
			<Section align="end" toolbar>
				<div>
					<IconButton
						aria-label="allocation_confirm"
						class="material-icons"
						on:click={() => {
							status.set($status + 1);
						}}>arrow_forward</IconButton
					>
				</div>
			</Section>
		{/if}
	</Row>
</TopAppBar>

<AutoAdjust {topAppBar}>
	{#if $status == 0}
		<h1>Loading Zone</h1>
	{:else if $status == 1}{:else}{/if}
	<main>
		<!-- <div class="main-container"> -->
		<Card padded class="main-card" variant="outlined">
			{#if $status == 0}
				<!-- <SvelteMarkdown source={mk_upload} /> -->
				<FileUpload {status} {set_data} />
				<br />
				<Instruct variant={"upload"} />
			{:else if $status == 1}
				<Allocation {status} {maxa} {allocs} />
			{:else}
				<StatsDashboard {status} {data} {maxa} {allocs} />
			{/if}
		</Card>
		<!-- </div> -->
	</main>
</AutoAdjust>

<svelte:head>
	<!-- Fonts -->
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/icon?family=Material+Icons"
	/>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
	/>

	<!-- Material Typography -->
	<link
		rel="stylesheet"
		href="https://unpkg.com/@material/typography@13.0.0/dist/mdc.typography.css"
	/>
</svelte:head>

<style>
	/* Hide everything above this component. */
	:global(app),
	:global(body),
	:global(html) {
		display: block !important;
		height: auto !important;
		width: auto !important;
		position: static !important;
	}

	:global(.web-title) {
		font-size: 20px;
		padding-left: 7px;
	}

	:global(.appbar-logo) {
		width: 50px;
		height: auto;
		padding-top: 8px;
	}

	/* :global(.main-container) {

	} */
	:global(.main-card) {
		/* max-width: 900px; */
		/* position: relative; */
		max-width: 1000px;
		min-width: 500px;
		margin-left: auto;
		margin-right: auto;
		width: 100%;
	}

	main {
		text-align: center;
		padding: 1em;
		padding-top: 0em;
		/* max-width: 240px; */
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	h1 {
		padding-top: 1px;
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
		text-align: center;
	}
</style>
