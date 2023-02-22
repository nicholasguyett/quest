<script lang="ts">
	import { db } from '$lib/db';
	import { Quest } from '$lib/quest';
	import { createEventDispatcher } from 'svelte';
	import { t } from '$lib/translations';

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
		<span>{$t('quests.fields.title')}:</span>
		<input name="title" bind:value={updatedValue.title} required />
	</label>
	<label class="form-row">
		<span>{$t('quests.fields.description')}:</span>
		<textarea name="description" bind:value={updatedValue.description} required />
	</label>
	<div>
		<button class="primary" type="submit">{$t('quests.cta.save')}</button>
		<button class="danger" type="button" on:click={close}>{$t('quests.cta.close')}</button>
	</div>
</form>
