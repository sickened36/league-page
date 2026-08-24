<script>
	import LinearProgress from '@smui/linear-progress';
    import {AllManagers, PageShell} from '$lib/components';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data;
	const {managers, leagueTeamManagersData} = data;

    onMount(() => {
        if(!managers.length) {
            goto('/');
        }
    })
</script>

<style>
	.main {
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

<PageShell eyebrow="The League" title="Managers" description="Meet the personalities, rivals and former champions behind every roster." icon="person_search">
<div class="main page-panel">
    {#await leagueTeamManagersData}
        <!-- promise is pending -->
        <div class="loading">
            <p>Retrieving managers...</p>
            <LinearProgress indeterminate />
        </div>
    {:then leagueTeamManagers}
        {#if managers.length}
            <AllManagers {managers}  {leagueTeamManagers}/>
        {/if}
    {:catch error}
        <!-- promise was rejected -->
        <p class="page-state">Something went wrong: {error.message}</p>
    {/await}
</div>
</PageShell>

