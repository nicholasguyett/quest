<script lang="ts">
	import { liveQuery } from 'dexie';
	import { db } from '$lib/db';
	import QuestSummary from '$lib/QuestSummary.svelte';
	import QuestForm from '$lib/QuestForm.svelte';
	import { Quest } from '$lib/quest';
	import type { Readable } from 'svelte/store';
	import { browser } from '$app/environment';

	let pendingQuests = liveQuery(async () =>
		browser ? db.quests.filter((quest) => !quest.is_completed).toArray() : []
	) as unknown as Readable<Quest[]>;

	let updatedQuest: Quest | null = null;

	function createNewQuest() {
		updatedQuest = new Quest();
	}
</script>

<h2>My Quests</h2>
<nav>
	<ul>
		<li>
			<button type="button" class="primary" on:click={createNewQuest}>Start New Quest!</button>
		</li>
	</ul>
</nav>
<ul class="quest-list">
	{#if $pendingQuests}
		{#if $pendingQuests.length > 0}
			{#each $pendingQuests as quest (quest.id)}
				<li>
					<QuestSummary value={quest} />
				</li>
			{/each}
		{:else}
			No pending quests
		{/if}
	{:else}
		<span>Loading...</span>
	{/if}
</ul>
{#if updatedQuest !== null}
	<dialog open>
		<QuestForm value={updatedQuest} on:close={() => (updatedQuest = null)} />
	</dialog>
{/if}

<style>
	.quest-list {
		padding: 0;
		list-style: none;
	}
</style>
