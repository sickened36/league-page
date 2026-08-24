<script>
	import LinearProgress from '@smui/linear-progress';
	import { PageShell, Rosters } from '$lib/components'

	export let data;
	const rostersInfo = data.rostersInfo;
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
<div class="holder page-flow">
	{#await rostersInfo}
		<div class="loading page-state">
			<p>Retrieving roster data...</p>
			<br />
			<LinearProgress indeterminate />
		</div>
	{:then [leagueData, rosterData, leagueTeamManagers, playersInfo]}
		<!-- promise was fulfilled -->
		<Rosters {leagueData} {rosterData} {leagueTeamManagers} {playersInfo} /> <!-- displays rosters -->
	{:catch error}
		<!-- promise was rejected -->
		<p class="page-state">Something went wrong: {error.message}</p>
	{/await}
</div>
</PageShell>

