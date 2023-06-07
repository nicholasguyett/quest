import { test, type BrowserContext } from '@playwright/test';

test.describe('offline mode', () => {
	let context: BrowserContext;

	test.beforeAll(async ({ browser }) => {
		// Establish shared context for all offline tests
		context = await browser.newContext();

		// Allow application to install the service worker and populate the cache
		const page = await context.newPage();
		await page.goto('/');
		await page.waitForLoadState('networkidle');
		// Service worker is not available on first load so we have to load the
		// 		page again to make sure it is activated

		// TODO: find alternative to 'networkidle'
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		// Make sure that the service worker is activated before going offline
		await page.evaluate(async () => {
			const registration = await window.navigator.serviceWorker.getRegistration();
			if (registration?.active?.state === 'activated') return;
			await new Promise((res) =>
				window.navigator.serviceWorker.addEventListener('controllerchange', res)
			);
		});

		// Set application to offline mode
		await context.setOffline(true);
	});

	test('loads', async () => {
		const page = await context.newPage();
		await page.goto('/');
	});
});
