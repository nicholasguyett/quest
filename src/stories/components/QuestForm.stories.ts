import type { Meta, StoryObj } from '@storybook/svelte';
import QuestForm from '$lib/QuestForm.svelte';
import { Quest } from '$lib/quest';

const meta = {
	title: 'Components/QuestForm',
	component: QuestForm
} satisfies Meta<QuestForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: new Quest()
	}
};
