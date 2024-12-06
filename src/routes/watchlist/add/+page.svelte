<script>
    import { onMount } from "svelte";
    import ApiService from "../../../util/api-service";
    import Search from "../../../components/search.svelte";
    import Logout from "../../../components/logout.svelte";

    let apiService = new ApiService();

    let watchlist = {
        'name': '',
        'watchlist-entries': []
    }
    let symbol = '';
    let searchResults = [];
    let saveError = false;

    function addToWatchlist(input) {
        watchlist["watchlist-entries"].push({
            'symbol': input.symbol,
            'instrument-type': input["instrument-type"]
        });
        symbol = '';
        searchResults = [];
    }

    function saveWatchlist() {
        apiService.addNewWatchlist(watchlist).then(() => {
            window.location.href = "/watchlist";
        }).catch(error => {
            console.log(error);
            saveError = true;
        })
    }

</script>
<Logout />
<div class="flex items-center flex-col mt-10">
    <h1 class="text-2xl text-indigo-600">Add a new watchlist</h1>
    <div class="w-2/5">
        <label class="input input-bordered input-md flex items-center gap-2 my-1">
            <input type="text" class="grow" placeholder="Watchlist name" bind:value={watchlist.name} />
        </label>
        <Search bind:watchlist />
        <button type="submit" class="btn btn-primary my-1 shadow" onclick={saveWatchlist}>Save Watchlist</button>
        {#if saveError}
            <p class="text-error">Save failed. Please try again.</p>
        {/if}
    </div>
</div>

