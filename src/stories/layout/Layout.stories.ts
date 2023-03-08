import type { Meta, StoryObj } from '@storybook/svelte';
import Layout from '$lib/../routes/+layout.svelte';

const meta = {
	title: 'Layout',
	component: Layout,
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/7.0/svelte/configure/story-layout
		layout: 'fullscreen'
	}
} satisfies Meta<Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {};
