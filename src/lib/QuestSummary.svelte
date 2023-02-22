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

<article class="card">
	<header class="card-header">{value.title}</header>
	<div class="card-body">
		<p class="card-text">{value.description}</p>
	</div>
	<div class="card-footer">
		{#if !value.is_completed}
			<button type="button" class="btn btn-primary" on:click={completeQuest}
				>{$t('quests.cta.complete')}</button
			>
			<button type="button" class="btn btn-danger" on:click={abandonQuest}
				>{$t('quests.cta.abandon')}</button
			>
		{/if}
	</div>
</article>
