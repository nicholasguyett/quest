<style>
  .quest-list {
    padding: 0;
    list-style: none;
  }
</style>

<script>
  import { liveQuery } from "dexie";
  import { db } from "$lib/db"
  import QuestSummary from "$lib/QuestSummary.svelte"
  import QuestForm from "$lib/QuestForm.svelte"
  import { Quest } from "$lib/quest"

  let quests = liveQuery(
    async () => db.quests.filter(quest => !quest.is_completed)
  );

  let updatedQuest = null;

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
  {#each $quests as quest (quest.id)}
    <li>
      <QuestSummary bind:value={quest} />
    </li>
  {/each}
</ul>
{#if updatedQuest !== null}
  <modal open>
    <QuestForm value={updatedQuest} on:save={() => updatedQuest = null}/>
  </modal>
{/if}
