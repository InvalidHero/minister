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
</script>
