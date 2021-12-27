<script lang="ts">
    import Button, { Label } from "@smui/button";
    import Tab, { Icon } from "@smui/tab";
    import TabBar from "@smui/tab-bar";
    import Dropzone from "svelte-file-dropzone";
    import Papa from "papaparse";
    import AllocEntry from "./allocEntry.svelte";
    import AllocList from "./allocList.svelte";
    import { update_alloc, allocsv_gen } from "../generalUtils.svelte";
    import Dialog, { Title, Content, Actions } from "@smui/dialog";
    import Instruct from "../instructions.svelte";

    // [Tutor Name,Question Number,Surname,Firstname,Surname,Firstname]
    export let status;
    export let maxa;
    export let allocs;

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
                    results.data.forEach((value, _) => {
                        // check if assignment exists.
                        if (value[1] in maxa) {
                            $allocs.add(value);
                            update_alloc(value);
                        }
                    });
                    portal_add_alloc([]);
                },
            };
            Papa.parse(acceptedFiles[0], config);
        }
    }

    function portal_add_alloc(vals: string[]) {
        if (vals.length != 0) {
            $allocs.add(vals);
        }
        allocs.set($allocs); //trigger rerender
    } // for add entry via form

    let open = false;

    let csv_strings: string[] = allocsv_gen();
</script>

<!-- <h1>Add your allocations</h1> -->

<Dialog
    bind:open
    aria-labelledby="simple-title"
    aria-describedby="simple-content"
>
    <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
    <Title id="simple-title">CSV output</Title>
    <Content id="simple-content">
        {#each csv_strings as row}
            <code> {row} </code>
            <br />
        {/each}
    </Content>
    <Actions>
        <Button
            on:click={() => {
                open = false;
            }}
            variant="raised"
        >
            <Label>Back</Label>
        </Button>
    </Actions>
</Dialog>

<div>
    <TabBar {tabs} let:tab bind:active>
        <Tab {tab}>
            <Icon class="material-icons">{tab.icon}</Icon>
            <Label>{tab.label}</Label>
        </Tab>
    </TabBar>
    <br />
    <div class="alloc-select">
        {#if active.label == "By file"}
            <Dropzone
                on:droprejected={() => console.log("provide a csv file pls")}
                on:drop={(e) => {
                    handleFileSelect(e);
                }}
                accept=".csv"
                containerClasses="drop-zone-class"
                containerStyles="padding-top: 17% ;padding-bottom: 15%;"
                disableDefaultStyles={false}
            />
        {:else}
            <AllocEntry portal={portal_add_alloc} {maxa} />
        {/if}
    </div>
</div>
<br />

<Instruct variant={"allocations"} />

<AllocList {allocs} />

<br />

<div>
    <Button
        on:click={() => {
            open = true;
            csv_strings = allocsv_gen();
        }}
        variant="raised"
    >
        <Label>output as csv</Label>
    </Button>
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
    .alloc-select {
        min-height: 337px;
        display: flex;
        flex-direction: column;
    }
</style>
