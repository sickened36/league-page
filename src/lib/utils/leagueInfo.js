/*   STEP 1   */
export const leagueID = "1389689189200592896"; // your league ID
export const leagueName = "Fantasy Foosball Year 8"; // your league name
export const dues = 100; // (optional) used in template constitution page
export const dynasty = false; // true for dynasty leagues, false for redraft and keeper
export const enableBlog = false; // requires VITE_CONTENTFUL_ACCESS_TOKEN and VITE_CONTENTFUL_SPACE environment variables

/*   STEP 2   */
export const homepageText = `
<div class="ff-hero">
    <div class="ff-kicker">EST. 2019 • YEAR 8</div>

    <h1>FANTASY<br><span>FOOSBALL</span></h1>

    <p class="ff-tagline">
        Twelve managers. One championship.<br>
        Eight years of bad trades, broken hearts, and eternal glory.
    </p>

    <div class="ff-hero-line"></div>
</div>

<div class="ff-stats">

    <div class="ff-stat-card">
        <span class="ff-stat-label">DEFENDING CHAMPION</span>
        <strong>ALEX</strong>
        <small>2025 Champion</small>
    </div>

    <div class="ff-stat-card">
        <span class="ff-stat-label">MOST TITLES</span>
        <strong>PAYTON</strong>
        <small>2 Championships</small>
    </div>

    <div class="ff-stat-card">
        <span class="ff-stat-label">LEAGUE</span>
        <strong>12</strong>
        <small>Managers</small>
    </div>

    <div class="ff-stat-card">
        <span class="ff-stat-label">CURRENT SEASON</span>
        <strong>YEAR 8</strong>
        <small>2026</small>
    </div>

</div>

<div class="ff-section-heading">
    <span>01</span>
    <div>
        <small>THE STORY SO FAR</small>
        <h2>Eight Years of Fantasy Foosball</h2>
    </div>
</div>

<div class="ff-intro">
    <p>
        What started in 2019 as a 10-manager fantasy league has turned into an
        annual 12-team battle built on rivalries, questionable trades, waiver-wire
        desperation and Sunday heartbreak.
    </p>

    <p>
        Seven championships have been decided. Six different managers have reached
        the top. Only one has managed to defend the throne.
    </p>

    <p class="ff-highlight">
        In 2026, everybody starts at 0-0.
    </p>
</div>

<div class="ff-section-heading">
    <span>02</span>
    <div>
        <small>HALL OF CHAMPIONS</small>
        <h2>The Banner Room</h2>
    </div>
</div>

<div class="ff-champions">

    <div class="ff-banner">
        <small>2019</small>
        <strong>PARKER</strong>
        <span>INAUGURAL CHAMPION</span>
    </div>

    <div class="ff-banner ff-dynasty">
        <small>2020</small>
        <strong>PAYTON</strong>
        <span>CHAMPION</span>
    </div>

    <div class="ff-banner ff-dynasty">
        <small>2021</small>
        <strong>PAYTON</strong>
        <span>BACK-TO-BACK</span>
    </div>

    <div class="ff-banner">
        <small>2022</small>
        <strong>COOPER</strong>
        <span>CHAMPION</span>
    </div>

    <div class="ff-banner">
        <small>2023</small>
        <strong>EVAN</strong>
        <span>CHAMPION</span>
    </div>

    <div class="ff-banner">
        <small>2024</small>
        <strong>JOEY</strong>
        <span>CHAMPION</span>
    </div>

    <div class="ff-banner ff-current">
        <small>2025</small>
        <strong>ALEX</strong>
        <span>DEFENDING CHAMPION</span>
    </div>

</div>

<div class="ff-section-heading">
    <span>03</span>
    <div>
        <small>LEAGUE HISTORY</small>
        <h2>How We Got Here</h2>
    </div>
</div>

<div class="ff-history">

    <div class="ff-era">
        <div class="ff-era-year">2019</div>
        <div>
            <h3>The Beginning</h3>
            <p>
                Fantasy Foosball launches as a 10-team league. Parker survives
                the inaugural season and becomes the first manager to put his
                name on the trophy.
            </p>
        </div>
    </div>

    <div class="ff-era">
        <div class="ff-era-year">20–21</div>
        <div>
            <h3>The First Dynasty</h3>
            <p>
                Payton wins consecutive championships in 2020 and 2021,
                completing the first — and still only — back-to-back title run
                in league history.
            </p>
        </div>
    </div>

    <div class="ff-era">
        <div class="ff-era-year">2022</div>
        <div>
            <h3>End of an Era</h3>
            <p>
                Cooper takes the 2022 championship and closes the book on
                Fantasy Foosball's original 10-team era.
            </p>
        </div>
    </div>

    <div class="ff-era">
        <div class="ff-era-year">2023</div>
        <div>
            <h3>Expansion</h3>
            <p>
                The league expands to twelve managers. Evan immediately
                conquers the larger field and wins the first championship
                of the new era.
            </p>
        </div>
    </div>

    <div class="ff-era">
        <div class="ff-era-year">24–25</div>
        <div>
            <h3>A New Champion Every Year</h3>
            <p>
                Joey wins in 2024. Alex follows in 2025. No manager has yet
                been able to repeat during the 12-team era.
            </p>
        </div>
    </div>

</div>

<div class="ff-year8">
    <small>2026 SEASON</small>
    <h2>THE QUEST FOR<br>YEAR 8</h2>
    <p>
        The banners are hanging. The history is written.
        None of it matters when Week 1 begins.
    </p>
    <strong>WHO'S NEXT?</strong>
</div>
`;

