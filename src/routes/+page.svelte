<script>
	import LinearProgress from '@smui/linear-progress';
	import { getNflState, leagueName, getAwards, getLeagueTeamManagers, homepageText, managers, gotoManager, enableBlog, waitForAll } from '$lib/utils/helper';
	import { Transactions, PowerRankings, HomePost} from '$lib/components';
	import { getAvatarFromTeamManagers, getTeamFromTeamManagers } from '$lib/utils/helperFunctions/universalFunctions';

    const nflState = getNflState();
    const podiumsData = getAwards();
    const leagueTeamManagersData = getLeagueTeamManagers();
</script>

<style>
    .home-page {
        position: relative;
        z-index: 1;
        background: var(--f8f8f8);
    }

    .home-masthead {
        position: relative;
        isolation: isolate;
        overflow: hidden;
        min-height: 470px;
        color: #fff;
        background:
            radial-gradient(circle at 78% 15%, rgba(139, 92, 246, 0.4), transparent 30%),
            radial-gradient(circle at 20% 105%, rgba(76, 29, 149, 0.36), transparent 35%),
            linear-gradient(135deg, #0b0911 0%, #181126 58%, #100d18 100%);
        border-bottom: 1px solid rgba(167, 139, 250, 0.68);
    }

    .home-masthead::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        opacity: 0.13;
        background:
            repeating-linear-gradient(90deg, transparent 0 108px, rgba(255,255,255,0.14) 109px 111px, transparent 112px 218px),
            linear-gradient(90deg, transparent 49.8%, rgba(255,255,255,0.32) 50%, transparent 50.2%);
        mask-image: linear-gradient(90deg, transparent, #000 38%, #000 72%, transparent);
    }

    .masthead-inner {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(260px, 0.55fr);
        align-items: center;
        gap: clamp(30px, 7vw, 90px);
        width: min(calc(100% - 40px), 1180px);
        min-height: 470px;
        margin: 0 auto;
        padding: 48px 0;
        box-sizing: border-box;
    }

    .masthead-copy {
        position: relative;
        z-index: 1;
    }

    .masthead-kicker {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 16px;
        color: #c4b5fd;
        font-size: 0.72rem;
        font-weight: 900;
        letter-spacing: 0.2em;
        text-transform: uppercase;
    }

    .masthead-kicker::after {
        content: '';
        width: 52px;
        height: 2px;
        background: #8b5cf6;
        box-shadow: 0 0 14px rgba(139, 92, 246, 0.7);
    }

    .masthead-copy h1 {
        margin: 0;
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        font-size: clamp(4.4rem, 10vw, 8rem);
        font-weight: 950;
        line-height: 0.78;
        letter-spacing: -0.045em;
        text-transform: uppercase;
    }

    .masthead-copy h1 span {
        color: #a78bfa;
        text-shadow: 0 0 30px rgba(139, 92, 246, 0.28);
    }

    .masthead-tagline {
        max-width: 570px;
        margin: 27px 0 0;
        color: rgba(255,255,255,0.79);
        font-size: clamp(1rem, 2vw, 1.16rem);
        line-height: 1.65;
    }

    .masthead-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 28px;
    }

    .masthead-actions a {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        min-height: 44px;
        padding: 0 18px;
        color: #fff;
        border: 1px solid rgba(196, 181, 253, 0.45);
        border-radius: 999px;
        text-decoration: none;
        font-size: 0.78rem;
        font-weight: 850;
        letter-spacing: 0.04em;
        transition: transform 0.18s ease, background-color 0.18s ease, border-color 0.18s ease;
    }

    .masthead-actions a:first-child {
        background: #7c3aed;
        border-color: #8b5cf6;
        box-shadow: 0 10px 24px rgba(124, 58, 237, 0.28);
    }

    .masthead-actions a:hover {
        transform: translateY(-2px);
        background: #8b5cf6;
        border-color: #a78bfa;
    }

    .masthead-mark {
        position: relative;
        display: grid;
        place-items: center;
    }

    .masthead-mark::before {
        content: '';
        position: absolute;
        width: min(34vw, 340px);
        aspect-ratio: 1;
        background: radial-gradient(circle, rgba(139, 92, 246, 0.26), transparent 68%);
        border: 1px solid rgba(196, 181, 253, 0.15);
        border-radius: 50%;
    }

    .masthead-mark img {
        position: relative;
        width: min(25vw, 235px);
        filter: drop-shadow(0 24px 32px rgba(0,0,0,0.42));
        transform: rotate(2deg);
    }

    #home {
        display: flex;
        flex-wrap: nowrap;
        position: relative;
        overflow-y: hidden;
        z-index: 1;
        width: min(100%, 1440px);
        margin: 0 auto;
        background: var(--fff);
        box-shadow: 0 22px 60px rgba(18, 12, 28, 0.06);
    }

    #main {
        flex-grow: 1;
        min-width: 320px;
        margin: 0 auto;
        padding: 48px 0 68px;
    }

    .text {
        padding: 0 clamp(20px, 5vw, 42px);
        max-width: 800px;
        margin: 0 auto;
    }

    .leagueData {
        position: relative;
        z-index: 1;
        width: 100%;
        min-width: 470px;
        max-width: 470px;
        min-height: 100%;
		background-color: color-mix(in srgb, var(--fff) 94%, #64748b 6%);
        border-left: var(--eee);
		box-shadow: inset 8px 0px 6px -6px rgb(0 0 0 / 24%);
    }

    @media (max-width: 950px) {
        .leagueData {
            max-width: 100%;
            min-width: 100%;
            width: 100%;
		    box-shadow: none;
        }
        #home {
            flex-wrap: wrap;
        }
    }

    .transactions {
        display: block;
        width: 95%;
        margin: 10px auto;
    }

    .center {
        text-align: center;
    }

    .homeBanner {
        background: linear-gradient(90deg, #4c1d95, #7c3aed);
        color: #fff;
        padding: 0.5em 0;
        font-weight: 500;
        font-size: 1.5em;
		letter-spacing: 0.02em;
    }

    /* champ styling */
    #currentChamp {
        padding: 25px 0;
		background-color: var(--fff);
        box-shadow: 5px 0 8px var(--champShadow);
        border-left: 1px solid var(--ddd);
    }

    #champ {
        position: relative;
        width: 150px;
        height: 150px;
        margin: 0 auto;
        cursor: pointer;
    }

    .first {
        position: absolute;
        transform: translate(-50%, -50%);
        width: 80px;
        height: 80px;
        border-radius: 100%;
        border: 1px solid #ccc;
        left: 50%;
        top: 43%;
    }

    .laurel {
        position: absolute;
        transform: translate(-50%, -50%);
        width: 135px;
        height: auto;
        left: 50%;
        top: 50%;
    }

    h4 {
        text-align: center;
        font-size: 1.8em;
        margin: 10px;
        font-style: italic;
    }

    .label {
        display: table;
        text-align: center;
        line-height: 1.1em;
        font-size: 1.7em;
        margin: 6px auto 10px;
        cursor: pointer;
    }
    
	:global(.curOwner) {
		font-size: 0.75em;
		color: #bbb;
		font-style: italic;
	}

