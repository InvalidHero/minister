<script>
    import { globalState, globalObject } from "../../store/state";
</script>

<h1>Settings</h1>
<p>Change stuff here</p>

<p>Files</p>
<ul>
    {#each $globalObject.items as item}
        <li>{item}</li>
    {/each}
</ul>

<p>darkmode</p>
<input type="checkbox" bind:checked={$globalObject.darkmode} />

<input type="text" bind:value={$globalState} />

<p>{$globalState}</p>
<p>{JSON.stringify($globalState, null, "")}</p>

<style>
    h1 {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
            Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    }
</style>
