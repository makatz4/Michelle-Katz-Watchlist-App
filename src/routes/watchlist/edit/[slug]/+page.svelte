<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import ApiService from "../../../../util/api-service";
    import { Firework } from "svelte-loading-spinners";
    import LoadingSpinner from "../../../../components/loading-spinner.svelte";

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
            loading = false;
        }).catch(error => {
            console.log(error);
        });
    }

    function saveWatchlist() {
        apiService.updateWatchlist(watchlist).then(res => {
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
    }

    function deleteWatchlist() {
        apiService.deleteWatchlist(watchlist.name).then(res => {
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
                        <button class="btn btn-outline btn-error btn-sm shadow" onclick={() => updateEntries(entry.symbol)}>Delete</button>
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