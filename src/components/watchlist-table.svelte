<script>
    import { onMount } from "svelte";
    import { onInterval } from "../util/utils";
    import ApiService from "../util/api-service";

    let apiService = new ApiService();
    let { watchlistName = $bindable() } = $props();
    let watchlistEntries = $state([]);
   
    onMount(async () => {
        updateWatchlist();
    })

    $effect(() => {
        onInterval(updateWatchlist(), 100);
        onInterval(updateEntries, 5000);
    })

    function updateWatchlist() {
        apiService.getWatchlist(watchlistName).then(res => {
            watchlistEntries = res.data.data["watchlist-entries"];
            updateEntries();
        }).catch(error => {
            console.log(error);
        });
    }

    function updateEntries() {
        for(let i = 0; i < watchlistEntries.length; i++) {
            apiService.getMarketData(watchlistEntries[i].symbol).then(res => {
                watchlistEntries[i].ask = res.data.data.ask;
                watchlistEntries[i].bid = res.data.data.bid;
                watchlistEntries[i].last = res.data.data.last;
            })
        }
        watchlistEntries.sort((a, b) => a.symbol.localeCompare(b.symbol));
    }
</script>

{#if watchlistEntries.length > 0}
    <div class="overflow-x-auto mx-auto w-4/5 mt-5 h-3/5 overflow-y-scroll">
        <table class="table table-zebra table-pin-rows table-pin-cols">
            <thead>
                <tr>
                <th>Stock Symbol</th>
                <th>Bid Price</th>
                <th>Ask Price</th>
                <th>Last Price</th>
                </tr>
            </thead>
            <tbody>
                {#each watchlistEntries as entry}
                    <tr>
                        <td>{entry.symbol}</td>
                        <td>{entry.ask}</td>
                        <td>{entry.bid}</td>
                        <td>{entry.last}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
{:else}
    <div class="text-lg text-indigo-500 mx-auto mt-10">
        Click the 'Edit current watchlist' button to add symbols!
    </div>
{/if}

