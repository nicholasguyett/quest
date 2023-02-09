<script>
	import { db } from "$lib/db"
	import { Quest } from '$lib/quest';

	export let value;

	let updatedValue = new Quest(value);

	function save() {
		db.quests.put(updatedValue);
	}
</script>

<form on:submit|preventDefault={save}>
	<label>
		Title: <input bind:value={updatedValue.title} required />
	</label>
	<label>
		Description: <input bind:value={updatedValue.description} required />
	</label>
	<button class="primary" type="submit">Save</button>
</form>
