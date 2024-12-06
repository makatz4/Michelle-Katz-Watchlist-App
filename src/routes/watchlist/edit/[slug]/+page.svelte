<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import ApiService from "../../../../util/api-service";
    import { Firework } from "svelte-loading-spinners";
    import LoadingSpinner from "../../../../components/loading-spinner.svelte";
    import Cookies from "js-cookie";

    let apiService = new ApiService();
    let watchlist = $state({
        "name": decodeURI($page.url.pathname.split('/')[3]),
        "watchlist-entries": []
    });
    let symbol = $state('');
    let searchResults = $state([]);
    let saveError = $state(false);
    let loading = $state(true);

    onMount(() => {
        watchlist.name = decodeURI($page.url.pathname.split('/')[3]);
        getWatchlist();
    })

    function getWatchlist() {
        apiService.getWatchlist(watchlist.name).then(res => {
            watchlist["watchlist-entries"] = res.data.data["watchlist-entries"] || [];
            watchlist["watchlist-entries"] = watchlist["watchlist-entries"].sort((a, b) => a.symbol.localeCompare(b.symbol));
            loading = false;
        }).catch(error => {
            console.log(error);
        });
    }

    function saveWatchlist() {
        apiService.updateWatchlist(watchlist).then(() => {
            window.location.href = "/watchlist";
        }).catch(error => {
            console.log(error);
            saveError = true;
        })
    }

    function addToWatchlist(input) {
        watchlist["watchlist-entries"].push({
            'symbol': input.symbol,
            'instrument-type': input["instrument-type"]
        });
        symbol = '';
        searchResults = [];
        watchlist["watchlist-entries"].sort((a, b) => a.symbol.localeCompare(b.symbol));
    }

    function deleteWatchlist() {
        apiService.deleteWatchlist(watchlist.name).then(() => {
            window.location.href = '/watchlist';
        }).catch(error => {
            console.log(error);
        })
    }

    function updateEntries(symbol) {
        watchlist["watchlist-entries"] = watchlist["watchlist-entries"].filter(s => s.symbol != symbol);
    }

    function search() {
        apiService.searchSymbol(symbol).then(res => {
            searchResults = res.data.data.items;
        })
    }
</script>

<div class="container">
    <div class="flex flex-row items-center justify-around">
        <h1 class="text-indigo-600 text-2xl m-10 font-bold">Edit Watchlist: {watchlist.name}</h1>
        <div class="flex flex-row">
            <button type="submit" class="btn btn-primary my-1 shadow mx-3" onclick={saveWatchlist}>Save Watchlist</button>
            <button class="btn btn-outline btn-error shadow my-1" onclick={deleteWatchlist}>Delete watchlist</button>
        </div>
    </div>
    <div class="flex flex-row w-full items-start justify-around">
        <div>
            {#if !loading}
            <h2 class="text-indigo-500 text-xl font-semibold">Watchlist Entries</h2>
            <ul>
                {#each watchlist["watchlist-entries"] as entry, i}
                    <div class="flex flex-row items-center mt-2 justify-between">
                        <li class="mx-3">{entry.symbol}</li>
                        <button aria-label={'Delete ' + entry.symbol} class="btn btn-square btn-outline btn-error btn-sm shadow" onclick={() => updateEntries(entry.symbol)}>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6"
                                fill="currentColor"
                                viewBox="0 0 48 48"
                                stroke="currentColor">
                                <path 
                                    stroke-width="1"
                                    d="M 24 4 C 20.491685 4 17.570396 6.6214322 17.080078 10 L 10.238281 10 A 1.50015 1.50015 0 0 0 9.9804688 9.9785156 A 1.50015 1.50015 0 0 0 9.7578125 10 L 6.5 10 A 1.50015 1.50015 0 1 0 6.5 13 L 8.6386719 13 L 11.15625 39.029297 C 11.427329 41.835926 13.811782 44 16.630859 44 L 31.367188 44 C 34.186411 44 36.570826 41.836168 36.841797 39.029297 L 39.361328 13 L 41.5 13 A 1.50015 1.50015 0 1 0 41.5 10 L 38.244141 10 A 1.50015 1.50015 0 0 0 37.763672 10 L 30.919922 10 C 30.429604 6.6214322 27.508315 4 24 4 z M 24 7 C 25.879156 7 27.420767 8.2681608 27.861328 10 L 20.138672 10 C 20.579233 8.2681608 22.120844 7 24 7 z M 11.650391 13 L 36.347656 13 L 33.855469 38.740234 C 33.730439 40.035363 32.667963 41 31.367188 41 L 16.630859 41 C 15.331937 41 14.267499 40.033606 14.142578 38.740234 L 11.650391 13 z M 20.476562 17.978516 A 1.50015 1.50015 0 0 0 19 19.5 L 19 34.5 A 1.50015 1.50015 0 1 0 22 34.5 L 22 19.5 A 1.50015 1.50015 0 0 0 20.476562 17.978516 z M 27.476562 17.978516 A 1.50015 1.50015 0 0 0 26 19.5 L 26 34.5 A 1.50015 1.50015 0 1 0 29 34.5 L 29 19.5 A 1.50015 1.50015 0 0 0 27.476562 17.978516 z">
                                </path>
                                </svg>
                        </button>
                    </div>
                {/each}
            </ul>
            {:else}
                <LoadingSpinner />
            {/if}
        </div>
        <div>
            <h2 class="text-indigo-500 text-xl font-semibold">Add new symbol</h2>
            <form class="form-control w-full">
                <label class="input input-bordered input-md flex items-center gap-2 my-1 shadow">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    class="h-4 w-4 opacity-70">
                    <path
                        fill-rule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clip-rule="evenodd" />
                    </svg>
                    <input type="text" class="grow" id="search" placeholder="Search for a symbol" bind:value={symbol} oninput={search} />
                </label>
                {#if searchResults.length > 0}
                    <div class="border-solid border border-neutral-300 rounded-b-lg flex flex-col items-start h-26 overflow-scroll">
                        {#each searchResults as result}
                            <button onclick={() => { addToWatchlist(result) }} class="w-full hover:bg-indigo-300">{result.symbol}</button>
                        {/each}
                    </div>
                {/if}
                {#if saveError}
                    <p class="text-error">Save failed. Please try again.</p>
                {/if}
            </form>
        </div>
    </div>
</div>