<script>
	import { i18n } from '$lib/translations';
</script>

<svelte:head>
	<title>{$i18n.t('common.app-title')}</title>
</svelte:head>

<h2>{$i18n.t('home.header')}</h2>
<p>
	<!-- TODO Fill this out with a real description -->
	{$i18n.t('home.description')}
</p>
