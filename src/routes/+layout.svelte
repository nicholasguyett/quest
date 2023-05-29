<script lang="ts">
	import { pwaInfo } from 'virtual:pwa-info';

	import '../app.scss';
	import { i18n } from '$lib/translations';
	import {
		questReminderNotifications,
		type QuestReminder,
		notificationsEnabled
	} from '$lib/reminders';
	import { MESSAGE_TYPE } from '$lib/messages';
	import { onDestroy } from 'svelte';

	function delegateNotification(questReminder: QuestReminder) {
		navigator.serviceWorker.controller?.postMessage?.({
			type: MESSAGE_TYPE.IDEMPOTENT_NOTIFICATION,
			...questReminder
		});
	}

	if ($notificationsEnabled) {
		// Listen for quest reminders and delegate to service worker, to prevent duplicate notifications
		const questReminderSubscription = questReminderNotifications.subscribe(delegateNotification);
		onDestroy(() => questReminderSubscription.unsubscribe());
	}

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
	{@html webManifest}
</svelte:head>

<header class="navbar bg-primary navbar-expand">
	<nav class="container" aria-label={$i18n.t('common.main-menu')}>
		<a class="navbar-brand" href="/">{$i18n.t('common.app-title')}</a>

		<ul class="navbar-nav">
			<li class="nav-item">
				<a class="nav-link" href="mailto:hello@questplanner.app">{$i18n.t('common.contact-us')}</a>
			</li>
		</ul>
	</nav>
</header>

<main class="container">
	<slot />
</main>
