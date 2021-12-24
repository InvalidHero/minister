<script lang="ts">
    import "@carbon/charts/styles.min.css";
    import "carbon-components/css/carbon-components.min.css";
    import { BarChartStacked, StackedAreaChart } from "@carbon/charts-svelte";
    import { occ_collect } from "./statsUtil.svelte";

    export let overall_data: number[]; // overall data
    export let filtered_data: Record<string, any>[]; // array of records
    export let maxa: Record<string, number>;
    export let value: string; // assignment name
    export let bar: boolean;

    const MAX: number = maxa[value];
    const VIEW: number = 0.98;
    const EPSILON: number = (((1 - VIEW) * MAX) / 2) * VIEW;

    $: occ_od = occ_collect("Overall", overall_data, maxa[value]);
    $: occ_fd = filter_collect(filtered_data);

    const filter_collect = (filtered_data): Record<string, any>[] => {
        const temp: Record<string, any>[][] = filtered_data.map(
            (v: Record<string, any>) => {
                return occ_collect(v.name, v.data, maxa[value]);
            }
        );

        if (temp.length > 0) {
            return temp.reduce(
                (a: Record<string, any>[], b: Record<string, any>[]) => {
                    return a.concat(b);
                }
            );
        } else {
            return [];
        }
    };

    $: collective_data = final_collect(occ_od, occ_fd);

    function final_collect(occ_od, occ_fd): Record<string, any>[] {
        return occ_od.concat(occ_fd);
    }

    let opts: Record<string, any> = {
        title: "Discrete Stacked Scores",
        axes: {
            left: {
                mapsTo: "value",
                stacked: true,
            },
            bottom: {
                mapsTo: "key",
                scaleType: "linear",
                domain: [0 - EPSILON, MAX + EPSILON],
            },
        },
        height: "400px",
    };
    if (!bar) {
        opts["curve"] = "curveMonotoneX";
        opts.title = "Line Stacked Marks";
    }
</script>

<div>
    {#if bar == true}
        <BarChartStacked data={collective_data} options={opts} />
    {:else}
        <StackedAreaChart data={collective_data} options={opts} />
    {/if}
</div>
