import { getLeagueStandings, getLeagueTeamManagers } from '$lib/utils/helper';
import { leagueIdForSeason, normalizeSeason, CURRENT_SEASON } from '$lib/utils/seasons';

async function getCurrentPlayoffOdds(fetch, season) {
    if (season !== CURRENT_SEASON) return null;

    try {
        const indexResponse = await fetch(`/previews/${season}/index.json`);
        if (!indexResponse.ok) return null;

        const index = await indexResponse.json();
        const latestWeek = [...(index.weeks || [])]
            .sort((a, b) => b.week - a.week)[0]?.week;
        if (!latestWeek) return null;

        const previewResponse = await fetch(`/previews/${season}/week-${latestWeek}.json`);
        if (!previewResponse.ok) return null;

        const preview = await previewResponse.json();
        return {
            week: preview.week,
            throughWeek: preview.throughWeek,
            generatedAt: preview.generatedAt,
            simulations: preview.playoffModel?.simulations,
            matchups: preview.matchups || [],
        };
    } catch {
        return null;
    }
}

export async function load({ url, fetch }) {
    const season = normalizeSeason(url.searchParams.get('season'));
    const leagueId = leagueIdForSeason(season);

    return {
        season,
        standingsData: getLeagueStandings(leagueId),
        leagueTeamManagersData: getLeagueTeamManagers(),
        playoffOddsData: getCurrentPlayoffOdds(fetch, season),
    };
}
