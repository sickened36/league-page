import fs from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_LEAGUE_ID = '1389689189200592896';
const DEFAULT_SEASON = '2026';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-5.6-luna';
const TRANSACTION_WEEKS = 18;

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
  Kade: 'Rivals: Kane, Kohlt, Andy. Only Packers fan in a league full of Cowboys fans.',
  Evan: '2023 champion. Rivals: Joey, Andy, Payton.',
  Alex: '2025 champion. Defending champion entering 2026. Rivals: Andy, Payton, CJ.',
  CJ: 'Rivals: Payton, Andy, Alex.',
};

function envValue(name, fallback = '') {
  const value = process.env[name];
  return value == null || value === '' ? fallback : value;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function round(value, digits = 1) {
  const power = 10 ** digits;
  return Math.round((Number(value) || 0) * power) / power;
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'Fantasy-Foosball-Trade-Grader/1.0' },
  });
  if (!response.ok) throw new Error(`Request failed (${response.status}) for ${url}`);
  return response.json();
}

function playerName(playerDb, playerId) {
  const player = playerDb[playerId];
  if (!player) return `Player ${playerId}`;
  return player.full_name || [player.first_name, player.last_name].filter(Boolean).join(' ') || playerId;
}

function positionOf(player) {
  return player?.fantasy_positions?.[0] || player?.position || 'FLEX';
}

function rankValue(player) {
  const rank = Number(player?.search_rank);
  if (!Number.isFinite(rank) || rank <= 0) return 38;
  if (rank <= 10) return 97;
  if (rank <= 25) return 92;
  if (rank <= 50) return 86;
  if (rank <= 80) return 80;
  if (rank <= 120) return 73;
  if (rank <= 180) return 64;
  if (rank <= 260) return 54;
  if (rank <= 400) return 44;
  return 34;
}

function productionValue(position, seasonAvg, recentAvg) {
  const caps = { QB: 25, RB: 20, WR: 20, TE: 16, K: 12, DEF: 12, DST: 12 };
  const cap = caps[position] || 18;
  const blended = (seasonAvg * 0.65) + (recentAvg * 0.35);
  return clamp((blended / cap) * 100, 0, 100);
}

function getProduction(production, playerId) {
  const samples = production.get(String(playerId)) || [];
  if (!samples.length) return { games: 0, seasonAvg: 0, recentAvg: 0 };
  const seasonAvg = samples.reduce((sum, value) => sum + value, 0) / samples.length;
  const recent = samples.slice(-3);
  const recentAvg = recent.reduce((sum, value) => sum + value, 0) / recent.length;
  return { games: samples.length, seasonAvg: round(seasonAvg), recentAvg: round(recentAvg) };
}

function marketValue(playerId, playerDb, production) {
  const player = playerDb[playerId] || {};
  const position = positionOf(player);
  const usage = getProduction(production, playerId);
  const rankScore = rankValue(player);
  const productionScore = productionValue(position, usage.seasonAvg, usage.recentAvg);
  const score = usage.games
    ? (rankScore * 0.55) + (productionScore * 0.45)
    : rankScore;

  return {
    id: String(playerId),
    type: 'player',
    name: playerName(playerDb, playerId),
    position,
    nflTeam: player.team || null,
    searchRank: Number.isFinite(Number(player.search_rank)) ? Number(player.search_rank) : null,
    games: usage.games,
    seasonAvg: usage.seasonAvg,
    recentAvg: usage.recentAvg,
    value: round(clamp(score, 20, 99)),
  };
}

function pickValue(pick, season) {
  const roundNumber = Number(pick.round) || 5;
  const baseByRound = { 1: 58, 2: 42, 3: 30, 4: 22, 5: 17, 6: 13 };
  const base = baseByRound[roundNumber] || 10;
  const yearsOut = Math.max(0, Number(pick.season || season) - Number(season));
  return round(base * (0.85 ** yearsOut));
}

