import type { Meta, StoryObj } from '@storybook/svelte';

import Dashboard from '$lib/../routes/+page.svelte';

const meta = {
	title: 'Pages/Dashboard',
	component: Dashboard,
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
	parameters: {}
} satisfies Meta<Dashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
