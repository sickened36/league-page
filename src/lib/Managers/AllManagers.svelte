<script>
    import { leagueName } from '$lib/utils/helper';
    import ManagerRow from './ManagerRow.svelte'

    export let managers, leagueTeamManagers;

    let innerWidth;
</script>

<svelte:window bind:innerWidth={innerWidth} />

<style>
    .managerContainer {
        width: 100%;
		margin: 0;
    }

    .managerConstrained {
        width: 97%;
        max-width: 800px;
        margin: 0 auto;
    }

</style>

<div class="managerContainer">
    <div class="managerConstrained">
        {#each managers as manager, key}
            <ManagerRow {manager} {leagueTeamManagers} {key} />
        {/each}
    </div>

</div>

