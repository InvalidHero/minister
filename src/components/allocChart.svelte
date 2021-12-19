<script lang="ts">
    // import "../../node_modules/@carbon/charts/styles.min.css";
    // import "carbon-components/css/carbon-components.min.css";
    import { MeterChart } from "@carbon/charts-svelte";
    import { interval } from "./allocRecords.svelte";

    export let assignment_name;
    export let int;

    const converter = new interval();

    const temp: number[][] = int.get_ranges().map((v) => {
        return [v.LB, v.UB];
    }); // conver to array

    const final: Record<string, any>[] = []; // final rendered list
    const entry_final = (name, value) => {
        return {
            group: name,
            value: value,
        };
    };

    for (let i = 0; i < temp.length; i++) {
        if (i == 0 && temp[i][0] > 1) {
            // not AA
            final.push(entry_final("unoccupied", temp[i][0] - 1));
        }

        final.push(
            // add current interval
            entry_final(
                converter.i2s_convert(temp[i][0]) +
                    " - " +
                    converter.i2s_convert(temp[i][1]),
                temp[i][1] - temp[i][0] + 1 // inclusive
            )
        );

        // check for blank behind it
        if (i == temp.length - 1) {
            if (temp[i][1] < 676) {
                // check for end
                final.push(entry_final("unoccupied", 676 - temp[i][1]));
            }
        } else {
            final.push(
                entry_final("unoccupied", temp[i + 1][0] - temp[i][1] - 1)
            );
        }
    }

    const options = {
        title: assignment_name,
        height: "80px",
        meter: {
            title: {
                percentageIndicator: {
                    enabled: true,
                },
            },

            proportional: {
                total: 676,
                unit: "AU",
                totalFormatter: (total) => "",
                breakdownFormatter: (x) => {
                    return "";
                },
            },
        },
        // tooltip: {
        //     valueFormatter: (v) => {
        //         if (typeof v == "number") {
        //             return "";
        //         }
        //         return "" + `${v}`;
        //     },
        // },
        legend: {
            enabled: false,
        },
        toolbar: {
            enabled: false,
        },
        color: {
            scale: { unoccupied: "black" },
            pairing: {
                option: 4,
            },
        },
    };
</script>

<MeterChart data={final} {options} />

<style>
    :global(div.spacer.layout-child) {
        display: none;
    }
    :global(text.proportional-meter-title) {
        font-size: 15px;
    }
    :global(p.title) {
        text-align: left;
    }
</style>
