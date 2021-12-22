<script lang="ts">
    import Button, { Label } from "@smui/button";
    import { interval } from "./allocRecords.svelte";
    import Textfield from "@smui/textfield";
    import Autocomplete from "@smui-extra/autocomplete";

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
                    portal([name, assignment, s1, f1, s2, f2]);
                    console.log("success."); //TODO: snack bar
                }
            } else {
                console.log(`Assignment name of ${assignment} does not exist.`); //TODO: snack bar
            }
        }
    };
</script>

<div>
    <Textfield bind:value={name} label="Name" variant="filled" />
</div>
<div>
    <Textfield bind:value={assignment} label="Assignment" variant="filled" />
</div>

<div>
    <Autocomplete
        options={letters}
        bind:value={s1}
        label="Starting Surname"
        textfield$variant="filled"
    />
</div>

<div>
    <Autocomplete
        options={letters}
        bind:value={f1}
        label="Starting Firstname"
        textfield$variant="filled"
    />
</div>

<div>
    <Autocomplete
        options={letters}
        bind:value={s2}
        label="Ending Surname"
        textfield$variant="filled"
    />
</div>

<div>
    <Autocomplete
        options={letters}
        bind:value={f2}
        label="Ending Firstname"
        textfield$variant="filled"
    />
</div>

<br />

<div>
    <Button on:click={handleSubmit} variant="raised">
        <Label>Add Entry</Label>
    </Button>
</div>
