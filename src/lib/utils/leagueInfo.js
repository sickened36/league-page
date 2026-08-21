/*   STEP 1   */
export const leagueID = "1389689189200592896"; // your league ID
export const leagueName = "Fantasy Foosball Year 8"; // your league name
export const dues = 100; // (optional) used in template constitution page
export const dynasty = false; // true for dynasty leagues, false for redraft and keeper
export const enableBlog = false; // requires VITE_CONTENTFUL_ACCESS_TOKEN and VITE_CONTENTFUL_SPACE environment variables

/*   STEP 2   */
export const homepageText = `
<h2>WELCOME TO FANTASY FOOSBALL — YEAR 8</h2>

<p>
Eight seasons. Twelve managers. One championship. Welcome to <strong>Fantasy Foosball Year 8</strong> — a league built on rivalries, ridiculous trades, Sunday heartbreak, waiver-wire desperation, and the never-ending pursuit of the ultimate prize.
</p>

<p>
What started in 2019 as a 10-manager league has grown into a 12-team annual battle for fantasy football supremacy. Every season brings a new chapter to the league's history. Rosters change, contenders rise, dynasties are challenged, and eventually one manager is left standing with the championship.
</p>

<p>
The road to the championship is never easy. A single bad draft pick can haunt a team for years. One lucky waiver-wire pickup can completely change a season. A questionable trade can become league folklore. And sometimes, despite everything, it simply comes down to who gets the right players at the right time.
</p>

<h3>🏆 THE ALL-TIME CHAMPIONS CIRCLE</h3>

<p>
Championships are forever. The managers below have earned their place in Fantasy Foosball history by reaching the top of the mountain and taking home the league title.
</p>

<p>
<strong>Payton — 2 Championships</strong><br>
2020, 2021
</p>

<p>
<strong>Parker — 1 Championship</strong><br>
2019 — Inaugural Season
</p>

<p>
<strong>Cooper — 1 Championship</strong><br>
2022
</p>

<p>
<strong>Evan — 1 Championship</strong><br>
2023
</p>

<p>
<strong>Joey — 1 Championship</strong><br>
2024
</p>

<p>
<strong>Alex — 1 Championship</strong><br>
2025
</p>

<h3>THE FIRST DYNASTY</h3>

<p>
Before Fantasy Foosball became the 12-team league it is today, the league consisted of only 10 managers. During those early years, Parker began the league by winning the inaguaral season of <strong>2019</strong> however it was Payton who established the first true championship run in league history, winning back-to-back titles in <strong>2020 and 2021</strong>. Cooper finished out the first era of Fantasy Foosball with a strong <strong>2022</strong> to take the ring.
</p>

<h3>THE LEAGUE EXPANDS</h3>

<p>
In <strong>2023</strong>, Fantasy Foosball entered a new era when the league expanded from 10 managers to 12. With two additional teams came more competition, more rivalries, more trade chaos, and an even harder road to the championship.
</p>

<p>
Since the expansion, three different managers have claimed the championship — proving just how difficult it is to stay on top in the modern era. Evan prevailed in the first year of this new frontier with a solid showing in <strong>2023</strong> but it was Joey who triumphed the following year with a blazing <strong>2024</strong>. Finally, the most recent champion holds the crown as Alex has stood triumphant throughout the offseason with the <strong>2025</strong> title in his hands.
</p>

<h3>THE QUEST FOR YEAR 8</h3>

<p>
Now, the next chapter begins.
</p>

<p>
The banners are hanging. The trophies have been claimed. The history books are written. But none of that matters once the new season starts.
</p>

<p>
<strong>2026 is a clean slate.</strong>
</p>

<p>
Twelve managers will enter the season believing this is their year. Six will be chasing their first championship. Some will be trying to reclaim former glory. Others will be fighting to add another title to their name and cement themselves among the greatest managers in league history.
</p>

<p>
The question is simple:
</p>

<h2>WHO'S NEXT TO JOIN THE CHAMPIONS CIRCLE?</h2>

<p>
Welcome to <strong>Fantasy Foosball Year 8.</strong> May your draft be flawless, your waiver claims be timely, your players stay healthy, and your opponents suffer accordingly.
</p>
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
