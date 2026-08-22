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
    #home {
        display: flex;
        flex-wrap: nowrap;
        position: relative;
        overflow-y: hidden;
        z-index: 1;
    }

    #main {
        flex-grow: 1;
        min-width: 320px;
        margin: 0 auto;
        padding: 60px 0;
    }

    .text {
        padding: 0 30px;
        max-width: 760px;
        margin: 0 auto;
    }

    .leagueData {
        position: relative;
        z-index: 1;
        width: 100%;
        min-width: 470px;
        max-width: 470px;
        min-height: 100%;
		background-color: var(--ebebeb);
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

    h6 {
        text-align: center;
    }

    .homeBanner {
        background-color: var(--blueOne);
        color: #fff;
        padding: 0.5em 0;
        font-weight: 500;
        font-size: 1.5em;
    }

    /* champ styling */
    #currentChamp {
        padding: 25px 0;
		background-color: var(--f3f3f3);
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
    opacity: 0.75;
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
    margin: 5px 0 55px;
}

:global(.ff-stat-card) {
    border: 1px solid var(--ddd);
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    min-height: 90px;
    transition: transform 0.2s ease, border-color 0.2s ease;
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
    opacity: 0.82;
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
    border: 1px solid var(--ddd);
    border-radius: 8px;
    overflow: hidden;
}

:global(.ff-banner::before) {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: #8b5cf6;
    opacity: 0.45;
}

:global(.ff-banner small) {
    display: block;
    font-size: 0.68rem;
    font-weight: 800;
    opacity: 0.55;
}

:global(.ff-banner strong) {
    display: block;
    color: #8b5cf6;
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
    border-color: rgba(139, 92, 246, 0.5);
}

:global(.ff-banner.ff-current) {
    border-color: #8b5cf6;
    box-shadow: 0 0 22px rgba(139, 92, 246, 0.12);
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
    opacity: 0.7;
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
    opacity: 0.7;
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
</style>

<div id="home">
    <div id="main">
        <div class="text">
            <h6>{leagueName}</h6>
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
