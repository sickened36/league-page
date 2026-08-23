import fs from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_LEAGUE_ID = '1389689189200592896';
const DEFAULT_SEASON = '2026';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-5.6-luna';

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
  const response = await fetch(url, {
    headers: { 'User-Agent': 'Fantasy-Foosball-Weekly-Recap/1.0' },
  });
  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${url}`);
  }
  return response.json();
}

function roundScore(value) {
  return Math.round((Number(value) || 0) * 100) / 100;
}

function playerName(playerDb, playerId) {
  const player = playerDb[playerId];
  if (!player) return `Player ${playerId}`;
  return player.full_name || [player.first_name, player.last_name].filter(Boolean).join(' ') || playerId;
}

function getTeamName(user, managerName) {
  return user?.metadata?.team_name?.trim() || user?.display_name || managerName;
}

function groupMatchups(matchups) {
  const groups = new Map();
  for (const matchup of matchups) {
    if (matchup.matchup_id == null) continue;
    const key = String(matchup.matchup_id);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(matchup);
  }
  return [...groups.entries()]
    .filter(([, teams]) => teams.length === 2)
    .map(([matchupId, teams]) => ({ matchupId: Number(matchupId), teams }));
}

async function calculateStandings({ leagueId, rosterToManager, throughWeek, regularSeasonLastWeek }) {
  const lastWeek = Math.min(throughWeek, regularSeasonLastWeek);
  const records = new Map();

  for (const manager of rosterToManager.values()) {
    records.set(manager.name, { manager: manager.name, wins: 0, losses: 0, ties: 0, pointsFor: 0 });
  }

  if (lastWeek < 1) return [...records.values()];

  const weekly = await Promise.all(
    Array.from({ length: lastWeek }, (_, index) =>
      fetchJson(`https://api.sleeper.app/v1/league/${leagueId}/matchups/${index + 1}`)
    )
  );

  for (const matchups of weekly) {
    for (const { teams } of groupMatchups(matchups)) {
      const [a, b] = teams;
      const managerA = rosterToManager.get(a.roster_id)?.name;
      const managerB = rosterToManager.get(b.roster_id)?.name;
      if (!managerA || !managerB) continue;

      const scoreA = Number(a.points) || 0;
      const scoreB = Number(b.points) || 0;
      const recordA = records.get(managerA);
      const recordB = records.get(managerB);
      recordA.pointsFor += scoreA;
      recordB.pointsFor += scoreB;

      if (scoreA > scoreB) {
        recordA.wins++;
        recordB.losses++;
      } else if (scoreB > scoreA) {
        recordB.wins++;
        recordA.losses++;
      } else {
        recordA.ties++;
        recordB.ties++;
      }
    }
  }

  return [...records.values()]
    .map((record) => ({ ...record, pointsFor: roundScore(record.pointsFor) }))
    .sort((a, b) =>
      b.wins - a.wins ||
      a.losses - b.losses ||
      b.ties - a.ties ||
      b.pointsFor - a.pointsFor
    )
    .map((record, index) => ({ rank: index + 1, ...record }));
}

function buildTeam(matchup, rosterToManager, playerDb) {
  const manager = rosterToManager.get(matchup.roster_id);
  if (!manager) throw new Error(`No manager found for roster ${matchup.roster_id}`);

  const points = matchup.players_points || {};
  const starters = (matchup.starters || []).map((id) => ({
    id,
    name: playerName(playerDb, id),
    points: roundScore(points[id]),
  }));

  const starterIds = new Set(matchup.starters || []);
  const bench = Object.entries(points)
    .filter(([id]) => !starterIds.has(id))
    .map(([id, score]) => ({ id, name: playerName(playerDb, id), points: roundScore(score) }))
    .sort((a, b) => b.points - a.points);

  return {
    rosterId: matchup.roster_id,
    manager: manager.name,
    teamName: manager.teamName,
    score: roundScore(matchup.points),
    topStarters: starters.sort((a, b) => b.points - a.points).slice(0, 4),
    topBench: bench.slice(0, 2),
  };
}

function matchupFacts(group, rosterToManager, playerDb) {
  const [rawA, rawB] = group.teams;
  const a = buildTeam(rawA, rosterToManager, playerDb);
  const b = buildTeam(rawB, rosterToManager, playerDb);
  const tied = a.score === b.score;
  const winner = tied ? null : a.score > b.score ? a : b;
  const loser = tied ? null : a.score > b.score ? b : a;

  return {
    matchupId: group.matchupId,
    teamA: a,
    teamB: b,
    tied,
    winner: winner?.manager || null,
    loser: loser?.manager || null,
    margin: roundScore(Math.abs(a.score - b.score)),
  };
}

