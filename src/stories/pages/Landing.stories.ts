import type { Meta, StoryObj } from '@storybook/svelte';
import { within, userEvent } from '@storybook/testing-library';

import Landing from '$lib/../routes/+page.svelte';

const meta = {
	title: 'Pages/Home',
	component: Landing,
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
	parameters: {}
} satisfies Meta<Landing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// More on interaction testing: https://storybook.js.org/docs/7.0/svelte/writing-tests/interaction-testing
/*
// Logged in example
export const LoggedIn: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const loginButton = await canvas.getByRole('button', {
			name: /Log in/i
		});
		await userEvent.click(loginButton);
	}
};
*/
