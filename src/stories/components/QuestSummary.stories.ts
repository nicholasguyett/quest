import type { Meta, StoryObj } from '@storybook/svelte';
import QuestSummary from '$lib/QuestSummary.svelte';
import { Quest } from '$lib/quest';

const meta = {
	title: 'Components/QuestSummary',
	component: QuestSummary
} satisfies Meta<QuestSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseQuest = new Quest({
	id: 1,
	title: 'Do some cardio',
	description: 'Run on the treadmill for at least 30 minutes',
	is_completed: false
});

const now = new Date();
const tomorrow = new Date(now.getTime() + 1000 * 60 * 60 * 24);

export const Default: Story = {
	args: {
		value: baseQuest
	}
};

export const WithDeadline: Story = {
	args: {
		value: new Quest({
			...baseQuest,
			target_completion_datetime: tomorrow
		})
	}
};