function packageValue(assets) {
  const discounts = [1, 0.74, 0.58, 0.46, 0.38, 0.32];
  return round(
    [...assets]
      .sort((a, b) => b.value - a.value)
      .reduce((sum, asset, index) => sum + (asset.value * (discounts[index] ?? 0.28)), 0)
  );
}

function gradeLetter(score) {
  if (score >= 97) return 'A+';
  if (score >= 93) return 'A';
  if (score >= 90) return 'A-';
  if (score >= 87) return 'B+';
  if (score >= 83) return 'B';
  if (score >= 80) return 'B-';
  if (score >= 77) return 'C+';
  if (score >= 73) return 'C';
  if (score >= 70) return 'C-';
  if (score >= 67) return 'D+';
  if (score >= 63) return 'D';
  if (score >= 60) return 'D-';
  return 'F';
}

async function collectProduction(leagueId, throughWeek) {
  const production = new Map();
  if (!throughWeek) return production;

  const weeks = await Promise.all(
    Array.from({ length: Math.min(throughWeek, 18) }, (_, index) =>
      fetchJson(`https://api.sleeper.app/v1/league/${leagueId}/matchups/${index + 1}`)
    )
  );

  for (const matchups of weeks) {
    for (const matchup of matchups) {
      for (const [playerId, rawPoints] of Object.entries(matchup.players_points || {})) {
        if (!production.has(playerId)) production.set(playerId, []);
        production.get(playerId).push(Number(rawPoints) || 0);
      }
    }
  }
  return production;
}

function rosterContext(roster, playerDb, production) {
  const players = (roster?.players || []).map((id) => marketValue(id, playerDb, production));
  const positionCounts = {};
  for (const player of players) positionCounts[player.position] = (positionCounts[player.position] || 0) + 1;

  return {
    record: `${roster?.settings?.wins || 0}-${roster?.settings?.losses || 0}`,
    pointsFor: round((Number(roster?.settings?.fpts) || 0) + ((Number(roster?.settings?.fpts_decimal) || 0) / 100), 2),
    positionCounts,
    topPlayers: [...players].sort((a, b) => b.value - a.value).slice(0, 5).map((player) => ({
      name: player.name,
      position: player.position,
      value: player.value,
    })),
    players,
  };
}

function fitScore(receivedPlayers, context) {
  if (!receivedPlayers.length) return 68;
  const healthyDepth = { QB: 2, RB: 4, WR: 5, TE: 2, K: 1, DEF: 1, DST: 1 };
  const scores = receivedPlayers.map((asset) => {
    const count = context.positionCounts[asset.position] || 0;
    const target = healthyDepth[asset.position] || 3;
    const samePosition = context.players.filter((player) => player.position === asset.position && player.id !== asset.id);
    const bestOther = samePosition.length ? Math.max(...samePosition.map((player) => player.value)) : 0;
    let score = count <= target ? 86 : 72;
    if (asset.value >= bestOther + 5) score += 10;
    else if (asset.value >= bestOther - 8) score += 5;
    return clamp(score, 55, 98);
  });
  return round(scores.reduce((sum, value) => sum + value, 0) / scores.length);
}

function lineupImpactScore(receivedPlayers, context) {
  if (!receivedPlayers.length) return 62;
  const scores = receivedPlayers.map((asset) => {
    const otherValues = context.players
      .filter((player) => player.position === asset.position && player.id !== asset.id)
      .map((player) => player.value)
      .sort((a, b) => b - a);
    const bestOther = otherValues[0] || 0;
    if (asset.value >= bestOther + 8) return 96;
    if (asset.value >= bestOther - 3) return 88;
    if (asset.value >= bestOther - 12) return 76;
    return 64;
  });
  return round(scores.reduce((sum, value) => sum + value, 0) / scores.length);
}

function getTeamName(user, managerName) {
  return user?.metadata?.team_name?.trim() || user?.display_name || managerName;
}

