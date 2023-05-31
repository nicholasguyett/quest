import type { Preview } from '@storybook/svelte';
import { i18next as i18n } from '$lib/translations';
import '../src/app.scss';

const preview: Preview = {
	parameters: {
		i18n,
		locale: 'en',
		locales: { en: 'English' },
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/
			}
		},
		layout: 'padded'
	}
};

export const globalTypes = {
	locale: {
		name: 'Locale',
		description: 'Internationalization locale',
		defaultValue: 'en-US',
		toolbar: {
			icon: 'globe',
			items: [{ value: 'en-US', title: 'English' }]
		}
	}
};

export default preview;
