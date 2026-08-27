import { leagueID } from '$lib/utils/leagueInfo';
import { getLeagueData } from './leagueData';
import { getLeagueRosters } from './leagueRosters';
import { waitForAll } from './multiPromise';
import { get } from 'svelte/store';
import { standingsStore } from '$lib/stores';
import { round } from './universalFunctions';

export const getLeagueStandings = async (queryLeagueID = leagueID) => {
	const cached = get(standingsStore)[queryLeagueID];
	if(cached?.standingsInfo) return cached;

	const [leagueData, rostersData] = await waitForAll(
		getLeagueData(queryLeagueID),
		getLeagueRosters(queryLeagueID),
	).catch((err) => { console.error(err); });

	if(!leagueData || !rostersData) return null;

	const yearData = leagueData.season;
	const regularSeasonLength = (Number(leagueData.settings?.playoff_week_start) || 15) - 1;
	const divisions = Number(leagueData.settings?.divisions || 0) > 1;
	const lastScoredLeg = Number(leagueData.settings?.last_scored_leg || 0);
	const rosters = rostersData.rosters;

	if(!['in_season', 'post_season', 'complete'].includes(leagueData.status) || lastScoredLeg < 1) {
		return null;
	}

	let standings = {};
	for(const rosterID in rosters) {
		const roster = rosters[rosterID];
		standings[rosterID] = {
			rosterID,
			wins: roster.settings.wins,
			losses: roster.settings.losses,
			ties: roster.settings.ties,
			fpts: round(roster.settings.fpts + (roster.settings.fpts_decimal / 100)),
			fptsAgainst: round(roster.settings.fpts_against + (roster.settings.fpts_against_decimal / 100)),
			streak: roster.metadata?.streak || 0,
			divisionWins: divisions ? 0 : null,
			divisionLosses: divisions ? 0 : null,
			divisionTies: divisions ? 0 : null,
		};
	}

	if(divisions) {
		const throughWeek = Math.min(lastScoredLeg, regularSeasonLength);
		const matchupResponses = await waitForAll(
			...Array.from({ length: throughWeek }, (_, index) =>
				fetch(`https://api.sleeper.app/v1/league/${queryLeagueID}/matchups/${index + 1}`, {compress: true})
			)
		);
		const matchupData = await waitForAll(...matchupResponses.map((response) => response.json()));
		for(const matchup of matchupData) standings = processStandings(matchup, standings, rosters);
	}

	const response = { standingsInfo: standings, yearData };
	standingsStore.update((all) => ({ ...all, [queryLeagueID]: response }));
	return response;
};

const processStandings = (matchup, standingsData, rosters) => {
	const matchups = {};
	for(const match of matchup) {
		if(!matchups[match.matchup_id]) matchups[match.matchup_id] = [];
		const rosterID = match.roster_id;
		matchups[match.matchup_id].push({
			rosterID,
			division: rosters[rosterID].settings.division,
			points: match.points,
		});
	}

	for(const matchupKey in matchups) {
		const [teamA, teamB] = matchups[matchupKey];
		if(!teamA || !teamB) continue;
		const divisionMatchup = teamA.division && teamB.division && teamA.division == teamB.division;
		if(!divisionMatchup) continue;

		if(teamA.points > teamB.points) {
			standingsData[teamA.rosterID].divisionWins++;
			standingsData[teamB.rosterID].divisionLosses++;
		} else if(teamB.points > teamA.points) {
			standingsData[teamB.rosterID].divisionWins++;
			standingsData[teamA.rosterID].divisionLosses++;
		} else {
			standingsData[teamA.rosterID].divisionTies++;
			standingsData[teamB.rosterID].divisionTies++;
		}
	}
	return standingsData;
};
