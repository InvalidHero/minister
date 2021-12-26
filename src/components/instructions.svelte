<script lang="ts">
    export let variant: string;
</script>

{#if variant == "upload"}
    <div>
        <p>
            Drag and drop or select from the popup above to upload the data as a
            file for analysis. Please make sure that the file fits the criteria
            below:
        </p>

        <p class="list-item">
            Columns (must be included as the header of the <code>.csv</code>
            file) should be in the format of
            <code>"Firstname, Surname, ass1_name, ass2_name, ..."</code>.
        </p>
        <p class="list-item">
            Maximums of each of the assignments must be given by setting the
            first row of the file/data to be <code
                >"MAX, MAX, max_ass1, max_ass2, ..."</code
            >.
        </p>
        <p class="list-item">
            Except for Firstname and Surname, scores of each assignment should
            be numeric. <strong
                >However, if any of the values are not numeric it will be
                treated as a <code>0</code></strong
            >.
        </p>
    </div>
{/if}

<style>
    p {
        text-align: left;
    }

    .list-item::before {
        content: "- ";
    }

    p.list-item {
        padding-left: 3em;
    }
</style>
