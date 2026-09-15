from pathlib import Path
import json
import re
import subprocess

ROOT = Path('.')


def write(path, text):
    Path(path).write_text(text, encoding='utf-8')


def read(path):
    return Path(path).read_text(encoding='utf-8')


def strip_rival_sentence(text):
    # Remove explicit designated-rival sentences while keeping other league lore.
    text = re.sub(r'\s*Rivals?:\s*[^.\'\"]*\.', '', text, flags=re.IGNORECASE)
    return text


def clean_generated_string(value):
    if not isinstance(value, str) or not re.search(r'\brival', value, flags=re.IGNORECASE):
        return value

    # For prose, remove whole sentences that assert a rivalry/rival relationship.
    if len(value.split()) > 14 or any(mark in value for mark in ['.', '!', '?']):
        pieces = re.split(r'(?<=[.!?])\s+', value)
        kept = [piece for piece in pieces if piece and not re.search(r'\brival', piece, flags=re.IGNORECASE)]
        if kept:
            value = ' '.join(kept)

    # Headlines/short strings get a neutral rewrite instead of disappearing.
    replacements = [
        (r'\brivalries\b', 'history'),
        (r'\brivalry\b', 'matchup'),
        (r'\brivals\b', 'managers'),
        (r'\brival\b', 'opponent'),
    ]
    for pattern, replacement in replacements:
        value = re.sub(pattern, replacement, value, flags=re.IGNORECASE)
    return re.sub(r'\s{2,}', ' ', value).strip()


def clean_json(value):
    if isinstance(value, dict):
        out = {}
        for key, item in value.items():
            if key == 'leagueLore':
                cleaned = strip_rival_sentence(str(item or '')).strip()
                if cleaned:
                    out[key] = cleaned
                continue
            out[key] = clean_json(item)
        return out
    if isinstance(value, list):
        return [clean_json(item) for item in value]
    if isinstance(value, str):
        return clean_generated_string(value)
    return value


# Manager profiles + homepage copy.
league_path = Path('src/lib/utils/leagueInfo.js')
league = read(league_path)
league = league.replace(
    'annual 12-team battle built on rivalries, questionable trades, waiver-wire',
    'annual 12-team battle built on competition, questionable trades, waiver-wire'
)
league = league.replace(
    "Fantasy Foosball's League Public Enemy. The inaugural champion, everyone's rival, and the undisputed King of Dogshit Trades.",
    "Fantasy Foosball's League Public Enemy. The inaugural champion and the undisputed King of Dogshit Trades."
)
league = league.replace(
    'A manager with no shortage of league rivalries and still chasing his first Fantasy Foosball championship.',
    'Fantasy Foosball manager still chasing his first championship.'
)
league = league.replace(
    "Fantasy Foosball manager chasing his first championship and deeply involved in one of the league's biggest rivalry circles.",
    'Fantasy Foosball manager chasing his first championship.'
)
# Remove rival tags from the philosophy field while retaining titles/nicknames.
league = re.sub(r'\s*•\s*Rivals?:\s*[^"\n]+', '', league, flags=re.IGNORECASE)
write(league_path, league)

# Remove the dedicated Rivalry nav item.
tabs_path = Path('src/lib/utils/tabs.js')
tabs = read(tabs_path)
tabs = re.sub(
    r"\n\s*\{\s*\n\s*icon:\s*'local_fire_department',\s*\n\s*label:\s*'Rivalry',\s*\n\s*dest:\s*'/rivalry',\s*\n\s*\},",
    '',
    tabs,
    flags=re.MULTILINE,
)
write(tabs_path, tabs)

# Remove the component barrel export/import for the deleted page.
components_path = Path('src/lib/components.js')
components = read(components_path)
components = re.sub(r"^import Rivalry from './Rivalry/index\.svelte';\n", '', components, flags=re.MULTILINE)
components = re.sub(r'^\s*Rivalry,\n', '', components, flags=re.MULTILINE)
write(components_path, components)

# Remove rivalry helper from the shared helper barrel.
helper_path = Path('src/lib/utils/helper.js')
helper = read(helper_path)
helper = re.sub(r"^import \{getRivalryMatchups\} from './helperFunctions/rivalryMatchups'\n", '', helper, flags=re.MULTILINE)
helper = re.sub(r'^\s*getRivalryMatchups,\n', '', helper, flags=re.MULTILINE)
write(helper_path, helper)

