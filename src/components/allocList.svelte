<script lang="ts">
    import "../../node_modules/svelte-material-ui/bare.css";
    import Accordion, { Panel, Header, Content } from "@smui-extra/accordion";
    import IconButton, { Icon } from "@smui/icon-button";
    import { allocRec } from "./allocRecords.svelte";

    export let allocs;

    const test: allocRec = new allocRec();

    test.add(["tutor1", "ass1", "A", "A", "Z", "Z"]);
    test.add(["tutor2", "ass1", "A", "A", "Z", "Z"]);
    test.add(["tutor3", "ass1", "A", "A", "Z", "Z"]);
    test.add(["tutor4", "ass1", "A", "A", "Z", "Z"]);

    const accKeys = Object.keys(test.allocs).map((value, index) => {
        return {
            index: index,
            value: value,
        };
    }); // array of names
    const accState: boolean[] = Array(accKeys.length).fill(false); // accordion states

    const make_array = (o): any[] => {
        // turn object to array
        const arr = [];

        Object.keys(o).forEach((value) => {
            arr.push({
                name: value,
                value: o[value],
            });
        });
        return arr;
    };
</script>

<br />

<div class="accordion-container">
    <Accordion>
        {#each accKeys as rec}
            <Panel bind:open={accState[rec.index]} extend>
                <Header class="header">
                    {rec.value}
                    <span slot="description" />
                    <IconButton
                        slot="icon"
                        toggle
                        pressed={accState[rec.index]}
                    >
                        <Icon class="material-icons" on>expand_less</Icon>
                        <Icon class="material-icons">expand_more</Icon>
                    </IconButton>
                </Header>
                <Content>
                    {#each make_array(test.get_via_name(rec.value)) as ass_val}
                        {ass_val.value}
                    {/each}
                </Content>
            </Panel>
        {/each}
    </Accordion>
</div>

<style>
    * :global(.accordion-container) {
        padding: 24px;
        background-color: var(--mdc-theme-background, #f8f8f8);
    }

    div :global(.smui-accordion__header__title) {
        text-align: left;
    }
</style>
