<script>
    import ApiService from "../util/api-service";

    let apiService = new ApiService();
    let { watchlist = $bindable() } = $props();
    let searchResults = $state([]);
    let symbol = $state('');

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
        watchlist["watchlist-entries"].sort((a, b) => a.symbol.localeCompare(b.symbol));
    }
</script>

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
</form>