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
	<div class="mb-3">
		<label class="form-label" for="quest-form-title">{$t('quests.fields.title')}</label>
		<input
			name="title"
			id="quest-form-title"
			class="form-control"
			bind:value={updatedValue.title}
			required
		/>
	</div>

	<div class="mb-3">
		<label class="form-row" for="quest-form-description">{$t('quests.fields.description')}</label>
		<textarea
			name="description"
			id="quest-form-description"
			class="form-control"
			bind:value={updatedValue.description}
			required
		/>
	</div>
	<div class="mb-3">
		<button class="btn btn-primary" type="submit">{$t('quests.cta.save')}</button>
		<button class="btn btn-danger" type="button" on:click={close}>{$t('quests.cta.close')}</button>
	</div>
</form>
