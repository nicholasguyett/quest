import type { Meta, StoryObj } from '@storybook/svelte';
import QuestSummary from '$lib/QuestSummary.svelte';
import { Quest } from '$lib/quest';

const meta = {
	title: 'Components/QuestSummary',
	component: QuestSummary,
} satisfies Meta<QuestSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        value: new Quest({
            id: 1,
            title: "Do some cardio",
            description: "Run on the treadmill for at least 30 minutes",
            is_completed: false,
        }),
    }
};
