<script>
    import "carbon-components-svelte/css/all.css";
    import { Theme, Button } from "carbon-components-svelte";

    import { themeState } from "../store/state";
</script>

<div>
    <Theme bind:theme={$themeState} />
    <nav>
        <ul>
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/settings">Settings</a>
            </li>
        </ul>
    </nav>
    <Button>this is a button</Button>
    <slot />
</div>

<style>
    div {
        /* background-color: brown; */
        min-height: 100vh;
    }
</style>
