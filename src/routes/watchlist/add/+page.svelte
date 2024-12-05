<script>
    import ApiService from "../../../util/api-service";

    let apiService = new ApiService();

    let watchlist = {
        'name': '',
        'watchlist-entries': []
    }
    let symbol = '';
    let searchResults = [];
    let saveError = false;

    function search() {
        apiService.searchSymbol(symbol).then(res => {
            searchResults = res.data.data.items;
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

    function saveWatchlist() {
        apiService.addNewWatchlist(watchlist).then(res => {
            window.location.href = "/watchlist";
        }).catch(error => {
            console.log(error);
            saveError = true;
        })
    }

</script>

<div class="flex items-center flex-col mt-10">
    <h1 class="text-2xl text-indigo-600">Add a new watchlist</h1>
    <form class="form-control w-2/5">
        <label class="input input-bordered input-md flex items-center gap-2 my-1">
            <input type="text" class="grow" placeholder="Watchlist name" bind:value={watchlist.name} />
        </label>
        <label class="input input-bordered input-md flex items-center gap-2 my-1">
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
                    <button onclick={() => { addToWatchlist(result) }} class="w-full">{result.symbol}</button>
                {/each}
            </div>
        {/if}
        <button type="submit" class="btn btn-primary my-1 shadow" onclick={saveWatchlist}>Save Watchlist</button>
        {#if saveError}
            <p class="text-error">Save failed. Please try again.</p>
        {/if}
    </form>
</div>

