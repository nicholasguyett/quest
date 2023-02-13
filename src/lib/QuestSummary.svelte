<script lang="ts">
	import { db } from "./db";
	import type { Quest } from "./quest";

	export let value: Quest;
  console.log(value)

  function completeQuest() {
    db.quests.put({...value, is_completed: true});
  }

  function abandonQuest() {
    db.quests.delete(value.id);
  }
</script>

<article class="quest-summary">
	<header>{value.title}</header>
	<p>{value.description}</p>
  {#if !value.is_completed}
    <button type="button" class="primary" on:click={completeQuest}>Complete</button>
    <button type="button" class="danger" on:click={abandonQuest}>Abandon</button>
  {/if}
</article>
