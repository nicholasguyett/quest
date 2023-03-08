import type { LayoutLoad } from './$types';
import { locale, loadTranslations, DEFAULT_LOCALE } from '$lib/translations';

export const load = (async ({ url }) => {
	const { pathname } = url;
	const initLocale = locale.get() || DEFAULT_LOCALE;

	await loadTranslations(initLocale, pathname);

	return {};
}) satisfies LayoutLoad;

export const prerender = true;
export const trailingSlash = 'always';
