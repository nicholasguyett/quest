<style>
  .quest-list {
    padding: 0;
    list-style: none;
  }
</style>
<script>
  import Quest from "$lib/Quest.svelte"

  let quests = [
    {
      title: "Finish Quest MVP",
      description: "This app you're looking at? Make it work",
      completed: false,
    },
    {
      title: "ENHANCE!",
      description: "Add the cool extra stuff",
      completed: false,
    },
  ]
</script>
<h2>My Quests</h2>
<nav>
  <ul>
    <li><button type="button" class="primary">Start New Quest!</button></li>
  </ul>
</nav>
<ul class="quest-list">
  {#each quests as quest}
    <li>
      <Quest bind:value={quest} />
    </li>
  {/each}
</ul>
