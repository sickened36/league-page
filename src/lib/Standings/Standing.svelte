<script>
    import { gotoManager } from '$lib/utils/helper';
  	import { Row, Cell } from '@smui/data-table';

    export let columnOrder, team, standing, leagueTeamManagers, rank;
</script>

<style>
    .clickable {
        cursor: pointer;
    }
	
	.teamAvatar {
		vertical-align: middle;
		border-radius: 50%;
		height: 36px;
		width: 36px;
		margin-right: 12px;
		border: 0.25px solid #777;
	}

    :global(.contrastRow) {
		background-color: transparent;
		transition: background-color 0.18s ease;
    }

	:global(.contrastRow:hover) {
		background-color: color-mix(in srgb, var(--fff) 91%, #8b5cf6 9%);
	}

    .team {
		display: flex;
		align-items: center;
		min-width: 210px;
		text-align: left;
    }

	.rank {
		display: inline-grid;
		place-items: center;
		width: 28px;
		height: 28px;
		margin-right: 10px;
		color: var(--g555);
		background: var(--eee);
		border-radius: 8px;
		font-size: 0.72rem;
		font-weight: 900;
	}

	.podium {
		color: #fff;
		background: #7c3aed;
	}
</style>

<Row class="contrastRow">
    <Cell class="">
        <div class="clickable team" onclick={() => gotoManager({leagueTeamManagers, rosterID: standing.rosterID})}>
			<span class:podium={rank < 3} class="rank">{rank + 1}</span>
            <img alt="team avatar" class="teamAvatar clickable" src="{team.avatar}" />
            <div>
                {team.name}
            </div>
        </div>
    </Cell>
    {#each columnOrder as column}
        <Cell class="center">{standing[column.field]}</Cell>
    {/each}
</Row>

