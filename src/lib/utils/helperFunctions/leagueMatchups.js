import { getLeagueData } from './leagueData';
import { leagueID } from '$lib/utils/leagueInfo';
import { waitForAll } from './multiPromise';
import { get } from 'svelte/store';
import { matchupsStore } from '$lib/stores';

export const getLeagueMatchups = async (queryLeagueID = leagueID) => {
	const cached = get(matchupsStore)[queryLeagueID];
	if(cached?.matchupWeeks) return cached;

	const leagueData = await getLeagueData(queryLeagueID).catch((err) => { console.error(err); });
	if(!leagueData) return { matchupWeeks: [], year: null, week: 1, regularSeasonLength: 14 };

	const year = leagueData.season;
	const regularSeasonLength = (Number(leagueData.settings?.playoff_week_start) || 15) - 1;
	const lastScoredLeg = Number(leagueData.settings?.last_scored_leg || 0);
	const week = leagueData.status === 'in_season'
		? Math.min(Math.max(lastScoredLeg + 1, 1), regularSeasonLength)
		: Math.max(Math.min(lastScoredLeg, regularSeasonLength), 1);

	const matchupsRes = await waitForAll(
		...Array.from({ length: regularSeasonLength }, (_, index) =>
			fetch(`https://api.sleeper.app/v1/league/${queryLeagueID}/matchups/${index + 1}`, {compress: true})
		)
	);

	const matchupsData = await waitForAll(...matchupsRes.map(async (response) => {
		const data = await response.json();
		if(!response.ok) throw new Error(data);
		return data;
	}));

	const matchupWeeks = [];
	for(let i = 1; i <= matchupsData.length; i++) {
		const processed = processMatchups(matchupsData[i - 1], i);
		if(processed) matchupWeeks.push({ matchups: processed.matchups, week: processed.week });
	}

	const response = { matchupWeeks, year, week, regularSeasonLength };
	matchupsStore.update((all) => ({ ...all, [queryLeagueID]: response }));
	return response;
};

const processMatchups = (inputMatchups, week) => {
	if(!inputMatchups || inputMatchups.length === 0) return false;
	const matchups = {};
	for(const match of inputMatchups) {
		if(!matchups[match.matchup_id]) matchups[match.matchup_id] = [];
		matchups[match.matchup_id].push({
			roster_id: match.roster_id,
			starters: match.starters,
			points: match.starters_points,
		});
	}
	return { matchups, week };
};
