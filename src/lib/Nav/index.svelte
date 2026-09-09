<script>
	import NavSmall from './NavSmall.svelte';
	import NavLarge from './NavLarge.svelte';
    import { page } from '$app/state';
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
		background: linear-gradient(180deg, #11161d 0%, #0d1218 100%);
		position: relative;
		z-index: 2;
		border-bottom: 1px solid rgba(0, 206, 184, 0.72);
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
		filter: drop-shadow(0 5px 12px rgba(0, 206, 184, 0.30));
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
		color: #55e6d5;
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

	<div class="large">
		<NavLarge />
	</div>

	<div class="small">
		<NavSmall />
	</div>

</nav>