function buildTradeSides({ transaction, rosterMap, userById, playerDb, production, season }) {
  const sideMap = new Map();
  const ensureSide = (rosterId) => {
    const id = Number(rosterId);
    if (!sideMap.has(id)) {
      const roster = rosterMap.get(id);
      const ownerId = String(roster?.owner_id || '');
      const user = userById.get(ownerId);
      const manager = managerNames[ownerId] || user?.display_name || `Roster ${id}`;
      sideMap.set(id, {
        rosterId: id,
        manager,
        teamName: getTeamName(user, manager),
        lore: leagueLore[manager] || '',
        received: [],
        sent: [],
        context: null,
      });
    }
    return sideMap.get(id);
  };

  for (const rosterId of transaction.roster_ids || []) ensureSide(rosterId);

  for (const [playerId, receiverId] of Object.entries(transaction.adds || {})) {
    const asset = marketValue(playerId, playerDb, production);
    ensureSide(receiverId).received.push(asset);
    const senderId = transaction.drops?.[playerId];
    if (senderId != null) ensureSide(senderId).sent.push(asset);
  }

  for (const [playerId, senderId] of Object.entries(transaction.drops || {})) {
    if (transaction.adds?.[playerId] != null) continue;
    ensureSide(senderId).sent.push(marketValue(playerId, playerDb, production));
  }

  for (const pick of transaction.draft_picks || []) {
    const asset = {
      id: `${pick.season}-${pick.round}-${pick.roster_id || 'pick'}`,
      type: 'pick',
      name: `${pick.season} Round ${pick.round} pick`,
      season: Number(pick.season),
      round: Number(pick.round),
      value: pickValue(pick, season),
    };
    if (pick.owner_id != null) ensureSide(pick.owner_id).received.push(asset);
    if (pick.previous_owner_id != null) ensureSide(pick.previous_owner_id).sent.push(asset);
  }

  for (const budget of transaction.waiver_budget || []) {
    const asset = {
      id: `faab-${budget.sender}-${budget.receiver}-${budget.amount}`,
      type: 'faab',
      name: `$${budget.amount} FAAB`,
      amount: Number(budget.amount) || 0,
      value: round(clamp((Number(budget.amount) || 0) * 0.35, 3, 35)),
    };
    if (budget.receiver != null) ensureSide(budget.receiver).received.push(asset);
    if (budget.sender != null) ensureSide(budget.sender).sent.push(asset);
  }

  const sides = [...sideMap.values()];
  for (const side of sides) {
    side.context = rosterContext(rosterMap.get(side.rosterId), playerDb, production);
    side.packageValue = packageValue(side.received);
  }

  const averagePackage = sides.length
    ? sides.reduce((sum, side) => sum + side.packageValue, 0) / sides.length
    : 0;

  for (const side of sides) {
    const receivedPlayers = side.received.filter((asset) => asset.type === 'player');
    const relativeEdge = averagePackage
      ? (side.packageValue - averagePackage) / averagePackage
      : 0;
    const valueScore = round(clamp(82 + (relativeEdge * 22), 45, 98));
    const fit = fitScore(receivedPlayers, side.context);
    const impact = lineupImpactScore(receivedPlayers, side.context);
    const overall = round(clamp((valueScore * 0.70) + (fit * 0.15) + (impact * 0.15), 45, 98));
    side.scores = {
      overall,
      value: valueScore,
      rosterFit: fit,
      lineupImpact: impact,
    };
    side.grade = gradeLetter(overall);
    delete side.context.players;
  }

  return sides;
}

function assetForPrompt(asset) {
  const common = { type: asset.type, name: asset.name, value: asset.value };
  if (asset.type === 'player') {
    return {
      ...common,
      position: asset.position,
      nflTeam: asset.nflTeam,
      searchRank: asset.searchRank,
      games: asset.games,
      seasonAvg: asset.seasonAvg,
      recentAvg: asset.recentAvg,
    };
  }
  return common;
}

