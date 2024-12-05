import { onDestroy } from "svelte";
import Cookies from "js-cookie";

export function onInterval(callback, milliseconds) {
    const interval = setInterval(callback, milliseconds);

    onDestroy(() => {
        clearInterval(interval);
    });
}

export function validateUser() {
    if (!Cookies.get("session")) {
        window.location.href = "";
        return false;
    } else {
        return true;
    }
}
