<script>
	import { Drafts, PageShell } from '$lib/components';

    export let data;
    const {upcomingDraftData, previousDraftsData, leagueTeamManagersData, playersData} = data;
</script>

<style>
    #main {
        position: relative;
        z-index: 1;
    }
</style>

<PageShell eyebrow="War Room" title="Drafts" description="Upcoming order, complete draft boards and every pick from seasons past." icon="format_list_numbered" wide={true}>
    <div id="main" class="page-panel">
		<Drafts {upcomingDraftData} {previousDraftsData} {leagueTeamManagersData} {playersData} />
	</div>
</PageShell>

