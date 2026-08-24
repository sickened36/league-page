<script>
	import NavSmall from './NavSmall.svelte';
	import NavLarge from './NavLarge.svelte';
    import { page } from '$app/state';
	import IconButton from '@smui/icon-button';
	import { Icon } from '@smui/common';

	// toggle dark mode
	let darkTheme = $state(typeof window === "undefined" || window.matchMedia("(prefers-color-scheme: dark)").matches);
	function switchTheme(currentTheme) {
		currentTheme = !currentTheme;
		let themeLink = document.head.querySelector("#theme");
		if (!themeLink) {
			themeLink = document.createElement("link");
			themeLink.rel = "stylesheet";
			themeLink.id = "theme";
		}
		themeLink.href = `/smui${currentTheme ? "" : "-dark"}.css`;
		document.head
		.querySelector('link[href="/smui-dark.css"]')
		.insertAdjacentElement("afterend", themeLink);
	}
</script>

<svelte:head>
	<title>{!page.url.pathname[1] ? 'Home' : page.url.pathname[1].toUpperCase() + page.url.pathname.slice(2)} | Fantasy Foosball</title>
</svelte:head>

<style>
	a {
		display: table;
    	margin: 0 auto;
	}
	nav {
		background: linear-gradient(180deg, #100d18 0%, #0b0911 100%);
		position: relative;
		z-index: 2;
		border-bottom: 1px solid rgba(139, 92, 246, 0.72);
		box-shadow: 0 7px 24px rgba(0, 0, 0, 0.28);
	}

	.brand {
		display: flex;
		width: fit-content;
		align-items: center;
		gap: 11px;
		padding: 10px 16px 8px;
		color: #fff;
		text-decoration: none;
	}

	#logo {
		width: 48px;
		height: 56px;
		display: block;
		filter: drop-shadow(0 5px 12px rgba(124, 58, 237, 0.35));
	}

	.brand-copy {
		display: flex;
		flex-direction: column;
		text-align: left;
		line-height: 0.88;
		text-transform: uppercase;
	}

	.brand-copy strong {
		font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
		font-size: 1.45rem;
		font-weight: 900;
		letter-spacing: 0.035em;
	}

	.brand-copy span {
		margin-top: 7px;
		color: #c4b5fd;
		font-size: 0.58rem;
		font-weight: 800;
		letter-spacing: 0.2em;
	}

    .large {
		display: block;
    }

	.small {
		display: none;
	}

	.container {
		position: absolute;
		top: 0.25em;
		right: 0.25em;
	}

	:global(.lightDark) {
		color: #ddd6fe;
	}

	@media (max-width: 950px) { /* width of the large navBar */
		.brand {
			padding-block: 8px;
		}

		#logo {
			width: 42px;
			height: 49px;
		}

		.brand-copy strong {
			font-size: 1.2rem;
		}

		.large {
			display: none;
		}

		.small {
			display: block;
		}
	}
</style>

<nav>
	<a class="brand" href="/" aria-label="Fantasy Foosball home">
		<img id="logo" alt="" src="/fantasy-foosball-mark.svg" />
		<span class="brand-copy">
			<strong>Fantasy Foosball</strong>
			<span>Est. 2019 · Year 8</span>
		</span>
	</a>

	<div class="container">
		<IconButton
			toggle
			bind:pressed={darkTheme}
			onclick={() => switchTheme(darkTheme)}
			class="lightDark"
		>
			<Icon class="material-icons" on>dark_mode</Icon>
			<Icon class="material-icons">light_mode</Icon>
		</IconButton>
	</div>

	<div class="large">
		<NavLarge />
	</div>

	<div class="small">
		<NavSmall />
	</div>

</nav>