# Remove rival language from the Managers page introduction.
managers_page_path = Path('src/routes/managers/+page.svelte')
managers_page = read(managers_page_path)
managers_page = managers_page.replace(
    'Meet the personalities, rivals and former champions behind every roster.',
    'Meet the personalities and former champions behind every roster.'
)
write(managers_page_path, managers_page)

# Remove the individual Rival card from manager detail pages.
manager_info_path = Path('src/lib/Managers/ManagerFantasyInfo.svelte')
manager_info = read(manager_info_path)
manager_info = manager_info.replace(
'''    .infoRival {
        cursor: pointer;
    }

    .infoRival:hover .infoIcon {
        box-shadow: 0 0 6px 4px var(--aaa);
        border: 1px solid var(--aaa);
    }

    .rival {
        height: 100%;
    }

''',
''
)
manager_info = manager_info.replace(
'''    <!-- Rival -->
    <div class="infoSlot infoRival" onclick={() => changeManager(viewManager.rival.link)}>
        <div class="infoLabel">
            Rival
        </div>
        <div class="infoIcon">
            <img class="rival" src="{viewManager.rival.image}" alt="rival"/>
        </div>
        <div class="infoAnswer">
            {viewManager.rival.name}
        </div>
    </div>
''',
''
)
write(manager_info_path, manager_info)

# Future AI-generated content: keep non-rival lore, remove all designated rival data.
for generator in [
    Path('scripts/generate-weekly-preview.mjs'),
    Path('scripts/generate-weekly-recap.mjs'),
    Path('scripts/generate-trade-grades.mjs'),
]:
    text = read(generator)
    text = strip_rival_sentence(text)
    text = text.replace(
        'Light rivalry/lore references are allowed only from the supplied leagueLore field.',
        'Light league-history/lore references are allowed only from the supplied leagueLore field.'
    )
    # Catch any surviving wording in prompts/comments without retaining the concept.
    text = re.sub(r'\brivalries\b', 'history', text, flags=re.IGNORECASE)
    text = re.sub(r'\brivalry\b', 'history', text, flags=re.IGNORECASE)
    text = re.sub(r'\brivals\b', 'opponents', text, flags=re.IGNORECASE)
    text = re.sub(r'\brival\b', 'opponent', text, flags=re.IGNORECASE)
    write(generator, text)

# Scrub already-published AI content, including historical trade grades.
for base in [Path('static/previews'), Path('static/recaps'), Path('static/trades')]:
    if not base.exists():
        continue
    for file in base.rglob('*.json'):
        try:
            data = json.loads(read(file))
        except json.JSONDecodeError:
            continue
        cleaned = clean_json(data)
        write(file, json.dumps(cleaned, indent=2, ensure_ascii=False) + '\n')

# Remove the old generic rivalry feature itself.
for target in [
    'src/lib/Rivalry',
    'src/routes/rivalry',
    'src/lib/utils/helperFunctions/rivalryMatchups.js',
    'static/managers/everyone.png',
]:
    subprocess.run(['git', 'rm', '-r', '--ignore-unmatch', target], check=True)

# Verify no rival/rivalry language remains in runtime/site text.
scan_roots = [Path('src'), Path('scripts'), Path('static/previews'), Path('static/recaps'), Path('static/trades')]
allowed_self = Path('scripts/remove-rival-mentions.py')
remaining = []
for base in scan_roots:
    if not base.exists():
        continue
    files = [base] if base.is_file() else base.rglob('*')
    for file in files:
        if not file.is_file() or file == allowed_self:
            continue
        if file.suffix.lower() not in {'.js', '.mjs', '.svelte', '.json', '.md', '.txt'}:
            continue
        try:
            text = read(file)
        except UnicodeDecodeError:
            continue
        for number, line in enumerate(text.splitlines(), 1):
            if re.search(r'\brival', line, flags=re.IGNORECASE):
                remaining.append(f'{file}:{number}: {line.strip()}')

if remaining:
    print('Remaining rival references found:')
    print('\n'.join(remaining))
    raise SystemExit(1)

# Remove this one-time cleanup machinery from the final repository.
subprocess.run(['git', 'rm', '--ignore-unmatch', 'scripts/remove-rival-mentions.py'], check=True)
subprocess.run(['git', 'rm', '--ignore-unmatch', '.github/workflows/remove-rival-mentions.yml'], check=True)

print('Removed designated rivals, rivalry UI, future prompt references, and published rival mentions.')
