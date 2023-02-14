<script lang="ts">
	import { db } from '$lib/db';
	import { Quest } from '$lib/quest';
	import { createEventDispatcher } from 'svelte';

	export let value: Quest;

	const dispatch = createEventDispatcher();

	let updatedValue = new Quest(value);

	function save() {
		db.quests.put(updatedValue).then(() => {
			dispatch('close');
		});
	}

	function close() {
		dispatch('close');
	}
</script>

<form on:submit|preventDefault={save}>
	<label class="form-row">
		<span>Title:</span><input bind:value={updatedValue.title} required />
	</label>
	<label class="form-row">
		<span>Description:</span> <textarea bind:value={updatedValue.description} required />
	</label>
	<div>
		<button class="primary" type="submit">Save</button>
		<button class="danger" type="button" on:click={close}>Close</button>
	</div>
</form>
