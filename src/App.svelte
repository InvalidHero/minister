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
	import MenuSurface, { MenuSurfaceComponentDev } from "@smui/menu-surface";
	import Snackbar, {
		Label,
		SnackbarComponentDev,
		Actions as Snackbar_actions,
	} from "@smui/snackbar";
	import Dialog, {
		InitialFocus,
		Actions as Dialog_actions,
	} from "@smui/dialog";
	import Button from "@smui/button";

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
	let surface: MenuSurfaceComponentDev;

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

	let snackbar: SnackbarComponentDev;
	let text = "";

	const open_snack = (input: string) => {
		text = input;
		snackbar.open();
	};

	let open = false;
</script>

<Dialog
	bind:open
	aria-labelledby="simple-title"
	aria-describedby="simple-content"
>
	<!-- <Title id="simple-title">Are you sure ?</Title> -->
	<Content id="simple-content"
		><p tabindex="0">
			Returning to the upload page will clear the content of uploaded
			assignment marks and allocations.
		</p>
	</Content>
	<Dialog_actions>
		<Button
			variant="raised"
			on:click={() => {
				// allocation back button
				status.set($status - 1);
				$allocs.clear(); // clear allocations

				window.localStorage.removeItem("data");
				window.localStorage.removeItem("allocations");
			}}
		>
			<Label>Yes</Label>
		</Button>
		<Button
			variant="raised"
			defaultAction
			use={[InitialFocus]}
			on:click={() => {
				console.log("clicked");
			}}
		>
			<Label>No</Label>
		</Button>
	</Dialog_actions>
</Dialog>

<div class="whole-page">
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
							on:click={() => (open = true)}
							>arrow_back</IconButton
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
				<p class="web-title">Minister</p>
			</Section>

			<Section align="end" toolbar>
				<div>
					{#if $status == 1}
						<IconButton
							aria-label="allocation_confirm"
							class="material-icons"
							on:click={() => {
								status.set($status + 1);
							}}>arrow_forward</IconButton
						>
					{:else}
						<IconButton
							aria-label="about_us"
							class="material-icons"
							on:click={() => surface.setOpen(true)}
							>info_icon</IconButton
						>
						<MenuSurface
							bind:this={surface}
							anchorCorner="TOP_RIGHT"
						>
							<div class="about-us">
								<p>
									A simple <a href="https://svelte.dev/"
										>Svelte</a
									> site for for analyzing marking distributions.
								</p>
								<p>
									Written and built by <a
										href="https://github.com/InvalidHero"
										>Even</a
									>
									and
									<a href="https://github.com/xpire">Justin</a
									>💦.
								</p>
							</div>
						</MenuSurface>
					{/if}
				</div>
			</Section>
		</Row>
	</TopAppBar>

	<AutoAdjust {topAppBar}>
		{#if $status == 0}
			<h1>Loading Zone</h1>
		{:else if $status == 1}
			<h1>Allocations</h1>
		{:else}
			<h1>Statistics</h1>
		{/if}
		<main>
			<!-- <div class="main-container"> -->
			<Card padded class="main-card" variant="outlined">
				{#if $status == 0}
					<!-- <SvelteMarkdown source={mk_upload} /> -->
					<FileUpload {status} {set_data} {open_snack} />
					<br />
					<Instruct variant={"upload"} />
				{:else if $status == 1}
					<Allocation {status} {maxa} {allocs} {open_snack} />
				{:else}
					<StatsDashboard {status} {data} {maxa} {allocs} />
				{/if}
			</Card>
			<!-- </div> -->
		</main>
	</AutoAdjust>

	<Snackbar bind:this={snackbar} labelText={text} timeoutMs={-1}>
		<Label />
		<Snackbar_actions>
			<IconButton class="material-icons" title="Dismiss">close</IconButton
			>
		</Snackbar_actions>
	</Snackbar>
</div>

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

	:global(span.mdc-top-app-bar__title) {
		padding-left: 0px;
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

	:global(.main-card) {
		/* max-width: 900px; */
		/* position: relative; */
		max-width: 1000px;
		min-width: 500px;
		margin-left: auto;
		margin-right: auto;
		width: 100%;
	}
	.about-us {
		padding: 10px;
		width: 450px;
	}

	.whole-page {
		position: absolute;
		width: 100%;
		height: 100%;
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
