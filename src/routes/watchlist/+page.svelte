<script>
    import { onMount } from "svelte";
    import ApiService from "../../util/api-service";
    import WatchlistTable from "../../components/watchlist-table.svelte";
    import Logout from "../../components/logout.svelte";
    import { Firework } from 'svelte-loading-spinners';
    import LoadingSpinner from "../../components/loading-spinner.svelte";
    import Cookies from 'js-cookie';

    let apiService = new ApiService();
    let watchlists = $state([]);
    let currentWatchlistName = $state();
    let loading = $state(true);

    onMount(() => {
        apiService
        .getWatchlists()
        .then((res) => {
            watchlists = res.data.data.items;
            currentWatchlistName = watchlists[0]?.name;
            loading = false;
        })
        .catch((error) => {
            console.log(error);
        });
    })

    function addWatchlist() {
        window.location.href = '/watchlist/add';
    }

    function editWatchlist() {
        window.location.href = `/watchlist/edit/${currentWatchlistName}`;
    }
</script>

<div class="container flex flex-col w-full h-screen mx-auto">
    <Logout />
    <div class="flex flex-row justify-around items-center my-10">
        <h1 class='text-3xl text-indigo-600 font-bold'>My Watchlists</h1>
        <div class="flex flex-row justify-end">
            <button class="btn btn-primary my-1 mx-3 shadow" onclick={addWatchlist}>Create a new watchlist</button>
            <button class="btn btn-accent my-1 shadow" onclick={editWatchlist}>Edit current watchlist</button>
        </div>
    </div>
    
    {#if watchlists.length > 0 && !loading}
        <label for="watchlists" class="w-full max-w-xs mx-auto">
            <div class="label">
                <span class="label-text text-indigo-500 font-light text-sm">Select a watchlist to view</span>
            </div>
            <select class="select select-bordered w-full max-w-xs mx-auto text-black" bind:value={currentWatchlistName} name="watchlists">
                {#each watchlists as list, i}
                    {#if i === 0}
                        <option selected>{list.name}</option>
                    {:else}
                        <option>{list.name}</option>
                    {/if}
                {/each}
            </select>
        </label>
       <WatchlistTable bind:watchlistName={currentWatchlistName} />
    {:else if !loading} 
        <div class="flex flex-col items-center">
            <h2 class="text-2xl text-indigo-500 mx-10 my-5 font-semibold">No watchlists to display</h2>
        </div>
    {:else} 
        <LoadingSpinner />
    {/if}
</div>