/*   STEP 3   */
/*
3 managers as an example. Uncomment (remove the //) before each line to make it live code
If you're having trouble, reference the Training Wheels' Manager Section
https://github.com/nmelhado/league-page/blob/master/TRAINING_WHEELS.md#ii-adding-managers-and-changing-the-homepage-text
*/

// To omit an optional field, set it's value to null

export const managers = [
       /*
  Below is the most up to-date version of a manager. Please leave this commented out
  and don't delete it. This will be updated if any fields are added, removed or changed
  and will allow updates without causing merge conflicts
  */
  
    {
      //"roster": 3,  // (DEPRECATED! Don't use this anymore) ID of the roster that the manager manages (look at the order of the power rankings graph)
      "managerID": "731718765330411520",  // the user's manager ID, go to https://api.sleeper.app/v1/league/<your_league_id>/users to find user IDs (you can use older leagueIDs to find user IDs for managers that are no longer in the league)
     // "name": "Your Name",
      //"tookOver": 2020, // (DEPRECATED! You don't need to use this anymore) (optional) used if a manager took over a team, delete this line or change to null otherwise
     // "location": "Brooklyn", // (optional)
      //"bio": "Lorem ipsum...",
      "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
     // "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
     // "favoriteTeam": "nyj", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
     // "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      // "rival": {
      //   name: "Rival", // Can be anything (usually your rival's name)
      //   link: 6, // manager array number within this array, or null to link back to all managers page
      //   image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
      // },
      // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      // "philosophy": "Your fantasy team's philosophy", // (optional)
      // "tradingScale": 10, // 1 - 10 (optional)
      // "preferredContact": "Text",  // (optional) 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },

     {
      //"roster": 3,  // (DEPRECATED! Don't use this anymore) ID of the roster that the manager manages (look at the order of the power rankings graph)
      "managerID": "840383263389368320",  // the user's manager ID, go to https://api.sleeper.app/v1/league/<your_league_id>/users to find user IDs (you can use older leagueIDs to find user IDs for managers that are no longer in the league)
      // "name": "Your Name",
      // "tookOver": 2020, // (DEPRECATED! You don't need to use this anymore) (optional) used if a manager took over a team, delete this line or change to null otherwise
      // "location": "Brooklyn", // (optional)
      // "bio": "Lorem ipsum...",
       //"photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
      // "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
      // "favoriteTeam": "nyj", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      // "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      // "rival": {
      //   name: "Rival", // Can be anything (usually your rival's name)
      //   link: 6, // manager array number within this array, or null to link back to all managers page
      //   image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
      // },
      // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      // "philosophy": "Your fantasy team's philosophy", // (optional)
      // "tradingScale": 10, // 1 - 10 (optional)
      // "preferredContact": "Text",  // (optional) 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },

     {
     // "roster": 3,  // (DEPRECATED! Don't use this anymore) ID of the roster that the manager manages (look at the order of the power rankings graph)
      "managerID": "855234295671939072",  // the user's manager ID, go to https://api.sleeper.app/v1/league/<your_league_id>/users to find user IDs (you can use older leagueIDs to find user IDs for managers that are no longer in the league)
      // "name": "Your Name",
      // "tookOver": 2020, // (DEPRECATED! You don't need to use this anymore) (optional) used if a manager took over a team, delete this line or change to null otherwise
      // "location": "Brooklyn", // (optional)
      // "bio": "Lorem ipsum...",
      // "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
      // "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
      // "favoriteTeam": "nyj", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      // "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      // "rival": {
      //   name: "Rival", // Can be anything (usually your rival's name)
      //   link: 6, // manager array number within this array, or null to link back to all managers page
      //   image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
      // },
      // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      // "philosophy": "Your fantasy team's philosophy", // (optional)
      // "tradingScale": 10, // 1 - 10 (optional)
      // "preferredContact": "Text",  // (optional) 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },

     {
      //"roster": 3,  // (DEPRECATED! Don't use this anymore) ID of the roster that the manager manages (look at the order of the power rankings graph)
      "managerID": "857294119217795072",  // the user's manager ID, go to https://api.sleeper.app/v1/league/<your_league_id>/users to find user IDs (you can use older leagueIDs to find user IDs for managers that are no longer in the league)
      // "name": "Your Name",
      // "tookOver": 2020, // (DEPRECATED! You don't need to use this anymore) (optional) used if a manager took over a team, delete this line or change to null otherwise
      // "location": "Brooklyn", // (optional)
      // "bio": "Lorem ipsum...",
       //"photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
      // "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
      // "favoriteTeam": "nyj", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      // "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
     //  "rival": {
       //  name: "Rival", // Can be anything (usually your rival's name)
       //  link: 6, // manager array number within this array, or null to link back to all managers page
       //  image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
       //},
      // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      // "philosophy": "Your fantasy team's philosophy", // (optional)
      // "tradingScale": 10, // 1 - 10 (optional)
      // "preferredContact": "Text",  // (optional) 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },

     {
      //"roster": 3,  // (DEPRECATED! Don't use this anymore) ID of the roster that the manager manages (look at the order of the power rankings graph)
      "managerID": "857701073564065792",  // the user's manager ID, go to https://api.sleeper.app/v1/league/<your_league_id>/users to find user IDs (you can use older leagueIDs to find user IDs for managers that are no longer in the league)
      // "name": "Your Name",
      // "tookOver": 2020, // (DEPRECATED! You don't need to use this anymore) (optional) used if a manager took over a team, delete this line or change to null otherwise
      // "location": "Brooklyn", // (optional)
      // "bio": "Lorem ipsum...",
      // "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
      // "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
      // "favoriteTeam": "nyj", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      // "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
       //"rival": {
       //  name: "Rival", // Can be anything (usually your rival's name)
       //  link: 6, // manager array number within this array, or null to link back to all managers page
       //  image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
      // },
      // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      // "philosophy": "Your fantasy team's philosophy", // (optional)
      // "tradingScale": 10, // 1 - 10 (optional)
      // "preferredContact": "Text",  // (optional) 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },

     {
     // "roster": 3,  // (DEPRECATED! Don't use this anymore) ID of the roster that the manager manages (look at the order of the power rankings graph)
      "managerID": "857703937447436288",  // the user's manager ID, go to https://api.sleeper.app/v1/league/<your_league_id>/users to find user IDs (you can use older leagueIDs to find user IDs for managers that are no longer in the league)
      // "name": "Your Name",
      // "tookOver": 2020, // (DEPRECATED! You don't need to use this anymore) (optional) used if a manager took over a team, delete this line or change to null otherwise
      // "location": "Brooklyn", // (optional)
      // "bio": "Lorem ipsum...",
      // "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
      // "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
      // "favoriteTeam": "nyj", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      // "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      // "rival": {
      //   name: "Rival", // Can be anything (usually your rival's name)
      //   link: 6, // manager array number within this array, or null to link back to all managers page
      //   image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
      // },
      // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      // "philosophy": "Your fantasy team's philosophy", // (optional)
      // "tradingScale": 10, // 1 - 10 (optional)
      // "preferredContact": "Text",  // (optional) 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },

     {
     // "roster": 3,  // (DEPRECATED! Don't use this anymore) ID of the roster that the manager manages (look at the order of the power rankings graph)
      "managerID": "857808616697229312",  // the user's manager ID, go to https://api.sleeper.app/v1/league/<your_league_id>/users to find user IDs (you can use older leagueIDs to find user IDs for managers that are no longer in the league)
      // "name": "Your Name",
      // "tookOver": 2020, // (DEPRECATED! You don't need to use this anymore) (optional) used if a manager took over a team, delete this line or change to null otherwise
      // "location": "Brooklyn", // (optional)
      // "bio": "Lorem ipsum...",
      // "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
      // "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
      // "favoriteTeam": "nyj", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      // "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      // "rival": {
      //   name: "Rival", // Can be anything (usually your rival's name)
      //   link: 6, // manager array number within this array, or null to link back to all managers page
      //   image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
      // },
      // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      // "philosophy": "Your fantasy team's philosophy", // (optional)
      // "tradingScale": 10, // 1 - 10 (optional)
      //"preferredContact": "Text",  // (optional) 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },

     {
      //"roster": 3,  // (DEPRECATED! Don't use this anymore) ID of the roster that the manager manages (look at the order of the power rankings graph)
      "managerID": "858516512074502144",  // the user's manager ID, go to https://api.sleeper.app/v1/league/<your_league_id>/users to find user IDs (you can use older leagueIDs to find user IDs for managers that are no longer in the league)
      // "name": "Your Name",
      // "tookOver": 2020, // (DEPRECATED! You don't need to use this anymore) (optional) used if a manager took over a team, delete this line or change to null otherwise
      // "location": "Brooklyn", // (optional)
      // "bio": "Lorem ipsum...",
      // "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
      // "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
      // "favoriteTeam": "nyj", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      // "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      // "rival": {
      //   name: "Rival", // Can be anything (usually your rival's name)
      //   link: 6, // manager array number within this array, or null to link back to all managers page
      //   image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
      // },
      // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      // "philosophy": "Your fantasy team's philosophy", // (optional)
      // "tradingScale": 10, // 1 - 10 (optional)
      // "preferredContact": "Text",  // (optional) 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },

     {
      //"roster": 3,  // (DEPRECATED! Don't use this anymore) ID of the roster that the manager manages (look at the order of the power rankings graph)
      "managerID": "860556909751672832",  // the user's manager ID, go to https://api.sleeper.app/v1/league/<your_league_id>/users to find user IDs (you can use older leagueIDs to find user IDs for managers that are no longer in the league)
      // "name": "Your Name",
      // "tookOver": 2020, // (DEPRECATED! You don't need to use this anymore) (optional) used if a manager took over a team, delete this line or change to null otherwise
      // "location": "Brooklyn", // (optional)
      // "bio": "Lorem ipsum...",
      // "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
      // "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
      // "favoriteTeam": "nyj", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      // "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      // "rival": {
      //   name: "Rival", // Can be anything (usually your rival's name)
      //   link: 6, // manager array number within this array, or null to link back to all managers page
      //   image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
      // },
      // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      // "philosophy": "Your fantasy team's philosophy", // (optional)
      // "tradingScale": 10, // 1 - 10 (optional)
      // "preferredContact": "Text",  // (optional) 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },

   {
    //  "roster": 3,  // (DEPRECATED! Don't use this anymore) ID of the roster that the manager manages (look at the order of the power rankings graph)
      "managerID": "861318601184010240",  // the user's manager ID, go to https://api.sleeper.app/v1/league/<your_league_id>/users to find user IDs (you can use older leagueIDs to find user IDs for managers that are no longer in the league)
      // "name": "Your Name",
      // "tookOver": 2020, // (DEPRECATED! You don't need to use this anymore) (optional) used if a manager took over a team, delete this line or change to null otherwise
      // "location": "Brooklyn", // (optional)
      // "bio": "Lorem ipsum...",
      // "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
      // "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
      // "favoriteTeam": "nyj", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      // "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      // "rival": {
      //   name: "Rival", // Can be anything (usually your rival's name)
      //   link: 6, // manager array number within this array, or null to link back to all managers page
      //   image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
      // },
      // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      // "philosophy": "Your fantasy team's philosophy", // (optional)
      // "tradingScale": 10, // 1 - 10 (optional)
      // "preferredContact": "Text",  // (optional) 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },

   {
     // "roster": 3,  // (DEPRECATED! Don't use this anymore) ID of the roster that the manager manages (look at the order of the power rankings graph)
      "managerID": "871906856019390464",  // the user's manager ID, go to https://api.sleeper.app/v1/league/<your_league_id>/users to find user IDs (you can use older leagueIDs to find user IDs for managers that are no longer in the league)
      // "name": "Your Name",
      // "tookOver": 2020, // (DEPRECATED! You don't need to use this anymore) (optional) used if a manager took over a team, delete this line or change to null otherwise
      // "location": "Brooklyn", // (optional)
      // "bio": "Lorem ipsum...",
      // "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
      // "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
      // "favoriteTeam": "nyj", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      // "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      // "rival": {
      //   name: "Rival", // Can be anything (usually your rival's name)
      //   link: 6, // manager array number within this array, or null to link back to all managers page
      //   image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
      // },
      // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      // "philosophy": "Your fantasy team's philosophy", // (optional)
      // "tradingScale": 10, // 1 - 10 (optional)
      // "preferredContact": "Text",  // (optional) 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },

   {
      //"roster": 3,  // (DEPRECATED! Don't use this anymore) ID of the roster that the manager manages (look at the order of the power rankings graph)
      "managerID": "991832270292021248",  // the user's manager ID, go to https://api.sleeper.app/v1/league/<your_league_id>/users to find user IDs (you can use older leagueIDs to find user IDs for managers that are no longer in the league)
      // "name": "Your Name",
      // "tookOver": 2020, // (DEPRECATED! You don't need to use this anymore) (optional) used if a manager took over a team, delete this line or change to null otherwise
      // "location": "Brooklyn", // (optional)
      // "bio": "Lorem ipsum...",
      // "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
      // "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
      // "favoriteTeam": "nyj", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      // "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      // "rival": {
      //   name: "Rival", // Can be anything (usually your rival's name)
      //   link: 6, // manager array number within this array, or null to link back to all managers page
      //   image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
      // },
      // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      // "philosophy": "Your fantasy team's philosophy", // (optional)
      // "tradingScale": 10, // 1 - 10 (optional)
      // "preferredContact": "Text",  // (optional) 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
  ]
