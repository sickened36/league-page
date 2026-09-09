const seasons = ['2026', '2025', '2024', '2023', '2022'];

async function loadArchive(fetch, type, season) {
  const response = await fetch(`/${type}/${season}/index.json`);
  if (!response.ok) return null;
  const index = await response.json();
  return {
    season,
    weeks: [...(index.weeks || [])].sort((a, b) => b.week - a.week),
  };
}

async function loadEntry(fetch, type, season, week) {
  if (!week) return null;
  const response = await fetch(`/${type}/${season}/week-${week}.json`);
  return response.ok ? response.json() : null;
}

export async function load({ url, fetch }) {
  const requestedSeason = url.searchParams.get('season');
  const requestedWeek = Number(url.searchParams.get('week'));
  const requestedPreviewWeek = Number(url.searchParams.get('previewWeek'));

  try {
    const recapArchives = new Map();
    const previewArchives = new Map();

    for (const season of seasons) {
      const [recaps, previews] = await Promise.all([
        loadArchive(fetch, 'recaps', season),
        loadArchive(fetch, 'previews', season),
      ]);
      recapArchives.set(season, recaps);
      previewArchives.set(season, previews);
    }

    let season = seasons.includes(requestedSeason) ? requestedSeason : null;
    if (!season) {
      const currentHasContent =
        recapArchives.get('2026')?.weeks?.length ||
        previewArchives.get('2026')?.weeks?.length;
      season = currentHasContent
        ? '2026'
        : seasons.find((item) =>
            recapArchives.get(item)?.weeks?.length ||
            previewArchives.get(item)?.weeks?.length
          ) || '2026';
    }

    const recapArchive = recapArchives.get(season);
    const previewArchive = previewArchives.get(season);
    const weeks = recapArchive?.weeks || [];
    const previewWeeks = previewArchive?.weeks || [];

    const selectedWeek =
      Number.isFinite(requestedWeek) && weeks.some((item) => item.week === requestedWeek)
        ? requestedWeek
        : weeks[0]?.week || null;

    const selectedPreviewWeek =
      Number.isFinite(requestedPreviewWeek) &&
      previewWeeks.some((item) => item.week === requestedPreviewWeek)
        ? requestedPreviewWeek
        : previewWeeks[0]?.week || null;

    const [recap, preview] = await Promise.all([
      loadEntry(fetch, 'recaps', season, selectedWeek),
      loadEntry(fetch, 'previews', season, selectedPreviewWeek),
    ]);

    const availableSeasons = seasons.filter((item) =>
      recapArchives.get(item)?.weeks?.length ||
      previewArchives.get(item)?.weeks?.length
    );

    return {
      season,
      availableSeasons,
      weeks,
      previewWeeks,
      selectedWeek,
      selectedPreviewWeek,
      recap,
      preview,
      error: null,
    };
  } catch (err) {
    return {
      season: requestedSeason || '2026',
      availableSeasons: [],
      weeks: [],
      previewWeeks: [],
      selectedWeek: null,
      selectedPreviewWeek: null,
      recap: null,
      preview: null,
      error: err?.message || 'Unable to load weekly content.',
    };
  }
}
