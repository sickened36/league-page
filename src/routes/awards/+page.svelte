<script>
	import { Awards, PageShell } from '$lib/components'
	import { waitForAll } from '$lib/utils/helper';
	import LinearProgress from '@smui/linear-progress';

    export let data;
    const {awardsData, teamManagersData} = data;
</script>

<style>
    .awards {
        display: block;
		width: 100%;
		max-width: 1000px;
		position: relative;
		z-index: 1;
		overflow-y: hidden;
    }

	.loading {
		display: block;
		width: 85%;
		max-width: 500px;
		margin: 80px auto;
	}

	.nothingYet {
		display: block;
		width: 85%;
		max-width: 500px;
		margin: 80px auto;
		text-align: center;
	}
</style>

<PageShell eyebrow="Hall of Champions" title="Awards" description="Champions, division winners and the league's most notorious last-place finishes." icon="emoji_events">
<div class="awards page-panel">
	{#await waitForAll(awardsData, teamManagersData) }
		<div class="loading">
			<p>Retrieving awards data...</p>
			<LinearProgress indeterminate />
		</div>
	{:then [podiums, leagueTeamManagers] }
		{#each podiums as podium}
			<Awards {podium} {leagueTeamManagers} />
		{:else}
			<p class="nothingYet page-state">No seasons have been completed yet, so no awards have been earned...</p>
		{/each}
	{:catch error}
		<!-- promise was rejected -->
		<p>Something went wrong: {error.message}</p>
	{/await}
</div>
</PageShell>

