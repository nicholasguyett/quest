<script lang="ts">
	import type { Quest } from "./quest";

	export let value: Quest;
  console.log(value)
</script>

<article class="quest-summary">
	<header>{value.title}</header>
	<p>{value.description}</p>
  {#if !value.is_completed}
    <button type="button" class="primary">Complete</button>
    <button type="button" class="danger">Abandon</button>
  {/if}
</article>
