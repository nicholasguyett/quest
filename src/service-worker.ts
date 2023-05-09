/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
/// <reference types="vite-plugin-pwa/client" />

import type { IdempotentNotification } from './lib/messages';
import { precacheAndRoute } from 'workbox-precaching';

declare const self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST || []);

const idempotentNotifications = new Map();

self.addEventListener('message', (event) => {
	// Ignore any cross-origin messages
	if (event.origin !== self.origin) return;

	if (event.data.type === 'idempotent-notification') {
		const message: IdempotentNotification = event.data;

		// Ensure idempotent notifications occur exactly once, even if scheduled by multiple tabs
		if (!idempotentNotifications.has(message.id)) {
			idempotentNotifications.set(
				message.id,
				self.registration.showNotification(message.title, message.options)
			);
		}
	}
});
