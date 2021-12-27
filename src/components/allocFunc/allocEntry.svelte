<script lang="ts">
    import Button, { Label } from "@smui/button";
    import { interval } from "./allocRecords.svelte";
    import Textfield from "@smui/textfield";
    import Autocomplete from "@smui-extra/autocomplete";
    import { update_alloc } from "../generalUtils.svelte";
    import LayoutGrid, { Cell } from "@smui/layout-grid";

    export let portal; // prop
    export let maxa;

    let letters: string[] = Array(26)
        .fill(0)
        .map((_, index) => String.fromCharCode("A".charCodeAt(0) + index));

    let name = "";
    let assignment = "";
    let s1 = "";
    let f1 = "";
    let s2 = "";
    let f2 = "";

    let checker = new interval();

    const handleSubmit = () => {
        if (name != "" && assignment != "") {
            if (assignment in maxa) {
                if (
                    checker.s2i_convert(s1 + f1) > checker.s2i_convert(s2 + f2)
                ) {
                    console.log("please enter a valid allocation"); //TODO: snack bar
                } else {
                    update_alloc([name, assignment, s1, f1, s2, f2]);
                    portal([name, assignment, s1, f1, s2, f2]);
                    // console.log("success."); //TODO: snack bar
                }
            } else {
                console.log(`Assignment name of ${assignment} does not exist.`); //TODO: snack bar
            }
        }
    };
</script>

<div class="allocs-entry">
    <LayoutGrid>
        <Cell>
            <div class="input-cell">
                <Textfield bind:value={name} label="Name" variant="filled" />
            </div>
        </Cell>

        <Cell>
            <div class="input-cell">
                <Autocomplete
                    options={letters}
                    bind:value={s1}
                    label="Starting Surname"
                    textfield$variant="filled"
                />
            </div>
        </Cell>

        <Cell>
            <div class="input-cell">
                <Autocomplete
                    options={letters}
                    bind:value={s2}
                    label="Ending Surname"
                    textfield$variant="filled"
                />
            </div>
        </Cell>

        <Cell>
            <div class="input-cell">
                <Textfield
                    bind:value={assignment}
                    label="Assignment"
                    variant="filled"
                />
            </div>
        </Cell>

        <Cell>
            <div class="input-cell">
                <Autocomplete
                    options={letters}
                    bind:value={f1}
                    label="Starting Firstname"
                    textfield$variant="filled"
                />
            </div>
        </Cell>

        <Cell>
            <div class="input-cell">
                <Autocomplete
                    options={letters}
                    bind:value={f2}
                    label="Ending Firstname"
                    textfield$variant="filled"
                />
            </div>
        </Cell>
    </LayoutGrid>

    <br />

    <div>
        <Button on:click={handleSubmit} variant="raised">
            <Label>Add Entry</Label>
        </Button>
    </div>
</div>

<style>
    .input-cell {
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        /* background-color: var(--mdc-theme-secondary, #333);
        color: var(--mdc-theme-on-secondary, #fff); */
    }
    /* .allocs-entry {
        height: 100%;
    } */
</style>
