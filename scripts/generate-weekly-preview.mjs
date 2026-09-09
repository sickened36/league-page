import fs from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_LEAGUE_ID = '1389689189200592896';
const DEFAULT_SEASON = '2026';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-5.6-luna';
const SIMULATIONS = 8000;

const managerNames = {
  '731718765330411520': 'Payton',
  '840383263389368320': 'Alex',
  '855234295671939072': 'Andy',
  '857294119217795072': 'Joey',
  '857701073564065792': 'Kane',
  '857703937447436288': 'Kade',
  '857808616697229312': 'Evan',
  '858516512074502144': 'Parker',
  '860556909751672832': 'Cooper',
  '861318601184010240': 'Brae',
  '871906856019390464': 'Kohlt',
  '991832270292021248': 'CJ',
};

const leagueLore = {
  Payton: 'Two-time champion (2020, 2021). Rivals: Parker, Andy, CJ, Alex.',
  Parker: '2019 inaugural champion. League Public Enemy. Nickname: King of Dogshit Trades. Rivals: everyone.',
  Kane: 'Rivals: Kohlt and Kade.',
  Cooper: '2022 champion. Rival: Kade.',
  Joey: '2024 champion. Rivals: Andy and Evan.',
  Kohlt: 'Rivals: Kane, Kade, Parker.',
  Brae: 'Rivals: Parker and Andy.',
  Andy: 'Rivals: Alex, CJ, Payton.',
  Kade: 'Rivals: Kane, Kohlt, Andy.',
  Evan: '2023 champion. Rivals: Joey, Andy, Payton.',
  Alex: '2025 champion. Rivals: Andy, Payton, CJ.',
  CJ: 'Rivals: Payton, Andy, Alex.',
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function envValue(name, fallback = '') {
  const value = process.env[name];
  return value == null || value === '' ? fallback : value;
}

function asNumber(value, fallback = null) {
  if (value == null || value === '') return fallback;
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function round(value, digits = 1) {
  const factor = 10 ** digits;
  return Math.round((Number(value) || 0) * factor) / factor;
}

async function fetchWithRetry(url, options = {}, { attempts = 4, timeoutMs = 20000, label = 'Request' } = {}) {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      const retryable = response.status === 408 || response.status === 425 || response.status === 429 || response.status >= 500;
      if (!retryable || attempt === attempts) return response;
      console.warn(`${label} attempt ${attempt}/${attempts} returned HTTP ${response.status}; retrying.`);
    } catch (error) {
      if (attempt === attempts) {
        throw new Error(`${label} failed after ${attempts} attempts: ${url}`, { cause: error });
      }
      console.warn(`${label} attempt ${attempt}/${attempts} failed; retrying.`);
    } finally {
      clearTimeout(timeout);
    }
    await sleep(1000 * (2 ** (attempt - 1)));
  }
  throw new Error(`${label} failed: ${url}`);
}

async function fetchJson(url) {
  const response = await fetchWithRetry(url, {
    headers: { 'User-Agent': 'Fantasy-Foosball-Weekly-Preview/1.0' },
  }, { label: 'Sleeper API request' });
  if (!response.ok) throw new Error(`Request failed (${response.status}) for ${url}`);
  return response.json();
}

function groupMatchups(matchups) {
  const groups = new Map();
  for (const matchup of matchups || []) {
    if (matchup.matchup_id == null) continue;
    const key = String(matchup.matchup_id);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(matchup);
  }
  return [...groups.entries()]
    .filter(([, teams]) => teams.length === 2)
    .map(([matchupId, teams]) => ({
      matchupId: Number(matchupId),
      rosterA: teams[0].roster_id,
      rosterB: teams[1].roster_id,
      rawA: teams[0],
      rawB: teams[1],
    }));
}

