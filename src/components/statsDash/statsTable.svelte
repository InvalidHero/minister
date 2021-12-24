<script lang="ts">
    import {
        mean,
        median,
        sampleStandardDeviation,
        interquartileRange,
        sampleSkewness,
    } from "simple-statistics";
    import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";

    export let data: number[];
    export let maxa;
    export let ass_name;

    $: dispList = get_list(data, maxa, ass_name);

    function get_list(data, maxa, ass_name) {
        return [
            {
                name: "Mean",
                value: mean(data).toFixed(2),
            },
            {
                name: "Median",
                value: median(data).toFixed(2),
            },
            {
                name: "Standard Deviation",
                value: sampleStandardDeviation(data).toFixed(2),
            },
            {
                name: "Interquartile Range",
                value: interquartileRange(data).toFixed(2),
            },
            {
                name: "Skewness",
                value: sampleSkewness(data).toFixed(2),
            },
            {
                name: "Maximum",
                value: maxa[ass_name],
            },
        ];
    }
</script>

<DataTable table$aria-label="Statistics List">
    <Head>
        <Row>
            {#each dispList as dp}
                <Cell numeric>{dp.name}</Cell>
            {/each}
        </Row>
    </Head>
    <Body>
        <Row>
            {#each dispList as dp}
                <Cell numeric>{dp.value}</Cell>
            {/each}
        </Row>
    </Body>
</DataTable>
