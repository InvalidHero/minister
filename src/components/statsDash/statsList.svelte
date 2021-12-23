<script lang="ts">
    /*
    TODO: 
    - If there are less than 2 charts then no comparison chart will be given
    */
    import Accordion, { Panel, Header, Content } from "@smui-extra/accordion";
    import Button, { Label } from "@smui/button";
    import StatsTable from "./statsTable.svelte";

    export let overall_data;
    export let filtered_data; // filtered and rendered

    //TODO: sort before display, do the same for the alloc lists
    function stackClick() {}
</script>

<Accordion multiple>
    <Panel>
        <Header>Overall</Header>
        <Content>
            <StatsTable data={overall_data} />
            <Button on:click={stackClick} variant="raised">
                <Label>Stack</Label>
            </Button>
        </Content>
    </Panel>
    {#each filtered_data as alloc}
        <Panel>
            <Header>{alloc.name}</Header>
            <Content>
                <StatsTable data={alloc.data} />
                <Button on:click={stackClick} variant="raised">
                    <Label>Stack</Label>
                </Button>
            </Content>
        </Panel>
    {/each}
</Accordion>

<style>
    :global(div.smui-accordion__header__title) {
        text-align: left;
    }
</style>