function buildPrompt({ leagueName, season, week, sides }) {
  const facts = sides.map((side) => ({
    rosterId: side.rosterId,
    manager: side.manager,
    teamName: side.teamName,
    grade: side.grade,
    scores: side.scores,
    packageValue: side.packageValue,
    received: side.received.map(assetForPrompt),
    sent: side.sent.map(assetForPrompt),
    rosterContext: side.context,
    leagueLore: side.lore,
  }));

  return `You are the trade desk writer for Fantasy Foosball, an independent fantasy-football league publication. Write an original, concise trade-grade analysis with mainstream sports-desk polish and light league trash talk.

This is ${leagueName}, ${season}, transaction week ${week}.

IMPORTANT METHODOLOGY:
- The letter grades and numeric scores below were calculated deterministically from Sleeper-derived player market rank, actual league production when available, roster fit, and likely starting-lineup impact.
- DO NOT change, recalculate, contradict, or invent a different grade. Your job is to explain the supplied grade.
- The internal marketValue/packageValue numbers are heuristic MVP scores, not consensus industry trade values. Do not present them as an external ranking service.

RULES:
- Use ONLY the supplied facts.
- Never invent quotes, injuries, trade negotiations, manager intentions, personal emotions, lineup decisions, or future outcomes.
- Do not claim a player is injured unless an injury fact is explicitly supplied (none are supplied here).
- Explain each manager's return, roster fit, upside, and principal risk.
- Light trash talk is welcome only when supported by leagueLore. Keep it playful rather than mean-spirited.
- For each side, write a 70-115 word analysis plus a short bestReason and biggestRisk.
- summary: 90-150 words covering the whole trade.
- verdict: one punchy sentence declaring the current winner, a draw, or that the deal is too close to separate. Base it on the supplied grades/scores.
- headline: short sports-desk headline.
- Return JSON matching the required schema.

FACTS:
${JSON.stringify(facts, null, 2)}`;
}

const editorialSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    headline: { type: 'string' },
    verdict: { type: 'string' },
    summary: { type: 'string' },
    sides: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          rosterId: { type: 'integer' },
          analysis: { type: 'string' },
          bestReason: { type: 'string' },
          biggestRisk: { type: 'string' },
        },
        required: ['rosterId', 'analysis', 'bestReason', 'biggestRisk'],
      },
    },
  },
  required: ['headline', 'verdict', 'summary', 'sides'],
};

