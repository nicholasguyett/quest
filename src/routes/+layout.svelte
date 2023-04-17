<script lang="ts">
	import '../app.scss';
	import { i18n } from '$lib/translations';

	let user = {
		logged_in: true,
		use_light_mode: false
	};
</script>

<header class="navbar bg-primary navbar-expand">
	<nav class="container" aria-label={$i18n.t('common.main-menu')}>
		<a class="navbar-brand" href="/">{$i18n.t('common.app-title')}</a>

		<ul class="navbar-nav">
			<li class="nav-item">
				<a class="nav-link" href="mailto:hello@questplanner.app">{$i18n.t('common.contact-us')}</a>
			</li>
			<li class="nav-item">
				{#if user.logged_in}
					<a class="nav-link" href="/quests">{$i18n.t('common.dashboard-title')}</a>
				{/if}
			</li>
		</ul>
	</nav>
</header>

<main class="container">
	<slot />
</main>
