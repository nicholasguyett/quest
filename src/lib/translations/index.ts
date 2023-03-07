import i18n from 'sveltekit-i18n';
import { Locale } from 'locale-enum';

export const SUPPORTED_LOCALES = [Locale.en_US] as const;
export const NAMESPACES = ['common', 'quests', 'home'] as const;
export const DEFAULT_LOCALE = Locale.en_US;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export type Namespace = (typeof NAMESPACES)[number];

export const { t, locale, locales, loading, loadTranslations } = new i18n({
	loaders: SUPPORTED_LOCALES.flatMap((locale) =>
		NAMESPACES.map((namespace) => ({
			locale,
			key: namespace,
			loader: async () => (await import(`./${locale}/${namespace}.json`)).default
		}))
	)
});
