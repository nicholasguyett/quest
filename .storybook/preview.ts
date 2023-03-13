import type { Preview } from '@storybook/svelte';
import { loadTranslations } from '$lib/translations';
import '../src/app.scss';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/
			}
		},
		layout: 'padded',
	},
	globals: {
		loader: () => {}
	}
};

const withTranslations = () => {
};

export const globalTypes = {
	locale: {
		name: 'Locale',
		description: 'Interntionalization locale',
		defaultValue: 'en-US',
		toolbar: {
			icon: 'globe',
			items: [
				{ value: 'en-US', title: 'English' },
			]
		}
	}
};

export default preview;
export const loaders = [
	// Load translations in all stories
	async ({globals: {locale}}) => {
		await loadTranslations(locale);
		return {};
	},
]