<script lang="ts">
	import { db } from './db';
	import type { Quest } from './quest';
	import { t } from '$lib/translations';

	export let value: Quest;

	let confirmationModal: HTMLDialogElement;
	let confirmationTarget: 'complete' | 'abandon' | 'uncomplete';

	function confirm() {
		switch (confirmationTarget) {
			case 'complete':
				db.quests.put({ ...value, is_completed: true });
				break;
			case 'abandon':
				db.quests.delete(value.id);
				break;
			case 'uncomplete':
				db.quests.put({ ...value, is_completed: false });
				break;
		}
	}

	function completeQuest() {
		confirmationTarget = 'complete';
		confirmationModal.showModal();
	}

	function abandonQuest() {
		confirmationTarget = 'abandon';
		confirmationModal.showModal();
	}

	function uncompleteQuest() {
		confirmationTarget = 'uncomplete';
		confirmationModal.showModal();
	}
</script>

<article class="card quest-summary">
	<header class="card-header">{value.title}</header>
	<div class="card-body">
		<p class="card-text">{value.description}</p>
	</div>
	<div class="card-footer">
		{#if value.is_completed}
			<button type="button" class="btn btn-danger" on:click={uncompleteQuest}>
				{$t('quests.cta.uncomplete')}
			</button>
		{:else}
			<button type="button" class="btn btn-primary" on:click={completeQuest}>
				{$t('quests.cta.complete')}
			</button>
			<button type="button" class="btn btn-danger" on:click={abandonQuest}>
				{$t('quests.cta.abandon')}
			</button>
		{/if}
	</div>

	<dialog bind:this={confirmationModal}>
		<form method="dialog" on:submit={confirm}>
			<p>{$t(`common.confirm-${confirmationTarget}`)}</p>
			<button type="button" class="btn btn-danger" on:click={() => confirmationModal.close()}>
				Cancel
			</button>
			<button type="submit" class="btn btn-primary">Confirm</button>
		</form>
	</dialog>
</article>

<style>
	.quest-summary {
		margin: 2rem 0;
	}
</style>
