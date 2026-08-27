export const CURRENT_SEASON = '2026';

export const seasonOptions = [
  { season: '2026', label: 'Year 8', leagueId: '1389689189200592896', champion: null },
  { season: '2025', label: 'Year 7', leagueId: '1251987542522212352', champion: 'Alex' },
  { season: '2024', label: 'Year 6', leagueId: '1124840953127903232', champion: 'Joey' },
  { season: '2023', label: 'Year 5', leagueId: '981027810078756864', champion: 'Evan' },
  { season: '2022', label: 'Year 4', leagueId: '857432836574138368', champion: 'Cooper' },
];

export const normalizeSeason = (value) =>
  seasonOptions.some((item) => item.season === String(value)) ? String(value) : CURRENT_SEASON;

export const leagueIdForSeason = (value) => {
  const season = normalizeSeason(value);
  return seasonOptions.find((item) => item.season === season)?.leagueId;
};
