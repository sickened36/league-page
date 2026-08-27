const seasons = ['2026', '2025', '2024', '2023', '2022'];

function safeTradeId(id) {
  return String(id).replace(/[^a-zA-Z0-9_-]/g, '-');
}

export async function load({ url, fetch }) {
  const requestedSeason = url.searchParams.get('season');
  const season = seasons.includes(requestedSeason) ? requestedSeason : '2026';
  const requestedTrade = url.searchParams.get('trade');

  let index = { season: Number(season), trades: [] };
  let trade = null;
  let error = null;

  try {
    const response = await fetch(`/trades/${season}/index.json`);
    if (response.ok) index = await response.json();

    const trades = [...(index.trades || [])].sort(
      (a, b) => Number(b.occurredAt || 0) - Number(a.occurredAt || 0)
    );
    const selectedTrade = requestedTrade && trades.some((item) => String(item.id) === requestedTrade)
      ? requestedTrade
      : trades[0]?.id ? String(trades[0].id) : null;

    if (selectedTrade) {
      const gradeResponse = await fetch(`/trades/${season}/trade-${safeTradeId(selectedTrade)}.json`);
      if (!gradeResponse.ok) throw new Error('That trade grade could not be loaded.');
      trade = await gradeResponse.json();
    }

    return { season, seasons, trades, selectedTrade, trade, error };
  } catch (err) {
    error = err?.message || 'Unable to load AI trade grades.';
    return {
      season,
      seasons,
      trades: index.trades || [],
      selectedTrade: null,
      trade: null,
      error,
    };
  }
}
