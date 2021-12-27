<script lang="ts">
    import Accordion, { Panel, Header, Content } from "@smui-extra/accordion";
    import StatsTable from "./statsTable.svelte";
    import { occ_collect_mini } from "./statsUtil.svelte";
    import {
        LinkedChart,
        LinkedLabel,
        LinkedValue,
    } from "svelte-tiny-linked-charts";

    export let overall_data: number[];
    export let filtered_data: Record<string, any>[]; // filtered and rendered
    export let maxa: Record<string, number>[]; // maximum for each assignment
    export let ass_name: string;

    $: rod = [...overall_data];
    $: rfd = [...filtered_data];
</script>

<Accordion multiple>
    <Panel>
        <Header>Overall</Header>
        <Content>
            <div class="minigraph">
                <div class="minigraph-label; align: right;">
                    <LinkedLabel linked="link-1" empty="mark" />
                </div>
                <LinkedChart
                    data={occ_collect_mini("", rod, maxa[ass_name])}
                    linked="link-1"
                    showValue={true}
                    valueDefault="Empty label"
                    valuePrepend="frequency:"
                    grow={true}
                    height={80}
                />
            </div>
            <div>
                <StatsTable data={rod} {maxa} {ass_name} />
            </div>
        </Content>
    </Panel>
    {#each rfd as alloc}
        <Panel>
            <Header>
                {alloc.name}</Header
            >
            <Content>
                <div class="minigraph">
                    <div class="minigraph-label; align: right;">
                        <LinkedLabel linked="link-1" empty="mark" />
                    </div>
                    <LinkedChart
                        data={occ_collect_mini("", alloc.data, maxa[ass_name])}
                        linked="link-1"
                        showValue={true}
                        valueDefault="Empty label"
                        valuePrepend="frequency:"
                        grow={true}
                        height={80}
                    />
                </div>
                <div>
                    <StatsTable data={alloc.data} {maxa} {ass_name} />
                </div>
            </Content>
        </Panel>
    {/each}
</Accordion>

<style>
    :global(div.smui-accordion__header__title) {
        text-align: left;
    }
    .minigraph {
        float: left;
    }
</style>
