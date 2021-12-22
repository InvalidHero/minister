<script lang="ts">
    import Dchart from "./DChart.svelte";
    import Select, { Option } from "@smui/select";
    import Button, { Label } from "@smui/button";
    import Tab, { Icon } from "@smui/tab";
    import TabBar from "@smui/tab-bar";

    export let status;
    export let data;
    export let maxa;
    export let allocs;

    $allocs.add(["Guy1", "A1Q1", "A", "A", "Z", "Z"]);
    $allocs.add(["Guy1", "A1Q2", "A", "A", "Z", "Z"]);
    $allocs.add(["Guy2", "A2Q1", "A", "A", "Z", "Z"]);

    let tabs = [
        {
            icon: "assessment",
            label: "Detailed Chart",
        },
        {
            icon: "compare",
            label: "Compare charts",
        },
    ];
    let active = tabs[0];

    const test_options = ["A1Q1", "A1Q2", "A2Q1", "A2Q2", "A3Q1", "A3Q2"];
    $: value = test_options[0]; //TODO: handle case of no assignments

    $: curr_data = extract_alloc(value); // data for the selected assignment

    function extract_alloc(ass_name) {
        // Record<name, allocation>
        const overall_allocs: Record<string, any> = [];

        $allocs.get_names().forEach((name: string) => {
            if (ass_name in $allocs.get_via_name(name, true)) {
                // alloc for name has ass_name
                overall_allocs.push({
                    name: name,
                    allocation: $allocs.get_interval(name, ass_name),
                });
            }
        });
    }
</script>

<h1>Statistics</h1>

<br />

<div>
    <Button on:click={() => status.set($status - 1)} variant="raised">
        <Label>Back</Label>
    </Button>
</div>

<Select bind:value label="Select Menu">
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
</div>

<Dchart />

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
