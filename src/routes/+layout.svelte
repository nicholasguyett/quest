<script lang="ts">
	import '../app.css';
	import { t } from '$lib/translations';

	let user = {
		logged_in: true
	};
</script>

<header id="app-header">
	<h1 class="brand">{$t('common.app-title')}</h1>

	<nav>
		<ul>
			<li>
				{#if user.logged_in}
					<a href="/quests">{$t('common.dashboard-title')}</a>
				{/if}
			</li>
		</ul>
	</nav>
</header>

<main id="app-main">
	<slot />
</main>

<footer id="app-footer">
	<nav>
		<ul>
			<li>
				<a href="mailto:hello@questplanner.app">{$t('common.contact-us')}</a>
			</li>
		</ul>
	</nav>
</footer>
