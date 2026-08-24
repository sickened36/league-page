<script>
    import { leagueName, gotoManager } from '$lib/utils/helper';
	import { getTeamFromTeamManagers } from '$lib/utils/helperFunctions/universalFunctions';
  	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import LinearProgress from '@smui/linear-progress';
    import { onMount } from 'svelte';
    import Standing from './Standing.svelte';

    export let standingsData, leagueTeamManagersData;

    // Least important to most important (i.e. the most important [usually wins] goes last)
    // Edit this to match your league settings
    const sortOrder = ["fptsAgainst", "divisionTies", "divisionWins", "fpts", "ties", "wins"];

    // Full desktop column order from left to right
    const columnOrder = [
        {name: "W", field: "wins"},
        {name: "T", field: "ties"},
        {name: "L", field: "losses"},
        {name: "Div W", field: "divisionWins"},
        {name: "Div T", field: "divisionTies"},
        {name: "Div L", field: "divisionLosses"},
        {name: "FPTS", field: "fpts"},
        {name: "FPTS Against", field: "fptsAgainst"},
        {name: "Streak", field: "streak"}
    ];

    let loading = true;
    let preseason = false;
    let standings, year, leagueTeamManagers;

    const record = (standing) => {
        const wins = standing?.wins ?? 0;
        const losses = standing?.losses ?? 0;
        const ties = standing?.ties ?? 0;
        return `${wins}-${losses}${ties ? `-${ties}` : ''}`;
    };

    const divisionRecord = (standing) => {
        const wins = standing?.divisionWins ?? 0;
        const losses = standing?.divisionLosses ?? 0;
        const ties = standing?.divisionTies ?? 0;
        return `${wins}-${losses}${ties ? `-${ties}` : ''}`;
    };

    const formatPoints = (value) => {
        if (value === null || value === undefined || value === '') return '—';
        const number = Number(value);
        return Number.isFinite(number) ? number.toFixed(1) : value;
    };

    onMount(async () => {
        const asyncStandingsData = await standingsData;
        if(!asyncStandingsData) {
            loading = false;
            preseason = true;
            return;
        }
        const {standingsInfo, yearData} = asyncStandingsData;
        leagueTeamManagers = await leagueTeamManagersData;
        year = yearData;

        let finalStandings = Object.keys(standingsInfo).map((key) => standingsInfo[key]);

        for(const sortType of sortOrder) {
            if(!finalStandings[0][sortType] && finalStandings[0][sortType] != 0) {
                continue;
            }
            finalStandings = [...finalStandings].sort((a,b) => b[sortType] - a[sortType]);
        }

        standings = finalStandings;
        loading = false;
    });
</script>

