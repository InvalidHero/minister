<script lang="ts" context="module">
    import Papa from "papaparse";

    export function load_file(f: File, set_data: Function, set_stor: boolean) {
        const FSN: string = "Surname";
        const FFN: string = "Firstname";
        const file_content: Record<string, any>[] = [];

        if (set_stor) {
            f.text().then((str: string) => {
                window.localStorage.setItem("data", str);
            });
        }

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

    export function update_alloc(value: string[]) {
        // handle local storage
        if (window.localStorage.getItem("allocations") == null) {
            const temp: string[][] = [];
            temp.push(value);
            window.localStorage.setItem("allocations", JSON.stringify(temp));
        } else {
            const temp: string[][] = JSON.parse(
                window.localStorage.getItem("allocations")
            );
            // TODO: can add a procedure to stop spamming
            temp.push(value);
            window.localStorage.setItem("allocations", JSON.stringify(temp));
        }
    }
</script>
