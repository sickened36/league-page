<script>
  import { PageShell } from '$lib/components';
  import { seasonOptions } from '$lib/utils/seasons';
</script>

<svelte:head>
  <title>Season Archive | Fantasy Foosball</title>
  <meta name="description" content="Browse Fantasy Foosball standings, matchups, rosters, transactions, recaps and trade grades by season." />
</svelte:head>

<style>
  .intro {
    margin-bottom: 18px;
    color: var(--g777);
    line-height: 1.65;
  }

  .season-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  .season-card {
    padding: 22px;
    border: 1px solid var(--ddd);
    border-radius: 16px;
    background: var(--fff);
  }

  .season-top {
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 14px;
    margin-bottom: 18px;
  }

  .season-year {
    color: #8b5cf6;
    font-size: 0.72rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  h2 {
    margin: 4px 0 0;
    font-size: 1.65rem;
  }

  .champion {
    text-align: right;
    font-size: 0.74rem;
    line-height: 1.4;
    opacity: 0.68;
  }

  .links {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
  }

  .links a {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 42px;
    padding: 7px 9px;
    border: 1px solid var(--ddd);
    border-radius: 10px;
    color: inherit;
    text-align: center;
    text-decoration: none;
    font-size: 0.74rem;
    font-weight: 800;
  }

  .links a:hover {
    border-color: #8b5cf6;
  }

  .legacy {
    margin-top: 18px;
    padding: 18px 20px;
    border: 1px dashed var(--ddd);
    border-radius: 14px;
    line-height: 1.6;
    opacity: 0.72;
  }

  @media (max-width: 760px) {
    .season-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 480px) {
    .links {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
</style>

<PageShell eyebrow="League History" title="Season Archive" description="Jump into any Sleeper-era Fantasy Foosball season without hunting through menus." icon="history">
  <div class="page-panel">
    <p class="intro">Pick a season, then jump straight to its standings, matchups, rosters, transaction wire, weekly recaps or AI trade grades.</p>

    <div class="season-grid">
      {#each seasonOptions as item}
        <section class="season-card">
          <div class="season-top">
            <div>
              <div class="season-year">{item.season}</div>
              <h2>{item.label}</h2>
            </div>
            <div class="champion">
              {#if item.champion}
                Champion<br /><strong>{item.champion}</strong>
              {:else}
                Current<br /><strong>Season</strong>
              {/if}
            </div>
          </div>
          <div class="links">
            <a href={`/standings?season=${item.season}`}>Standings</a>
            <a href={`/matchups?season=${item.season}`}>Matchups</a>
            <a href={`/rosters?season=${item.season}`}>Rosters</a>
            <a href={`/transactions?season=${item.season}`}>Transactions</a>
            <a href={`/recaps?season=${item.season}`}>Recaps</a>
            <a href={`/trades?season=${item.season}`}>Trade Grades</a>
          </div>
        </section>
      {/each}
    </div>

    <div class="legacy">
      <strong>2019–2021:</strong> those seasons were played outside Sleeper, so the live archive tools above start with 2022. Their championship history still remains part of the main site.
    </div>
  </div>
</PageShell>
