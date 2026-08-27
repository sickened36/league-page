import { getLeagueStandings, getLeagueTeamManagers } from '$lib/utils/helper';
import { leagueIdForSeason, normalizeSeason } from '$lib/utils/seasons';

export async function load({ url }) {
    const season = normalizeSeason(url.searchParams.get('season'));
    const leagueId = leagueIdForSeason(season);

    return {
        season,
        standingsData: getLeagueStandings(leagueId),
        leagueTeamManagersData: getLeagueTeamManagers(),
    };
}
