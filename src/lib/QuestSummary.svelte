<script lang="ts">
	import { db } from './db';
	import type { Quest } from './quest';
	import { i18n } from '$lib/translations';

	export let value: Quest;

	let confirmationModal: HTMLDialogElement;
	let confirmationTarget: 'complete' | 'delete' | 'uncomplete';

	function confirm() {
		switch (confirmationTarget) {
			case 'complete':
				db.quests.put({ ...value, is_completed: true });
				break;
			case 'delete':
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

	function deleteQuest() {
		confirmationTarget = 'delete';
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
				{$i18n.t('quests.cta.uncomplete')}
			</button>
		{:else}
			<button type="button" class="btn btn-primary" on:click={completeQuest}>
				{$i18n.t('quests.cta.complete')}
			</button>
		{/if}
		<button type="button" class="btn btn-danger" on:click={deleteQuest}>
			{$i18n.t('quests.cta.delete')}
		</button>
	</div>

	<dialog bind:this={confirmationModal}>
		<form method="dialog" on:submit={confirm}>
			<p>{$i18n.t(`common.confirm-${confirmationTarget}`)}</p>
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
