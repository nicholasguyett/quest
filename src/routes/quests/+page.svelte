<script lang="ts">
	import { liveQuery } from 'dexie';
	import { i18n } from '$lib/translations';
	import { db } from '$lib/db';
	import QuestSummary from '$lib/QuestSummary.svelte';
	import QuestForm from '$lib/QuestForm.svelte';
	import { Quest } from '$lib/quest';
	import type { Readable } from 'svelte/store';
	import { browser } from '$app/environment';
	import { requestNotificationsPermissions } from '$lib/reminders';

	let dialog: HTMLDialogElement;
	let showCompleted: boolean = false;

	const allQuests = liveQuery(async () =>
		browser ? db.quests.toArray() : []
	) as unknown as Readable<Quest[]>;

	$: pendingQuests = $allQuests?.filter((quest) => !quest.is_completed);

	$: completedQuests = $allQuests?.filter((quest) => quest.is_completed);

	let updatedQuest: Quest | null = null;

	function createNewQuest() {
		updatedQuest = new Quest();
		dialog.showModal();
	}

	function toggleShowCompleted() {
		showCompleted = !showCompleted;
	}
</script>

<svelte:head>
	<title>{$i18n.t('quests.dashboard-title')}</title>
</svelte:head>

<h2>{$i18n.t('quests.dashboard-title')}</h2>
<button type="button" class="btn btn-primary" on:click={createNewQuest}>
	{$i18n.t('quests.cta.new-quest')}
</button>
<button type="button" class="btn btn-info" on:click={requestNotificationsPermissions}>
	{$i18n.t('quests.cta.enable-notifications')}
</button>

<ul class="quest-list">
	{#if pendingQuests}
		{#if pendingQuests.length > 0}
			{#each pendingQuests as quest (quest.id)}
				<li>
					<QuestSummary value={quest} />
				</li>
			{/each}
		{:else}
			<span>{$i18n.t('quests.no-pending-quests')}</span>
		{/if}
	{:else}
		<span>{$i18n.t('common.loading')}</span>
	{/if}
</ul>

{#if completedQuests?.length > 0}
	<button type="button" class="btn btn-info" on:click={toggleShowCompleted}>
		{showCompleted ? $i18n.t('quests.cta.hide-completed') : $i18n.t('quests.cta.show-completed')}
	</button>
	{#if showCompleted}
		<ul class="quest-list">
			{#each completedQuests as quest (quest.id)}
				<li>
					<QuestSummary value={quest} />
				</li>
			{/each}
		</ul>
	{/if}
{/if}

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
