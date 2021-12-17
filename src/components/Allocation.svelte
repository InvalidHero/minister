<script lang="ts">
    import "../../node_modules/svelte-material-ui/bare.css";

    import Button, { Label } from "@smui/button";
    import Tab, { Icon } from "@smui/tab";
    import TabBar from "@smui/tab-bar";
    import Dropzone from "svelte-file-dropzone";
    import Papa from "papaparse";
    import { allocRec } from "./allocRecords.svelte";
    import AllocEntry from "./allocEntry.svelte";

    // Columns: [Tutor Name,Question Number,Surname,Firstname,Surname,Firstname]
    export let status;
    export let maxa;

    const allocs: allocRec = new allocRec();

    let tabs = [
        {
            icon: "attach_file",
            label: "By file",
        },
        {
            icon: "confirmation_number",
            label: "By entry ",
        },
    ];
    let active = tabs[0];

    function handleFileSelect(e) {
        const { acceptedFiles, fileRejections } = e.detail;
        if (fileRejections.length == 0) {
            const config = {
                delimiter: ",",
                error: (err, file, inputElem, reason) => {
                    console.log(reason); // TODO: error message here
                    console.log(err); // TODO: error message here
                },
                complete: (results) => {
                    results.data.shift(); // don't need header
                    results.data.map((value, _) => {
                        allocs.add(value);
                    });
                },
            };

            Papa.parse(acceptedFiles[0], config);
            console.log(allocs.allocs);
        }
    }

    function handleBackBtn() {
        status.set($status - 1); // TODO: clear the storage
    }

    function portal_add_alloc(vals: string[]) {
        allocs.add(vals);
    }
</script>

<h1>Add your allocations allocation</h1>
<Button on:click={handleBackBtn}>
    <Label>Back</Label>
</Button>

<div>
    <TabBar {tabs} let:tab bind:active>
        <Tab {tab}>
            <Icon class="material-icons">{tab.icon}</Icon>
            <Label>{tab.label}</Label>
        </Tab>
    </TabBar>

    {#if active.label == "By file"}
        <Dropzone
            on:droprejected={() => console.log("provide a csv file pls")}
            on:drop={handleFileSelect}
            accept=".csv"
        />
    {:else}
        <AllocEntry portal={portal_add_alloc} />
    {/if}
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
