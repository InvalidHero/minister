<script lang="ts">
    /*
    TODO:
    Sanity check the columns of the upload file
    */
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

<h1>Please upload file</h1>
<!-- //TODO: proper error message  -->
<Dropzone
    on:droprejected={() => console.log("provide a csv file pls")}
    on:drop={handleFileSelect}
    accept=".csv"
/>

<style>
    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }
</style>
