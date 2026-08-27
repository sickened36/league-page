<script>
	import LinearProgress from '@smui/linear-progress';
	import { PageShell, SeasonSwitcher, TransactionsPage } from '$lib/components'
    import { waitForAll } from '$lib/utils/helper';

    export let data;
    const {season, show, query, page, playersData, transactionsData, leagueTeamManagersData} = data;

	const perPage = 10;
</script>

<style>
    #main {
        position: relative;
        z-index: 1;
        display: block;
        margin: 0 auto;
		width: 100%;
        overflow-y: hidden;
    }

	.loading {
		display: block;
		position: relative;
		z-index: 1;
		width: 85%;
		max-width: 500px;
		margin: 80px auto;
	}
</style>

<PageShell eyebrow="League Wire" title="Transactions" description="Track every trade, waiver claim and roster move shaping the season." icon="swap_horiz">
<SeasonSwitcher {season} basePath="/transactions" />
<div id="main" class="page-panel">
    {#await waitForAll(transactionsData, playersData, leagueTeamManagersData)}
        <div class="loading" >
            <p>Loading league transactions...</p>
            <LinearProgress indeterminate />
        </div>
    {:then [{transactions, currentTeams}, playersInfo, leagueTeamManagers]}
        {@const seasonTransactions = (transactions || []).filter((transaction) => String(transaction.season) === String(season))}
        {#if seasonTransactions.length}
            <TransactionsPage
                {playersInfo}
                stale={false}
                transactions={seasonTransactions}
                {currentTeams}
                {show}
                {query}
                queryPage={page}
                {perPage}
                postUpdate={false}
                {leagueTeamManagers}
            />
        {:else}
            <p class="center page-state">No transactions were found for {season}.</p>
        {/if}
    {:catch error}
        <p class="center page-state">Something went wrong: {error.message}</p>
    {/await}
</div>
</PageShell>
