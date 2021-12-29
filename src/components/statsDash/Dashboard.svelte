<script lang="ts">
    import Dchart from "./DChart.svelte";
    import Select, { Option } from "@smui/select";
    import Button, { Label } from "@smui/button";
    import Tab, { Icon } from "@smui/tab";
    import TabBar from "@smui/tab-bar";
    import StatsList from "./statsList.svelte";
    import { filter_via_alloc } from "./statsUtil.svelte";
    import StatsStack from "./statsStacked.svelte";
    import Instruct from "../instructions.svelte";

    export let status; // for paging an rendering
    export let data; // marks
    export let maxa; // assignment name: maximum marks
    export let allocs; // allocations structure

    let tabs = [
        {
            icon: "signal_cellular_alticon",
            label: "Bar Charts",
        },
        {
            icon: "timeline",
            label: "Line Charts",
        },
    ];
    let active = tabs[0];

    const test_options = Object.keys(maxa);
    let value = test_options[0]; //TODO: handle case of no assignments

    $: curr_alloc = extract_alloc(value); // assignment allocations
    $: overall_data = extract_overall(value);
    $: filtered_data = get_filtered(curr_alloc, value);

    function extract_alloc(ass_name) {
        const overall_allocs: Record<string, any> = [];

        $allocs.get_names().forEach((name: string) => {
            if (ass_name in $allocs.get_via_name(name)) {
                overall_allocs.push({
                    name: name,
                    allocation: $allocs.get_interval(name, ass_name),
                });
            }
        });
        return overall_allocs;
    }

    function extract_overall(value): any[] {
        return data.map((v) => v[value]);
    }

    function get_filtered(curr_alloc, value): any[] {
        return curr_alloc
            .map((v) => {
                return filter_via_alloc(data, value, v.name, v.allocation);
            })
            .sort((a, b) => a.name < b.name); // individual score
    }
</script>

<Select bind:value label="Select Assignment">
    {#each test_options as ass_name}
        <Option value={ass_name}>{ass_name}</Option>
    {/each}
</Select>

<br />

<div>
    <TabBar {tabs} let:tab bind:active>
        <Tab {tab}>
            <Icon class="material-icons">{tab.icon}</Icon>
            <Label>{tab.label}</Label>
        </Tab>
    </TabBar>
    {#if active.label == "Bar Charts"}
        <StatsStack {overall_data} {filtered_data} {maxa} {value} bar={true} />
    {:else}
        <StatsStack {overall_data} {filtered_data} {maxa} {value} bar={false} />
    {/if}
</div>

<br />
<Instruct variant={"graph"} />
<br />

<StatsList {overall_data} {filtered_data} {maxa} ass_name={value} />

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
    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }
</style>
