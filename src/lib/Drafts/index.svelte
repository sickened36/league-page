<script>
	import { waitForAll } from '$lib/utils/helper';
    import LinearProgress from '@smui/linear-progress';
    import Draft from './Draft.svelte'; 

    export let upcomingDraftData, previousDraftsData, leagueTeamManagersData, playersData;
</script>

<style>
	.loading {
		display: block;
		width: 85%;
		max-width: 500px;
		margin: 80px auto;
	}

    h4 {
        text-align: center;
		margin: 8px 0 24px;
		font-size: clamp(1.35rem, 3vw, 1.8rem);
		font-weight: 850;
    }

    h6 {
        text-align: center;
		color: #8b5cf6;
		font-weight: 900;
		letter-spacing: 0.1em;
		text-transform: uppercase;
    }

	hr {
		margin: 46px 0 30px;
		border: 0;
		border-top: 1px solid var(--ddd);
	}
</style>


{#await waitForAll(upcomingDraftData, leagueTeamManagersData, playersData) }
	<div class="loading">
		<p>Retrieving upcoming draft...</p>
		<br />
		<LinearProgress indeterminate />
	</div>
{:then [upcomingDraft, leagueTeamManagers, {players}] }
    <h4>Upcoming {upcomingDraft.year} Draft</h4>
    <Draft draftData={upcomingDraft} {leagueTeamManagers} year={upcomingDraft.year} {players} />
{:catch error}
	<!-- promise was rejected -->
	<p>Something went wrong: {error.message}</p>
{/await}


{#await waitForAll(previousDraftsData, leagueTeamManagersData, playersData) }
	<hr />
	<h4>Previous Drafts</h4>
	<div class="loading">
		<p>Retrieving previous drafts...</p>
		<br />
		<LinearProgress indeterminate />
	</div>
{:then [previousDrafts, leagueTeamManagers, {players}] }
	<!-- Don't display anything unless there are previous drafts -->
	{#if previousDrafts.length}
		<hr />
		<h4>Previous Drafts</h4>
		{#each previousDrafts as previousDraft}
			<h6>{previousDraft.year} Draft</h6>
			<Draft draftData={previousDraft} previous={true} {leagueTeamManagers} year={previousDraft.year} {players} />
		{/each}
	{/if}
{:catch error}
	<!-- promise was rejected -->
	<p>Something went wrong: {error.message}</p>
{/await}

