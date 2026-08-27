<script>
  import { PageShell } from '$lib/components';

  export let data;

  const formatDate = (value) => {
    if (!value) return 'Date unavailable';
    return new Date(Number(value)).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const assetMeta = (asset) => {
    if (asset.type === 'player') {
      return [asset.position, asset.nflTeam].filter(Boolean).join(' · ');
    }
    return asset.type === 'pick' ? 'Draft pick' : 'FAAB';
  };

  const gradeClass = (grade = '') => {
    if (grade.startsWith('A')) return 'grade-a';
    if (grade.startsWith('B')) return 'grade-b';
    if (grade.startsWith('C')) return 'grade-c';
    return 'grade-d';
  };
</script>

<svelte:head>
  <title>AI Trade Grades | Fantasy Foosball</title>
  <meta name="description" content="Automated Fantasy Foosball trade grades built from Sleeper data, roster fit and AI analysis." />
</svelte:head>

<style>
  .controls {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 18px;
  }

  .pill {
    display: inline-flex;
    align-items: center;
    min-height: 38px;
    padding: 0 13px;
    border: 1px solid var(--ddd);
    border-radius: 999px;
    color: inherit;
    text-decoration: none;
    font-size: 0.78rem;
    font-weight: 850;
  }

  .pill.active {
    color: white;
    background: #8b5cf6;
    border-color: #8b5cf6;
  }

  .trade-nav {
    display: grid;
    gap: 8px;
    margin-bottom: 26px;
  }

  .trade-link {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 12px;
    align-items: center;
    padding: 14px 16px;
    border: 1px solid var(--ddd);
    border-radius: 12px;
    color: inherit;
    text-decoration: none;
  }

  .trade-link.active {
    border-color: #8b5cf6;
    background: color-mix(in srgb, var(--fff) 95%, #8b5cf6 5%);
  }

  .trade-link strong,
  .trade-link span {
    min-width: 0;
  }

  .trade-link strong {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .trade-link span {
    font-size: 0.74rem;
    opacity: 0.58;
  }

  .article-header {
    padding: clamp(20px, 4vw, 34px);
    border-bottom: 1px solid var(--ddd);
  }

  .eyebrow {
    color: #8b5cf6;
    font-size: 0.7rem;
    font-weight: 900;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .article-header h2 {
    margin: 8px 0 10px;
    max-width: 900px;
    font-size: clamp(1.9rem, 5vw, 3.5rem);
    line-height: 1.02;
    letter-spacing: -0.035em;
  }

  .verdict {
    margin: 0;
    max-width: 820px;
    font-size: 1.02rem;
    line-height: 1.6;
    font-weight: 750;
  }

  .summary {
    margin: 0;
    padding: 24px clamp(20px, 4vw, 34px) 8px;
    max-width: 900px;
    line-height: 1.75;
  }

  .sides {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
    padding: 20px clamp(16px, 3vw, 30px) 32px;
  }

  .side-card {
    min-width: 0;
    border: 1px solid var(--ddd);
    border-radius: 16px;
    overflow: hidden;
    background: color-mix(in srgb, var(--fff) 98%, #8b5cf6 2%);
  }

  .side-top {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 16px;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid var(--ddd);
  }

  .manager {
    margin: 0;
    font-size: 1.35rem;
  }

  .team-name {
    display: block;
    margin-top: 4px;
    font-size: 0.76rem;
    opacity: 0.58;
  }

  .grade {
    display: grid;
    place-items: center;
    width: 74px;
    height: 74px;
    border-radius: 18px;
    font-size: 2rem;
    font-weight: 950;
    letter-spacing: -0.05em;
  }

  .grade-a {
    color: #152107;
    background: linear-gradient(135deg, #bef264, #84cc16);
  }

  .grade-b {
    color: #17120a;
    background: linear-gradient(135deg, #fde68a, #eab308);
  }

  .grade-c {
    color: #23130b;
    background: linear-gradient(135deg, #fdba74, #f97316);
  }

  .grade-d {
    color: #2a0c0c;
    background: linear-gradient(135deg, #fca5a5, #ef4444);
  }

  .score-note {
    display: block;
    margin-top: 5px;
    font-size: 0.7rem;
    text-align: center;
    opacity: 0.58;
  }

  .assets {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    padding: 18px 20px 4px;
  }

  .asset-group h4,
  .analysis h4 {
    margin: 0 0 10px;
    font-size: 0.68rem;
    color: #8b5cf6;
    letter-spacing: 0.11em;
    text-transform: uppercase;
  }

  .asset {
    padding: 9px 0;
    border-bottom: 1px solid color-mix(in srgb, var(--ddd) 72%, transparent 28%);
  }

  .asset strong,
  .asset span {
    display: block;
  }

  .asset strong {
    font-size: 0.9rem;
  }

  .asset span {
    margin-top: 2px;
    font-size: 0.7rem;
    opacity: 0.56;
  }

  .empty-assets {
    font-size: 0.8rem;
    opacity: 0.5;
  }

  .scores {
    padding: 18px 20px 6px;
  }

  .score-row {
    display: grid;
    grid-template-columns: 92px minmax(0, 1fr) 34px;
    gap: 9px;
    align-items: center;
    margin-bottom: 9px;
    font-size: 0.72rem;
  }

  .score-track {
    height: 7px;
    border-radius: 999px;
    overflow: hidden;
    background: var(--eee);
  }

  .score-fill {
    height: 100%;
    border-radius: inherit;
    background: #8b5cf6;
  }

  .analysis {
    padding: 18px 20px 22px;
  }

  .analysis p {
    margin: 0 0 15px;
    line-height: 1.68;
  }

  .callouts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .callout {
    padding: 12px;
    border: 1px solid var(--ddd);
    border-radius: 10px;
    font-size: 0.78rem;
    line-height: 1.45;
  }

  .callout small {
    display: block;
    margin-bottom: 5px;
    font-weight: 900;
    opacity: 0.55;
    text-transform: uppercase;
  }

  .methodology {
    margin: 0 clamp(16px, 3vw, 30px) 30px;
    padding: 16px 18px;
    border: 1px dashed var(--ddd);
    border-radius: 12px;
    font-size: 0.76rem;
    line-height: 1.6;
    opacity: 0.67;
  }

  .empty {
    padding: clamp(24px, 5vw, 42px);
    line-height: 1.7;
  }

  @media (max-width: 820px) {
    .sides {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 560px) {
    .trade-link {
      grid-template-columns: 1fr;
      gap: 4px;
    }

    .assets,
    .callouts {
      grid-template-columns: 1fr;
    }

    .side-top {
      padding: 16px;
    }

    .grade {
      width: 66px;
      height: 66px;
      border-radius: 15px;
      font-size: 1.75rem;
    }

    .score-row {
      grid-template-columns: 82px minmax(0, 1fr) 30px;
    }
  }
</style>

<PageShell eyebrow="League Front Office" title="AI Trade Grades" description="Every completed trade gets a consistent Sleeper-powered grade, roster-fit breakdown and AI-written verdict." icon="grading">
  <div class="page-panel page-panel--flush">
    <div style="padding: 18px 18px 0;">
      <nav class="controls" aria-label="Trade grade seasons">
        {#each data.seasons as season}
          <a class:active={season === data.season} class="pill" href={`/trades?season=${season}`}>{season}</a>
        {/each}
      </nav>

      {#if data.trades?.length > 1}
        <nav class="trade-nav" aria-label="Trade grade archive">
          {#each data.trades as item}
            <a
              class:active={String(item.id) === String(data.selectedTrade)}
              class="trade-link"
              href={`/trades?season=${data.season}&trade=${item.id}`}
            >
              <strong>{item.headline}</strong>
              <span>{formatDate(item.occurredAt)} · {item.participants.map((p) => `${p.manager} ${p.grade}`).join(' / ')}</span>
            </a>
          {/each}
        </nav>
      {/if}
    </div>

    {#if data.trade}
      <article>
        <header class="article-header">
          <div class="eyebrow">{data.trade.season} · Week {data.trade.week} · {formatDate(data.trade.occurredAt)}</div>
          <h2>{data.trade.headline}</h2>
          <p class="verdict">{data.trade.verdict}</p>
        </header>

        <p class="summary">{data.trade.summary}</p>

        <section class="sides" aria-label="Trade grades by manager">
          {#each data.trade.sides as side}
            <article class="side-card">
              <header class="side-top">
                <div>
                  <h3 class="manager">{side.manager}</h3>
                  <span class="team-name">{side.teamName} · {side.context.record} record</span>
                </div>
                <div>
                  <div class={`grade ${gradeClass(side.grade)}`}>{side.grade}</div>
                  <span class="score-note">{side.scores.overall}/100</span>
                </div>
              </header>

              <div class="assets">
                <div class="asset-group">
                  <h4>Receives</h4>
                  {#if side.received?.length}
                    {#each side.received as asset}
                      <div class="asset">
                        <strong>{asset.name}</strong>
                        <span>{assetMeta(asset)} · MVP value {asset.value}</span>
                      </div>
                    {/each}
                  {:else}
                    <div class="empty-assets">No tracked assets</div>
                  {/if}
                </div>
                <div class="asset-group">
                  <h4>Sends</h4>
                  {#if side.sent?.length}
                    {#each side.sent as asset}
                      <div class="asset">
                        <strong>{asset.name}</strong>
                        <span>{assetMeta(asset)} · MVP value {asset.value}</span>
                      </div>
                    {/each}
                  {:else}
                    <div class="empty-assets">No tracked assets</div>
                  {/if}
                </div>
              </div>

              <div class="scores">
                <div class="score-row">
                  <span>Trade value</span>
                  <div class="score-track"><div class="score-fill" style={`width:${side.scores.value}%`}></div></div>
                  <strong>{side.scores.value}</strong>
                </div>
                <div class="score-row">
                  <span>Roster fit</span>
                  <div class="score-track"><div class="score-fill" style={`width:${side.scores.rosterFit}%`}></div></div>
                  <strong>{side.scores.rosterFit}</strong>
                </div>
                <div class="score-row">
                  <span>Lineup impact</span>
                  <div class="score-track"><div class="score-fill" style={`width:${side.scores.lineupImpact}%`}></div></div>
                  <strong>{side.scores.lineupImpact}</strong>
                </div>
              </div>

              <div class="analysis">
                <h4>AI Analysis</h4>
                <p>{side.analysis}</p>
                <div class="callouts">
                  <div class="callout">
                    <small>Best case</small>
                    {side.bestReason}
                  </div>
                  <div class="callout">
                    <small>Biggest risk</small>
                    {side.biggestRisk}
                  </div>
                </div>
              </div>
            </article>
          {/each}
        </section>

        <div class="methodology">
          <strong>How the MVP grade works:</strong> {data.trade.methodology} The letter grade is calculated consistently before the AI writes its explanation, so the model cannot randomly change the score from trade to trade. These are Fantasy Foosball internal heuristic values, not third-party consensus trade values.
        </div>
      </article>
    {:else}
      <div class="empty">
        <strong>No AI trade grades have been published for {data.season} yet.</strong><br />
        {data.error || 'The trade bot checks Sleeper automatically and will publish a grade after the next completed trade.'}
      </div>
    {/if}
  </div>
</PageShell>