/* ============================================================
   FANTASY FOOSBALL HOMEPAGE
   ============================================================ */

:global(.ff-hero) {
    position: relative;
    text-align: left;
    padding: 35px 0 45px;
    overflow: hidden;
}

:global(.ff-kicker) {
    color: #8b5cf6;
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.22em;
    margin-bottom: 15px;
}

:global(.ff-hero h1) {
    margin: 0;
    font-size: clamp(3.3rem, 8vw, 6.5rem);
    line-height: 0.82;
    font-weight: 950;
    letter-spacing: -0.07em;
    text-transform: uppercase;
}

:global(.ff-hero h1 span) {
    color: #8b5cf6;
}

:global(.ff-tagline) {
    margin-top: 28px;
    max-width: 550px;
    font-size: 1.05rem;
    line-height: 1.6;
    opacity: 0.86;
}

:global(.ff-hero-line) {
    height: 3px;
    width: 70px;
    margin-top: 28px;
    background: #8b5cf6;
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.55);
}


/* STAT CARDS */

:global(.ff-stats) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
	margin: 0 0 55px;
}

:global(.ff-stat-card) {
    border: 1px solid var(--ddd);
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    min-height: 90px;
    transition: transform 0.2s ease, border-color 0.2s ease;
	background: color-mix(in srgb, var(--fff) 97%, #64748b 3%);
	box-shadow: 0 7px 18px rgba(18, 12, 28, 0.05);
}

:global(.ff-stat-card:hover) {
    transform: translateY(-3px);
    border-color: #8b5cf6;
}

:global(.ff-stat-label) {
    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    opacity: 0.55;
    margin-bottom: 9px;
}

:global(.ff-stat-card strong) {
    color: #8b5cf6;
    font-size: 1.45rem;
    line-height: 1.1;
}

:global(.ff-stat-card small) {
    opacity: 0.6;
    margin-top: 5px;
}


/* SECTION HEADINGS */

:global(.ff-section-heading) {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 65px 0 25px;
}

:global(.ff-section-heading > span) {
    color: #8b5cf6;
    font-size: 0.75rem;
    font-weight: 900;
}

:global(.ff-section-heading small) {
    display: block;
    opacity: 0.48;
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.18em;
}

:global(.ff-section-heading h2) {
    margin: 3px 0 0;
    font-size: 1.65rem;
    line-height: 1.1;
    font-weight: 850;
}


/* INTRO */

:global(.ff-intro) {
    font-size: 1rem;
    line-height: 1.75;
}

:global(.ff-intro p) {
    opacity: 0.9;
}

:global(.ff-intro .ff-highlight) {
    color: #8b5cf6;
    font-weight: 800;
    font-size: 1.1rem;
    opacity: 1;
}


/* CHAMPIONS */

:global(.ff-champions) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

:global(.ff-banner) {
    position: relative;
    padding: 18px 15px;
	border: 1px solid rgba(212, 175, 55, 0.4);
    border-radius: 8px;
    overflow: hidden;
	background:
		linear-gradient(135deg, rgba(212, 175, 55, 0.08), transparent 48%),
		var(--fff);
	box-shadow: 0 7px 18px rgba(109, 82, 14, 0.06);
	transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

:global(.ff-banner:hover) {
	transform: translateY(-2px);
	border-color: rgba(232, 194, 80, 0.78);
	box-shadow: 0 12px 24px rgba(109, 82, 14, 0.13);
}

:global(.ff-banner::before) {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
	background: linear-gradient(180deg, #f4d675, #b8860b);
	opacity: 0.85;
}

:global(.ff-banner small) {
    display: block;
    font-size: 0.68rem;
    font-weight: 800;
	color: #a97908;
	opacity: 0.9;
}

:global(.ff-banner strong) {
	display: block;
	color: #9a6d00;
    font-size: 1.25rem;
    margin: 4px 0;
}

:global(.ff-banner span) {
    display: block;
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    font-weight: 700;
    opacity: 0.55;
}

:global(.ff-banner.ff-dynasty) {
	border-color: rgba(196, 151, 35, 0.72);
	background:
		linear-gradient(135deg, rgba(244, 214, 117, 0.16), transparent 52%),
		var(--fff);
}

:global(.ff-banner.ff-current) {
	border-color: #d4af37;
	background:
		linear-gradient(135deg, rgba(244, 214, 117, 0.24), rgba(139, 92, 246, 0.06) 70%),
		var(--fff);
	box-shadow: 0 0 26px rgba(212, 175, 55, 0.2);
}

:global(.ff-banner.ff-current strong) {
	color: #b8860b;
}


/* HISTORY */

:global(.ff-history) {
    position: relative;
}

:global(.ff-era) {
    display: grid;
    grid-template-columns: 65px 1fr;
    gap: 18px;
    padding: 18px 0;
    border-bottom: 1px solid var(--ddd);
}

:global(.ff-era-year) {
    color: #8b5cf6;
    font-weight: 900;
    font-size: 0.8rem;
    padding-top: 5px;
}

:global(.ff-era h3) {
    font-size: 1.05rem;
    margin: 0 0 6px;
    font-weight: 800;
}

:global(.ff-era p) {
    margin: 0;
    line-height: 1.6;
    font-size: 0.9rem;
    opacity: 0.82;
}


/* YEAR 8 FINALE */

:global(.ff-year8) {
    margin: 70px 0 25px;
    padding: 45px 30px;
    border: 1px solid #8b5cf6;
    border-radius: 12px;
    text-align: center;
    background:
        radial-gradient(
            circle at top,
            rgba(139, 92, 246, 0.14),
            transparent 65%
        );
}

:global(.ff-year8 small) {
    color: #8b5cf6;
    font-weight: 900;
    letter-spacing: 0.2em;
}

:global(.ff-year8 h2) {
    margin: 15px 0;
    font-size: clamp(2.3rem, 6vw, 4rem);
    font-weight: 950;
    line-height: 0.95;
    letter-spacing: -0.04em;
}

:global(.ff-year8 p) {
    max-width: 420px;
    margin: 20px auto;
    opacity: 0.82;
    line-height: 1.6;
}

:global(.ff-year8 strong) {
    color: #8b5cf6;
    font-size: 1.25rem;
    letter-spacing: 0.15em;
}

/* MOBILE */

@media (max-width: 600px) {
    :global(.ff-stats) {
        grid-template-columns: 1fr 1fr;
        gap: 8px;
    }

    :global(.ff-stat-card) {
        padding: 15px;
    }

    :global(.ff-stat-card strong) {
        font-size: 1.15rem;
    }

    :global(.ff-champions) {
        grid-template-columns: 1fr;
    }

    :global(.ff-era) {
        grid-template-columns: 50px 1fr;
        gap: 10px;
    }

    :global(.ff-year8) {
        padding: 35px 18px;
    }
}

@media (max-width: 820px) {
    .home-masthead,
    .masthead-inner {
        min-height: 410px;
    }

    .masthead-inner {
        grid-template-columns: 1fr;
    }

    .masthead-mark {
        display: none;
    }
}

@media (max-width: 520px) {
    .masthead-inner {
        width: min(calc(100% - 28px), 1180px);
        padding: 38px 0 44px;
    }

    .masthead-copy h1 {
        font-size: clamp(3.8rem, 20vw, 5.8rem);
    }

    .masthead-actions a {
        flex: 1 1 auto;
        justify-content: center;
    }
}
</style>

<div class="home-page">
<section class="home-masthead">
    <div class="masthead-inner">
        <div class="masthead-copy">
            <div class="masthead-kicker">Est. 2019 · Year 8</div>
            <h1>Fantasy<br /><span>Foosball</span></h1>
            <p class="masthead-tagline">Twelve managers. One championship. Eight years of bad trades, broken hearts and eternal glory.</p>
            <div class="masthead-actions">
                <a href="/standings"><span class="material-icons" aria-hidden="true">leaderboard</span> View Standings</a>
                <a href="/recaps"><span class="material-icons" aria-hidden="true">newspaper</span> Weekly Recaps</a>
                <a href="/matchups"><span class="material-icons" aria-hidden="true">sports_score</span> Matchups</a>
            </div>
        </div>
        <div class="masthead-mark" aria-hidden="true">
            <img src="/fantasy-foosball-mark.svg" alt="" />
        </div>
    </div>
</section>

<div id="home">
    <div id="main">
        <div class="text">
            <!-- homepageText contains the intro text for your league, this gets edited in /src/lib/utils/leagueInfo.js -->
            {@html homepageText }
            <!-- Most recent Blog Post (if enabled) -->
            {#if enableBlog}
                <HomePost />
            {/if}
        </div>
        <PowerRankings />
    </div>
    
    <div class="leagueData">
        <div class="homeBanner">
            {#await nflState}
                <div class="center">Retrieving NFL state...</div>
                <LinearProgress indeterminate />
            {:then nflStateData}
                <div class="center">NFL {nflStateData.season} 
                    {#if nflStateData.season_type == 'pre'}
                        Preseason
                    {:else if nflStateData.season_type == 'post'}
                        Postseason
                    {:else}
                        Season - {nflStateData.week > 0 ? `Week ${nflStateData.week}` : "Preseason"}
                    {/if}
                </div>
            {:catch error}
                <div class="center">Something went wrong: {error.message}</div>
            {/await}
        </div>

        <div id="currentChamp">
            {#await waitForAll(podiumsData, leagueTeamManagersData)}
                <p class="center">Retrieving awards...</p>
                <LinearProgress indeterminate />
            {:then [podiums, leagueTeamManagers]}
                {#if podiums[0]}
                    <h4>{podiums[0].year} Fantasy Champ</h4>
                    <div id="champ" onclick={() => {if(managers.length) gotoManager({year: podiums[0].year, leagueTeamManagers, rosterID: parseInt(podiums[0].champion)})}} >
                        <img src="{getAvatarFromTeamManagers(leagueTeamManagers, podiums[0].champion, podiums[0].year)}" class="first" alt="champion" />
                        <img src="/laurel.png" class="laurel" alt="laurel" />
                    </div>
                    <span class="label" onclick={() => gotoManager({year: podiums[0].year, leagueTeamManagers, rosterID: parseInt(podiums[0].champion)})} >{getTeamFromTeamManagers(leagueTeamManagers, podiums[0].champion, podiums[0].year).name}</span>
                {:else}
                    <p class="center">No former champs.</p>
                {/if}
            {:catch error}
                <p class="center">Something went wrong: {error.message}</p>
            {/await}
        </div>

        <div class="transactions" >
            <Transactions />
        </div>
    </div>
</div>
</div>

