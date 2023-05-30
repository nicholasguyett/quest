import { test, type BrowserContext } from '@playwright/test';

const WEBKIT_PAUSE_MS = 5000;

test.describe('offline mode', () => {
	let context: BrowserContext;

	test.beforeAll(async ({ browser }) => {
		// Establish shared context for all offline tests
		context = await browser.newContext();

		// Allow application to install the service worker and populate the cache
		const page = await context.newPage();
		await page.goto('/');

		await page.waitForLoadState('networkidle');

		// Set application to offline mode
		await context.setOffline(true);
	});

	test('loads', async () => {
		const page = await context.newPage();
		await page.goto('/');
	});
});