function seededRandom(seed) {
  let a = seed >>> 0;
  return () => {
    a += 0x6D2B79F5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function normal(random) {
  const u = Math.max(random(), 1e-9);
  const v = Math.max(random(), 1e-9);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

async function standingsThroughWeek({ leagueId, rosterToManager, throughWeek }) {
  const records = new Map();
  for (const [rosterId, manager] of rosterToManager.entries()) {
    records.set(rosterId, {
      rosterId,
      manager: manager.name,
      teamName: manager.teamName,
      wins: 0,
      losses: 0,
      ties: 0,
      pointsFor: 0,
      games: 0,
    });
  }

  if (throughWeek > 0) {
    const weekly = await Promise.all(
      Array.from({ length: throughWeek }, (_, index) =>
        fetchJson(`https://api.sleeper.app/v1/league/${leagueId}/matchups/${index + 1}`)
      )
    );

    for (const matchups of weekly) {
      for (const game of groupMatchups(matchups)) {
        const a = records.get(game.rosterA);
        const b = records.get(game.rosterB);
        if (!a || !b) continue;
        const scoreA = Number(game.rawA.points) || 0;
        const scoreB = Number(game.rawB.points) || 0;
        a.pointsFor += scoreA;
        b.pointsFor += scoreB;
        a.games++;
        b.games++;
        if (scoreA > scoreB) {
          a.wins++;
          b.losses++;
        } else if (scoreB > scoreA) {
          b.wins++;
          a.losses++;
        } else {
          a.ties++;
          b.ties++;
        }
      }
    }
  }

  const sorted = [...records.values()].sort((a, b) =>
    b.wins - a.wins ||
    a.losses - b.losses ||
    b.ties - a.ties ||
    b.pointsFor - a.pointsFor
  );

  return sorted.map((team, index) => ({
    ...team,
    rank: index + 1,
    pointsFor: round(team.pointsFor, 2),
    pointsPerGame: team.games ? round(team.pointsFor / team.games, 2) : null,
  }));
}

function buildStrengths(standings) {
  const played = standings.filter((team) => team.games > 0);
  const leagueAverage = played.length
    ? played.reduce((sum, team) => sum + team.pointsPerGame, 0) / played.length
    : 100;

  const strengths = new Map();
  for (const team of standings) {
    const smoothedPPG = team.games
      ? (team.pointsFor + leagueAverage * 2) / (team.games + 2)
      : leagueAverage;
    const smoothedWinPct = (team.wins + team.ties * 0.5 + 2) / (team.games + 4);
    strengths.set(team.rosterId, {
      mean: smoothedPPG + (smoothedWinPct - 0.5) * 14,
      expectedPPG: smoothedPPG,
    });
  }
  return { strengths, leagueAverage };
}

async function loadRemainingSchedule({ leagueId, previewWeek, regularSeasonLastWeek }) {
  const weeks = [];
  for (let week = previewWeek; week <= regularSeasonLastWeek; week++) {
    const raw = await fetchJson(`https://api.sleeper.app/v1/league/${leagueId}/matchups/${week}`);
    const games = groupMatchups(raw).map((game) => ({
      matchupId: game.matchupId,
      rosterA: game.rosterA,
      rosterB: game.rosterB,
    }));
    if (games.length) weeks.push({ week, games });
  }
  return weeks;
}

function simulatePlayoffOdds({ standings, schedule, previewWeek, playoffTeams, seed }) {
  const ids = standings.map((team) => team.rosterId);
  const { strengths } = buildStrengths(standings);
  const random = seededRandom(seed);
  const baseQualify = new Map(ids.map((id) => [id, 0]));
  const conditionTotals = new Map();
  const conditionQualify = new Map();

  const previewGames = schedule.find((item) => item.week === previewWeek)?.games || [];
  for (const game of previewGames) {
    for (const outcome of ['A', 'B']) {
      const key = `${game.matchupId}:${outcome}`;
      conditionTotals.set(key, 0);
      conditionQualify.set(key, new Map(ids.map((id) => [id, 0])));
    }
  }

  for (let sim = 0; sim < SIMULATIONS; sim++) {
    const state = new Map(standings.map((team) => [team.rosterId, {
      wins: team.wins,
      losses: team.losses,
      ties: team.ties,
      pointsFor: team.pointsFor,
    }]));
    const previewOutcomes = new Map();

    for (const week of schedule) {
      for (const game of week.games) {
        const strengthA = strengths.get(game.rosterA);
        const strengthB = strengths.get(game.rosterB);
        const scoreA = Math.max(0, strengthA.mean + normal(random) * 18);
        const scoreB = Math.max(0, strengthB.mean + normal(random) * 18);
        const a = state.get(game.rosterA);
        const b = state.get(game.rosterB);
        a.pointsFor += scoreA;
        b.pointsFor += scoreB;

        if (scoreA >= scoreB) {
          a.wins++;
          b.losses++;
          if (week.week === previewWeek) previewOutcomes.set(game.matchupId, 'A');
        } else {
          b.wins++;
          a.losses++;
          if (week.week === previewWeek) previewOutcomes.set(game.matchupId, 'B');
        }
      }
    }

    const finalOrder = ids
      .map((id) => ({ id, ...state.get(id) }))
      .sort((a, b) =>
        b.wins - a.wins ||
        a.losses - b.losses ||
        b.ties - a.ties ||
        b.pointsFor - a.pointsFor
      );
    const qualifiers = new Set(finalOrder.slice(0, playoffTeams).map((team) => team.id));

    for (const id of qualifiers) baseQualify.set(id, baseQualify.get(id) + 1);

    for (const [matchupId, outcome] of previewOutcomes.entries()) {
      const key = `${matchupId}:${outcome}`;
      conditionTotals.set(key, conditionTotals.get(key) + 1);
      const counts = conditionQualify.get(key);
      for (const id of qualifiers) counts.set(id, counts.get(id) + 1);
    }
  }

  const pct = (count, total) => total ? round((count / total) * 100, 1) : null;
  const odds = new Map(ids.map((id) => [id, pct(baseQualify.get(id), SIMULATIONS)]));
  const conditional = new Map();

  for (const game of previewGames) {
    const keyA = `${game.matchupId}:A`;
    const keyB = `${game.matchupId}:B`;
    const totalA = conditionTotals.get(keyA);
    const totalB = conditionTotals.get(keyB);
    const qualifyA = conditionQualify.get(keyA);
    const qualifyB = conditionQualify.get(keyB);
    conditional.set(game.matchupId, {
      rosterA: {
        withWin: pct(qualifyA.get(game.rosterA), totalA),
        withLoss: pct(qualifyB.get(game.rosterA), totalB),
      },
      rosterB: {
        withWin: pct(qualifyB.get(game.rosterB), totalB),
        withLoss: pct(qualifyA.get(game.rosterB), totalA),
      },
    });
  }

  return { odds, conditional };
}

function teamFact(team, odds, scenario) {
  const withWin = scenario?.withWin ?? odds;
  const withLoss = scenario?.withLoss ?? odds;
  return {
    manager: team.manager,
    teamName: team.teamName,
    rank: team.rank,
    record: `${team.wins}-${team.losses}${team.ties ? `-${team.ties}` : ''}`,
    pointsFor: team.pointsFor,
    pointsPerGame: team.pointsPerGame,
    playoffOdds: odds,
    playoffOddsWithWin: withWin,
    playoffOddsWithLoss: withLoss,
    playoffOddsSwing: withWin != null && withLoss != null ? round(withWin - withLoss, 1) : null,
    leagueLore: leagueLore[team.manager] || '',
  };
}

function buildPrompt({ leagueName, season, previewWeek, playoffTeams, matchupFacts }) {
  return `You write Fantasy Foosball Weekly, an independent fantasy-football league publication. Write a concise preview of each upcoming fantasy matchup.

The preview is for ${leagueName}, ${season}, Week ${previewWeek}. The league has ${playoffTeams} playoff spots.

RULES:
- Use ONLY the supplied facts. Never invent injuries, projections, player news, lineup choices, quotes, emotions, or real-world game details.
- Each matchup gets one headline and EXACTLY ONE paragraph of 65-105 words.
- Center the paragraph on current records, standings rank, modeled playoff odds, and how much a win/loss changes each team's modeled chance.
- Playoff odds are model estimates, not guarantees or sportsbook odds. Use language such as "modeled playoff chance" or "the model gives."
- Early in the season, acknowledge that odds are volatile when appropriate.
- If the supplied win/loss odds barely move, do not overstate the stakes.
- Light rivalry/lore references are allowed only from the supplied leagueLore field.
- Do not calculate additional standings gaps or probabilities beyond what is supplied.
- Refer to managers by real manager names; team names may be used naturally.
- Return JSON matching the schema.

FACTS:
${JSON.stringify(matchupFacts, null, 2)}`;
}

const previewSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    title: { type: 'string' },
    subtitle: { type: 'string' },
    matchupPreviews: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          matchupId: { type: 'integer' },
          headline: { type: 'string' },
          paragraph: { type: 'string' },
        },
        required: ['matchupId', 'headline', 'paragraph'],
      },
    },
  },
  required: ['title', 'subtitle', 'matchupPreviews'],
};

