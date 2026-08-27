<script>
	import { MatchupsAndBrackets, PageShell, SeasonSwitcher } from '$lib/components';

	export let data;
	const {queryWeek, matchupsData, bracketsData, playersData, leagueTeamManagersData, season} = data;
</script>

<style>
    #main {
        position: relative;
        z-index: 1;
    }
</style>

<PageShell eyebrow="Game Day" title="Matchups" description="Every head-to-head battle, box score and playoff bracket in one place." icon="sports_score">
    <SeasonSwitcher {season} basePath="/matchups" />
    <div id="main" class="page-panel page-panel--soft">
        <MatchupsAndBrackets {queryWeek} {matchupsData} {bracketsData} {playersData} {leagueTeamManagersData} />
    </div>
</PageShell>
