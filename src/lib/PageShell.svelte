<script>
	export let eyebrow = 'Fantasy Foosball';
	export let title;
	export let description = '';
	export let icon = 'sports_football';
	export let wide = false;
</script>

<style>
	.page-shell {
		position: relative;
		z-index: 1;
		min-height: 65vh;
		padding-bottom: clamp(56px, 8vw, 96px);
		background:
			linear-gradient(90deg, transparent 49.85%, rgba(139, 92, 246, 0.035) 50%, transparent 50.15%),
			var(--f8f8f8);
	}

	.hero {
		position: relative;
		overflow: hidden;
		isolation: isolate;
		color: #fff;
		background:
			radial-gradient(circle at 82% 0%, rgba(139, 92, 246, 0.34), transparent 34%),
			linear-gradient(135deg, #100d18, #181126 58%, #0b0911);
		border-bottom: 1px solid rgba(167, 139, 250, 0.65);
	}

	.hero::before,
	.hero::after {
		content: '';
		position: absolute;
		z-index: -1;
		opacity: 0.12;
	}

	.hero::before {
		inset: 0;
		background: repeating-linear-gradient(90deg, transparent 0 88px, rgba(255,255,255,0.12) 89px 91px, transparent 92px 178px);
		mask-image: linear-gradient(90deg, transparent, #000 75%);
	}

	.hero::after {
		right: clamp(20px, 8vw, 110px);
		top: 50%;
		width: 150px;
		height: 150px;
		transform: translateY(-50%) rotate(45deg);
		border: 2px solid #c4b5fd;
		border-radius: 24px;
	}

	.hero-inner,
	.content {
		width: min(calc(100% - 32px), 1120px);
		margin-inline: auto;
	}

	.wide {
		width: min(calc(100% - 24px), 1320px);
	}

	.hero-inner {
		position: relative;
		display: flex;
		align-items: center;
		min-height: 210px;
		padding: 32px 0;
	}

	.copy {
		position: relative;
		z-index: 1;
		max-width: 720px;
	}

	.eyebrow {
		display: flex;
		align-items: center;
		gap: 9px;
		margin-bottom: 10px;
		color: #c4b5fd;
		font-size: 0.7rem;
		font-weight: 900;
		letter-spacing: 0.18em;
		text-transform: uppercase;
	}

	.eyebrow::after {
		content: '';
		width: 42px;
		height: 2px;
		background: #8b5cf6;
	}

	h1 {
		margin: 0;
		font-size: clamp(2.45rem, 6vw, 4.6rem);
		font-weight: 950;
		line-height: 0.94;
		letter-spacing: -0.045em;
		text-transform: uppercase;
	}

	p {
		max-width: 650px;
		margin: 17px 0 0;
		color: rgba(255,255,255,0.76);
		font-size: 1rem;
		line-height: 1.65;
	}

	.hero-icon {
		position: absolute;
		right: clamp(38px, 10vw, 140px);
		top: 50%;
		transform: translate(50%, -50%);
		color: #c4b5fd;
		font-size: 5rem;
		opacity: 0.22;
	}

	.content {
		position: relative;
		margin-top: -18px;
	}

	:global(.page-panel) {
		position: relative;
		padding: clamp(22px, 4vw, 38px);
		background: var(--fff);
		border: 1px solid var(--ddd);
		border-radius: 16px;
		box-shadow: 0 18px 45px rgba(18, 12, 28, 0.08);
	}

	:global(.page-panel::before) {
		content: '';
		position: absolute;
		left: 24px;
		top: 0;
		width: 58px;
		height: 3px;
		background: #8b5cf6;
		box-shadow: 0 0 16px rgba(139, 92, 246, 0.5);
	}

	:global(.page-panel--flush) {
		padding-inline: 0;
		overflow: hidden;
	}

	:global(.page-panel--soft) {
		background: color-mix(in srgb, var(--fff) 92%, #8b5cf6 8%);
	}

	:global(.page-flow) {
		display: grid;
		gap: 24px;
	}

	:global(.page-state) {
		max-width: 520px;
		margin: 28px auto;
		padding: 30px;
		text-align: center;
		background: var(--fff);
		border: 1px solid var(--ddd);
		border-radius: 14px;
		box-shadow: 0 12px 30px rgba(18, 12, 28, 0.07);
	}

	:global(.page-section-title) {
		margin: 8px 0 22px;
		font-size: clamp(1.35rem, 3vw, 1.8rem);
		font-weight: 850;
	}

	@media (max-width: 700px) {
		.hero-inner {
			min-height: 178px;
		}

		.hero-icon,
		.hero::after {
			display: none;
		}

		.content {
			margin-top: -12px;
		}

		:global(.page-panel) {
			border-radius: 12px;
		}
	}
</style>

<section class="page-shell">
	<header class="hero">
		<div class:wide class="hero-inner">
			<div class="copy">
				<div class="eyebrow">{eyebrow}</div>
				<h1>{title}</h1>
				{#if description}<p>{description}</p>{/if}
			</div>
			<span class="material-icons hero-icon" aria-hidden="true">{icon}</span>
		</div>
	</header>
	<div class:wide class="content">
		<slot />
	</div>
</section>

