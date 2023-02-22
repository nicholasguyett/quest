<script lang="ts">
	import { db } from './db';
	import type { Quest } from './quest';
	import { t } from '$lib/translations';

	export let value: Quest;

	function completeQuest() {
		db.quests.put({ ...value, is_completed: true });
	}

	function abandonQuest() {
		db.quests.delete(value.id);
	}
</script>

<article class="quest-summary">
	<header>{value.title}</header>
	<p>{value.description}</p>
	{#if !value.is_completed}
		<button type="button" class="primary" on:click={completeQuest}>{$t('quests.cta.complete')}</button>
		<button type="button" class="danger" on:click={abandonQuest}>{$t('quests.cta.abandon')}</button>
	{/if}
</article>