async function generateEditorial(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is required in the recap-bot GitHub environment.');

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      reasoning: { effort: 'low' },
      instructions: 'Explain deterministic fantasy-football trade grades using only supplied facts and return strict structured JSON.',
      input: [{ role: 'user', content: [{ type: 'input_text', text: prompt }] }],
      text: {
        format: {
          type: 'json_schema',
          name: 'fantasy_foosball_trade_grade',
          strict: true,
          schema: editorialSchema,
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

function safeTradeId(id) {
  return String(id).replace(/[^a-zA-Z0-9_-]/g, '-');
}

async function main() {
  const leagueId = envValue('TRADE_LEAGUE_ID', DEFAULT_LEAGUE_ID);
  const requestedSeason = envValue('TRADE_SEASON', DEFAULT_SEASON);
  const force = envValue('TRADE_FORCE', 'false').toLowerCase() === 'true';

  const [league, rosters, users] = await Promise.all([
    fetchJson(`https://api.sleeper.app/v1/league/${leagueId}`),
    fetchJson(`https://api.sleeper.app/v1/league/${leagueId}/rosters`),
    fetchJson(`https://api.sleeper.app/v1/league/${leagueId}/users`),
  ]);

  const season = String(requestedSeason || league.season || DEFAULT_SEASON);
  const outputDir = path.join('static', 'trades', season);
  const indexPath = path.join(outputDir, 'index.json');
  await fs.mkdir(outputDir, { recursive: true });

  let index = { season: Number(season), trades: [] };
  try {
    index = JSON.parse(await fs.readFile(indexPath, 'utf8'));
  } catch {
    // First run for this season.
  }

  const transactionWeeks = await Promise.all(
    Array.from({ length: TRANSACTION_WEEKS }, (_, index) =>
      fetchJson(`https://api.sleeper.app/v1/league/${leagueId}/transactions/${index + 1}`)
        .then((transactions) => transactions.map((transaction) => ({ ...transaction, transactionWeek: index + 1 })))
    )
  );

  const trades = transactionWeeks
    .flat()
    .filter((transaction) => transaction.type === 'trade')
    .filter((transaction) => !transaction.status || transaction.status === 'complete')
    .sort((a, b) => (Number(a.status_updated) || 0) - (Number(b.status_updated) || 0));

  const existingIds = new Set((index.trades || []).map((item) => String(item.id)));
  const pending = force ? trades : trades.filter((trade) => !existingIds.has(String(trade.transaction_id)));

  if (!pending.length) {
    try {
      await fs.access(indexPath);
    } catch {
      await fs.writeFile(indexPath, `${JSON.stringify(index, null, 2)}\n`, 'utf8');
    }
    console.log(`No new ${season} trades to grade.`);
    return;
  }

  console.log(`Found ${pending.length} trade(s) to grade for ${season}.`);

  const playerDb = await fetchJson('https://api.sleeper.app/v1/players/nfl');
  const throughWeek = Number(league?.settings?.last_scored_leg) || 0;
  const production = await collectProduction(leagueId, throughWeek);
  const rosterMap = new Map(rosters.map((roster) => [Number(roster.roster_id), roster]));
  const userById = new Map(users.map((user) => [String(user.user_id), user]));

  for (const transaction of pending) {
    const id = String(transaction.transaction_id);
    const week = Number(transaction.transactionWeek) || 1;
    const sides = buildTradeSides({ transaction, rosterMap, userById, playerDb, production, season });
    if (sides.length < 2) {
      console.warn(`Skipping trade ${id}: fewer than two resolvable sides.`);
      continue;
    }

    const editorial = await generateEditorial(buildPrompt({
      leagueName: league.name || 'Fantasy Foosball',
      season,
      week,
      sides,
    }));

    const editorialByRoster = new Map(editorial.sides.map((side) => [Number(side.rosterId), side]));
    const completeSides = sides.map((side) => ({
      ...side,
      analysis: editorialByRoster.get(side.rosterId)?.analysis || '',
      bestReason: editorialByRoster.get(side.rosterId)?.bestReason || '',
      biggestRisk: editorialByRoster.get(side.rosterId)?.biggestRisk || '',
    }));

    const occurredAt = Number(transaction.status_updated || transaction.created) || Date.now();
    const grade = {
      id,
      leagueId,
      leagueName: league.name || 'Fantasy Foosball',
      season: Number(season),
      week,
      occurredAt,
      generatedAt: new Date().toISOString(),
      model: OPENAI_MODEL,
      methodology: 'MVP: Sleeper player search rank + actual league production (when available) + roster fit + starting-lineup impact.',
      headline: editorial.headline,
      verdict: editorial.verdict,
      summary: editorial.summary,
      sides: completeSides,
    };

    const filename = `trade-${safeTradeId(id)}.json`;
    await fs.writeFile(path.join(outputDir, filename), `${JSON.stringify(grade, null, 2)}\n`, 'utf8');

    const entry = {
      id,
      week,
      occurredAt,
      generatedAt: grade.generatedAt,
      headline: grade.headline,
      verdict: grade.verdict,
      participants: completeSides.map((side) => ({
        rosterId: side.rosterId,
        manager: side.manager,
        teamName: side.teamName,
        grade: side.grade,
        score: side.scores.overall,
      })),
    };

    index.trades = [...(index.trades || []).filter((item) => String(item.id) !== id), entry]
      .sort((a, b) => Number(b.occurredAt || 0) - Number(a.occurredAt || 0));
    index.season = Number(season);
    await fs.writeFile(indexPath, `${JSON.stringify(index, null, 2)}\n`, 'utf8');
    console.log(`Graded trade ${id}: ${completeSides.map((side) => `${side.manager} ${side.grade}`).join(' / ')}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