function computeAwards(matchups) {
  const allTeams = matchups.flatMap((m) => [m.teamA, m.teamB]);
  const sortedByScore = [...allTeams].sort((a, b) => b.score - a.score);
  const sortedByMargin = [...matchups].sort((a, b) => a.margin - b.margin);
  const sortedBlowouts = [...matchups].sort((a, b) => b.margin - a.margin);

  const benchCandidates = allTeams
    .flatMap((team) => team.topBench.map((player) => ({ manager: team.manager, teamName: team.teamName, ...player })))
    .sort((a, b) => b.points - a.points);

  return {
    highScore: sortedByScore[0] || null,
    lowScore: sortedByScore.at(-1) || null,
    gameOfWeek: sortedByMargin[0] || null,
    biggestBlowout: sortedBlowouts[0] || null,
    benchRegret: benchCandidates[0] || null,
  };
}

function compactMatchupForPrompt(matchup) {
  return {
    matchupId: matchup.matchupId,
    winner: matchup.winner,
    loser: matchup.loser,
    margin: matchup.margin,
    teamA: {
      manager: matchup.teamA.manager,
      teamName: matchup.teamA.teamName,
      score: matchup.teamA.score,
      topStarters: matchup.teamA.topStarters,
      topBench: matchup.teamA.topBench,
      leagueLore: leagueLore[matchup.teamA.manager] || '',
    },
    teamB: {
      manager: matchup.teamB.manager,
      teamName: matchup.teamB.teamName,
      score: matchup.teamB.score,
      topStarters: matchup.teamB.topStarters,
      topBench: matchup.teamB.topBench,
      leagueLore: leagueLore[matchup.teamB.manager] || '',
    },
  };
}

function buildPrompt({ leagueName, season, week, matchups, awards, standings }) {
  return `You are the staff writer for Fantasy Foosball Weekly, an independent fantasy-football league publication. Write original mainstream sports-desk journalism: polished, energetic, concise, and a little witty. Do not claim affiliation with ESPN or any real publication.

The recap is for ${leagueName}, ${season}, Week ${week}.

RULES:
- Use ONLY the facts in the JSON below. Never invent quotes, injuries, lineup intentions, transactions, emotions, timestamps, comeback sequences, or play-by-play.
- Do not say a matchup was decided "late," "on Monday night," or by a specific real-world game unless the supplied facts explicitly prove it.
- You may say a team was "powered by" or "led by" a listed starter and cite that player's fantasy points.
- Light trash talk and league lore are encouraged when supported by the supplied leagueLore fields, but keep the actual game reporting credible.
- Every matchup gets its own headline and a 120-170 word mini article in 2-3 short paragraphs.
- The leagueLead should be 140-220 words and summarize the week as a whole.
- The closing should be 60-100 words and look ahead only in general terms; do not invent next-week opponents.
- Refer to managers by their real manager names, and use team names naturally where useful.
- Return JSON matching the required schema.

FACTS:
${JSON.stringify({ awards, standings, matchups: matchups.map(compactMatchupForPrompt) }, null, 2)}`;
}

const recapSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    title: { type: 'string' },
    subtitle: { type: 'string' },
    leagueLead: { type: 'string' },
    matchupStories: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          matchupId: { type: 'integer' },
          headline: { type: 'string' },
          story: { type: 'string' },
        },
        required: ['matchupId', 'headline', 'story'],
      },
    },
    closing: { type: 'string' },
  },
  required: ['title', 'subtitle', 'leagueLead', 'matchupStories', 'closing'],
};

