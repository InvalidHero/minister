<script lang="ts" context="module">
    export function filter_via_alloc(data, ass_name, name, allocation) {
        const final: number[] = [];
        data.forEach((column) => {
            const letter_curr = column.Surname[0] + column.Firstname[0];
            // check if name is in allocation
            if (allocation.in(letter_curr)) {
                final.push(column[ass_name]);
            }
        });

        return { name: name, data: final };
    }

    export function occ_collect_mini(name, data, max): Record<number, number> {
        const temp: Record<string, any> = occ_collect(name, data, max);
        const ret: Record<number, number> = {};

        temp.forEach((v) => {
            ret[v.key] = v.value;
        });
        return ret;
    }

    export function occ_collect(name, data, max): Record<string, any>[] {
        // collect data into occurrences
        const temp: Record<string, any>[] = data.reduce(
            (p, c) => ({
                ...p,
                [c]: { group: name, key: c, value: p[c]?.["value"] + 1 || 1 },
            }),
            {}
        ); // Reduce to frequency histrogram

        Array(max + 1)
            .fill(0)
            .forEach((_, i: number) => {
                if (!(i in temp)) {
                    temp[i] = { group: name, key: i, value: 0 };
                }
            }); // Fill in values with no occurrence
        return Object.keys(temp).map((v) => temp[v]); // returns an array
    }
</script>
