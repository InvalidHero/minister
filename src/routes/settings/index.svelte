<script>
    import { themeState, globalObject } from "../../store/state";
    export const ssr = false;
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

<input type="text" bind:value={$themeState} />

<p>{$themeState}</p>
<p>{JSON.stringify($themeState, null, "")}</p>

<style>
    h1 {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
            Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    }
</style>
