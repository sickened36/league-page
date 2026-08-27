import { getBrackets, getLeagueMatchups, getLeagueTeamManagers, loadPlayers } from '$lib/utils/helper';
import { leagueIdForSeason, normalizeSeason } from '$lib/utils/seasons';

export async function load({ url, fetch }) {
    const queryWeek = url?.searchParams?.get('week');
    const season = normalizeSeason(url.searchParams.get('season'));
    const leagueId = leagueIdForSeason(season);

    return {
        season,
        queryWeek: isNaN(queryWeek) ? null : queryWeek,
        matchupsData: getLeagueMatchups(leagueId),
        bracketsData: getBrackets(leagueId),
        leagueTeamManagersData: getLeagueTeamManagers(),
        playersData: loadPlayers(fetch),
    };
}