async function generateEditorial(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is required. Add it as a GitHub Actions repository secret.');

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      reasoning: { effort: 'low' },
      instructions: 'Produce accurate structured JSON sports journalism from supplied fantasy-football facts.',
      input: [{ role: 'user', content: [{ type: 'input_text', text: prompt }] }],
      text: {
        format: {
          type: 'json_schema',
          name: 'fantasy_foosball_weekly_recap',
          strict: true,
          schema: recapSchema,
        },
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OpenAI request failed (${response.status}): ${body}`);
  }

  const data = await response.json();
  const outputText = (data.output || [])
    .flatMap((item) => item.content || [])
    .find((content) => content.type === 'output_text')?.text;

  if (!outputText) throw new Error('OpenAI response did not contain output_text.');
  return JSON.parse(outputText);
}

async function main() {
  const leagueId = envValue('RECAP_LEAGUE_ID', DEFAULT_LEAGUE_ID);
  const requestedSeason = envValue('RECAP_SEASON', DEFAULT_SEASON);
  const requestedWeek = asNumber(envValue('RECAP_WEEK'));
  const force = envValue('RECAP_FORCE', 'false').toLowerCase() === 'true';

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
      ownerId,
      name,
      teamName: getTeamName(user, name),
    });
  }

  const recordWeeks = Math.max(
    0,
    ...rosters.map((roster) => roster?.metadata?.record?.length || 0)
  );
  const lastScoredLeg = Number(league?.settings?.last_scored_leg) || 0;
  const latestCompletedWeek = Math.max(lastScoredLeg, recordWeeks);
  const week = requestedWeek || latestCompletedWeek;

  if (!week || week < 1) {
    console.log('No completed Sleeper week is available yet. Nothing to generate.');
    return;
  }

  const outputDir = path.join('static', 'recaps', season);
  const recapPath = path.join(outputDir, `week-${week}.json`);
  const indexPath = path.join(outputDir, 'index.json');
  await fs.mkdir(outputDir, { recursive: true });

  try {
    await fs.access(recapPath);
    if (!force) {
      console.log(`${recapPath} already exists. Set RECAP_FORCE=true to regenerate it.`);
      return;
    }
  } catch {
    // File does not exist yet.
  }

  console.log(`Building ${season} Week ${week} recap for league ${leagueId}...`);

  const [weekMatchups, playerDb] = await Promise.all([
    fetchJson(`https://api.sleeper.app/v1/league/${leagueId}/matchups/${week}`),
    fetchJson('https://api.sleeper.app/v1/players/nfl'),
  ]);

  const grouped = groupMatchups(weekMatchups);
  if (!grouped.length) throw new Error(`No completed head-to-head matchups found for Week ${week}.`);

  const matchups = grouped.map((group) => matchupFacts(group, rosterToManager, playerDb));
  const awards = computeAwards(matchups);
  const regularSeasonLastWeek = Math.max(1, (Number(league?.settings?.playoff_week_start) || 15) - 1);
  const standings = await calculateStandings({
    leagueId,
    rosterToManager,
    throughWeek: week,
    regularSeasonLastWeek,
  });

  const editorial = await generateEditorial(
    buildPrompt({
      leagueName: league.name || 'Fantasy Foosball',
      season,
      week,
      matchups,
      awards,
      standings,
    })
  );

  const storyById = new Map(editorial.matchupStories.map((story) => [story.matchupId, story]));
  const completeMatchups = matchups.map((matchup) => ({
    ...matchup,
    headline: storyById.get(matchup.matchupId)?.headline || `${matchup.teamA.manager} vs. ${matchup.teamB.manager}`,
    story: storyById.get(matchup.matchupId)?.story || '',
  }));

  const recap = {
    leagueId,
    leagueName: league.name || 'Fantasy Foosball',
    season: Number(season),
    week,
    generatedAt: new Date().toISOString(),
    model: OPENAI_MODEL,
    title: editorial.title,
    subtitle: editorial.subtitle,
    leagueLead: editorial.leagueLead,
    closing: editorial.closing,
    awards,
    standings,
    matchups: completeMatchups,
  };

  await fs.writeFile(recapPath, `${JSON.stringify(recap, null, 2)}\n`, 'utf8');

  let index = { season: Number(season), weeks: [] };
  try {
    index = JSON.parse(await fs.readFile(indexPath, 'utf8'));
  } catch {
    // New season; start a new index.
  }

  const entry = {
    week,
    title: recap.title,
    subtitle: recap.subtitle,
    generatedAt: recap.generatedAt,
  };
  index.season = Number(season);
  index.weeks = [...(index.weeks || []).filter((item) => item.week !== week), entry]
    .sort((a, b) => b.week - a.week);
  await fs.writeFile(indexPath, `${JSON.stringify(index, null, 2)}\n`, 'utf8');

  console.log(`Wrote ${recapPath} and updated ${indexPath}.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
