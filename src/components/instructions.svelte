<script lang="ts">
    import Paper, { Title, Subtitle, Content } from "@smui/paper";
    export let variant: string;
</script>

{#if variant == "upload"}
    <Paper elevation={2}>
        <div>
            <p>
                ✨ Drag and drop or select from the popup above to upload the
                data as a file for analysis. Please make sure that the file fits
                the criteria below:
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
                Except for Firstname and Surname, scores of each assignment
                should be numeric. <strong
                    >However, if any of the values are not numeric it will be
                    treated as a <code>0</code></strong
                >.
            </p>
        </div>
    </Paper>
{:else if variant == "allocations"}
    <Paper elevation={2}>
        <div>
            <p>
                ✨ You can add the allocations of each marker either by file or
                form. If you are adding allocations by file, please make sure
                that
            </p>
            <p class="list-item">
                Columns of the file (must be included as the header with the <code
                    >.csv</code
                >
                file) must be
                <code
                    >Tutor Name, Question, Surname, Firstname, Surname,
                    Firstname</code
                >.
            </p>
            <p class="list-item">
                All <code>Surname</code> and <code>Firstname</code> entries should
                be given a single capital letter that marks the start and end of
                the corresponding allocation.
            </p>
            <br />
            <p>
                After adding the allocations of each marker for each assignment,
                you can check out a visualization of the allocations below or
                get your current allocations as a <code> .csv </code> file.😈
            </p>
        </div>
    </Paper>
{/if}

<style>
    p {
        text-align: left;
    }

    .list-item::before {
        /* content: "-- "; */
        content: "🔔 ";
    }

    p.list-item {
        padding-left: 3em;
    }

    code {
        background: rgb(231, 231, 231);
    }
</style>
