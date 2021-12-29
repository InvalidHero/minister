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
        const temp_rec: Record<number, number> = {}; // collecting occurrence
        data.forEach((v: number) => {
            if (v in temp_rec) {
                temp_rec[v]++;
            } else {
                temp_rec[v] = 1;
            }
        });

        Object.keys(temp_rec).forEach((v) => {
            // filters out the none
            const t = parseInt(v);
            if (!Number.isInteger(t)) {
                temp_rec[Math.floor(t)]++;
                delete temp_rec[v];
            }
        });

        Array(max + 1)
            .fill(0)
            .forEach((_, i: number) => {
                if (!(i in temp_rec)) {
                    temp_rec[i] = 0;
                }
            }); // Fill in values with no occurrence

        const formatted: Record<string, any>[] = Object.keys(temp_rec).map(
            (v: string) => {
                return {
                    group: name,
                    key: parseInt(v),
                    value: temp_rec[v],
                };
            }
        );

        return formatted; // returns an array
    }
</script>
