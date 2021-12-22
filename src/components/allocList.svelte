<script lang="ts">
    import Accordion, { Panel, Header, Content } from "@smui-extra/accordion";
    import IconButton, { Icon } from "@smui/icon-button";
    import type { allocRec } from "./allocRecords.svelte";
    import AllocChart from "./allocChart.svelte";
    import { onDestroy } from "svelte";

    export let allocs;

    let list_render = $allocs;

    const unsubscribe = allocs.subscribe((v) => {
        list_render = v;
    });

    $: accKeys =
        list_render.get_names().length == 0
            ? []
            : list_render.get_names().map((value, index) => {
                  return {
                      index: index,
                      value: value,
                  };
              }); // array of names

    const accState =
        accKeys == undefined ? [] : Array(accKeys.length).fill(false); // accordion states

    const make_array = (o): any[] => {
        // turn object to array
        const arr = [];

        Object.keys(o).forEach((value) => {
            arr.push({
                ass: value, // name of assignment
                value: o[value], // interval object
            });
        });
        return arr;
    };

    onDestroy(unsubscribe);
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
                    {#each make_array(list_render.get_via_name(rec.value)) as ass_val}
                        <AllocChart
                            assignment_name={ass_val.ass}
                            int={ass_val.value}
                        />
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
