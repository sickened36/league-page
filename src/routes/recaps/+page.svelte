<script>
  import { PageShell } from '$lib/components';

  export let data;

  const formatScore = (score) => Number(score || 0).toFixed(2);
  const formatOdds = (value) => value == null ? '—' : `${Number(value).toFixed(1)}%`;
  const record = (team) => `${team.wins}-${team.losses}${team.ties ? `-${team.ties}` : ''}`;

  const matchupLabel = (matchup) => {
    if (!matchup) return '—';
    return `${matchup.teamA.manager} ${formatScore(matchup.teamA.score)} – ${formatScore(matchup.teamB.score)} ${matchup.teamB.manager}`;
  };
</script>

<svelte:head>
  <title>Weekly Recaps | Fantasy Foosball</title>
  <meta name="description" content="AI-generated weekly matchup previews, playoff stakes and game recaps for Fantasy Foosball." />
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
    color: #00ceb8;
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


  .season-nav,
  .preview-week-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 22px;
  }

  .season-nav a,
  .preview-week-nav a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 38px;
    padding: 0 13px;
    border: 1px solid var(--ddd);
    border-radius: 999px;
    color: inherit;
    text-decoration: none;
    font-size: 0.78rem;
    font-weight: 850;
  }

  .season-nav a.active,
  .preview-week-nav a.active {
    color: white;
    background: #00ceb8;
    border-color: #00ceb8;
  }

  .preview-section {
    margin-bottom: 44px;
    padding-bottom: 38px;
    border-bottom: 1px solid var(--ddd);
  }

  .preview-header {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 18px;
  }

  .preview-header h2 {
    margin: 5px 0 6px;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    line-height: 1;
    letter-spacing: -0.03em;
  }

  .preview-header p {
    max-width: 700px;
    margin: 0;
    line-height: 1.55;
    opacity: 0.75;
  }

  .preview-grid {
    display: grid;
    gap: 14px;
  }

  .preview-card {
    padding: clamp(18px, 3vw, 26px);
    border: 1px solid var(--ddd);
    border-radius: 14px;
    background: color-mix(in srgb, var(--fff) 97%, #00ceb8 3%);
  }

  .preview-matchup {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: center;
    gap: 12px;
  }

  .preview-team:last-child {
    text-align: right;
  }

  .preview-team strong {
    display: block;
    font-size: 1.02rem;
  }

  .preview-team span {
    display: block;
    margin-top: 3px;
    font-size: 0.75rem;
    opacity: 0.62;
  }

  .preview-vs {
    font-size: 0.66rem;
    font-weight: 950;
    letter-spacing: 0.12em;
    opacity: 0.42;
  }

  .odds-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin: 14px 0 18px;
  }

  .odds-box {
    padding: 10px 12px;
    border-radius: 10px;
    background: color-mix(in srgb, var(--fff) 92%, #64748b 8%);
    font-size: 0.75rem;
    line-height: 1.45;
  }

  .odds-box:last-child {
    text-align: right;
  }

  .odds-box strong {
    color: #00ceb8;
    font-size: 0.98rem;
  }

  .preview-card h3 {
    margin: 0 0 9px;
    font-size: clamp(1.15rem, 3vw, 1.45rem);
    line-height: 1.2;
  }

  .preview-card p {
    margin: 0;
    max-width: 900px;
    line-height: 1.68;
  }

  .model-note {
    margin-top: 14px;
    font-size: 0.7rem;
    line-height: 1.5;
    opacity: 0.52;
  }

  .recap-label {
    margin: 0 0 16px;
    font-size: 0.7rem;
    font-weight: 900;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    opacity: 0.55;
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
    background: #00ceb8;
    border-color: #00ceb8;
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
    border-color: #00ceb8;
  }

  .award small {
    display: block;
    margin-bottom: 8px;
    font-size: 0.62rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #00ceb8;
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
    color: #00ceb8;
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
    color: #00ceb8;
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
    .preview-header {
      display: block;
    }

    .preview-matchup {
      grid-template-columns: 1fr auto 1fr;
      gap: 8px;
    }

    .odds-row {
      grid-template-columns: 1fr;
    }

    .odds-box:last-child {
      text-align: left;
    }

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

<PageShell eyebrow="Fantasy Foosball Weekly" title="Weekly Recaps" description="Upcoming matchup stakes, modeled playoff odds, game stories and weekly awards built from the league's Sleeper data." icon="newspaper">
<div class="recaps-page page-panel">

  {#if data.availableSeasons?.length}
    <nav class="season-nav" aria-label="Weekly content seasons">
      {#each data.availableSeasons as season}
        <a class:active={season === data.season} href={`/recaps?season=${season}`}>{season}</a>
      {/each}
    </nav>
  {/if}

  {#if data.preview}
    <section class="preview-section" aria-label="Upcoming weekly preview">
      <header class="preview-header">
        <div>
          <div class="eyebrow">{data.preview.season} • Week {data.preview.week} Preview</div>
          <h2>{data.preview.title}</h2>
          <p>{data.preview.subtitle}</p>
        </div>
      </header>

      {#if data.previewWeeks?.length > 1}
        <nav class="preview-week-nav" aria-label="Weekly preview archive">
          {#each data.previewWeeks as item}
            <a class:active={item.week === data.selectedPreviewWeek} href={`/recaps?season=${data.season}&previewWeek=${item.week}`}>
              Week {item.week}
            </a>
          {/each}
        </nav>
      {/if}

      <div class="preview-grid">
        {#each data.preview.matchups as matchup}
          <article class="preview-card">
            <div class="preview-matchup">
              <div class="preview-team">
                <strong>{matchup.teamA.manager}</strong>
                <span>{matchup.teamA.record} • Rank #{matchup.teamA.rank}</span>
              </div>
              <span class="preview-vs">VS</span>
              <div class="preview-team">
                <strong>{matchup.teamB.manager}</strong>
                <span>{matchup.teamB.record} • Rank #{matchup.teamB.rank}</span>
              </div>
            </div>

            <div class="odds-row">
              <div class="odds-box">
                <strong>{formatOdds(matchup.teamA.playoffOdds)}</strong> modeled playoff chance<br />
                Win: {formatOdds(matchup.teamA.playoffOddsWithWin)} • Loss: {formatOdds(matchup.teamA.playoffOddsWithLoss)}
              </div>
              <div class="odds-box">
                <strong>{formatOdds(matchup.teamB.playoffOdds)}</strong> modeled playoff chance<br />
                Win: {formatOdds(matchup.teamB.playoffOddsWithWin)} • Loss: {formatOdds(matchup.teamB.playoffOddsWithLoss)}
              </div>
            </div>

            <h3>{matchup.headline}</h3>
            <p>{matchup.paragraph}</p>
          </article>
        {/each}
      </div>

      <div class="model-note">
        Playoff odds are Fantasy Foosball model estimates, not sportsbook probabilities. The model runs {data.preview.playoffModel.simulations.toLocaleString()} seeded simulations using current records, scoring strength and the remaining Sleeper schedule.
      </div>
    </section>
  {/if}

  {#if data.weeks?.length}
    {#if data.preview}<div class="recap-label">Completed Weekly Recaps</div>{/if}
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
      <strong>No completed weekly recap has been published yet.</strong><br />
      {data.error || 'The recap archive will populate automatically after Sleeper marks the first fantasy week complete.'}
    </div>
  {/if}
</div>
</PageShell>

