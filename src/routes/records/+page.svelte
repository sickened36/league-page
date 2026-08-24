<script>
	import LinearProgress from '@smui/linear-progress';
	import { PageShell, Records } from '$lib/components';

    export let data;
    const recordsInfo = data.recordsInfo;
</script>

<style>
    #main {
        position: relative;
        z-index: 1;
    }
    .loading {
        display: block;
        width: 85%;
        max-width: 500px;
        margin: 80px auto;
    }
</style>

<PageShell eyebrow="The Record Book" title="League Records" description="The best, worst and most unforgettable performances in Fantasy Foosball history." icon="military_tech" wide={true}>
<div id="main" class="page-panel">
    {#await recordsInfo}
        <!-- promise is pending -->
        <div class="loading">
            <p>Loading league records...</p>
            <LinearProgress indeterminate />
        </div>
    {:then [leagueData, {totals, stale}, leagueTeamManagers]}
        <Records {leagueData} {totals} {stale} {leagueTeamManagers} />
    {:catch error}
        <!-- promise was rejected -->
        <p class="page-state">Something went wrong: {error.message}</p>
    {/await}
</div>
</PageShell>

