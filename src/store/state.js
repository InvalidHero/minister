import { writable } from "svelte/store";
import { browser } from "$app/env";

const globalStore = (name, initialValue, toStorage = [], fromStorage = []) => {
    if (browser && window?.localStorage) {
        const storedState = window.localStorage.getItem(name);

        if (storedState) {
            initialValue = fromStorage.reduce((acc, fn) => fn(acc), storedState);
        }
    }
    const { subscribe, set } = writable(initialValue);

    return {
        subscribe,

        set: (x) => {
            if (browser && window?.localStorage) {
                window.localStorage.setItem(name, toStorage.reduce((acc, fn) => fn(acc), x));
            }
            set(x);
        }
    }
}

export const themeState = globalStore('theme', 'g90');
export const globalObject = globalStore('object', { items: [1, 2, 3], darkmode: false }, [JSON.stringify], [JSON.parse]);