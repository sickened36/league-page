export async function load({ url, fetch }) {
  const season = url.searchParams.get('season') || '2026';
  const requestedWeek = Number(url.searchParams.get('week'));

  let index = { season: Number(season), weeks: [] };
  let recap = null;
  let error = null;

  try {
    const indexResponse = await fetch(`/recaps/${season}/index.json`);
    if (!indexResponse.ok) {
      throw new Error(`No recap archive found for ${season}.`);
    }
    index = await indexResponse.json();

    const weeks = [...(index.weeks || [])].sort((a, b) => b.week - a.week);
    const selectedWeek = Number.isFinite(requestedWeek) && weeks.some((item) => item.week === requestedWeek)
      ? requestedWeek
      : weeks[0]?.week;

    if (selectedWeek) {
      const recapResponse = await fetch(`/recaps/${season}/week-${selectedWeek}.json`);
      if (!recapResponse.ok) {
        throw new Error(`Week ${selectedWeek} recap could not be loaded.`);
      }
      recap = await recapResponse.json();
    }

    return {
      season,
      weeks,
      selectedWeek,
      recap,
      error,
    };
  } catch (err) {
    error = err?.message || 'Unable to load weekly recaps.';
    return {
      season,
      weeks: index.weeks || [],
      selectedWeek: null,
      recap: null,
      error,
    };
  }
}
