<script lang="ts">
    import "../../node_modules/svelte-material-ui/bare.css";

    export let portal; // prop
    export let maxa;

    import Button, { Label } from "@smui/button";
    import Textfield from "@smui/textfield";
    import Autocomplete from "@smui-extra/autocomplete";

    let letters: string[] = Array(26)
        .fill(0)
        .map((_, index) => String.fromCharCode("A".charCodeAt(0) + index));

    let name = "";
    let assignment = "";
    let s1 = "A";
    let f1 = "A";
    let s2 = "Z";
    let f2 = "Z";

    const handleSubmit = () => {
        if (
            name != "" &&
            assignment != "" &&
            s1 in letters &&
            f1 in letters &&
            s2 in letters &&
            f2 in letters
        ) {
            portal([name, assignment, s1 + f1, s2 + f2]);
        }
    };
</script>

<div>
    <Textfield bind:value={name} label="Name" />
</div>
<div>
    <Textfield bind:value={assignment} label="Assignment" />
</div>

<div>
    <Autocomplete options={letters} bind:s1 label="Starting Surname" />
</div>

<div>
    <Autocomplete options={letters} bind:f1 label="Starting Firstname" />
</div>

<div>
    <Autocomplete options={letters} bind:s2 label="Ending Surname" />
</div>

<div>
    <Autocomplete options={letters} bind:f2 label="Ending Firstname" />
</div>

<br />

<div>
    <Button on:click={handleSubmit} variant="raised">
        <Label>Add Entry</Label>
    </Button>
</div>
