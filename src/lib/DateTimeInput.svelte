<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { Temporal } from '@js-temporal/polyfill';

	interface $$Props extends Omit<HTMLInputAttributes, 'type' | 'value'> {
		/**
		 * The current input value, parsed as a Temporal.PlainDate
		 */
		value?: Temporal.PlainDateTime | undefined;
	}
	// TODO: Implement timezone support

	export let value: Temporal.PlainDateTime | undefined = undefined;

	let dateTimeString: string = '';

	// We need changes from the props input to propagate to the form string and vice verse
	// To ensure that changes flow bidirectionally without creating a cyclic loop, we use
	// functions to indirectly update the values
	const input = (inputValue: typeof value) => {
		dateTimeString = inputValue?.toString?.() || '';
	};
	const output = (formValue: typeof dateTimeString) => {
		value = formValue ? Temporal.PlainDateTime.from(formValue) : undefined;
	};

	$: input(value);
	$: output(dateTimeString);
</script>

<input {...$$restProps} type="datetime-local" bind:value={dateTimeString} />
