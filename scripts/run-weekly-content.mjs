import { spawnSync } from 'node:child_process';

const DEFAULT_LEAGUE_ID = '1389689189200592896';
const DEFAULT_SEASON = '2026';

function envValue(name, fallback = '') {
  const value = process.env[name];
  return value == null || value === '' ? fallback : value;
}

function asNumber(value, fallback = null) {
  if (value == null || value === '') return fallback;
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

async function fetchJson(url) {
  let lastError;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { 'User-Agent': 'Fantasy-Foosball-Weekly-Runner/1.0' },
      });
      if (response.ok) return response.json();
      if (response.status < 500 && response.status !== 429) {
        throw new Error(`HTTP ${response.status} for ${url}`);
      }
      lastError = new Error(`HTTP ${response.status} for ${url}`);
    } catch (error) {
      lastError = error;
    }
    if (attempt < 4) {
      await new Promise((resolve) => setTimeout(resolve, 1000 * (2 ** (attempt - 1))));
    }
  }
  throw lastError || new Error(`Unable to fetch ${url}`);
}

function runScript(script, env) {
  const result = spawnSync(process.execPath, [script], {
    stdio: 'inherit',
    env: { ...process.env, ...env },
  });

  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${script} exited with status ${result.status}`);
  }
}

async function main() {
  const leagueId = envValue('RECAP_LEAGUE_ID', DEFAULT_LEAGUE_ID);
  const season = envValue('RECAP_SEASON', DEFAULT_SEASON);
  const requestedWeek = asNumber(envValue('RECAP_WEEK'));
  const force = envValue('RECAP_FORCE', 'false');

  const [league, rosters, nflState] = await Promise.all([
    fetchJson(`https://api.sleeper.app/v1/league/${leagueId}`),
    fetchJson(`https://api.sleeper.app/v1/league/${leagueId}/rosters`),
    fetchJson('https://api.sleeper.app/v1/state/nfl'),
  ]);

  const recordWeeks = Math.max(
    0,
    ...rosters.map((roster) => roster?.metadata?.record?.length || 0),
  );
  const rosterResultWeeks = Math.max(
    0,
    ...rosters.map((roster) =>
      (Number(roster?.settings?.wins) || 0) +
      (Number(roster?.settings?.losses) || 0) +
      (Number(roster?.settings?.ties) || 0)
    ),
  );
  const lastScoredLeg = Number(league?.settings?.last_scored_leg) || 0;
  const nflWeek = Number(nflState?.week) || 0;
  const nflPreviousWeek =
    String(nflState?.season) === String(season) && nflState?.season_type === 'regular'
      ? Math.max(0, nflWeek - 1)
      : 0;
  const regularSeasonLastWeek = Math.max(
    1,
    (Number(league?.settings?.playoff_week_start) || 15) - 1,
  );

  const detectedCompletedWeek = Math.min(
    regularSeasonLastWeek,
    Math.max(lastScoredLeg, recordWeeks, rosterResultWeeks, nflPreviousWeek),
  );
  const recapWeek = requestedWeek || detectedCompletedWeek;

  console.log(JSON.stringify({
    season,
    leagueId,
    lastScoredLeg,
    recordWeeks,
    rosterResultWeeks,
    nflWeek,
    nflPreviousWeek,
    detectedCompletedWeek,
    recapWeek,
  }, null, 2));

  if (!recapWeek || recapWeek < 1) {
    console.log('No completed fantasy week detected. Nothing to generate.');
    return;
  }

  runScript('scripts/generate-weekly-recap.mjs', {
    RECAP_LEAGUE_ID: leagueId,
    RECAP_SEASON: season,
    RECAP_WEEK: String(recapWeek),
    RECAP_FORCE: force,
  });

  const previewWeek = recapWeek + 1;
  if (previewWeek <= regularSeasonLastWeek) {
    runScript('scripts/generate-weekly-preview.mjs', {
      PREVIEW_LEAGUE_ID: leagueId,
      PREVIEW_SEASON: season,
      PREVIEW_WEEK: String(previewWeek),
      PREVIEW_FORCE: force,
    });
  } else {
    console.log(`Week ${previewWeek} is beyond the configured regular season; skipping regular-season preview.`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
