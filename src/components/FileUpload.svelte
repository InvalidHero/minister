<script lang="ts">
    import Dropzone from "svelte-file-dropzone";
    import { load_file } from "./generalUtils.svelte";

    export let status;
    export let set_data;

    // const file_content: Record<string, any>[] = []; // local
    let maxs: Record<string, number>;

    function handleFileSelect(e) {
        const { acceptedFiles, fileRejections } = e.detail;
        if (fileRejections.length == 0) {
            load_file(acceptedFiles[0], set_data, true);
            status.set(1);
        }
    }
</script>

<!-- <h1>Please upload file</h1> -->
<Dropzone
    on:droprejected={() => console.log("provide a csv file pls")}
    on:drop={handleFileSelect}
    accept=".csv"
    containerClasses="drop-zone-class"
    containerStyles="padding-top: 17% ;padding-bottom: 15%;"
    disableDefaultStyles={false}
/>

<!-- containerStyles="padding-top: 19% ;padding-bottom: 15%;" -->
<style>
    :global(.drop-zone-class) {
        min-height: 300px;
    }
</style>
