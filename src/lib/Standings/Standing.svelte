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
		background-color: color-mix(in srgb, var(--fff) 93%, #64748b 7%);
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
		color: #2b2105;
		background: linear-gradient(135deg, #f4d675, #c79a24);
		box-shadow: inset 0 0 0 1px rgba(117, 82, 0, 0.2);
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

