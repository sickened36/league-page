<script>
	import { PageShell, SeasonSwitcher, Standings } from '$lib/components'

	export let data;
	const {standingsData, leagueTeamManagersData, season} = data;
</script>

<style>
	.holder {
		position: relative;
		z-index: 1;
		text-align: center;
	}
</style>

<PageShell eyebrow="League Center" title="Standings" description="The race for the playoffs, ranked by the league's official tiebreakers." icon="leaderboard">
	<SeasonSwitcher {season} basePath="/standings" />
	<div class="holder page-panel page-panel--flush">
		<Standings {standingsData} {leagueTeamManagersData} />
	</div>
</PageShell>
