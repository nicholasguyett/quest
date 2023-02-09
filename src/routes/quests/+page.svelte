<script lang="ts">
	import { liveQuery } from 'dexie';
	import { db } from '$lib/db';
	import QuestSummary from '$lib/QuestSummary.svelte';
	import QuestForm from '$lib/QuestForm.svelte';
	import { Quest } from '$lib/quest';
	import type { Readable } from 'svelte/store';
	import { browser } from '$app/environment';

	let quests = liveQuery(async() =>
    browser ? db.quests.where({is_completed: false}).toArray()
    : []
  ) as unknown as Readable<Quest[]>

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
  {#if $quests && $quests.length > 0}
    {#each $quests as quest (quest.id)}
      <li>
        <QuestSummary value={quest} />
      </li>
    {/each}
  {:else}
      No pending quests
  {/if}
</ul>
{#if updatedQuest !== null}
	<modal open>
		<QuestForm value={updatedQuest} on:save={() => (updatedQuest = null)} />
	</modal>
{/if}

<style>
	.quest-list {
		padding: 0;
		list-style: none;
	}
</style>
