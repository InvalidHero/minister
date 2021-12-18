<script lang="ts">
    import "../../node_modules/svelte-material-ui/bare.css";
    import Accordion, { Panel, Header, Content } from "@smui-extra/accordion";
    import IconButton, { Icon } from "@smui/icon-button";
    import { allocRec } from "./allocRecords.svelte";
    import { Separator } from "@smui/list";

    export let allocs;
    // const accState = Array(4).fill(false);

    const test = new allocRec();

    const accKeys = Object.keys(test.allocs).map((value, index) => {
        return {
            index: index,
            value: value,
        };
    }); // array of names
    const accState: boolean[] = Array(accKeys.length).fill(false); // accordion states
</script>

<div>
    <!-- {#each options as item}
        
    {/each} -->
</div>

<br />
<div class="accordion-container">
    <Accordion>
        {#each accKeys as key}
            <p>{key.index}</p>
        {/each}

        <!-- <Panel color="secondary" bind:open={accState[0]}>
            <Header>
                Panel 1
                <span slot="description">Description of panel 1.</span>
                <IconButton slot="icon" toggle pressed={accState[0]}>
                    <Icon class="material-icons" on>expand_less</Icon>
                    <Icon class="material-icons">expand_more</Icon>
                </IconButton>
            </Header>
            <Content>The content for panel 1.</Content>
        </Panel>
        <Panel color="secondary" bind:open={accState[1]}>
            <Header>
                Panel 2
                <span slot="description">Description of panel 2.</span>
                <IconButton slot="icon" toggle pressed={accState[1]}>
                    <Icon class="material-icons" on>expand_less</Icon>
                    <Icon class="material-icons">expand_more</Icon>
                </IconButton>
            </Header>
            <Content>The content for panel 2.</Content>
        </Panel>
        <Panel color="secondary" bind:open={accState[2]}>
            <Header>
                Panel 3
                <span slot="description">Description of panel 3.</span>
                <IconButton slot="icon" toggle pressed={accState[2]}>
                    <Icon class="material-icons" on>expand_less</Icon>
                    <Icon class="material-icons">expand_more</Icon>
                </IconButton>
            </Header>
            <Content>The content for panel 3.</Content>
        </Panel>
        <Panel color="secondary" bind:open={accState[3]}>
            <Header>
                Panel 4
                <span slot="description">Description of panel 4.</span>
                <IconButton slot="icon" toggle pressed={accState[3]}>
                    <Icon class="material-icons" on>expand_less</Icon>
                    <Icon class="material-icons">expand_more</Icon>
                </IconButton>
            </Header>
            <Content>The content for panel 4.</Content>
        </Panel> -->
    </Accordion>
</div>
