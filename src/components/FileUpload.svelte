<script lang="ts">
    /*
    TODO:
    Sanity check the columns of the upload file
    */
    import Dropzone from "svelte-file-dropzone";
    import Papa from "papaparse";

    export let status;
    export let set_data;

    const FSN: string = "Surname";
    const FFN: string = "Firstname";

    const file_content: Record<string, any>[] = []; // local
    let maxs: Record<string, number>;

    function check_format(f: File) {
        const config = {
            delimiter: ",",
            header: true,
            step: (result, _) => {
                if (Object.keys(result.data).length > 2) {
                    Object.keys(result.data).forEach((key, _) => {
                        if (key != FFN && key != FSN) {
                            result.data[key] = !isNaN(Number(result.data[key]))
                                ? +result.data[key]
                                : 0;
                        }
                    });
                    file_content.push(result.data);
                }
            },
            error: (err, file, inputElem, reason) => {
                console.log(reason); // TODO: error message here
                console.log(err); // TODO: error message here
            },
            complete: () => {
                const { Firstname, Surname, ...maxs } = file_content.shift();

                file_content.sort(
                    (a: Record<string, any>, b: Record<string, any>) => {
                        if (a[FSN] == b[FSN]) {
                            return a[FFN] > b[FFN] ? 1 : -1;
                        } else {
                            return a[FSN] > b[FSN] ? 1 : -1;
                        }
                    }
                );

                set_data(file_content, maxs);
            },
        };
        Papa.parse(f, config);
    }

    function handleFileSelect(e) {
        const { acceptedFiles, fileRejections } = e.detail;
        if (fileRejections.length == 0) {
            check_format(acceptedFiles[0]);
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
