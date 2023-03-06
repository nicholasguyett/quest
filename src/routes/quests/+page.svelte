<script lang="ts">
	import { liveQuery } from 'dexie';
	import { t } from '$lib/translations';
	import { db } from '$lib/db';
	import QuestSummary from '$lib/QuestSummary.svelte';
	import QuestForm from '$lib/QuestForm.svelte';
	import { Quest } from '$lib/quest';
	import type { Readable } from 'svelte/store';
	import { browser } from '$app/environment';

	let dialog: HTMLDialogElement;

	let pendingQuests = liveQuery(async () =>
		browser ? db.quests.filter((quest) => !quest.is_completed).toArray() : []
	) as unknown as Readable<Quest[]>;

	let updatedQuest: Quest | null = null;

	function createNewQuest() {
		updatedQuest = new Quest();
		dialog.showModal();
	}
</script>

<svelte:head>
	<title>{$t('quests.dashboard-title')}</title>
</svelte:head>

<h2>{$t('quests.dashboard-title')}</h2>
<button type="button" class="btn btn-primary" on:click={createNewQuest}
	>{$t('quests.cta.new-quest')}</button
>

<ul class="quest-list">
	{#if $pendingQuests}
		{#if $pendingQuests.length > 0}
			{#each $pendingQuests as quest (quest.id)}
				<li>
					<QuestSummary value={quest} />
				</li>
			{/each}
		{:else}
			<span>{$t('quests.no-pending-quests')}</span>
		{/if}
	{:else}
		<span>{$t('common.loading')}</span>
	{/if}
</ul>

<dialog bind:this={dialog}>
	{#if updatedQuest !== null}
		<div class="modal-content">
			<QuestForm value={updatedQuest} on:close={() => ((updatedQuest = null), dialog.close())} />
		</div>
	{/if}
</dialog>

<style>
	.quest-list {
		padding: 0;
		list-style: none;
		margin-top: 3rem;
	}
</style>
