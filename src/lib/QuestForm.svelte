<script lang="ts">
	import { db } from '$lib/db';
	import { Quest } from '$lib/quest';
	import { createEventDispatcher } from 'svelte';
	import { i18n } from '$lib/translations';

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
		<label class="form-label" for="quest-form-title">
			{$i18n.t('quests.fields.title')}
			<abbr title={$i18n.t('quests.field-is-required.expanded')}>
				{$i18n.t('quests.field-is-required.abbreviation')}
			</abbr>
		</label>
		<input
			name="title"
			id="quest-form-title"
			class="form-control"
			bind:value={updatedValue.title}
			required
		/>
	</div>

	<div class="mb-3">
		<label class="form-row" for="quest-form-description">
			{$i18n.t('quests.fields.description')}
			<abbr title={$i18n.t('quests.field-is-required.expanded')}>
				{$i18n.t('quests.field-is-required.abbreviation')}
			</abbr>
		</label>
		<textarea
			name="description"
			id="quest-form-description"
			class="form-control"
			bind:value={updatedValue.description}
			required
		/>
	</div>
	<div class="mb-3">
		<label class="form-label" for="quest-form-target-completion-datetime">
			{$i18n.t('quests.fields.target_completion_datetime')}
		</label>
		<input
			type="datetime-local"
			name="target-completion-datetime"
			id="quest-form-target-completion-datetime"
			class="form-control"
			bind:value={updatedValue.target_completion_datetime}
		/>
	</div>
	<div class="mb-3">
		<button class="btn btn-primary" type="submit">{$i18n.t('quests.cta.save')}</button>
		<button class="btn btn-danger" type="button" on:click={close}>
			{$i18n.t('quests.cta.close')}
		</button>
	</div>
</form>
