<script lang="ts">
    import "@carbon/charts/styles.min.css";
    import "carbon-components/css/carbon-components.min.css";
    import { AreaChart, BarChartGrouped } from "@carbon/charts-svelte";
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

    $: collective_data_str = final_collect(occ_od, occ_fd, true);
    $: collective_data_num = final_collect(occ_od, occ_fd, false);

    function final_collect(
        occ_od,
        occ_fd,
        str: boolean
    ): Record<string, any>[] {
        if (str) {
            return occ_od.concat(occ_fd).map((v) => {
                v.key = v.key.toString();
                return v;
            });
        } else {
            return occ_od.concat(occ_fd);
        }
    }

    let bar_opts: Record<string, any> = {
        title: "Discrete Grouped Scores",
        axes: {
            left: {
                mapsTo: "value",
                title: "frequency",
                // stacked: true,
            },
            bottom: {
                mapsTo: "key",
                scaleType: "labels",
                title: "discrete marks",
                // domain: [0 - EPSILON, MAX + EPSILON],
            },
        },
        height: "400px",
    };

    const line_opts: Record<string, any> = {
        title: "Line Grouped Marks",
        animations: true,
        axes: {
            left: {
                mapsTo: "value",
                title: "frequency",
            },
            bottom: {
                title: "marks",
                mapsTo: "key",
                scaleType: "linear",
                domain: [0 - EPSILON, MAX + EPSILON],
            },
        },
        // curve: "curveMonotoneX",
        curve: "curveNatural",
        height: "400px",
    };
</script>

<div>
    {#if bar == true}
        <BarChartGrouped data={collective_data_str} options={bar_opts} />
    {:else}
        <div>
            <AreaChart data={collective_data_num} options={line_opts} />
        </div>
    {/if}
</div>