async function generateEditorial(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is required.');

  const response = await fetchWithRetry('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      reasoning: { effort: 'low' },
      instructions: 'Produce accurate structured JSON fantasy-football matchup previews from supplied facts.',
      input: [{ role: 'user', content: [{ type: 'input_text', text: prompt }] }],
      text: {
        format: {
          type: 'json_schema',
          name: 'fantasy_foosball_weekly_preview',
          strict: true,
          schema: previewSchema,
        },
      },
    }),
  }, { attempts: 3, timeoutMs: 60000, label: 'OpenAI request' });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OpenAI request failed (${response.status}): ${body}`);
  }

  const data = await response.json();
  const outputText = (data.output || [])
    .flatMap((item) => item.content || [])
    .find((item) => item.type === 'output_text')?.text;
  if (!outputText) throw new Error('OpenAI response did not contain output_text.');
  return JSON.parse(outputText);
}

async function main() {
  const leagueId = envValue('PREVIEW_LEAGUE_ID', envValue('RECAP_LEAGUE_ID', DEFAULT_LEAGUE_ID));
  const requestedSeason = envValue('PREVIEW_SEASON', envValue('RECAP_SEASON', DEFAULT_SEASON));
  const requestedWeek = asNumber(envValue('PREVIEW_WEEK'));
  const force = envValue('PREVIEW_FORCE', envValue('RECAP_FORCE', 'false')).toLowerCase() === 'true';

  const [league, rosters, users] = await Promise.all([
    fetchJson(`https://api.sleeper.app/v1/league/${leagueId}`),
    fetchJson(`https://api.sleeper.app/v1/league/${leagueId}/rosters`),
    fetchJson(`https://api.sleeper.app/v1/league/${leagueId}/users`),
  ]);

  const season = String(requestedSeason || league.season || DEFAULT_SEASON);
  const userById = new Map(users.map((user) => [String(user.user_id), user]));
  const rosterToManager = new Map();

  for (const roster of rosters) {
    const ownerId = String(roster.owner_id || '');
    const user = userById.get(ownerId);
    const name = managerNames[ownerId] || user?.display_name || `Roster ${roster.roster_id}`;
    rosterToManager.set(roster.roster_id, {
      name,
      teamName: user?.metadata?.team_name?.trim() || user?.display_name || name,
    });
  }

  const recordWeeks = Math.max(0, ...rosters.map((roster) => roster?.metadata?.record?.length || 0));
  const lastScoredLeg = Number(league?.settings?.last_scored_leg) || 0;
  const latestCompletedWeek = Math.max(lastScoredLeg, recordWeeks);
  const regularSeasonLastWeek = Math.max(1, (Number(league?.settings?.playoff_week_start) || 15) - 1);
  const previewWeek = requestedWeek || Math.min(latestCompletedWeek + 1, regularSeasonLastWeek);
  const throughWeek = Math.max(0, previewWeek - 1);

  const outputDir = path.join('static', 'previews', season);
  const previewPath = path.join(outputDir, `week-${previewWeek}.json`);
  const indexPath = path.join(outputDir, 'index.json');
  await fs.mkdir(outputDir, { recursive: true });

  try {
    await fs.access(previewPath);
    if (!force) {
      console.log(`${previewPath} already exists. Set PREVIEW_FORCE=true to regenerate it.`);
      return;
    }
  } catch {}

  const standings = await standingsThroughWeek({ leagueId, rosterToManager, throughWeek });
  const schedule = await loadRemainingSchedule({ leagueId, previewWeek, regularSeasonLastWeek });
  const previewGames = schedule.find((item) => item.week === previewWeek)?.games || [];
  if (!previewGames.length) {
    console.log(`No Week ${previewWeek} matchup schedule is available yet. Nothing to preview.`);
    return;
  }

  const playoffTeams = Math.min(Number(league?.settings?.playoff_teams) || 6, standings.length);
  const seed = Number(season) * 100 + previewWeek;
  const { odds, conditional } = simulatePlayoffOdds({
    standings,
    schedule,
    previewWeek,
    playoffTeams,
    seed,
  });
  const standingsByRoster = new Map(standings.map((team) => [team.rosterId, team]));

  const matchupFacts = previewGames.map((game) => {
    const a = standingsByRoster.get(game.rosterA);
    const b = standingsByRoster.get(game.rosterB);
    const scenarios = conditional.get(game.matchupId);
    return {
      matchupId: game.matchupId,
      teamA: teamFact(a, odds.get(game.rosterA), scenarios?.rosterA),
      teamB: teamFact(b, odds.get(game.rosterB), scenarios?.rosterB),
    };
  });

  const editorial = await generateEditorial(buildPrompt({
    leagueName: league.name || 'Fantasy Foosball',
    season,
    previewWeek,
    playoffTeams,
    matchupFacts,
  }));

  const editorialById = new Map(editorial.matchupPreviews.map((item) => [item.matchupId, item]));
  const matchups = matchupFacts.map((matchup) => ({
    ...matchup,
    headline: editorialById.get(matchup.matchupId)?.headline || `${matchup.teamA.manager} vs. ${matchup.teamB.manager}`,
    paragraph: editorialById.get(matchup.matchupId)?.paragraph || '',
  }));

  const preview = {
    leagueId,
    leagueName: league.name || 'Fantasy Foosball',
    season: Number(season),
    week: previewWeek,
    throughWeek,
    generatedAt: new Date().toISOString(),
    model: OPENAI_MODEL,
    title: editorial.title,
    subtitle: editorial.subtitle,
    playoffModel: {
      simulations: SIMULATIONS,
      playoffTeams,
      description: 'Seeded Monte Carlo estimate using current record, scoring strength and remaining Sleeper schedule.',
    },
    matchups,
  };

  await fs.writeFile(previewPath, `${JSON.stringify(preview, null, 2)}\n`, 'utf8');

  let index = { season: Number(season), weeks: [] };
  try {
    index = JSON.parse(await fs.readFile(indexPath, 'utf8'));
  } catch {}

  const entry = {
    week: previewWeek,
    title: preview.title,
    subtitle: preview.subtitle,
    generatedAt: preview.generatedAt,
  };
  index.season = Number(season);
  index.weeks = [...(index.weeks || []).filter((item) => item.week !== previewWeek), entry]
    .sort((a, b) => b.week - a.week);
  await fs.writeFile(indexPath, `${JSON.stringify(index, null, 2)}\n`, 'utf8');

  console.log(`Wrote ${previewPath} and updated ${indexPath}.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
