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
    {
        "managerID": "731718765330411520",
        "name": "Payton",
        "bio": "Two-time Fantasy Foosball champion and the only manager in league history to win back-to-back championships.",
        "favoriteTeam": "dal",
        "philosophy": "2x Champion • 2020, 2021 • Rivals: Parker, Andy, CJ, Alex",
        "preferredContact": "Sleeper",
    },

    {
        "managerID": "858516512074502144",
        "name": "Parker",
        "bio": "Fantasy Foosball's League Public Enemy. The inaugural champion, everyone's rival, and the undisputed King of Dogshit Trades.",
        "favoriteTeam": "dal",
        "philosophy": "League Public Enemy • King of Dogshit Trades • 2019 Champion • Rivals: Everyone",
        "preferredContact": "Sleeper",
    },

    {
        "managerID": "857701073564065792",
        "name": "Kane",
        "bio": "Longtime Fantasy Foosball manager still hunting for his first championship.",
        "favoriteTeam": "dal",
        "philosophy": "Seeking First Championship • Rivals: Kohlt, Kade",
        "preferredContact": "Sleeper",
    },

    {
        "managerID": "860556909751672832",
        "name": "Cooper",
        "bio": "2022 Fantasy Foosball champion and the final champion of the league's original 10-team era.",
        "favoriteTeam": "dal",
        "philosophy": "2022 Champion • Rival: Kade",
        "preferredContact": "Sleeper",
    },

    {
        "managerID": "857294119217795072",
        "name": "Joey",
        "bio": "2024 Fantasy Foosball champion and one of the league's proven playoff winners.",
        "favoriteTeam": "dal",
        "philosophy": "2024 Champion • Rivals: Andy, Evan",
        "preferredContact": "Sleeper",
    },

    {
        "managerID": "871906856019390464",
        "name": "Kohlt",
        "bio": "Fantasy Foosball manager chasing his first league championship.",
        "favoriteTeam": "dal",
        "philosophy": "Seeking First Championship • Rivals: Kane, Kade, Parker",
        "preferredContact": "Sleeper",
    },

    {
        "managerID": "861318601184010240",
        "name": "Brae",
        "bio": "Fantasy Foosball manager looking to break through and capture his first championship.",
        "favoriteTeam": "dal",
        "philosophy": "Seeking First Championship • Rivals: Parker, Andy",
        "preferredContact": "Sleeper",
    },

    {
        "managerID": "855234295671939072",
        "name": "Andy",
        "bio": "A manager with no shortage of league rivalries and still chasing his first Fantasy Foosball championship.",
        "favoriteTeam": "dal",
        "philosophy": "Seeking First Championship • Rivals: Alex, CJ, Payton",
        "preferredContact": "Sleeper",
    },

    {
        "managerID": "857703937447436288",
        "name": "Kade",
        "bio": "The league's lone Packers fan and a manager still hunting for his first Fantasy Foosball championship.",
        "favoriteTeam": "gb",
        "philosophy": "Seeking First Championship • Rivals: Kane, Kohlt, Andy",
        "preferredContact": "Sleeper",
    },

    {
        "managerID": "857808616697229312",
        "name": "Evan",
        "bio": "2023 Fantasy Foosball champion and the first champion of the league's 12-team era.",
        "favoriteTeam": "dal",
        "philosophy": "2023 Champion • Rivals: Joey, Andy, Payton",
        "preferredContact": "Sleeper",
    },

    {
        "managerID": "840383263389368320",
        "name": "Alex",
        "bio": "The defending Fantasy Foosball champion after capturing the 2025 title.",
        "favoriteTeam": "dal",
        "philosophy": "2025 Champion • Defending Champion • Rivals: Andy, Payton, CJ",
        "preferredContact": "Sleeper",
    },

    {
        "managerID": "991832270292021248",
        "name": "CJ",
        "bio": "Fantasy Foosball manager chasing his first championship and deeply involved in one of the league's biggest rivalry circles.",
        "favoriteTeam": "dal",
        "philosophy": "Seeking First Championship • Rivals: Payton, Andy, Alex",
        "preferredContact": "Sleeper",
    },
];
