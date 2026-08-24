<!-- __layout.svelte -->
<script>
	import { Nav, Footer } from "$lib/components"
    import { dev } from '$app/environment';
    import { injectAnalytics } from '@vercel/analytics/sveltekit';
 
    injectAnalytics({ mode: dev ? 'development' : 'production' });
</script>

<style>
    :global(html) {
        background: var(--fff);
        scroll-behavior: smooth;
    }

    :global(body) {
        margin: 0;
        color: var(--g222);
        font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-size: 16px;
        line-height: 1.6;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }

    :global(p),
    :global(li) {
        line-height: 1.7;
    }

    :global(h1),
    :global(h2),
    :global(h3),
    :global(h4) {
        text-wrap: balance;
    }

    :global(a:focus-visible),
    :global(button:focus-visible),
    :global([role="button"]:focus-visible) {
        outline: 3px solid #a78bfa;
        outline-offset: 3px;
    }

    :global(::selection) {
        color: #fff;
        background: #7c3aed;
    }
</style>

<main>
    <Nav /> <!-- adds the nav (small and large) -->
  
    <slot />

    <Footer /> <!-- adds the footer -->
</main>