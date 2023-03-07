<script lang="ts">
	import { onMount } from 'svelte';
	import { pwaInfo } from 'virtual:pwa-info';

	import '../app.scss';
	import { t } from '$lib/translations';

	let user = {
		logged_in: true,
		use_light_mode: false
	};

	onMount(async () => {
		if (pwaInfo) {
			const { registerSW } = await import('virtual:pwa-register');
			registerSW({
				immediate: true,
				onRegistered(r: any) {
					console.log(`SW Registered: ${r}`);
				},
				onRegisterError(error: any) {
					console.error('SW registration error', error);
				}
			});
		}
	});

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
	{@html webManifest}
</svelte:head>

<header class="navbar bg-primary navbar-expand">
	<nav class="container" aria-label={$t('common.main-menu')}>
		<a class="navbar-brand" href="/">{$t('common.app-title')}</a>

		<ul class="navbar-nav">
			<li class="nav-item">
				<a class="nav-link" href="mailto:hello@questplanner.app">{$t('common.contact-us')}</a>
			</li>
			<li class="nav-item">
				{#if user.logged_in}
					<a class="nav-link" href="/quests">{$t('common.dashboard-title')}</a>
				{/if}
			</li>
		</ul>
	</nav>
</header>

<main class="container">
	<slot />
</main>
