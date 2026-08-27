<script>
  import { seasonOptions } from '$lib/utils/seasons';

  export let season = '2026';
  export let basePath = '/seasons';
  export let compact = false;
</script>

<style>
  .season-switcher {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin: 0 0 16px;
  }

  .label {
    margin-right: 2px;
    color: var(--g777);
    font-size: 0.68rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 48px;
    min-height: 38px;
    padding: 0 12px;
    border: 1px solid var(--ddd);
    border-radius: 999px;
    color: inherit;
    background: var(--fff);
    text-decoration: none;
    font-size: 0.78rem;
    font-weight: 850;
    transition: border-color 0.16s ease, background 0.16s ease, transform 0.16s ease;
  }

  a:hover {
    border-color: #8b5cf6;
    transform: translateY(-1px);
  }

  a.active {
    color: #fff;
    border-color: #8b5cf6;
    background: #8b5cf6;
  }

  .compact a {
    min-width: 44px;
    min-height: 34px;
    padding-inline: 10px;
    font-size: 0.74rem;
  }

  @media (max-width: 520px) {
    .season-switcher {
      gap: 6px;
    }

    .label {
      width: 100%;
      margin-bottom: 2px;
    }

    a {
      flex: 1 1 56px;
      min-width: 0;
    }
  }
</style>

<nav class:compact class="season-switcher" aria-label="Fantasy Foosball season">
  <span class="label">Season</span>
  {#each seasonOptions as item}
    <a class:active={item.season === String(season)} href={`${basePath}?season=${item.season}`}>
      {item.season}
    </a>
  {/each}
</nav>
