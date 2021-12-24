<script lang="ts" context="module">
    const max = (a: number, b: number): number => {
        return a < b ? b : a;
    };

    const min = (a: number, b: number): number => {
        return a < b ? a : b;
    };

    export class allocRec {
        allocs: Record<string, Record<string, interval>> = {};
        add(value: string[]) {
            // 0 => name
            // 1 => assignment Name
            // 3, 4, 5, 6 => s1, f1, s2, f2

            if (!(value[0] in this.allocs)) {
                this.allocs[value[0]] = {};
            } // add name entry

            if (!(value[1] in this.allocs[value[0]])) {
                this.allocs[value[0]][value[1]] = new interval();
            } // add entry for assignment

            this.allocs[value[0]][value[1]].add(
                value[2],
                value[3],
                value[4],
                value[5]
            ); // add intervals
        }

        clear() {
            this.allocs = {}; // clearing the records
        }

        get_names() {
            // console.log(this.allocs);
            if (Object.entries(this.allocs).length == 0) {
                return [];
            } else {
                return Object.keys(this.allocs);
            }
        }

        get_via_name(name: string, array = false) {
            // alloc of name, assume name exists
            if (array) {
                return Object.keys(this.allocs[name]).map((v) => {
                    return {
                        index: v,
                        value: this.allocs[name][v],
                    };
                });
            } else {
                return this.allocs[name];
            }
        }

        get_interval(name: string, ass_name: string) {
            // assumes both exists, else undefined
            return this.allocs[name][ass_name];
        }
        // json_out() {
        //     const test = []; // not typing this...

        //     Object.keys(this.allocs).forEach((value, _) => {
        //         this.allocs[]t
        //     });
        // }
    }

    export class range {
        UB: number;
        LB: number;

        constructor(l1, l2) {
            this.LB = l1;
            this.UB = l2;
        }

        intersect(other: range): boolean {
            return !(other.LB > this.UB || this.LB > other.UB);
        }

        absorb(other: range): boolean {
            if (
                this.intersect(other) ||
                this.UB + 1 == other.LB ||
                other.UB + 1 == this.LB
            ) {
                this.LB = min(other.LB, this.LB);
                this.UB = max(other.UB, this.UB);
                return true;
            } else {
                return false; // no changes were made
            }
        }
        in(num: number) {
            return this.LB <= num && num <= this.UB;
        }
    }

    export class interval {
        /* interval are a set of ranges of allocations */
        struct: range[] = [];

        s2i_convert(int: string) {
            return (
                (int[0].charCodeAt(0) - "A".charCodeAt(0)) * 26 +
                (int[1].charCodeAt(0) - "A".charCodeAt(0) + 1)
            );
        }

        i2s_convert(num: number) {
            const off = "A".charCodeAt(0);
            const l1 = Math.trunc(num / 26) < 25 ? Math.trunc(num / 26) : 25;
            const l2 = num - 26 * l1;
            return (
                String.fromCharCode(off + l1) +
                String.fromCharCode(off + l2 - 1)
            );
        }

        maintain() {
            // complexity bounded by 2n...still pretty bad tho...
            this.struct.sort((a: range, b: range): number => {
                return a.LB > b.LB ? 1 : -1;
            }); // sort by lower bounds

            var keep = true;
            while (this.struct.length >= 2 && keep) {
                keep = false;
                for (var i = 0; i < this.struct.length - 1; i++) {
                    if (this.struct[i].absorb(this.struct[i + 1])) {
                        this.struct.splice(i + 1, 1); // delete the i + 1th
                        keep = true;
                        break;
                    }
                }
            }
        }

        add(S1: string, F1: string, S2: string, F2: string) {
            const curr_range = new range(
                this.s2i_convert(S1 + F1),
                this.s2i_convert(S2 + F2)
            );

            let inter: boolean = true; // union or not ?

            for (var i = 0; i < this.struct.length; i++) {
                if (this.struct[i].absorb(curr_range)) {
                    inter = false;
                    break;
                }
            }
            if (inter) this.struct.push(curr_range);
            this.maintain();
        }

        get_ranges() {
            return this.struct;
            // return all disjointed allocs in string
        }

        in(check: string) {
            const curr = this.s2i_convert(check);

            if (this.struct.length == 0) {
                return false;
            } else {
                for (let i = 0; i < this.struct.length; i++) {
                    if (this.struct[i].in(curr)) return true;
                }
                return false;
            }
        }
    }
</script>
