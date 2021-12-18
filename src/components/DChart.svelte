<script lang="ts">
    import "@carbon/charts/styles.min.css";
    import "carbon-components/css/carbon-components.min.css";
    import { ComboChart } from "@carbon/charts-svelte";
    import "../../node_modules/svelte-material-ui/bare.css";
    import Button, { Label } from "@smui/button";

    export let status;

    const MAX = 20;
    const VIEW = 0.97;
    const EPSILON = (((1 - VIEW) * MAX) / 2) * VIEW; // make plots look better

    export const data = [
        16, 14, 16, 10, 19, 17, 14, 15, 20, 20, 18, 2, 7, 6, 4, 20, 1, 16, 16,
        18, 0, 20, 20, 20, 19, 20, 16, 16, 10, 19, 0, 20, 20, 15, 20, 4, 0, 10,
        20, 20, 20, 19, 20, 20, 17, 20, 17, 15, 18, 11, 16, 16,
    ]; // dummy data for now

    const temp: Object = data.reduce(
        (p, c) => ({
            ...p,
            [c]: { group: c, value: p[c]?.["value"] + 1 || 1 },
        }),
        {}
    ); // Reduce to frequency histrogram

    Array(MAX + 1)
        .fill(0)
        .forEach((_, i: number) => {
            if (!(i in temp)) {
                temp[i] = { group: i, value: 0 };
            }
        }); // Fill in values with no occurrence

    const freq_hist: Record<number, any>[] = Object.keys(temp).map(
        (key: string) => temp[key]
    ); // cram in frequency

    const copts = {
        title: "Distribution of marks ",
        axes: {
            bottom: {
                mapsTo: "group",
                title: "Marks",
                includeZero: false,
                domain: [0 - EPSILON, MAX + EPSILON],
            },
            left: {
                mapsTo: "value",
                title: "Occurrence",
                scaleType: "linear",
            },
        },
        curve: "curveMonotoneX",
        comboChartTypes: [
            {
                type: "simple-bar",
                correspondingDatasets: Array(MAX + 1)
                    .fill(0)
                    .map((_, i) => i),
            },
        ],
        height: "500px",
    }; // options for plot
</script>

<div>
    <Button on:click={() => status.set($status - 1)} variant="raised">
        <Label>Back</Label>
    </Button>
</div>

<div>
    <ComboChart data={freq_hist} options={copts} />
</div>
