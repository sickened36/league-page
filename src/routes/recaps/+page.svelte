<script>
  import { PageShell } from '$lib/components';

  export let data;

  const formatScore = (score) => Number(score || 0).toFixed(2);
  const record = (team) => `${team.wins}-${team.losses}${team.ties ? `-${team.ties}` : ''}`;

  const matchupLabel = (matchup) => {
    if (!matchup) return '—';
    return `${matchup.teamA.manager} ${formatScore(matchup.teamA.score)} – ${formatScore(matchup.teamB.score)} ${matchup.teamB.manager}`;
  };
</script>

<svelte:head>
  <title>Weekly Recaps | Fantasy Foosball</title>
  <meta name="description" content="AI-generated weekly game stories and league recaps for Fantasy Foosball." />
</svelte:head>

<style>
  .recaps-page {
    width: 100%;
    margin: 0 auto;
    padding: clamp(22px, 4vw, 38px);
    box-sizing: border-box;
  }

  .hero {
    padding: 34px 0 28px;
    border-bottom: 1px solid var(--ddd);
    margin-bottom: 28px;
  }

  .eyebrow {
    color: #8b5cf6;
    font-size: 0.72rem;
    font-weight: 900;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .hero h1 {
    margin: 8px 0 10px;
    font-size: clamp(2.2rem, 6vw, 4.5rem);
    line-height: 0.95;
    letter-spacing: -0.04em;
  }

  .hero p {
    margin: 0;
    max-width: 680px;
    opacity: 0.84;
    line-height: 1.6;
  }

  .week-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 0 0 32px;
  }

  .week-nav a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    min-height: 40px;
    padding: 0 13px;
    border: 1px solid var(--ddd);
    border-radius: 999px;
    color: inherit;
    text-decoration: none;
    font-size: 0.82rem;
    font-weight: 800;
  }

  .week-nav a.active {
    color: white;
    background: #8b5cf6;
    border-color: #8b5cf6;
  }

  .empty {
    border: 1px solid var(--ddd);
    border-radius: 12px;
    padding: 28px;
    line-height: 1.6;
  }

  .article-header {
    max-width: 880px;
    margin-bottom: 28px;
  }

  .article-header h2 {
    margin: 6px 0 10px;
    font-size: clamp(2rem, 5vw, 3.7rem);
    line-height: 1;
    letter-spacing: -0.035em;
  }

  .subtitle {
    margin: 0;
    font-size: 1.08rem;
    line-height: 1.6;
    opacity: 0.84;
  }

  .generated {
    display: block;
    margin-top: 12px;
    font-size: 0.72rem;
    opacity: 0.5;
  }

  .lead {
    max-width: 760px;
    font-size: 1.08rem;
    line-height: 1.78;
    white-space: pre-line;
    margin-bottom: 36px;
  }

  .awards {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 10px;
    margin-bottom: 48px;
  }

  .award {
    border: 1px solid var(--ddd);
    border-radius: 10px;
    padding: 16px;
    min-width: 0;
	background: color-mix(in srgb, var(--fff) 96%, #64748b 4%);
    transition: transform 0.18s ease, border-color 0.18s ease;
  }

  .award:hover {
    transform: translateY(-2px);
    border-color: #8b5cf6;
  }

  .award small {
    display: block;
    margin-bottom: 8px;
    font-size: 0.62rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #8b5cf6;
  }

  .award strong {
    display: block;
    line-height: 1.25;
    overflow-wrap: anywhere;
  }

  .award span {
    display: block;
    margin-top: 5px;
    font-size: 0.78rem;
    opacity: 0.62;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 50px 0 22px;
  }

  .section-title span {
    color: #8b5cf6;
    font-weight: 900;
    font-size: 0.72rem;
  }

  .section-title h3 {
    margin: 0;
    font-size: 1.45rem;
  }

  .stories {
    display: grid;
    gap: 18px;
  }

  .story-card {
    border: 1px solid var(--ddd);
    border-radius: 12px;
    padding: clamp(20px, 4vw, 32px);
    background: var(--fff);
    box-shadow: 0 8px 22px rgba(18, 12, 28, 0.06);
  }

  .scoreline {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 10px;
    font-weight: 900;
  }

  .scoreline .winner {
    color: #8b5cf6;
  }

  .scoreline .score {
    font-size: 1.3rem;
  }

  .story-card h4 {
    margin: 0 0 16px;
    max-width: 760px;
    font-size: clamp(1.35rem, 3vw, 2rem);
    line-height: 1.12;
  }

  .story-card p {
    margin: 0 0 12px;
    max-width: 760px;
    line-height: 1.72;
  }

  .performers {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 18px;
    padding-top: 16px;
    border-top: 1px solid var(--ddd);
  }

  .performers small {
    display: block;
    margin-bottom: 6px;
    opacity: 0.55;
    font-weight: 800;
  }

  .performers span {
    display: block;
    font-size: 0.82rem;
    line-height: 1.5;
  }

  .standings-wrap {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 520px;
  }

  th, td {
    padding: 11px 10px;
    text-align: left;
    border-bottom: 1px solid var(--ddd);
    font-size: 0.86rem;
  }

  th {
    font-size: 0.68rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.55;
  }

  .closing {
    max-width: 820px;
    margin-top: 40px;
    padding: 22px 0;
    border-top: 1px solid var(--ddd);
    line-height: 1.72;
  }

  @media (max-width: 900px) {
    .awards {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 600px) {
    .recaps-page {
      width: 100%;
      padding-top: 18px;
    }

    .awards,
    .performers {
      grid-template-columns: 1fr;
    }
  }
</style>

<PageShell eyebrow="Fantasy Foosball Weekly" title="Weekly Recaps" description="Game stories, weekly awards and standout performances generated from the league's actual Sleeper results." icon="newspaper">
<div class="recaps-page page-panel">

  {#if data.weeks?.length}
    <nav class="week-nav" aria-label="Weekly recap archive">
      {#each data.weeks as item}
        <a class:active={item.week === data.selectedWeek} href={`/recaps?season=${data.season}&week=${item.week}`}>
          Week {item.week}
        </a>
      {/each}
    </nav>
  {/if}

  {#if data.recap}
    <article>
      <header class="article-header">
        <div class="eyebrow">{data.recap.season} • Week {data.recap.week}</div>
        <h2>{data.recap.title}</h2>
        <p class="subtitle">{data.recap.subtitle}</p>
        <span class="generated">Generated from Sleeper results • {new Date(data.recap.generatedAt).toLocaleDateString()}</span>
      </header>

      <div class="lead">{data.recap.leagueLead}</div>

      <section class="awards" aria-label="Weekly awards">
        <div class="award">
          <small>Game of the Week</small>
          <strong>{matchupLabel(data.recap.awards.gameOfWeek)}</strong>
          <span>{formatScore(data.recap.awards.gameOfWeek?.margin)}-point margin</span>
        </div>
        <div class="award">
          <small>Biggest Blowout</small>
          <strong>{matchupLabel(data.recap.awards.biggestBlowout)}</strong>
          <span>{formatScore(data.recap.awards.biggestBlowout?.margin)}-point margin</span>
        </div>
        <div class="award">
          <small>High Score</small>
          <strong>{data.recap.awards.highScore?.manager}</strong>
          <span>{formatScore(data.recap.awards.highScore?.score)} points</span>
        </div>
        <div class="award">
          <small>Low Score</small>
          <strong>{data.recap.awards.lowScore?.manager}</strong>
          <span>{formatScore(data.recap.awards.lowScore?.score)} points</span>
        </div>
        <div class="award">
          <small>Bench Regret</small>
          <strong>{data.recap.awards.benchRegret?.manager}</strong>
          <span>{data.recap.awards.benchRegret?.name} — {formatScore(data.recap.awards.benchRegret?.points)}</span>
        </div>
      </section>

      <div class="section-title">
        <span>01</span>
        <h3>Game Stories</h3>
      </div>

      <section class="stories">
        {#each data.recap.matchups as matchup}
          <article class="story-card">
            <div class="scoreline">
              <span class:winner={matchup.winner === matchup.teamA.manager}>{matchup.teamA.manager}</span>
              <span class="score">{formatScore(matchup.teamA.score)}</span>
              <span>–</span>
              <span class="score">{formatScore(matchup.teamB.score)}</span>
              <span class:winner={matchup.winner === matchup.teamB.manager}>{matchup.teamB.manager}</span>
            </div>
            <h4>{matchup.headline}</h4>
            {#each matchup.story.split(/\n\n+/) as paragraph}
              <p>{paragraph}</p>
            {/each}

            <div class="performers">
              <div>
                <small>{matchup.teamA.manager} — top starters</small>
                {#each matchup.teamA.topStarters.slice(0, 3) as player}
                  <span>{player.name}: {formatScore(player.points)}</span>
                {/each}
              </div>
              <div>
                <small>{matchup.teamB.manager} — top starters</small>
                {#each matchup.teamB.topStarters.slice(0, 3) as player}
                  <span>{player.name}: {formatScore(player.points)}</span>
                {/each}
              </div>
            </div>
          </article>
        {/each}
      </section>

      <div class="section-title">
        <span>02</span>
        <h3>Standings Through Week {data.recap.week}</h3>
      </div>

      <div class="standings-wrap">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Manager</th>
              <th>Record</th>
              <th>Points For</th>
            </tr>
          </thead>
          <tbody>
            {#each data.recap.standings as team}
              <tr>
                <td>{team.rank}</td>
                <td><strong>{team.manager}</strong></td>
                <td>{record(team)}</td>
                <td>{formatScore(team.pointsFor)}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <div class="closing">{data.recap.closing}</div>
    </article>
  {:else}
    <div class="empty">
      <strong>No weekly recap has been published yet.</strong><br />
      {data.error || 'The archive will populate automatically after the first completed fantasy week.'}
    </div>
  {/if}
</div>
</PageShell>

