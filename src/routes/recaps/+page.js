const recapSeasons = ['2026', '2025', '2024', '2023', '2022'];

async function loadSeasonArchive(fetch, season) {
  const response = await fetch(`/recaps/${season}/index.json`);
  if (!response.ok) return null;

  const index = await response.json();
  const weeks = [...(index.weeks || [])].sort((a, b) => b.week - a.week);
  return { season, index, weeks };
}

export async function load({ url, fetch }) {
  const requestedSeason = url.searchParams.get('season');
  const requestedWeek = Number(url.searchParams.get('week'));
  let error = null;

  try {
    let archive = null;
    const publishedSeasons = [];

    if (requestedSeason) {
      archive = await loadSeasonArchive(fetch, requestedSeason);
      if (!archive) {
        throw new Error(`No recap archive found for ${requestedSeason}.`);
      }
    } else {
      for (const season of recapSeasons) {
        const candidate = await loadSeasonArchive(fetch, season);
        if (candidate?.weeks?.length) {
          publishedSeasons.push(season);
          if (!archive) archive = candidate;
        }
      }

      if (!archive) {
        return {
          season: '2026',
          availableSeasons: publishedSeasons,
          weeks: [],
          selectedWeek: null,
          recap: null,
          error: null,
        };
      }
    }

    if (requestedSeason && archive.weeks.length) {
      publishedSeasons.push(requestedSeason);
    }

    const season = archive.season;
    const weeks = archive.weeks;
    const selectedWeek = Number.isFinite(requestedWeek) && weeks.some((item) => item.week === requestedWeek)
      ? requestedWeek
      : weeks[0]?.week;

    let recap = null;
    if (selectedWeek) {
      const recapResponse = await fetch(`/recaps/${season}/week-${selectedWeek}.json`);
      if (!recapResponse.ok) {
        throw new Error(`Week ${selectedWeek} recap could not be loaded.`);
      }
      recap = await recapResponse.json();
    }

    return {
      season,
      availableSeasons: [...new Set(publishedSeasons)].sort((a, b) => Number(b) - Number(a)),
      weeks,
      selectedWeek,
      recap,
      error,
    };
  } catch (err) {
    error = err?.message || 'Unable to load weekly recaps.';
    return {
      season: requestedSeason || '2026',
      availableSeasons: [],
      weeks: [],
      selectedWeek: null,
      recap: null,
      error,
    };
  }
}
