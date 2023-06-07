import { devices, type PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	projects: [
		/* Desktop devices */
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] }
		},
		// NOTE: Webkit is crashing in playwright when offline mode is enabled
		// TODO: Fix webkit offline mode tests

		/* Mobile Devices */
		{
			name: 'mobile-chrome',
			use: {
				...devices['Pixel 5'],
				defaultBrowserType: 'chromium'
			}
		}
		// NOTE: Firefox mobile is not currently supported by playwright,
		//		so bugs may be identified in production for firefox movile
	],
	webServer: {
		command: 'yarn build && yarn preview',
		port: 4173
	},
	testDir: 'tests'
};

export default config;
