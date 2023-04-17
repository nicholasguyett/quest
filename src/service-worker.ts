/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
/// <reference types="vite-plugin-pwa/client" />
import { precacheAndRoute } from 'workbox-precaching';

declare const self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);

const idempotentNotifications = new Map();

self.addEventListener('message', (event) => {
	// Ignore any cross-origin messages
	if (event.origin !== self.origin) return;

	if (event.data.type === 'idempotent-notification') {
		// Ensure idempotent notifications occur exactly once, even if scheduled by multiple tabs
		if (!idempotentNotifications.has(event.data.id)) {
			idempotentNotifications.set(
				event.data.id,
				self.registration.showNotification(event.data.title, event.data.options)
			);
		}
	}
});
