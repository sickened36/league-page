import { getLeagueData, getLeagueRosters, getLeagueTeamManagers, loadPlayers, waitForAll } from '$lib/utils/helper';
import { leagueIdForSeason, normalizeSeason } from '$lib/utils/seasons';

export async function load({ url, fetch }) {
    const season = normalizeSeason(url.searchParams.get('season'));
    const leagueId = leagueIdForSeason(season);

    const rostersInfo = waitForAll(
        getLeagueData(leagueId),
        getLeagueRosters(leagueId),
        getLeagueTeamManagers(),
        loadPlayers(fetch),
    );

    return {
        season,
        rostersInfo,
    };
}