<style>
    .loading {
        display: block;
        width: 85%;
        max-width: 500px;
        margin: 80px auto;
    }

    :global(.center) {
        text-align: center;
    }

    :global(.wrappable) {
        white-space: normal;
        line-height: 1.2em;
    }

    .standingsTable {
        max-width: 100%;
        overflow-x: auto;
        margin: 0;
    }

	.season-label {
		padding: 20px 24px 14px;
		text-align: left;
		color: #8b5cf6;
		font-size: 0.72rem;
		font-weight: 900;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	:global(.standingsTable .mdc-data-table) {
		width: 100%;
		border: 0;
		border-radius: 0;
		box-shadow: none;
	}

	:global(.standingsTable table) {
		width: 100%;
	}

	:global(.standingsTable thead) {
		background: color-mix(in srgb, var(--fff) 92%, #64748b 8%);
	}

    .mobile-standings {
        display: none;
    }

    @media (max-width: 760px) {
        .season-label {
            padding: 18px 16px 12px;
            font-size: 0.66rem;
            line-height: 1.45;
        }

        .standingsTable {
            display: none;
        }

        .mobile-standings {
            display: grid;
            gap: 10px;
            padding: 0 12px 14px;
        }

        .mobile-team-card {
            width: 100%;
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 14px;
            padding: 16px;
            color: inherit;
            background: color-mix(in srgb, var(--fff) 97%, #8b5cf6 3%);
            border: 1px solid var(--ddd);
            border-radius: 14px;
            font: inherit;
            text-align: left;
            cursor: pointer;
        }

        .mobile-team-card:active {
            transform: scale(0.995);
        }

        .mobile-team-main {
            min-width: 0;
            display: flex;
            align-items: center;
            gap: 11px;
        }

        .mobile-rank {
            flex: 0 0 34px;
            height: 34px;
            display: grid;
            place-items: center;
            border-radius: 9px;
            background: var(--eee);
            color: var(--g555);
            font-size: 0.78rem;
            font-weight: 900;
        }

        .mobile-rank.podium {
            color: #2b2105;
            background: linear-gradient(135deg, #f4d675, #c79a24);
            box-shadow: inset 0 0 0 1px rgba(117, 82, 0, 0.2);
        }

        .mobile-avatar {
            flex: 0 0 42px;
            width: 42px;
            height: 42px;
            object-fit: cover;
            border-radius: 50%;
            border: 1px solid var(--ddd);
        }

        .mobile-team-copy {
            min-width: 0;
        }

        .mobile-team-name {
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 0.96rem;
            font-weight: 850;
            line-height: 1.2;
        }

        .mobile-division {
            display: block;
            margin-top: 5px;
            font-size: 0.7rem;
            opacity: 0.55;
        }

        .mobile-record {
            align-self: center;
            text-align: right;
        }

        .mobile-record strong {
            display: block;
            font-size: 1.35rem;
            line-height: 1;
            letter-spacing: -0.04em;
        }

        .mobile-record span {
            display: block;
            margin-top: 5px;
            font-size: 0.64rem;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            opacity: 0.5;
        }

        .mobile-stats {
            grid-column: 1 / -1;
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 8px;
            padding-top: 12px;
            border-top: 1px solid var(--ddd);
        }

        .mobile-stat {
            min-width: 0;
            text-align: center;
        }

        .mobile-stat small {
            display: block;
            margin-bottom: 4px;
            font-size: 0.61rem;
            font-weight: 850;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            opacity: 0.48;
        }

        .mobile-stat strong {
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 0.9rem;
        }
    }
</style>

{#if loading}
    <div class="loading">
        <p>Loading Standings...</p>
        <LinearProgress indeterminate />
    </div>
{:else if preseason}
    <div class="loading">
        <p>Preseason, No Standings Yet</p>
    </div>
{:else}
	<div class="season-label">{year ?? ''} {leagueName} · Official Table</div>

    <div class="standingsTable">
        <DataTable table$aria-label="League Standings">
            <Head>
                <Row>
                    <Cell class="center">Team</Cell>
                    {#each columnOrder as column}
                        <Cell class="center wrappable">{column.name}</Cell>
                    {/each}
                </Row>
            </Head>
            <Body>
                {#each standings as standing, rank}
                    <Standing {rank} {columnOrder} {standing} {leagueTeamManagers} team={getTeamFromTeamManagers(leagueTeamManagers, standing.rosterID)} />
                {/each}
            </Body>
        </DataTable>
    </div>

    <div class="mobile-standings" aria-label="League standings">
        {#each standings as standing, rank}
            {@const team = getTeamFromTeamManagers(leagueTeamManagers, standing.rosterID)}
            <button
                type="button"
                class="mobile-team-card"
                onclick={() => gotoManager({leagueTeamManagers, rosterID: standing.rosterID})}
                aria-label={`Open ${team?.name ?? 'team'} manager page`}
            >
                <div class="mobile-team-main">
                    <span class:podium={rank < 3} class="mobile-rank">{rank + 1}</span>
                    {#if team?.avatar}
                        <img class="mobile-avatar" src={team.avatar} alt="" />
                    {/if}
                    <div class="mobile-team-copy">
                        <strong class="mobile-team-name">{team?.name ?? `Team ${standing.rosterID}`}</strong>
                        <span class="mobile-division">Division {divisionRecord(standing)}</span>
                    </div>
                </div>

                <div class="mobile-record">
                    <strong>{record(standing)}</strong>
                    <span>Record</span>
                </div>

                <div class="mobile-stats">
                    <div class="mobile-stat">
                        <small>PF</small>
                        <strong>{formatPoints(standing.fpts)}</strong>
                    </div>
                    <div class="mobile-stat">
                        <small>PA</small>
                        <strong>{formatPoints(standing.fptsAgainst)}</strong>
                    </div>
                    <div class="mobile-stat">
                        <small>Streak</small>
                        <strong>{standing.streak ?? '—'}</strong>
                    </div>
                </div>
            </button>
        {/each}
    </div>
{/if}
