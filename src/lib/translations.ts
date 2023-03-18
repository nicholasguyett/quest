import path from 'path';
import i18next, { type InitOptions } from 'i18next';
import { Locale } from 'locale-enum';
import Fetch from 'i18next-fetch-backend';
import { readable } from 'svelte/store';

import { assets } from '$app/paths';
import { browser } from '$app/environment';

export const SUPPORTED_LOCALES = [Locale.en] as const;
export const NAMESPACES = ['common', 'quests', 'home'] as const;
export const DEFAULT_LOCALE = Locale.en;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export type Namespace = (typeof NAMESPACES)[number];

export const GLOBAL_OPTIONS: InitOptions = {
	fallbackLng: [DEFAULT_LOCALE],
	ns: NAMESPACES,
	keySeparator: '.',
	nsSeparator: '.',
	interpolation: {
		escapeValue: false // Escaping is already handled by svelte
	}
};
let environmentSpecificOptions: Partial<InitOptions> = {};
if (browser) {
	// Load locales from asssets folder
	i18next.use(Fetch);
	environmentSpecificOptions = {
		preload: SUPPORTED_LOCALES,
		backend: {
			loadPath: assets + '/locales/{{lng}}/{{ns}}.json'
		}
	};
} else {
	// Don't attempt to load translations at build time
	environmentSpecificOptions = {
		resources: {}
	};

	// TODO get translations working at run-time
}
i18next.init({
	...GLOBAL_OPTIONS,
	...environmentSpecificOptions
});

// Wrap i18n in a store so svelte can rerender components when translations are loaded or the language is updated
const i18n = readable(i18next, (set) => {
	// Inspired by https://github.com/NishuGoel/svelte-i18next/blob/cdae4b76c8ab7ce0e474b2dc7d87b60ee2026e4a/src/translation-store.ts

	// All events that we expect to change the result of a translation
	const i18nEventNames = ['initialized', 'loaded', 'added', 'languageChanged'];
	for (let eventName of i18nEventNames) {
		// Trigger an update of the store by setting the value again
		i18next.on(eventName, () => set(i18next));
	}
});

export { i18n, i18next };
