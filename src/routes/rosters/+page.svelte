<script>
	import LinearProgress from '@smui/linear-progress';
	import { PageShell, Rosters, SeasonSwitcher } from '$lib/components'

	export let data;
	const { rostersInfo, season } = data;
</script>

<style>
	.holder {
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

<PageShell eyebrow="Team Room" title="Rosters" description="Starters, benches and injury reserves across every Fantasy Foosball squad." icon="groups" wide={true}>
<SeasonSwitcher {season} basePath="/rosters" />
<div class="holder page-flow">
	{#await rostersInfo}
		<div class="loading page-state">
			<p>Retrieving roster data...</p>
			<br />
			<LinearProgress indeterminate />
		</div>
	{:then [leagueData, rosterData, leagueTeamManagers, playersInfo]}
		<Rosters {leagueData} {rosterData} {leagueTeamManagers} {playersInfo} />
	{:catch error}
		<p class="page-state">Something went wrong: {error.message}</p>
	{/await}
</div>
</PageShell>
